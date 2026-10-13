import { Router } from "express";
import { getAllBooksController, registerBooksController } from "../controllers/book.controller.js";

export const bookRouter = Router();

bookRouter.post("/register", registerBooksController);
bookRouter.get("/all", getAllBooksController);