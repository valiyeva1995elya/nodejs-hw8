const express = require("express");
const { json } = require("express/lib/response");
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    res.send(fs.readFileSync("./routers/categories.json", { encoding: "utf-8" }));
});
router.get("/:id", (req, res) => {
    const id = +req.params.id;
    const categoriesArray = JSON.parse(fs.readFileSync("./routers/categories.json", { encoding: "utf-8" }));
    const categories = categoriesArray.find(categories => categories.id === id);
    res.send(categories);
});
router.post("/", (req, res) => {
    const categoriesArray = JSON.parse(fs.readFileSync("./routers/categories.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/categories.json", JSON.stringify([...categoriesArray, { id: categoriesArray[categoriesArray.length-1].id + 1 || 1, name: req.body.name }]));
    res.send("categories added");
});
router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const categoriesArray = JSON.parse(fs.readFileSync("./routers/categories.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/categories.json", JSON.stringify(categoriesArray.filter(categories => categories.id !== id)))
    res.send("categories deleted");
});


module.exports = router;