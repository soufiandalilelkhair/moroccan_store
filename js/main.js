/* =========================================
PART 4-A
ASALAT AL FAKHAR
MAIN JS
========================================= */

/* =========================
PRELOADER
========================= */

window.addEventListener("load", () => {

const preloader =
document.getElementById("preloader");

if(preloader){

setTimeout(() => {

preloader.style.opacity = "0";

preloader.style.visibility = "hidden";

},1000);

}

});

/* =========================
STICKY HEADER
========================= */

const header =
document.getElementById("header");

window.addEventListener("scroll",()=>{

if(window.scrollY > 80){

header?.classList.add("scrolled");

}else{

header?.classList.remove("scrolled");

}

});

/* =========================
MOBILE MENU
========================= */

const mobileBtn =
document.getElementById("mobileMenuBtn");

const mobileMenu =
document.getElementById("mobileMenu");

if(mobileBtn){

mobileBtn.addEventListener("click",()=>{

mobileMenu.classList.toggle("active");

});

}

/* =========================
DARK MODE
========================= */

const themeBtn =
document.getElementById("themeBtn");

const currentTheme =
localStorage.getItem("theme");

if(currentTheme === "dark"){

document.body.classList.add("dark");

}

themeBtn?.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem(
"theme",
"dark"
);

}else{

localStorage.setItem(
"theme",
"light"
);

}

});

/* =========================
LOCAL STORAGE
========================= */

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

let favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];

/* =========================
COUNTERS
========================= */

function updateCounters(){

const cartCount =
document.getElementById("cart-count");

const favoritesCount =
document.getElementById("favorites-count");

if(cartCount){

cartCount.textContent =
cart.length;

}

if(favoritesCount){

favoritesCount.textContent =
favorites.length;

}

}

updateCounters();

/* =========================
SAVE DATA
========================= */

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

/* =========================
ADD TO CART
========================= */

function addToCart(product){

const existing =
cart.find(
item => item.id === product.id
);

if(existing){

existing.quantity += 1;

}else{

cart.push({

...product,

quantity:1

});

}

saveCart();

showToast(
"تمت إضافة المنتج إلى السلة"
);

}

/* =========================
ADD TO FAVORITES
========================= */

function addToFavorites(product){

const exists =
favorites.find(
item => item.id === product.id
);

if(exists){

showToast(
"المنتج موجود مسبقاً"
);

return;

}

favorites.push(product);

saveFavorites();

showToast(
"تمت الإضافة للمفضلة"
);

}

/* =========================
REMOVE FAVORITE
========================= */

function removeFavorite(id){

favorites =
favorites.filter(
item => item.id !== id
);

saveFavorites();

}

/* =========================
REMOVE CART ITEM
========================= */

function removeCartItem(id){

cart =
cart.filter(
item => item.id !== id
);

saveCart();

}

/* =========================
TOAST MESSAGE
========================= */

function showToast(message){

const toast =
document.createElement("div");

toast.className =
"custom-toast";

toast.innerText =
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

/* =========================
SCROLL ANIMATIONS
========================= */

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
threshold:0.2
}

);

document
.querySelectorAll(
".fade-up,.zoom-in,.slide-left,.slide-right"
)
.forEach(el=>{

observer.observe(el);

});
/* =========================================
PART 4-B
PRODUCT SEARCH + LANGUAGE
========================================= */

/* SEARCH */

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value =
searchInput.value.toLowerCase();

