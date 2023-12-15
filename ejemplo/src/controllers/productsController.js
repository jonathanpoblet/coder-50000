const ProductManager  = require('../class/productmanager');

const productManager = new ProductManager

async function controllerGetProducts(req, res) {
    try {
      const limit = req.query.limit;
      const products = await productManager.getProducts(limit);
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

async function controllerGetProductById(req, res) {
    try {
      const productId = req.params.pid;
      const product = await productManager.getProductById(productId);
      res.json({ product });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
}

async function controllerAddProduct(req, res) {
    try {
      const newProduct = req.body;
      const product = await productManager.addProduct(newProduct);
      res.json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

async function controllerUpdateProduct(req, res) {
    try {
      const productId = req.params.pid;
      const updatedProduct = req.body;
      const product = await productManager.updateProduct(productId, updatedProduct);
      res.json({ product });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
}

async function controllerDeleteProduct(req, res) {
    try {
      const productId = req.params.pid;
      await productManager.deleteProduct(productId);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
}

module.exports =  { controllerGetProducts, controllerGetProductById , controllerAddProduct, controllerUpdateProduct, controllerDeleteProduct } 