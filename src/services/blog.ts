import { FindConfig, Selector, TransactionBaseService, buildQuery } from "@medusajs/medusa";
import { BlogRepository } from "../repositories/blog";
import { MedusaError } from "@medusajs/utils"
import { Blog } from "src/models/blog";
import { BlogDto } from "src/types/blog.interface";
import { EntityManager } from "typeorm";

type InjectedDependencies = {
    manager: EntityManager;
    blogRepository: typeof BlogRepository;
};

class BlogService extends TransactionBaseService {
    protected blogRepository_: typeof BlogRepository

    constructor({ blogRepository }: InjectedDependencies) {
        super(arguments[0]);
        this.blogRepository_ = blogRepository
    }

    async createPost(
        data: BlogDto
    ): Promise<Blog> {
        return this.atomicPhase_(async (manager) => {
            const postRepo = manager.withRepository(
                this.blogRepository_
            )
            const post = postRepo.create()
            post.title = data.title
            post.content = data.content
            const result = await postRepo.save(post)

            return result
        })
    }

    async listAndCount(): Promise<[Blog[], number]> {
        const postRepo = this.activeManager_.withRepository(this.blogRepository_);
      
        const posts = await postRepo.findAndCount();
      
        return posts;
      }
    async listAllPosts() {
        const postRepo = this.activeManager_.withRepository(
            this.blogRepository_
        )

        const [posts] = await this.listAndCount();

        return posts
    }

    async getPost(
        id: string,
        config?: FindConfig<Blog>
    ): Promise<Blog> {
        const postRepo = this.activeManager_.withRepository(
            this.blogRepository_
        )

        const query = buildQuery({
            id,
        }, config)

        const post = await postRepo.findOne(query)

        if (!post) {
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                "Post was not found"
            )
        }

        return post
    }


    async updatePost(id: string, data: BlogDto) {
        return await this.atomicPhase_(async (manager) => {
            const postRepo = manager.withRepository(
                this.blogRepository_
            )
            const post = await this.getPost(id)

            Object.assign(post, data)

            return await postRepo.save(post)
        })
    }

    async deletePost(id: string) {
        return await this.atomicPhase_(async (manager) => {
            const postRepo = manager.withRepository(
                this.blogRepository_
            )
            const post: Blog = await this.getPost(id)

            await postRepo.remove([post])
        })
    }
}

export default BlogService