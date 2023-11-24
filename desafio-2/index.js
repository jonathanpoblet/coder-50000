const fs = require('fs').promises;

class ProductManager {
    #path
    #products

    constructor(path) {
        this.#path = path;
        this.#products = [];
    }

    async getProducts() {
        try {
            const file = await fs.readFile(this.#path, 'utf-8');
            this.#products = JSON.parse(file); 
            return this.#products;            
        } catch (error) {
            console.log(`Error al mostrar los productos, ${error}`);
        }
    }

    async addProduct({ title, description, price, thumbnail , code, stock }) {
        try {
            if(!title || !description || !price || !thumbnail || !code || !stock) return console.log('Faltan datos');
                
            await this.getProducts();

            const newProduct = { 
                title, 
                description, 
                price, 
                thumbnail,
                code,
                stock,
                id: this.#products.length === 0 ? 1 : this.#products[this.#products.length - 1].id + 1
            }
    
            this.#products.push(newProduct);
    
            return await fs.writeFile(this.#path, JSON.stringify(this.#products, null, 2));
           
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            await this.getProducts();

            const productFound = this.#products.find(prod => prod.id === id);

            if(!productFound) throw new Error(`No se encontro producto con id : ${id}`);
            
            return productFound;
            
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, updatedProduct ) {
        try {
            await this.getProducts();

            const keys = ["title", "description", "price", "thumbnail", "code", "stock",];

            if(updatedProduct.id) throw new Error('No se puede modificar el id de un producto');

            const otherKeys = Object.keys(updatedProduct).filter(key => !keys.includes(key));

            if (otherKeys.length > 0) {
                throw new Error(`El producto no cuenta con la clave: ${otherKeys.join(', ')}`);
            }

            const indexFound = this.#products.findIndex(prod => prod.id === id);

            if(indexFound === -1) throw new Error(`No se encontro producto con id : ${id}`);

            this.#products[indexFound] = { ...this.#products[indexFound], ...updatedProduct };

            return await fs.writeFile(this.#path, JSON.stringify(this.#products, null, 2));
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {
        try {
            await this.getProducts();

            if(!this.#products.find(prod => prod.id === id)) throw new Error(`No se encontro producto con id : ${id}`);

            const productsFilter = this.#products.filter((product) => product.id != id);

            return await fs.writeFile(this.#path, JSON.stringify(productsFilter, null, 2));

        } catch (error) {
            console.log(error);
        }
    }
}

async function testing () {
    const productManager = new ProductManager('products.json');

    // console.log(await productManager.getProducts());

    // await productManager.addProduct({ 
    //     title: 'producto prueba', 
    //     description:'Este es un producto prueba', 
    //     price:200,
    //     thumbnail:'in imagen', 
    //     code:'abc123', 
    //     stock: 25 
    // });

    // console.log(await productManager.getProducts());


    // const productFound = await productManager.getProductById(1);
    // console.log(productFound);

    // await productManager.updateProduct(2, { stock: 22222222, title: 'Prueba' });
    // await productManager.updateProduct(3, { stock: 22222222, title: 'Prueba', id: 10 });


    // await productManager.deleteProduct(2);
}

testing();


