import { Router } from "express";
import { getProducts, getProductsById } from "../controllers/products";

const router = Router();

// /api/products
router.get("/", getProducts)

// /api/products/1
router.get("/:id", getProductsById)

export default router;
