const express = require("express");
const bodYPaser = require("body-parser");
const categoriesRouter = require("./routers/categoriesRouter");
const productsRouter = require("./routers/productsRouter");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodYPaser.json()); //post
app.use(bodYPaser.urlencoded({extended: false})); //get
 
//
app.use("/categories", (req, res, next) => {
    console.log("Middleware");
    next();
})

app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

app.listen(8080);