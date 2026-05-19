const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "")

function buildUrl(path) {
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path
}

export async function requestJson(path, options = {}) {
  const headers = new Headers(options.headers || {})

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    headers
  })

  const contentType = response.headers.get("content-type") || ""
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message = typeof payload === "string"
      ? payload
      : payload?.message

    throw new Error(message || "Unable to complete the request.")
  }

  return payload
}
