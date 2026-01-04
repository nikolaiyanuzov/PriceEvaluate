const productName = document.getElementById('productName')
const fetchButton = document.getElementById('fetchBtn')
let previousSearch = ''
fetchButton.addEventListener('click', () => {
    if(previousSearch !== productName.value){
        previousSearch = productName.value
        productName.value = ''
        GetProduct()
    }
})


async function GetProduct() {
  try {
    const q = previousSearch?.trim();
    if (!q) {
      console.warn('Empty search term');
      return;
    }

    // Use relative path so same-origin works whether local or deployed
    const response = await fetch(`/api/products?q=${encodeURIComponent(q)}`);
    const data = await response.json();
    console.log(data);
    // TODO: render results into the page
  } catch (error) {
    console.error("Error:", error);
  }
}