import { WidgetConfig } from '@medusajs/admin';
import { FC, useState } from 'react'
import { useAdminCustomQuery } from "medusa-react"
import BlogCard from '../../components/Blog/BlogCard';
import NewBlog from '../../components/Blog/NewBlog';

interface BlogProps {

}

export type BlogPost = {
    title: string,
    content: string
}

export type BlogPostRes = {
    posts: {
        title: string,
        content: string,
        id: string,
        created_at: string,
        updated_at: string,
    }[]
}

const Blog: FC<BlogProps> = ({ }) => {
    const { data, isLoading } = useAdminCustomQuery<
        BlogPost,
        BlogPostRes
    >(
        `/blog/posts/`,
        ["blog-post"],
    )
    const [newBlogOpen, setNewBlogOpen] = useState(false);

    return <div>
        <button className='bg-green-600 text-white p-2' onClick={() => setNewBlogOpen(true)}>Create New Blog</button>

        {isLoading && <span>Loading ...</span>}

        {newBlogOpen && <NewBlog onClose={setNewBlogOpen} />}

        {data && data.posts.map((post, index) => (
            <div key={post.id} className='mt-4'>
                <span>Post{index + 1}</span>
                <BlogCard  blog={post} id={post.id} />
            </div>
        ))
        }
    </div>

}

export const config: WidgetConfig = {
    zone: [
        "product.list.before",
        "product.details.before",
        "order.list.before",
        "order.details.before",
    ],
};

export default Blog