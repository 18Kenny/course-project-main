package main

import (
	"dos/cfg"
	. "dos/db"
	"dos/internal"
	"dos/logger"
	"net/http"
	"os"

	"github.com/klyve/go-healthz"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
	config := cfg.LoadConfig()

	dbClient := NewDBClient(config.Dsn)
	defer dbClient.DB.Close()

	srv := &internal.Server{DB: dbClient}
	health := healthz.Instance{Detailed: true}
	mux := http.NewServeMux()

	mux.Handle("/metrics", promhttp.Handler())

	// Support both direct paths (local/compose) and /api-prefixed paths (k8s/ingress)
	registerRoutes := func(prefix string) {
		p := prefix
		mux.HandleFunc(p+"/entries", func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case http.MethodGet:
				srv.GetEntries(w, r)
			case http.MethodPost:
				srv.PostEntry(w, r)
			default:
				w.WriteHeader(http.StatusMethodNotAllowed)
			}
		})

		mux.HandleFunc(p+"/user", func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case http.MethodGet:
				srv.GetUser(w, r)
			case http.MethodPost:
				srv.PostUser(w, r)
			default:
				w.WriteHeader(http.StatusMethodNotAllowed)
			}
		})

		mux.HandleFunc(p+"/user/{name}", func(w http.ResponseWriter, r *http.Request) {
			username := r.PathValue("name") // dummy
			logger.L.Debug("path parameter handled", "username", username)
			if r.Method == http.MethodDelete {
				srv.DeleteUser(w, r)
				return
			}
			w.WriteHeader(http.StatusMethodNotAllowed)
		})

		mux.HandleFunc(p+"/entries/{id}", func(w http.ResponseWriter, r *http.Request) {
			id := r.PathValue("id") // dummy

			if r.Method == http.MethodDelete {
				srv.DeleteEntry(w, r, id)
				return
			}
			w.WriteHeader(http.StatusMethodNotAllowed)
		})

		mux.HandleFunc(p+"/db/disconnect", srv.DbDisconnect)
		mux.HandleFunc(p+"/db/connect", srv.DbConnect)
		mux.HandleFunc(p+"/db/status", srv.DbStatus)
		mux.HandleFunc(p+"/health", health.Healthz())
		mux.HandleFunc(p+"/live", health.Liveness())
	}

	registerRoutes("")
	registerRoutes("/api")

	logger.L.Info("application run and listen on", "port", config.AppPort)

	if err := http.ListenAndServe(":"+config.AppPort, internal.LogMW(internal.MetricsMW(internal.CorsMW(mux)))); err != nil {
		logger.L.Error("http server stopped", "error", err)
		os.Exit(1)
	}
}
