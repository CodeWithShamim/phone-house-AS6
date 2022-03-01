const search = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;

    // remove search field value 
    searchField.value = '';


    if (searchFieldValue === '') {
        alert('please! insert a value')
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
            alert('result not find')
        } else {
            const parentCard = document.getElementById('parent-card');
            phones.forEach(phone => {

                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                    <div class="card">
                        <img src="${phone.image}" class="rounded img-fluid card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        <button class="bg-info py-3 border-0 w-50 mx-auto rounded mb-3 fw-bold text-white">Details</button>
                    </div>
                `
                parentCard.appendChild(div);

            });
        }

    }




};