import express from 'express';
import { routerProducts } from './routers/routerProducts.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api/products", routerProducts);


app.listen(8080, () => {
    console.log(`Server listening on port ${ PORT }`)
})