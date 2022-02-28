const search = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;

    // remove search field value 
    searchField.value = '';


    // fetch api data 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`
    fetch(url)
        .then(res => res.json())
        .then(datas => displayData(datas.data))


    // get data -------
    const displayData = (phones) => {
        console.log(phones);
        phones.forEach(phone => {
            console.log(phone.phone_name);
        });

    }




};