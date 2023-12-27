"use strict";

const productName=document.getElementById("productName")
const productCategory=document.getElementById("productCategory")
const productPrice=document.getElementById("productPrice")
const productImage=document.getElementById("productImage")
const productColor=document.getElementById("productColor")

const decreaseBtn=document.getElementById("decrease")
const increaseBtn=document.getElementById("increase")

const counterElement=document.getElementById("counter")

const addToCartBtn=document.getElementById("addToCart")

let count=1;
const cartItems=[];

const {color,name,image,price,category}=JSON.parse(localStorage.getItem("product"));

const pName=name.split(" ").map((name)=>name[0].toUpperCase() + name.slice(1)).join(" ")

productName.textContent= pName;
productCategory.textContent=category;
productPrice.textContent=`${price} AZN`
productImage.src=image;
productColor.classList.add(`bg-${color}-500`)

decreaseBtn.addEventListener("click",()=>{
    if(count>1){
        count--;
    }
    counterElement.value=count;
})
increaseBtn.addEventListener("click",()=>{
    if(count<10){
        count++;
    }
    counterElement.value=count;
})

addToCartBtn.addEventListener("click",()=>{
    const fetchedCartItems=JSON.parse(localStorage.getItem("cartItems"))

    const addedProduct={
        name:pName,
        price:price,
        category:category,
        color:color,
        image:image,
        count:count,
    }
    if(!fetchedCartItems){
        cartItems.push(addedProduct);
    }
    else{
        cartItems.push(...fetchedCartItems,addedProduct)
    }
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
})