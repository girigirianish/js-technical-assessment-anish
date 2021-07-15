import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public static backToSafety(): void {
    const history = useHistory();
    history.push({
      pathname: '/',
    });
  }

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // here we need console to see some errors
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): React.ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="flash-paint">
          We are sorry, Something went wrong.
          <Button variant="contained" color="primary" onClick={ErrorBoundary.backToSafety}>
            Back To Safety
          </Button>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
