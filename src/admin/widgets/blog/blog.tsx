import { WidgetConfig } from '@medusajs/admin';
import { FC, useState } from 'react'
import { useAdminCustomQuery } from "medusa-react"
import BlogCard from '../../components/Blog/BlogCard';
import NewBlog from '../../components/Blog/NewBlog';

interface BlogProps {

}

export type BlogPost = {
    title: string,
    content: string,
    id?: string
}

const Blog: FC<BlogProps> = ({ }) => {
    const { data, isLoading } = useAdminCustomQuery<
        BlogPost,
        BlogPost[]
    >(
        `/blog/posts/`,
        ["blog-post"],
    )
    const [newBlogOpen, setNewBlogOpen] = useState(false);

    return <div>
        <button onClick={()=> setNewBlogOpen(true)}>Create New Blog</button>

        {isLoading && <span>Loading ...</span>}

        {newBlogOpen && <NewBlog onClose={setNewBlogOpen}/>}

        {data && <div>
                {data.map((blog, index) => (<BlogCard key={index} blog={blog} id={blog.id}/>))}
            </div>
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