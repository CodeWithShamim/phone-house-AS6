// spinner added ----------------------
const getSpinner = (spinnerText) => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = spinnerText;
}

// Error message handle------------------------
const errorMessage = (text) => {
    const errorMessage = document.getElementById('error-msg');
    errorMessage.style.display = text;
}


// -------------search event clickable start here--------------- 
const search = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;

    // remove search field value 
    searchField.value = '';
    // add spinner 
    getSpinner('block');


    if (searchFieldValue === '') {
        alert('please! insert a value');
        errorMessage('none');
        getSpinner('none');
    } else {
        // fetch api data 
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`
        fetch(url)
            .then(res => res.json())
            .then(datas => displayData(datas.data))
            .catch(error => console.log(error))
    }


    // get data -------
    const displayData = (phones) => {
        console.log(phones);

        if (phones.length === 0) {
            errorMessage('block')
            const parentCard = document.getElementById('parent-card');
            parentCard.textContent = '';
        } else {
            if (phones.length > 20) {
                phones = phones.slice(0, 20)
            }
            const parentCard = document.getElementById('parent-card');
            // remove previous search result 
            parentCard.textContent = '';
            errorMessage('none');

            phones.forEach(phone => {
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                    <div class="card shadow text-center">
                        <div class="text-center"><img src="${phone.image}" class="w-100 h-75 px-5 pt-4 rounded img-fluid card-img-top" alt="..."></div>
                        
                        <div class="card-body">
                            <h5 class="card-title">Name: ${phone.phone_name}</h5>
                            <p class="card-text">Brand: ${phone.brand}</p>    
                        </div>
                        <button onclick="loadDetails('${phone.slug}')" class="bg-info py-3 border-0 w-50 mx-auto rounded mb-3 fw-bold text-white">Details</button>
                    </div>                        
                `
                parentCard.appendChild(div);
            });


        }
        // add spinner 
        getSpinner('none');
    }


};

// ------------------------------load details for phones --------------
const loadDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getDetails(data))

}

const getDetails = (data) => {
    console.log(data.data.releaseDate);
    const modalSection = document.getElementById('modal-section');
    const div = document.createElement('div');
    div.innerHTML =
        `
    <!-- Modal -->
    <!-- <div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">5555555555</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
                </div>
            </div>
        </div>
    </div> -->
    `
    modalSection.appendChild(div);
}