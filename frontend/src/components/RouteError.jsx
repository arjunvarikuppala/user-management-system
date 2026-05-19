import { Link, isRouteErrorResponse, useRouteError } from 'react-router'

function RouteError() {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? error.data || error.statusText
    : error instanceof Error
      ? error.message
      : "Something went wrong while rendering this page."

  return (
    <section className="content-card content-card-narrow">
      <h1 className="h3 mb-3">Page error</h1>
      <p className="text-muted">{message}</p>
      <Link
        to="/"
        className="btn btn-primary mt-2"
      >
        Go Home
      </Link>
    </section>
  )
}

export default RouteError
