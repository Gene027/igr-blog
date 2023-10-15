import { FC } from 'react'
import { BlogPost } from '../../widgets/blog/blog'
import { useAdminCustomDelete } from "medusa-react"

interface BlogCardProps {
  blog: BlogPost,
  id: string
}

const BlogCard: FC<BlogCardProps> = ({blog, id}) => {
    const { mutate, isLoading } = useAdminCustomDelete<
    BlogPost
  >(
    `/blog/posts/${id}`,
    ["blog-posts"]
   )

  const handleDelete = () => {
    return mutate(undefined, {
      onSuccess: () => {
        window.location.reload()
      },
    })
  }

  return <div>
    <div>{blog.title}</div>
    <div>{blog.content}</div>
    <button onClick={handleDelete}>Delete</button>
    {isLoading && <span>deleting ...</span>}
  </div>
}

export default BlogCard