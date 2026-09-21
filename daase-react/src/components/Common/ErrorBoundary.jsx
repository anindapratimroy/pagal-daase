import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[DAASE ErrorBoundary] Caught render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050c1a',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '12px', color: '#60a5fa' }}>
            DAASE — IIT Indore
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px', maxWidth: '500px' }}>
            Something went wrong while loading the page view.
          </p>
          <button
            onClick={() => {
              window.location.hash = '';
              window.location.reload();
            }}
            style={{
              padding: '10px 22px',
              backgroundColor: '#1e3a8a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Reload Home Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
