import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import { Blog } from "src/models/blog.entity"

export const BlogRepository = dataSource
    .getRepository(Blog)
    .extend({
        customMethod(): void {
            // TODO add custom implementation
            return
        },
    })

export default BlogRepository