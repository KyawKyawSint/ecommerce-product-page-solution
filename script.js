const ulTag = document.querySelector("ul");
const sliderTag = document.querySelector(".slider");
const galleryTag = document.querySelectorAll(".thumbnailImage");
const minusTag = document.querySelector(".minusSign");
const plusTag = document.querySelector(".plusSign");
const countNumberTag = document.querySelector(".countNumber");
const cartBtn = document.querySelector(".cartImage");
const addToCartBtn = document.querySelector(".cartButton");
const cartContent = document.querySelector(".cartContent");
const notiNumberTag = document.querySelector(".notiNumber");
let emptyCartBtn;

const tabs = ["Collection", "Men", "Women", "About", "Contact"];

// getting clicked tab menu width, change the slider width, transform to select tab menu position
const handleTabChange = (event) => {
    const clickedTabId = event.target.id;
    const clickedLiTag = document.getElementById(clickedTabId);
    const clickedLiTagWidth = clickedLiTag.offsetWidth;
    const clickedLiTagOffsetLeft = clickedLiTag.offsetLeft;
    sliderTag.style.width = clickedLiTagWidth + "px";
    sliderTag.style.transform = `translateX(${clickedLiTagOffsetLeft}px)`;
    sliderTag.style.display = "block";
};

// creating menu by looping tabs array and create id
for(let i=0; i<tabs.length; i++) {
    const liTag = document.createElement("li");
    liTag.classList.add("textMenu");
    liTag.append(tabs[i]);
    liTag.id = i;
        
    // if user click tab menu, change the slider width
    liTag.addEventListener("click", handleTabChange);
    ulTag.append(liTag);
    if (i === 0) {
        sliderTag.style.width = liTag.offsetWidth + "px";                       
    };   
};

// Creating lightbox

const lightBoxTag = document.createElement("div");
lightBoxTag.classList.add("lightBox");
document.body.appendChild(lightBoxTag);

for (let i=0; i<galleryTag.length; i++) {
    let currentImageIndex = i;            
    
    galleryTag[i].addEventListener ("click", () => {            
        console.log(i);       

        lightBoxTag.classList.add("activeLightbox");
        
        const lightBoxImageContainerTag = document.createElement("div");
        lightBoxImageContainerTag.classList.add("lightBoxImageContainer")        

        const imgTag = document.createElement("img");
        let currentImageSrc = galleryTag[currentImageIndex].src;                
        imgTag.src = currentImageSrc;        
        imgTag.classList.add("lightBoxImage");
                
        const closeImageTag = document.createElement("img");
        closeImageTag.src = "./images/icon-close.svg";
        closeImageTag.classList.add("closeImage");

        closeImageTag.addEventListener("click", () => {            
            lightBoxTag.classList.remove("activeLightbox");
        })

        const previousImageTag = document.createElement("img");
        previousImageTag.src = "./images/icon-previous.svg";
        previousImageTag.classList.add("previousImage");

        previousImageTag.addEventListener("click", () => {                        
            if (currentImageIndex == 0) {
                console.log(currentImageIndex);
                return;
            }else {
                currentImageIndex -- ;
                currentImageSrc = galleryTag[currentImageIndex].src;
                console.log(currentImageIndex);
                imgTag.src = currentImageSrc;
            }
        })

        const nextImageTag = document.createElement("img");
        nextImageTag.src = "./images/icon-next.svg";
        nextImageTag.classList.add("nextImage");
        
        nextImageTag.addEventListener("click", () => {                        
            if (currentImageIndex >= galleryTag.length-1) {
                console.log(currentImageIndex);
                return;
            }else {
                currentImageIndex ++ ;
                currentImageSrc = galleryTag[currentImageIndex].src;
                console.log(currentImageIndex);
                imgTag.src = currentImageSrc;
            }
        })

        while (lightBoxTag.firstChild) {
            lightBoxTag.removeChild(lightBoxTag.firstChild)
        };

        lightBoxImageContainerTag.appendChild(imgTag);
        lightBoxImageContainerTag.appendChild(closeImageTag);
        lightBoxImageContainerTag.appendChild(previousImageTag);
        lightBoxImageContainerTag.appendChild(nextImageTag);                
        lightBoxTag.appendChild(lightBoxImageContainerTag);                
    });
}

