const categoriesBlock = document.querySelector(".categories_block");
const productsBlockCategories = document.querySelector(".categories_products_block");
const productsBlock = document.querySelector(".products_block");
const createCategoriesBtn = document.querySelector("#create_categories_btn")
const createProductsBtn = document.querySelector("#create_products_btn")

const BASE_URL = "http://localhost:8080";
const loadData = async () => {
    const responseCategories = await fetch(BASE_URL + "/categories");
    const responseProducts = await fetch(BASE_URL + "/products");
    const categories = await responseCategories.json();
    const products = await responseProducts.json();

    categoriesBlock.innerHTML = "";
    productsBlock.innerHTML = "";
    productsBlockCategories.innerHTML = "";


    for (const c of categories) {
        categoriesBlock.innerHTML += `
            <p>
                ${c.name} 
                <button onclick="deleteCategories(${c.id})">Delete</button>
            </p>
        `;
    }
    for (const p of categories) {
        
        productsBlockCategories.innerHTML += `
        
       <input type="checkbox"> <p class="checkbox">${p.name}</p>
            
        `;
    }

    for (const p of products) {
        
        productsBlock.innerHTML += `
            <p>
                ${p.name} <br>
                ${p.price} <br>
                
                <button onclick="deleteProducts(${p.id})">Delete</button>
            </p>
        `;
    }
};
loadData();

createCategoriesBtn.addEventListener("click", () => {
    const newCategoriesName = document.querySelector("#new_categories_name").value;
    const payload = {
        name: newCategoriesName,
    };
    fetch(BASE_URL + "/categories", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
    })
        .then(() => loadData())
        .catch(() => alert("categories create error"));
});



createProductsBtn.addEventListener("click", () => {
    const newProductsName = document.querySelector("#new_products_name").value;
    const newProductsPrice = document.querySelector("#new_products_price").value;
    const checkboxCategory = document.querySelector(".checkbox");
    
    const payload = {
        name: newProductsName,
        price: newProductsPrice,
        categoryId: checkboxCategory.textContent,
    };
    fetch(BASE_URL + "/products", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
    })
        .then(() => loadData())
        .catch(() => alert("products create error"));
})

const deleteCategories = id => {
    fetch(BASE_URL + "/categories/" + id, { method: "delete" })
        .then(() => loadData())
        .catch(() => alert("categories delete error"));
}
const deleteProducts = id => {
    fetch(BASE_URL + "/products/" + id, { method: "delete" })
        .then(() => loadData())
        .catch(() => alert("products delete error"));
}

















