/*=========================================
ASALAT AL FAKHAR
MAIN.JS
PART 1
=========================================*/

"use strict";

/*=========================
PRELOADER
=========================*/

window.addEventListener("load", () => {

const preloader =
document.getElementById("preloader");

if(preloader){

setTimeout(()=>{

preloader.style.opacity="0";

preloader.style.visibility="hidden";

setTimeout(()=>{

preloader.remove();

},800);

},800);

}

});

/*=========================
HEADER
=========================*/

const header =
document.getElementById("header");

window.addEventListener("scroll",()=>{

if(!header) return;

if(window.scrollY>70){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});

/*=========================
MOBILE MENU
=========================*/

const mobileBtn =
document.getElementById("mobileMenuBtn");

const mobileMenu =
document.getElementById("mobileMenu");

mobileBtn?.addEventListener("click",()=>{

mobileMenu?.classList.toggle("active");

});

/*=========================
DARK MODE
=========================*/

const themeBtn =
document.getElementById("themeBtn");

const savedTheme =
localStorage.getItem("theme");

if(savedTheme==="dark"){

document.body.classList.add("dark");

}

themeBtn?.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"theme",

document.body.classList.contains("dark")
?"dark"
:"light"

);

});

/*=========================
LOCAL STORAGE
=========================*/

let cart =
JSON.parse(
localStorage.getItem("cart")
)||[];

let favorites =
JSON.parse(
localStorage.getItem("favorites")
)||[];

/*=========================
COUNTERS
=========================*/

function updateCounters(){

const cartCount =
document.getElementById("cart-count");

const favoritesCount =
document.getElementById("favorites-count");

if(cartCount){

cartCount.textContent=
cart.length;

}

if(favoritesCount){

favoritesCount.textContent=
favorites.length;

}

}

updateCounters();
/*=========================
SAVE DATA
=========================*/

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCounters();

}

function saveFavorites(){

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

updateCounters();

}

/*=========================
TOAST
=========================*/

function showToast(message){

const toast =
document.createElement("div");

toast.className =
"custom-toast";

toast.textContent =
message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},500);

},2500);

}

/*=========================
ADD TO CART
=========================*/

function addToCart(product){

const item =
cart.find(p=>p.id===product.id);

if(item){

item.quantity++;

}else{

cart.push({

...product,

quantity:1

});

}

saveCart();

showToast("تمت إضافة المنتج إلى السلة");

}

/*=========================
FAVORITES
=========================*/

function addToFavorites(product){

const exists =
favorites.find(p=>p.id===product.id);

if(exists){

showToast("المنتج موجود بالمفضلة");

return;

}

favorites.push(product);

saveFavorites();

showToast("تمت إضافته للمفضلة");

}

function removeFavorite(id){

favorites =
favorites.filter(
p=>p.id!==id
);

saveFavorites();

}

function removeCartItem(id){

cart =
cart.filter(
p=>p.id!==id
);

saveCart();

}

/*=========================
GLOBAL
=========================*/

window.addToCart =
addToCart;

window.addToFavorites =
addToFavorites;

window.removeFavorite =
removeFavorite;

window.removeCartItem =
removeCartItem;
/*=========================
SEARCH
=========================*/

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",()=>{

const value =
searchInput.value
.toLowerCase()
.trim();

document
.querySelectorAll(".product-card")
.forEach(card=>{

const title =
card.querySelector("h3")
?.textContent
.toLowerCase() || "";

card.style.display =
title.includes(value)
? ""
: "none";

});

});

}

/*=========================
LANGUAGES
=========================*/

const languageBtn =
document.getElementById("languageBtn");

const languageMenu =
document.getElementById("languageMenu");

languageBtn?.addEventListener("click",(e)=>{

e.stopPropagation();

languageMenu?.classList.toggle("show");

});

document
.querySelectorAll(
"#languageMenu [data-language]"
)
.forEach(button=>{

button.addEventListener("click",()=>{

const lang =
button.dataset.language;

if(typeof changeLanguage==="function"){

changeLanguage(lang);

}

languageMenu?.classList.remove("show");

});

});

document.addEventListener("click",(e)=>{

if(
languageMenu &&
!languageMenu.contains(e.target) &&
e.target!==languageBtn
){

languageMenu.classList.remove("show");

}

});

/*=========================
SCROLL ANIMATION
=========================*/

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:0.15

}

);

document
.querySelectorAll(
".fade-up,.zoom-in,.slide-left,.slide-right"
)
.forEach(el=>{

observer.observe(el);

});

/*=========================
WISHLIST BUTTONS
=========================*/

document
.querySelectorAll(".wishlist-btn")
.forEach(button=>{

button.addEventListener("click",()=>{

const product={

id:Number(button.dataset.id),

name:button.dataset.name,

price:Number(button.dataset.price),

image:button.dataset.image

};

addToFavorites(product);

});

});
/*=========================
ORDER MODAL
=========================*/

function openOrderModal(){

loadOrderSummary();

const modal =
document.getElementById("orderModal");

if(!modal) return;

modal.classList.add("show");

modal.style.display="flex";

document.body.style.overflow="hidden";

}

function closeOrderModal(){

const modal =
document.getElementById("orderModal");

if(!modal) return;

modal.classList.remove("show");

modal.style.display="none";

document.body.style.overflow="auto";

}

window.openOrderModal =
openOrderModal;

window.closeOrderModal =
closeOrderModal;

/*=========================
ORDER SUMMARY
=========================*/

function loadOrderSummary(){

const summary =
document.getElementById("orderSummary");

if(!summary) return;

let html="";

let total=0;

cart.forEach(item=>{

const subtotal =
(item.price||0)*
(item.quantity||1);

total+=subtotal;

html+=`

<div class="order-item">

<strong>${item.name}</strong>

<span>

${item.quantity} × ${item.price} DH

</span>

</div>

`;

});

html+=`

<hr>

<h3>

المجموع :

${total} DH

</h3>

`;

summary.innerHTML=html;

}

/*=========================
SEND WHATSAPP
=========================*/

function sendOrderWhatsApp(){

const firstName =
document.getElementById("firstName")?.value.trim();

const phone =
document.getElementById("phone")?.value.trim();

const city =
document.getElementById("city")?.value.trim();

const address =
document.getElementById("address")?.value.trim();

if(
!firstName||
!phone||
!city||
!address
){

alert("يرجى ملء جميع الحقول");

return;

}

let total=0;

let products="";

cart.forEach(item=>{

const subtotal=
(item.price||0)*
(item.quantity||1);

total+=subtotal;

products+=

`• ${item.name}
الكمية : ${item.quantity}
السعر : ${subtotal} DH

`;

});

const message=

`🛒 طلب جديد

👤 الاسم:
${firstName}

📞 الهاتف:
${phone}

🏙️ المدينة:
${city}

📍 العنوان:
${address}

---------------------

${products}

---------------------

💰 المجموع:
${total} DH`;

const whatsappNumber =
"212721205426";

window.open(

`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,

"_blank"

);

}

/*=========================
GLOBAL
=========================*/

window.sendOrderWhatsApp =
sendOrderWhatsApp;

/*=========================
END MAIN.JS
=========================*/