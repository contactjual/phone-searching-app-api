const loadPhone = async (searchText = 'a', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    phones = data.data;
    displayPhones(phones, isShowAll);
}
    


const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container')

    // clear phoneContainer after searchig again.
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden')
    }


    // display only first 12 phones when 'isShowAll' fals
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-100 p-4 shadow-xl';
        // set inner text
        phoneCard.innerHTML = `
            <figure>
                <img src="${phone.image}"
                            alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick="handlesShowDetail('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `
        // append child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loader 
    toggleLoadingSpinner(false);
}



// handle show details
const handlesShowDetail = async (id) => {
    // console.log('clicked me', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

}


// show phone details
const showPhoneDetails = (phone) => {
    // console.log(phone);
    
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML=`
    <img style='margin: 20px auto;' src="${phone.image}" alt="">
    <p><span>storage: </span> ${phone?.mainFeatures.storage}</p>
    <p><span>GPS: </span>${phone?.others?.GPS || 'No GPS available'}</p>
    `
    

    // show the modal
    show_details_modal.showModal()
}



// handle search button 
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true); // showing loader
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll)
}


// loader
const toggleLoadingSpinner = (isLoading) => {
    const leadingSpinner = document.getElementById('leading-spinner');
    if (isLoading) {
        leadingSpinner.classList.remove('hidden')
    }
    else {
        leadingSpinner.classList.add('hidden')
    }
}


const handleSearchAll = () => {
    handleSearch(true);
}

loadPhone();