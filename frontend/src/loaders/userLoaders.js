import { requestJson } from "../lib/api"

export async function usersLoader() {
  const data = await requestJson("/user-api/users")
  return Array.isArray(data.payload) ? data.payload : []
}

export async function userLoader({ params }) {
  const data = await requestJson(`/user-api/users/${params.id}`)
  return data.payload
}
