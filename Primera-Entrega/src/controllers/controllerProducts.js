import { ProductManager } from "../class/ProductManager.js";

const productManager = new ProductManager('./src/products.json');

export async function controllerGetProducts(req, res) {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        console.log(error)
    }
}