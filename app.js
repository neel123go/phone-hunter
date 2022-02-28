// getting search value & search in API
const loadData = () => {
    document.getElementById('phone-container').textContent = '';
    const searchText = document.getElementById('search-field');
    const searchValue = searchText.value;
    if (searchValue == '') {
        document.getElementById('error-msg').innerText = 'Field must not be empty';
    } else {
        document.getElementById('error-msg').innerText = '';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
            .then(res => res.json())
            .then(data => displayData(data.data));
        searchText.value = '';
    }
}

// display phone in website
const displayData = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    if (phones.length === 0) {
        document.getElementById('error-msg').innerText = "Sorry, we don't have any product on your search";
    } else {
        phones.forEach(phone => {
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `
                <div class="card text-center">
                    <img src="${phone.image}" class="card-img-top w-50 mx-auto p-4">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                    </div>
                    <button class="btn btn-primary w-50 mx-auto mb-3">Show Details</button>
                </div>
            `;
            phoneContainer.appendChild(col);
        });
    }
}