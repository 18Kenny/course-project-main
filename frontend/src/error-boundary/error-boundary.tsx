import React from "react";
import {ErrorPage} from "@/pages/error.page.tsx";

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = {error: null};

  static getDerivedStateFromError(error: Error): State {
    return {error};
  }

  render() {
    if (this.state.error) {
      return <ErrorPage error={this.state.error}/>;
    }

    return this.props.children;
  }
}