// Increase Quantity Input Value When Click on plus Icon
plusTag.addEventListener("click", () => {    
    incQty();
});
// Decrease Quantity Input Value When Click on Minus Icon
minusTag.addEventListener("click", () => {    
    decQty();
});

const incQty = () => {
    countNumberTag.value++;
};

const decQty = () => {
    if(countNumberTag.value <= 0) {
        return;
    }else {
        countNumberTag.value--;
    }
};

/*
const cartContent = document.querySelector(".cartContent");
cartContent.classList.add("cartContentVisible");
*/

// Show Cart Content When Click on Cart Icon

cartBtn.addEventListener("click", () => {
    const cartIconClick = cartContent.classList.contains("cartContentVisible");
    if (cartIconClick)  {
        cartContent.classList.remove("cartContentVisible")        
    }else {
        const cartContent = document.querySelector(".cartContent");
        cartContent.classList.add("cartContentVisible");                
    }       
});

/** Cart Processing **/
// Add Selected Product data when Click on button && check if button is there
addToCartBtn.addEventListener("click", () => {
    addToCart();    
});

// Remove Product data From Cart when click on Bin Icon
if(emptyCartBtn){emptyCartBtn.addEventListener("click", emptyCart)};

const addToCart = () => {
    // Declare cart icon
    const cartIcon = document.querySelector(".cartImage");
    // Create Span
    const qtyDom = document.createElement("span");
    // Get User Input Value
    const qtyValue = Number(countNumberTag.value);
    if(typeof qtyValue === "number" && qtyValue > 0){
        // Add Quantity Number to Span
        qtyDom.innerHTML = qtyValue;
        if(cartIcon.contains(cartIcon.querySelector("span"))){
            console.log("it contains");
            Array.from(cartIcon.querySelectorAll("span")).map((e)=>{
                e.remove();
            });
        }
        
        // Create Notification
        const totalItemOrder = qtyValue;
        notiNumberTag.innerHTML = totalItemOrder;
        notiNumberTag.style.display = "block";
        // Add Quantity Span to Dom
        cartIcon.appendChild(qtyDom);
        // Add Product to Cart
        cartContent.innerHTML = `
        <h3 class="cartContentHeading">Cart</h3>
        <div class="cartContentFull">
            <div class="cartContentProduct">
                <div class="cartContentProdImg"><img src="images/image-product-1-thumbnail.jpg" alt="Product"></div>
                <div class="cartContentProdText">
                    <h6>Fall Limited Edition Sneakers</h6>
                    <div class="cartContentProdPrice">$125.00 * ${qtyValue} <span>$${125.00 * qtyValue}</span></div>
                </div>
                <div class="cartContentBinIcon">
                    <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill-rule="nonzero" xlink:href="#a"/></svg>
                </div>
            </div>
            <button class="cartContentBtn">Checkout</button>
        </div>`;
        emptyCartBtn    = document.querySelector(".cartContentBinIcon");
        if(emptyCartBtn) {
            emptyCartBtn.addEventListener("click", () => {
                emptyCart();
                notiNumberTag.style.display = "none";
            })
        };
    }else{
        alert(`You can't Buy ${countNumberTag.value} Products`);
    }
}

const emptyCart = () => {
    // Declare cart icon
    const cartIcon = document.querySelector(".cartImage");
    /** Empty Cart Icon **/
    // check if cart icon contains Quantity span
    if(cartIcon.contains(cartIcon.querySelector("span"))){
        console.log("it contains");
        // Loop through All of Quantity Span elements
        Array.from(cartIcon.querySelectorAll("span")).map((e)=>{
            // Remove Span Element
            e.remove();
        });
    }
    cartContent.innerHTML = `
        <h3 class="cartContentHeading">Cart</h3>
        <div class="cartContentEmpty">
            Your cart is empty.
        </div>
    `;
}
