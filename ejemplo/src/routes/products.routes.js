const express = require('express');
const { controllerGetProducts,
        controllerGetProductById,
        controllerAddProduct,
        controllerUpdateProduct, 
        controllerDeleteProduct 
} = require('../controllers/productsController');

const productRouter = express.Router();

productRouter.get('/', controllerGetProducts);
productRouter.get('/:pid', controllerGetProductById);
productRouter.post('/', controllerAddProduct);
productRouter.put('/:pid', controllerUpdateProduct);
productRouter.delete('/:pid', controllerDeleteProduct);


module.exports = productRouter;