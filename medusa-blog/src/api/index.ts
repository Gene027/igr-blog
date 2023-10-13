import express, { Router } from "express"
import blogRoutes from "./routes/blogRoutes"
import { errorHandler } from "@medusajs/medusa"

export default (rootDirectory, options) => {
  const router = Router()

  router.use(express.json())
  router.use(express.urlencoded({ extended: true }))

  blogRoutes(router, options)

  router.use(errorHandler())

  return router
}