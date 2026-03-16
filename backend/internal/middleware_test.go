package internal

import (
	"dos/cfg"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCorsMW_AllowAllOriginHeader(t *testing.T) {
	next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	config := &cfg.Config{}
	h := CorsMW(next, config)

	req := httptest.NewRequest(http.MethodGet, "http://backend/entries", nil)
	req.Header.Set("Origin", "https://example.com")
	rw := httptest.NewRecorder()

	h.ServeHTTP(rw, req)

	if got := rw.Header().Get("Access-Control-Allow-Origin"); got != "*" {
		t.Fatalf("expected '*', got %q", got)
	}
}

func TestCorsMW_PreflightOptions(t *testing.T) {
	next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	config := &cfg.Config{}
	h := CorsMW(next, config)

	req := httptest.NewRequest(http.MethodOptions, "http://backend/entries", nil)
	req.Header.Set("Origin", "https://example.com")
	rw := httptest.NewRecorder()

	h.ServeHTTP(rw, req)

	if rw.Code != http.StatusNoContent {
		t.Fatalf("expected 204, got %d", rw.Code)
	}
	if got := rw.Header().Get("Access-Control-Allow-Origin"); got != "*" {
		t.Fatalf("expected '*', got %q", got)
	}
}
