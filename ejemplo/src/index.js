const express = require('express');
const productRouter = require('./routes/products.routes');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api/products", productRouter);

app.listen(8080, () => {
    console.log(`Server listening on port ${ PORT }`)
})