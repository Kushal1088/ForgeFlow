import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8 bg-[#12131a]">
          <div className="bg-[#1e1f26] border border-red-500/40 rounded-2xl p-8 max-w-md text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-heading font-bold text-white">Application Exception Caught</h2>
            <p className="text-xs text-[#908fa0] leading-relaxed">
              An unexpected UI component error occurred. The system trapped the error to prevent application disruption.
            </p>
            <div className="pt-2">
              <button
                onClick={() => window.location.reload()}
                className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-glow"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reload Application
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
