export const PATHS = {
  DASHBOARD: {
    POSTS: '/dashboard/posts',
    NEW_POST: '/dashboard/posts/new',
    POST_DETAIL: (id: string) => `/dashboard/posts/${id}`
  },
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/register'
  }
}
