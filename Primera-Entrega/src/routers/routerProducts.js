import { Router } from "express";
import { controllerGetProducts } from "../controllers/controllerProducts.js";

export const routerProducts = Router();

routerProducts.get("/", controllerGetProducts);
