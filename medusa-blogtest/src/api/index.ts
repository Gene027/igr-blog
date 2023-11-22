import express, { Router } from "express"
import { errorHandler } from "@medusajs/medusa"
import blogRoutes from "./routes/blogRoutes"

export default (rootDirectory, options) => {
  const router = Router()

  router.use(express.json())
  router.use(express.urlencoded({ extended: true }))

  blogRoutes(router, options)

  router.use(errorHandler())

  return router
}