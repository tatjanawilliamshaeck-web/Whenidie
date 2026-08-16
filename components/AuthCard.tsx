export function AuthCard({
  title,
  subtitle,
  error,
  onDismissError,
  success,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  error?: string | null;
  onDismissError?: () => void;
  success?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main className="app-main" id="main-content">
      <div className="container container--narrow">
        <div className="auth-card">
          <h1 className="auth-title">{title}</h1>
          {subtitle ? <p className="auth-subtitle">{subtitle}</p> : null}

          {error ? (
            <div className="auth-error" role="alert">
              <span>{error}</span>
              <button
                type="button"
                className="auth-error-close"
                aria-label="Dismiss"
                onClick={onDismissError}
              >
                ×
              </button>
            </div>
          ) : null}

          {success ? (
            <div className="auth-success" role="status">
              {success}
            </div>
          ) : null}

          {children}

          {footer ? <p className="auth-footer">{footer}</p> : null}
        </div>
      </div>
    </main>
  );
}
