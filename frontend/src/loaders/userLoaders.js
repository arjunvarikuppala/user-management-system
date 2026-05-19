export async function usersLoader() {
  const res = await fetch("http://localhost:3000/user-api/users")
  const data = await res.json()

  if (!res.ok) {
    throw new Response(data.message || "Unable to load users", {
      status: res.status
    })
  }

  return Array.isArray(data.payload) ? data.payload : []
}

export async function userLoader({ params }) {
  const res = await fetch(`http://localhost:3000/user-api/users/${params.id}`)
  const data = await res.json()

  if (!res.ok) {
    throw new Response(data.message || "User not found", {
      status: res.status
    })
  }

  return data.payload
}
