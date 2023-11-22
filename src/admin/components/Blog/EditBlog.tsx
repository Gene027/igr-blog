import { FC, useState } from 'react'
import { Blog, BlogPost, BlogPostRes } from '../../routes/blog/page';
import { useAdminCustomPost } from "medusa-react"
import { AiOutlineClose } from 'react-icons/ai'

interface NewBlogProps {
    toast: any;
    handleClose?: () => void;
    blog: Blog
}

const EditBlog: FC<NewBlogProps> = ({ toast, handleClose, blog }) => {
    const initialForm: BlogPost = {
        title: blog.title,
        content: blog.content
    }
    const [formData, setFormdata] = useState(initialForm)

    const handleChange = (e) => {
        setFormdata(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const { mutate, isLoading } = useAdminCustomPost<
        BlogPost,
        BlogPostRes
    >(
        `/blog/posts/${blog.id}`,
        ["blog-posts-id"]
    )

    const handleSubmit = (data: BlogPost) => {
        return mutate(data, {
            onSuccess: (data) => {
                toast.success("Success", `Post ${formData.title} was updated successfully`);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            },
        })
    }

    return (
        <div className='flex flex-col gap-12 px-[32px] py-[24px] w-full'>
            <div className='flex justify-between'>
                <div className='text-[#111827] text-xl font-semibold'>Create New Blog</div>
                {handleClose && <AiOutlineClose size={20} cursor={'pointer'} onClick={handleClose} />}
            </div>

            <div className='flex flex-col gap-7'>
                <div className='flex flex-col gap-2'>
                    <div className='text-[#6B7280] text-xs font-semibold'>Title</div>
                    <input type="text" name='title' onChange={handleChange} value={formData.title} placeholder='title' className='flex items-center py-2 px-4 rounded-lg border border-solid border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] text-sm' />
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='text-[#6B7280] text-xs font-semibold'>Content</div>
                    <textarea name='content' onChange={handleChange} value={formData.content} placeholder='content' className='flex items-center py-2 px-4 rounded-lg border border-solid border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] text-sm'/>
                </div>

             

                <button className='flex py-[6px] px-3 items-center w-fit rounded-lg border border-solid border-[#E5E7EB] bg-white disabled:bg-[#9CA3AF] text-[#111827] text-sm font-medium' onClick={() => handleSubmit(formData)}
                disabled={!formData.content || !formData.title}>Save and close</button>
            </div>
        </div>
    )

}

export default EditBlog