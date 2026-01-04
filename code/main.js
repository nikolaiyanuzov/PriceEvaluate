async function GetProduct() {
  try {
    // Use relative path so same-origin works whether local or deployed
    const response = await fetch('/api/products');
    const data = await response.json();
    console.log(data);
    // TODO: render results into the page
  } catch (error) {
    console.error("Error:", error);
  }
}

async function main(){
  await GetProduct();
}