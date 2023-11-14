class ProductManager {
    id = 1;

    constructor() {
        this.products = [];
    }

    addProduct(title,description,price,thumbnail,code,stock) {

        if(!title || !description || !price || !thumbnail || !code || !stock) return console.log('Todos los campos son obligatorios');

        const productFound = this.products.find(prod => prod.code === code );
        if(productFound) return console.error('Ya existe un producto con ese codigo');

        
        const newProduct = { title,description,price,thumbnail,code,stock, id: this.id++ };

        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const productFound = this.products.find(product => product.id === id);
        
        if(productFound) return productFound;
        else console.error('Not found');
        
    }
}


const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(productManager.getProducts());

productManager.addProduct('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(productManager.getProductById(2));
console.log(productManager.getProductById(1));



