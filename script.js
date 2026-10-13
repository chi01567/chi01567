// 商品資料 (6 款潮流保溫瓶與水壺)
const products = [
    {
        id: 1,
        name: "Owala FreeSip Cyber Edition",
        price: 1380,
        desc: "專利吸飲雙用口，賽博霓虹配色，隨時補充戰鬥能量。",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Stanley Quencher H2.0 巨無霸",
        price: 1850,
        desc: "極限保冰霸主，人手一支的超強大容量隨行杯。",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Hydro Flask Wide Mouth 潮酷藍",
        price: 1450,
        desc: "蜂巢隔熱技術，完美控溫，街頭潮流必備單品。",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "YETI Rambler 鈦金戰術水壺",
        price: 2200,
        desc: "軍規防撞擊塗層，地表最強悍的不鏽鋼保溫水壺。",
        image: "https://images.unsplash.com/photo-1589365252845-aa8fb4fbce27?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "LARQ PureVis 智慧淨化水瓶",
        price: 3200,
        desc: "內建 UV-C LED 自體淨化殺淨技術，科技感頂峰。",
        image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Klean Kanteen 經典不鏽鋼瓶",
        price: 1150,
        desc: "輕量化設計，極簡美學與環保工藝的完美結合。",
        image: "https://images.unsplash.com/photo-1581636628391-a18544d67c59?auto=format&fit=crop&w=600&q=80"
    }
];

// 購物車資料陣列
let cart = [];

// DOM 元素選取
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartBadge = document.getElementById('cart-badge');
const checkoutBtn = document.getElementById('checkout-btn');

// 初始化商品列表渲染
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-img-container" id="img-container-${product.id}">
                <img src="${product.image}" alt="${product.name}" id="prod-img-${product.id}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <span class="product-price">NT$ ${product.price}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)">加入購物車</button>
                </div>
            </div>
        </div>
    `).join('');
}

// 加入購物車並觸發超誇張特效
function addToCart(productId, event) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();

    // 1. 畫面整體劇烈搖晃
    document.body.classList.add('shake-screen');
    setTimeout(() => {
        document.body.classList.remove('shake-screen');
    }, 400);

    // 2. 觸發強烈煙火特效
    const rect = event.target.getBoundingClientRect();
    triggerFireworks(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // 3. 飛向購物車動畫
    triggerFlyingItem(productId, event.target);
}

// 飛向購物車圖片動畫
function triggerFlyingItem(productId, buttonElement) {
    const product = products.find(p => p.id === productId);
    const flyingImg = document.createElement('img');
    flyingImg.src = product.image;
    flyingImg.className = 'flying-item';

    const btnRect = buttonElement.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();

    flyingImg.style.left = `${btnRect.left}px`;
    flyingImg.style.top = `${btnRect.top}px`;
    document.body.appendChild(flyingImg);

    requestAnimationFrame(() => {
        flyingImg.style.left = `${cartRect.left}px`;
        flyingImg.style.top = `${cartRect.top}px`;
        flyingImg.style.transform = 'scale(0.1) rotate(720deg)';
        flyingImg.style.opacity = '0.3';
    });

    setTimeout(() => {
        flyingImg.remove();
    }, 800);
}

// 煙火特效粒子引擎 (Canvas)
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.color = ['#00f3ff', '#ff0055', '#f3e600', '#ffffff', '#ff5e00'][Math.floor(Math.random() * 5)];
        this.size = Math.random() * 5 + 3;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // 重力效果
        this.alpha -= this.decay;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function triggerFireworks(x, y) {
    // 瞬間噴發 120 顆粒子
    for (let i = 0; i < 120; i++) {
        particles.push(new Particle(x, y));
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }
    requestAnimationFrame(animateFireworks);
}
animateFireworks();

// 更新購物車 UI 與數量
function updateCartUI() {
    cartBadge.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="empty-cart-msg">購物車目前空空如也...快去加入極限裝備！</div>`;
        cartTotalPrice.textContent = 'NT$ 0';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">NT$ ${item.price}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
    }).join('');

    cartTotalPrice.textContent = `NT$ ${total}`;
}

// 移除購物車商品
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 開啟與關閉購物車抽屜
cartBtn.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
});

cartOverlay.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
});

// 結帳按鈕點擊事件
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('購物車是空的，無法結帳！');
        return;
    }
    alert('🎉 訂單已成功送出！感謝您體驗賽博極限購物！');
    cart = [];
    updateCartUI();
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
});

// 頁面載入完成初始化商品
window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});