// getting search value & search in API
const loadProducts = () => {
    document.getElementById('phone-container').textContent = '';
    document.getElementById('product-details-container').textContent = '';
    const searchText = document.getElementById('search-field');
    const searchValue = searchText.value;
    if (searchValue == '') {
        document.getElementById('error-msg').innerText = 'Field must not be empty';
    } else {
        document.getElementById('error-msg').innerText = '';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
            .then(res => res.json())
            .then(data => displayProducts(data.data));
        searchText.value = '';
    }
}

// display phone in website
const displayProducts = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    if (phones.length === 0) {
        document.getElementById('error-msg').innerText = "Sorry, we don't have any product on your search";
    } else {
        let count = 0;
        phones.forEach(phone => {
            count++;
            if (count <= 20) {
                const col = document.createElement('div');
                col.classList.add('col');
                col.innerHTML = `
                    <div class="card text-center">
                        <img src="${phone.image}" class="card-img-top w-50 mx-auto p-4">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">${phone.brand}</p>
                        </div>
                        <button onclick="loadSinglePhone('${phone.slug}')" class="btn btn-primary w-50 mx-auto mb-3">Show Details</button>
                    </div>
                `;
                phoneContainer.appendChild(col);
            }
        });
    }
}

// Load single phone from API
const loadSinglePhone = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayProductDetails(data.data));
}

// display product details in website
const displayProductDetails = (productId) => {
    const productDetailsContainer = document.getElementById('product-details-container');
    productDetailsContainer.textContent = '';
    const row = document.createElement('div');
    row.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'g-4');
    row.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${productId.image}" class="card-img-top w-50 mx-auto py-3 my-5 alt="...">
            </div>
        </div>
        
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h2 class="mb-5">Product Details</h2>
                    <h5 class="card-title">${productId.name}</h5>
                    <p class="card-text">${productId.releaseDate ? productId.releaseDate : 'No realease date found'}</p>
                    <h5>Main Features</h5>
                    <ul>
                        <li>${productId.mainFeatures.chipSet}</li>
                        <li>${productId.mainFeatures.displaySize}</li>
                        <li>${productId.mainFeatures.memory}</li>
                        <li>${productId.mainFeatures.storage}</li>
                        <li>${productId.mainFeatures.sensors}</li>
                    </ul>
                    <h5>Others</h5>
                    <ul>
                        <li>Bluetooth: ${productId.others?.Bluetooth ? productId.others.Bluetooth : 'Data Not Found'}</li>
                        <li>GPS: ${productId.others?.GPS ? productId.others.GPS : 'Data Not Found'}</li>
                        <li>NFC: ${productId.others?.NFC ? productId.others.NFC : 'Data Not Found'}</li>
                        <li>Radio: ${productId.others?.Radio ? productId.others.Radio : 'Data Not Found'}</li>
                        <li>USB: ${productId.others?.USB ? productId.others.USB : 'Data Not Found'}</li>
                        <li>WLAN: ${productId.others?.WLAN ? productId.others.WLAN : 'Data Not Found'}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    productDetailsContainer.appendChild(row);
}