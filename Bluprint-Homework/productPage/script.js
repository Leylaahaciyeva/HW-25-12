"use strict";

const productName=document.getElementById("productName")
const productCategory=document.getElementById("productCategory")
const productPrice=document.getElementById("productPrice")
const productImage=document.getElementById("productImage")
const productColor=document.getElementById("productColor")

const {color,name,image,price,category}=JSON.parse(localStorage.getItem("product"));

const pName=name.split(" ").map((name)=>name[0].toUpperCase() + name.slice(1)).join(" ")

productName.textContent= pName;
productCategory.textContent=category;
productPrice.textContent=`${price} AZN`
productImage.src=image;
productColor.classList.add(`bg-${color}-500`)
