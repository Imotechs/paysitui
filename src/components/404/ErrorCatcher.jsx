import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render your custom error page here
      return <CustomErrorPage />;
    }

    return this.props.children;
  }
}

// Custom Error Page component
const CustomErrorPage = () => (
  <div>
    <h1>Oops! Something went wrong.</h1>
    <p>Please refresh the page or try again later.</p>
  </div>
);

export default ErrorBoundary;
