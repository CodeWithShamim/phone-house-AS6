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
    const detailsCard = document.getElementById('details-section');
    detailsCard.textContent = '';



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
                        <button onclick="loadDetails('${phone.slug}')" id='#home' class="bg-info py-3 border-0 w-50 mx-auto rounded mb-3 fw-bold text-white">Details</button>
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
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getDetails(data))

}


// -----------------------card details added----------------------------
const getDetails = (data) => {
    console.log(data.data.releaseDate);
    const details = data.data;
    const detailsCard = document.getElementById('details-section');
    detailsCard.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML =
        `
    <div class="row g-0 p-5 rounded">
        <div class="col-md-4 text-center">
            <img src="${details.image? details.image:'./images/pic.jgp'}" class="shadow w-100  img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body  ms-4">
                <h3 class="card-title text-center">${details.brand? details.brand:'No'}</h3>
                <p class="card-text text-center text-primary">Release date: ${details.releaseDate? details.releaseDate:'No'}</p>
                <div class="d-flex justify-content-around">
                    <div>
                        <h4>Main Features:</h4>
                        <p><span class= "fs-5 text-info">Chipset:</span> ${details.mainFeatures.chipSet? details.mainFeatures.chipSet:'No'}</p>
                        <p><span class= "fs-5 text-info">Display size:</span> ${details.mainFeatures.displaySize? details.mainFeatures.displaySize:'No'}</p>
                        <p><span class= "fs-5 text-info">Memory:</span> ${details.mainFeatures.memory? details.mainFeatures.memory:'No'}</p>       
                        <p><span class= "fs-5 text-info">Storage:</span> ${details.mainFeatures.storage? details.mainFeatures.storage:'No'}</p>  
                    </div>
                    <div class='ms-4'>
                        <h4>Sensors: </h4>
                        <p><span class= "fs-5 text-info">1:</span> ${details.mainFeatures.sensors[0]? details.mainFeatures.sensors[0]:'No'}</p>    
                        <p><span class= "fs-5 text-info">2:</span> ${details.mainFeatures.sensors[1]? details.mainFeatures.sensors[1]:'No'}</p>    
                        <p><span class= "fs-5 text-info">3:</span> ${details.mainFeatures.sensors[2]? details.mainFeatures.sensors[2]:'No'}</p>    
                        <p><span class= "fs-5 text-info">4:</span> ${details.mainFeatures.sensors[3]? details.mainFeatures.sensors[3]:'No'}</p>    
                        <p><span class= "fs-5 text-info">5:</span> ${details.mainFeatures.sensors[4]? details.mainFeatures.sensors[4]:'No'}</p>    
                        <p><span class= "fs-5 text-info">6:</span> ${details.mainFeatures.sensors[5]? details.mainFeatures.sensors[5]:'No'}</p>     
                    </div>                        
                </div>

                <div class='mt-4'>
                    <h4>Other Features:</h4>
                    <p><span class="fs-5 text-danger">Bluetooth:</span> ${details.others.Bluetooth? details.others.Bluetooth:'No'}</p>
                    <p><span class="fs-5 text-danger">GPS:</span> ${details.others.GPS? details.others.GPS:'No'}</p>
                    <p><span class="fs-5 text-danger">NFC:</span> ${details.others.NFC? details.others.NFC:'No'}</p>
                    <p><span class="fs-5 text-danger">Radio:</span> ${details.others.Radio? details.others.Radio:'No'}</p>
                    <p><span class="fs-5 text-danger">USB:</span> ${details.others.USB? details.others.USB:'No'}</p>
                    <p><span class="fs-5 text-danger">WLAN:</span> ${details.others.WLAN? details.others.WLAN:'No'}</p>
                </div>

            </div>
        </div>
    </div>
    `

    detailsCard.appendChild(div);

}