import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import { Blog } from "../models/blog"


export const BlogRepository = dataSource
    .getRepository(Blog)
    .extend({
        customMethod(): void {
            // TODO add custom implementation
            return
        },
    })

export default BlogRepository