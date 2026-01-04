const API_KEY = "pricesapi_F7wh32vHQzY51QPNmCUq9zIMDirAiqs"
const url = `https://cors-anywhere.herokuapp.com/https://api.pricesapi.io/api/v1/products/search?q=laptop&limit=10&api_key=${API_KEY}`



async function GetProduct() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function main(){
    await GetProduct();
}