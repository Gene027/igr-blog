import { FC, useState } from 'react'
import { Blog } from '../../routes/blog/page'
import { useAdminCustomDelete } from "medusa-react"
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiEdit } from 'react-icons/bi'
import { Modal } from '../shared/Modal'
import EditBlog from './EditBlog'

interface BlogCardProps {
  blog: Blog;
  id: string;
  idx: number;
  toast: any;
}

const BlogCard: FC<BlogCardProps> = ({ blog, id, toast }) => {
  const { mutate, isLoading } = useAdminCustomDelete<
    Blog
  >(
    `/blog/posts/${id}`,
    ["blog-posts"]
  )

  const [editOpen, setEditOpen] = useState(false);
  const handleDelete = () => {
    return mutate(undefined, {
      onSuccess: () => {
        toast.success("Success", `Post ${blog.title} deleted successfully`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
    })
  }

  return (
    <div className='flex flex-col w-full p-6 gap-6 rounded-lg border-solid border border-[#E5E7EB] bg-[#F9FAFB] min-h-[150px]'>

      {editOpen && (<Modal onClose={() => setEditOpen(false)}><EditBlog handleClose={() => setEditOpen(false)} blog={blog} toast={toast} /></Modal>)}

      <div className='text-[#111827] text-xl font-semibold'>{blog.title}</div>
      <div className='text-[#6B7280] text-sm px-2'>{blog.content}</div>

      <div className='flex gap-3'>
        <button className='flex py-[6px] px-3 w-fit items-center gap-2 rounded-lg border border-solid border-[#E5E7EB] bg-white hover:bg-slate-100' onClick={() => setEditOpen(true)}>
          <BiEdit size={20} />
          <div className='text-[#111827] text-sm font-medium'>Edit Blog</div>
        </button>

        <button className='flex py-[6px] px-3 w-fit items-center gap-2 rounded-lg border border-solid border-[#E5E7EB] bg-white hover:bg-slate-100' onClick={handleDelete}><RiDeleteBin6Line size={20} color='#F43F5E' /> <div className='text-[#F43F5E] text-sm font-medium'>Delete Blog</div></button>
      </div>
      {isLoading && <span>deleting ...</span>}
    </div>
  )
}

export default BlogCard