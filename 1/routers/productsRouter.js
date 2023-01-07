const express = require("express");
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    console.log("products router");
    res.send(fs.readFileSync("./routers/products.json", { encoding: "utf-8" }));
});
router.get("/:id", (req, res) => {
    const id = +req.params.id;
    const productsArray = JSON.parse(fs.readFileSync("./routers/products.json", { encoding: "utf-8" }));
    const products = productsArray.find(products => products.id === id);
    res.send(products);
});
router.get("/categories/:id", (req, res) => {

    const id = +req.params.id;
    const categoriesArray = JSON.parse(fs.readFileSync("./routers/categories.json", { encoding: "utf-8" }));
    const categories = categoriesArray.find(categories => categories.id === id);
    const productsArray = JSON.parse(fs.readFileSync("./routers/products.json", { encoding: "utf-8" }));
    const products = productsArray.filter(products => products.categoryId === categories.name);
    res.send(products);

    
});
router.post("/", (req, res) => {
    const productsArray = JSON.parse(fs.readFileSync("./routers/products.json", { encoding: "utf-8" }));

    fs.writeFileSync("./routers/products.json", JSON.stringify([...productsArray, { id: productsArray[productsArray.length -1].id + 1 || 1, name: req.body.name, categoryId: req.body.categoryId  }]));
    res.send("products added");
});

router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const productsArray = JSON.parse(fs.readFileSync("./routers/products.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/products.json", JSON.stringify(productsArray.filter(products => products.id !== id)))
    res.send("products deleted");
});

module.exports = router;