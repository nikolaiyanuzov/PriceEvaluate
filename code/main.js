const API_URL = 'https://your-render-url.onrender.com/api/products';

async function GetProduct() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function main(){
    await GetProduct();
}