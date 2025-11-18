export const JSON_SERVER_URL = process.env.JSON_SERVER_URL || 'http://localhost:3001'

export const API_ENDPOINTS = {
  POSTS: `${JSON_SERVER_URL}/posts`,
  POST_DETAIL: (id: string) => `${JSON_SERVER_URL}/posts/${id}`
}

