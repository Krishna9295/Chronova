// ===== INIT CART =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== ADD TO CART =====
function addToCart(name, price) {
    cart.push({ name, price });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart 🛒");
}
// Login/Logout 
const isLoggedIn = localStorage.getItem("chronova_logged_in");
const username = localStorage.getItem("chronova_username");

const userBox = document.getElementById("userBox");

if(userBox){
    if(isLoggedIn === "true" && username){
        // LOGIN KE BAAD
        userBox.innerHTML = `
            <a href="account.html" title="Atelier Profile" style="background:transparent;border:none;padding:0;box-shadow:none;transform:none;">
                <span style="color:#f0d67a;font-weight:bold;cursor:pointer;">
                    Hi, ${username}
                </span>
            </a>
            <a href="#" onclick="logout()" style="margin-left:12px;">Logout</a>
        `;
    }else{
        // LOGIN NAHI HAI
        userBox.innerHTML = `
            <a href="login.html">Login</a>
            <a href="signup.html">Sign Up</a>
        `;
    }
}

function logout(){
    localStorage.removeItem("chronova_logged_in");
    localStorage.removeItem("chronova_username");
    window.location.href = "index.html";
}
