import { Router } from "express";
import cors from "cors";
import { ConfigModule, authenticate, wrapHandler } from "@medusajs/medusa"
import BlogService from "src/services/blog";
import bodyParser from "body-parser";
import { BlogDto } from "src/types/blog.interface";

export default function blogRoutes(router: Router, options: ConfigModule) {
  const { projectConfig } = options

  const corsOptions = {
    origin: projectConfig.admin_cors.split(","),
    credentials: true,
  }

  const blogRouter = Router()

  router.use("/admin/blog", blogRouter, bodyParser.json())

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

      const data: BlogDto = {
        title: req.body.title,
        content: req.body.content
      }

      const post = await blogService.createPost(data)

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
      
      if (!req.body.title || !req.body.content) {
        throw new Error("`title` and `content` are required.")
      }

      const data: BlogDto = {
        title: req.body.title,
        content: req.body.content
      }

      const post = await blogService.updatePost(
        req.params.id,
        data
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