document
.querySelectorAll(".product-card")
.forEach(card=>{

const title =
card.querySelector("h3")
?.textContent
.toLowerCase();

if(title.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

/* =========================================
LANGUAGES
========================================= */

let currentLanguage =
localStorage.getItem("lang") || "ar";

const translations = {

ar:{
home:"الرئيسية",
products:"المنتجات",
contact:"تواصل معنا"
},

fr:{
home:"Accueil",
products:"Produits",
contact:"Contact"
},

en:{
home:"Home",
products:"Products",
contact:"Contact"
},

es:{
home:"Inicio",
products:"Productos",
contact:"Contacto"
}

};

function setLanguage(lang){

currentLanguage = lang;

localStorage.setItem(
"lang",
lang
);

document
.documentElement
.setAttribute(
"lang",
lang
);

}

const languageBtn =
document.getElementById(
"languageBtn"
);

languageBtn?.addEventListener(
"click",
()=>{

const langs =
["ar","fr","en","es"];

let index =
langs.indexOf(
currentLanguage
);

index++;

if(index >= langs.length){

index = 0;

}

setLanguage(
langs[index]
);

showToast(
"Language: " +
langs[index].toUpperCase()
);

}
);

/* =========================================
CART TOTAL
========================================= */

function getCartTotal(){

return cart.reduce(

(total,item)=>{

return total +
(item.price || 0)
*
(item.quantity || 1);

},

0

);

}

/* =========================================
INCREASE QUANTITY
========================================= */

function increaseQuantity(id){

const item =
cart.find(
p => p.id === id
);

if(item){

item.quantity++;

saveCart();

location.reload();

}

}

/* =========================================
DECREASE QUANTITY
========================================= */

function decreaseQuantity(id){

const item =
cart.find(
p => p.id === id
);

if(!item) return;

if(item.quantity > 1){

item.quantity--;

}else{

removeCartItem(id);

}

saveCart();

location.reload();

}

/* =========================================
CLEAR CART
========================================= */

function clearCart(){

cart = [];

saveCart();

showToast(
"تم تفريغ السلة"
);

}

/* =========================================
GLOBAL EXPORT
========================================= */

window.addToCart =
addToCart;

window.addToFavorites =
addToFavorites;

window.removeFavorite =
removeFavorite;

window.removeCartItem =
removeCartItem;

window.increaseQuantity =
increaseQuantity;

window.decreaseQuantity =
decreaseQuantity;

window.clearCart =
clearCart;

/* =========================================
END MAIN.JS
========================================= */
document
.querySelectorAll(".wishlist-btn")
.forEach(button=>{

button.addEventListener("click",()=>{

const product = {

id:Number(
button.dataset.id
),

name:
button.dataset.name,

price:Number(
button.dataset.price
),

image:
button.dataset.image

};

addToFavorites(product);

});

});

/*==========================
ORDER MODAL
==========================*/

function openOrderModal(){

    loadOrderSummary();

    const modal = document.getElementById("orderModal");

    modal.style.display = "flex";

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}

function closeOrderModal(){

    const modal = document.getElementById("orderModal");

    modal.classList.remove("show");

    modal.style.display = "none";

    document.body.style.overflow = "auto";

}

/* إغلاق عند الضغط خارج النافذة */

document.addEventListener("click",function(e){

const modal=
document.getElementById("orderModal");

if(
e.target===modal
){

closeOrderModal();

}

});

/*==========================
LOAD ORDER SUMMARY
==========================*/

function loadOrderSummary(){

const cart=
JSON.parse(
localStorage.getItem("cart")
)||[];

let total=0;

let html="<h3>ملخص الطلب</h3>";

cart.forEach(item=>{

const subtotal=
item.price*
item.quantity;

total+=subtotal;

html+=`

<p>

${item.name}

×

${item.quantity}

<span style="float:left">

${subtotal} درهم

</span>

</p>

`;

});

html+=`

<hr>

<strong>

المجموع :

${total}

درهم

</strong>

`;

document
.getElementById("orderSummary")
.innerHTML=html;

}

/*==========================
SEND WHATSAPP
==========================*/

function sendOrderWhatsApp(){

const firstName=
document.getElementById("firstName").value.trim();

const phone=
document.getElementById("phone").value.trim();

const city=
document.getElementById("city").value.trim();

const address=
document.getElementById("address").value.trim();

if(
!firstName||
!phone||
!city||
!address
){

alert("يرجى ملء جميع المعلومات.");

return;

}

const cart=
JSON.parse(
localStorage.getItem("cart")
)||[];

let total=0;

let products="";

cart.forEach(item=>{

const subtotal=
item.price*
item.quantity;

total+=subtotal;

products+=

`• ${item.name}

الكمية : ${item.quantity}

السعر : ${subtotal} درهم

`;

});

const message=

`🛒 طلب جديد

👤 الاسم :

${firstName}

📞 الهاتف :

${phone}

🏙️ المدينة :

${city}

📍 العنوان :

${address}

--------------------

📦 المنتجات

${products}

--------------------

💰 المجموع :

${total} درهم`;

const whatsappNumber=
"212721205426";

window.open(

`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,

"_blank"

);

}
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("orderModal");

    if(modal){

        modal.style.display = "none";

        modal.classList.remove("show");

    }

});