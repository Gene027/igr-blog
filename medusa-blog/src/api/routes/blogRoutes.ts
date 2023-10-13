import { Router } from "express";
import { EntityManager } from "typeorm";
import { Blog } from "src/models/blog.entity";
import cors from "cors";
import { ConfigModule, authenticate, wrapHandler } from "@medusajs/medusa"
import BlogService from "src/services/blog";


export default function blogRoutes(router: Router, options: ConfigModule) {
  const { projectConfig } = options

  const corsOptions = {
    origin: projectConfig.admin_cors.split(","),
    credentials: true,
  }

  const blogRouter = Router()

  router.use("/admin/blog", blogRouter)

  blogRouter.use(cors(corsOptions))
  blogRouter.use(authenticate())

  // Create a new blog post
  blogRouter.post(
    "/posts",
    wrapHandler(async (req, res) => {
      const blogService: BlogService = req.scope.resolve(
        "blogService"
      )

      // basic validation of request body
      if (!req.body.title || !req.body.content) {
        throw new Error("`title` and `content` are required.")
      }

      const post = await blogService.createPost(req.body)

      res.json({
        post,
      })
  }))

  // Get a list of blog posts
  blogRouter.get(
    "/posts",
    wrapHandler(async (req, res) => {
      const blogService: BlogService = req.scope.resolve(
        "blogService"
      )

      res.json({
        posts: await blogService.listAllPosts(),
      })
  }))


  // Update a blog post
  blogRouter.post(
    "/posts/:id",
    wrapHandler(async (req, res) => {
      const blogService: BlogService = req.scope.resolve(
        "blogService"
      )

      // basic validation of request body
      if (req.body.id) {
        throw new Error("Can't update post ID")
      }

      const post = await blogService.updatePost(
        req.params.id,
        req.body
      )

      res.json({
        post,
      })
  }))

  // Delete a blog post
  blogRouter.delete(
    "/posts/:id",
    wrapHandler(async (req, res) => {
      const blogService: BlogService = req.scope.resolve(
        "blogService"
      )

      await blogService.deletePost (req.params.id)

      res.status(200).end()
  }))

  return router
}


