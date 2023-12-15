const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.productsFile = './src/json/products.json';
  }

  async addProduct(newProduct) {
    try {
      const data = await fs.readFile(this.productsFile, 'utf-8');
      const products = JSON.parse(data);
      products.push(newProduct);
      console.log(products);
      await fs.writeFile(this.productsFile, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      throw new Error('Error adding product');
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      const allProducts = await this.loadProducts();
      const productIndex = allProducts.findIndex(p => p.id === productId);
  
      if (productIndex !== -1) {
        allProducts[productIndex] = { ...allProducts[productIndex], ...updatedProduct };
        await fs.writeFile(this.productsFile, JSON.stringify(allProducts, null, 2));
        return allProducts[productIndex];
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error('Error updating product');
    }
  }
  
  async deleteProduct(productId) {
    try {
      const allProducts = await this.loadProducts();
      const updatedProducts = allProducts.filter(p => p.id !== productId);
  
      if (allProducts.length !== updatedProducts.length) {
        await fs.writeFile(this.productsFile, JSON.stringify(updatedProducts, null, 2));
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error('Error deleting product');
    }
  }

  async getProducts(limit) {
    const allProducts = await this.loadProducts();
    return limit ? allProducts.slice(0, limit) : allProducts;
  }

  async getProductById(productId) {
    const allProducts = await this.loadProducts();
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.productsFile, 'utf-8');
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      throw new Error('Error loading products');
    }
  }
}

module.exports = ProductManager;
