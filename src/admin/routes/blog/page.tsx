import { FC, useState } from 'react'
import { useAdminCustomQuery } from "medusa-react"
import BlogCard from '../../components/Blog/BlogCard';
import NewBlog from '../../components/Blog/NewBlog';
import { RouteConfig, RouteProps } from '@medusajs/admin';
import { GrAdd } from 'react-icons/gr'
import { Modal } from '../../components/shared/Modal';

interface BlogProps {
    toast: RouteProps
}

export type BlogPost = {
    title: string,
    content: string
}

export type Blog = {
    title: string,
    content: string,
    id: string,
    created_at: string,
    updated_at: string,
}

export type BlogPostRes = {
    posts: Blog[]
}

const Blog: FC = ({
    notify,
}: RouteProps) => {
    const { data, isLoading } = useAdminCustomQuery<
        BlogPost,
        BlogPostRes
    >(
        `/blog/posts/`,
        ["blog-post"],
    )
    const [newBlogOpen, setNewBlogOpen] = useState(false);

    return <div className='flex flex-col p-6 items-center gap-6 rounded-lg border-solid border border-[#E5E7EB] bg-white'>
        <div className='flex justify-between w-full items-center'>
            <div className='text-[ #111827] text-lg font-semibold'>Blogs</div>
            <button className='flex py-[6px] px-3 justify-center items-center gap-2 rounded-lg border border-solid border-[#E5E7EB] bg-white hover:bg-slate-100' onClick={() => setNewBlogOpen(true)}><GrAdd size={20} /><div className='text-[#111827] font-medium text-sm'>Create New Blog</div></button>
        </div>

        {isLoading && <span>Loading ...</span>}

        {newBlogOpen && (<Modal onClose={() => setNewBlogOpen(false)}><NewBlog handleClose={()=> setNewBlogOpen(false)} toast={notify} /></Modal>)}

        {data && data.posts.length != 0 && data.posts.map((post, index) => (
            <BlogCard toast={notify} key={post.id} blog={post} id={post.id} idx={index + 1} />
        ))
        }
        {data && data.posts.length == 0 && <div className='text-xl'>You dont have any post. Click on create new blog</div>}
    </div>

}

export const config: RouteConfig = {
    link: {
        label: "Blog",
    },
}
export default Blog