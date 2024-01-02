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

const sizeListElement=document.querySelectorAll("#sizeList li")
const sizeListDatas=[...sizeListElement].map((item)=>item.dataset.size);
const sizeListBtnElemnts=document.querySelectorAll("#sizeList li button")

let count=1;
let selectedSize;
const cartItems=[];

const {color,name,image,price,category,sizes}=JSON.parse(localStorage.getItem("product"));

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
   cartItems=JSON.parse(localStorage.getItem("cartItems"))

   if(!selectedSize){
    alert("You must select a size")
    return;
   }

    const addedProduct={
        name:pName,
        price:price,
        category:category,
        color:color,
        image:image,
        count:count,
        size:selectedSize,
    }
    if(!cartItems){
        cartItems=[addedProduct];
    }
    else{
        const exisitingProduct =cartItems.find((cartItem)=>cartItem.name===pName && cartItem.size===selectedSize);
        const exisitingProductIndex =cartItems.findIndex((cartItem)=>cartItem.name===pName && cartItem.size===selectedSize);

        if (exisitingProduct && exisitingProductIndex !==undefined) {
            cartItems.splice(exisitingProductIndex,1)

            exisitingProduct.count+=count;
            cartItems.push(exisitingProduct);
        }
        else{
            cartItems.push(addedProduct)
        }
    }
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
})

sizeListDatas.forEach((size,index)=>{
    if (!sizes.includes(size)) {
        sizeListElement[index].classList.add("opacity-40")
        sizeListBtnElemnts[index].classList.add("cursor-not-allowed")
        sizeListBtnElemnts[index].setAttribute("disabled",true)
    }

    sizeListElement[index].addEventListener("click",(event)=>{
       selectedSize=size;
       
       for (let i = 0; i < sizeListBtnElemnts.length; i++) {
          sizeListBtnElemnts[i].classList.remove("bg-black","text-white")        
       }
       event.target.classList.add("bg-black","text-white")
    })
})