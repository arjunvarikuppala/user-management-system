import { Link, isRouteErrorResponse, useRouteError } from 'react-router'

function RouteError() {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? error.data || error.statusText
    : error instanceof Error
      ? error.message
      : "Something went wrong while rendering this page."

  return (
    <section className="surface-card surface-card--narrow">
      <p className="eyebrow">Unexpected Issue</p>
      <h1 className="section-title">Page error</h1>
      <p className="section-copy">{message}</p>
      <div className="form-actions">
        <Link
          to="/"
          className="button button--primary"
        >
          Go Home
        </Link>
      </div>
    </section>
  )
}

export default RouteError
