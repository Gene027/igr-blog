import { FC, useState} from 'react'
import { BlogPost } from '../../widgets/blog/blog';
import { useAdminCustomPost } from "medusa-react"

interface NewBlogProps {
    onClose: (arg: boolean) => void;
}

const NewBlog: FC<NewBlogProps> = ({ onClose }) => {
    const initialForm: BlogPost = {
        title: '',
        content: ''
    }
    const [formData, setFormdata] = useState(initialForm)

    const handleChange = (e)=> {
        setFormdata( prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const { mutate, isLoading } = useAdminCustomPost<
    BlogPost,
    BlogPost
  >(
    `/blog/posts`,
    ["blog-posts"]
   )

    const handleSubmit= (data: BlogPost)=>{
        return mutate(data, {
            onSuccess: (data) => {
              window.location.reload()
            },
          })
    }

    return <div>
        <div onClick={() => onClose(false)}>overlay</div>
        <div>
            <input type="text" name='title' onChange={handleChange} value={formData.title}/>
            <input type="text" name='content' onChange={handleChange} value={formData.content}/>
            <button onClick={()=>handleSubmit(formData)}>Submit</button>
        </div>
    </div>
}

export default NewBlog