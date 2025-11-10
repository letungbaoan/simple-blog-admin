import PostsPage from './PostPage'

export default function Page() {
  const postsData = [
    { id: '1', title: 'Bài viết 1' },
    { id: '2', title: 'Bài viết 2' },
    { id: '3', title: 'Bài viết 3' }
  ]

  return <PostsPage posts={postsData} />
}
