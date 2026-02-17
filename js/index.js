// Home page  
// cart 
let cart = [];
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}
const url = "https://fakestoreapi.com/products";

fetch(url)
    .then(res => res.json())
    .then(data => {
        // Sort by rating
        const topThree = data.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);

        const container = document.getElementById('product-container');
        container.innerHTML = '';

        topThree.forEach(product => {
            const card = document.createElement('div');

            card.className = "w-[330px] flex flex-col justify-start items-start gap-5 mx-auto border border-gray-200 rounded-xl shadow-sm p-4";

            card.innerHTML = `
        <img class="h-[300px] w-full object-contain rounded-xl " src="${product.image}" alt="${product.title}">
        <div class="flex justify-between items-center w-full text-sm my-2">
          <span class="px-2 bg-blue-100 text-blue-600 rounded-full">${product.category}</span>
          <span class="bg-yellow-100 text-yellow-700 px-2 rounded-full text-xs font-medium">
            ⭐ ${product.rating.rate} (${product.rating.count})
          </span>
        </div>
        <p class="text-base truncate w-64">${product.title}</p>
        <p class="text-sm font-bold">$${product.price}</p>
        <div class="flex justify-between mt-2">
          <button class="btn btn-details bg-white border px-2 py-1 text-xs hover:bg-black hover:text-white">Details</button>
          <button class="btn-add ml-36 btn bg-primary text-white px-2 py-1 text-xs hover:bg-blue-100 hover:text-blue-600">Add to Cart</button>
        </div>
      `;

            //   modal 
            const detailsBtn = card.querySelector(".btn-details");
            detailsBtn.addEventListener("click", () => {
                showModal(product);
            });
            // cart 
            const addBtn = card.querySelector(".btn-add");
            addBtn.addEventListener("click", () => {
                if (!cart.find(p => p.id === product.id)) {
                    cart.push(product);
                    alert("Item added to cart!");
                }
                else {
                    alert("Item already in cart!");
                }
                updateCartCount();
            });
            container.appendChild(card);

        });
    });




// All Products Page

const categoriesSelect = document.getElementById('categoriesSelect');

const categoriesUrl = "https://fakestoreapi.com/products/categories";
fetch(categoriesUrl)
    .then(res => res.json())
    .then(categories => {
       btn.addEventListener('click', () => {
    // সব button এর active style remove
    document.querySelectorAll('.category-btn').forEach(button => {
        button.classList.remove('bg-blue-600', 'text-white');
        button.classList.add('bg-blue-100', 'text-blue-700');
    });

    // clicked button এ active style add
    btn.classList.remove('bg-blue-100', 'text-blue-700');
    btn.classList.add('bg-blue-600', 'text-white');

    fetchProducts(category);
})
        //   auto select first category
        if (categories.length > 0) fetchProducts(categories[0]);
    });

function fetchProducts(category) {
    const productsUrl = `https://fakestoreapi.com/products/category/${category}`;
    fetch(productsUrl)
        .then(response => response.json())
        .then(products => renderProducts(products));
}
const productsContainer = document.getElementById('products-container');
function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = "product-card bg-white rounded-lg shadow-md overflow-hidden";
        productCard.innerHTML = `
          <div class=" w-[300px] h-[450px]flex flex-col justify-start items-start gap-5 mx-auto ">
                    <img class="h-[300px] w-full object-contain rounded-xl " src="${product.image}"
                        alt="${product.title}">
                     <div class="flex justify-between items-center w-full text-sm my-2">
                   <span class="px-2 bg-blue-100 text-blue-600 rounded-full">${product.category}</span>
          <span class="text-yellow-700 bg-yellow-100  px-2 rounded-full text-xs font-medium">
            ⭐ ${product.rating.rate} (${product.rating.count})
          </span>
        </div>

                        <p class="px-4 text-base truncate w-64 font-bold">
                            ${product.title}
                        </p>
                         <p class="px-4 text-sm">${product.description}</p>
                        <p class="px-4 text-sm font-bold">
                            $${product.price}
                        </p>
                        <div class="flex gap-[20px] justify-between items-center w-full mr-20 px-2 text-sm mb-4 mt-2">
                            <button
                                class="btn btn-details bg-white rounded px-2 py-1 min-h-0 h-auto text-xs gap-1 hover:bg-black hover:text-white transition"><i
                                    class="fa-solid fa-eye"></i> Details</button>
                            <button
                                class="btn bg-primary btn-add text-white rounded px-2 py-1 min-h-0 h-auto text-xs gap-1 hover:bg-blue-100 hover:text-blue-600 transition"><i
                                    class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                        </div>
                    </div>
                </div>
        `;
        // modal 
        const detailsBtn = productCard.querySelector(".btn-details");
        detailsBtn.addEventListener("click", () => {
            showModal(product);
        });
        // cart 
        const addBtn = productCard.querySelector(".btn-add");
        addBtn.addEventListener("click", () => {
            if (!cart.find(p => p.id === product.id)) {
                cart.push(product);
            }
            updateCartCount();
        });
        productsContainer.appendChild(productCard);
    });
}
renderProducts([])




//   Modal 
function showModal(product) {
    const modal = document.getElementById("product-modal");

    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-title").textContent = product.title;
    document.getElementById("modal-category").textContent = "Category: " + product.category;
    document.getElementById("modal-price").textContent = "Price: $" + product.price;
    document.getElementById("modal-rating").textContent = `⭐ ${product.rating.rate} (${product.rating.count})`;
    document.getElementById("modal-description").textContent = product.description;

    modal.classList.remove("hidden");

    // Close button
    document.getElementById("modal-close").onclick = () => {
        modal.classList.add("hidden");
    };
}