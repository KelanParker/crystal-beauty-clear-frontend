export default function getCart() {
    let cart = localStorage.getItem("cart");
    if(cart == null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        return [];
    }

    cart = JSON.parse(cart);
    return cart;
}

export function addToCart(product, quantity = 1) {
    let cart = getCart();
    console.log(cart);
    const productIndex = cart.findIndex(item => item.productID === product.productID);

    if (productIndex === -1) {
       cart.push({ 
        productID : product.productID,
        name: product.name,
        price: product.price,
        labeledPrice: product.labeledPrice,
        imageUrl: product.imageUrl,
        category: product.category,
        brand: product.brand,
        stock: product.stock,
        description: product.description,
        quantity: quantity,
        
        });
   } else {
       cart[productIndex].quantity += quantity;
       if(cart[productIndex].quantity <= 0) {
           cart = cart.filter((item) => item.productID !== product.productID);   
       }
   }

   localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(productID) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.productID !== productID);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
}

export function getTotalCartValue() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
