// search result fx
const searchFX = () => {
  showAllDataCon(10);
};
// showAll btn
document.getElementById("btn-showAll").addEventListener("click", function () {
  showAllDataCon();
  document.getElementById("search-input").value = "";
});

// Enter even Handler search input
document.getElementById("search-input").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    showAllDataCon(10);
  }
});

// processing data get input value
const showAllDataCon = (dataLimited) => {
  // start spinnerFX
  spinnerFX(true);
  const searchInput = document.getElementById("search-input").value;
  loadPhoneFx(searchInput, dataLimited);
};

// spinnerFX add / remove
const spinnerFX = (isLoading) => {
  const spinner = document.getElementById("spinner");
  isLoading === true ? spinner.classList.remove("d-none") : spinner.classList.add("d-none");
};

// api call
const loadPhoneFx = async (searchResult, dataLimited) => {
  // Dynamic  URL
  const URL = `https://openapi.programming-hero.com/api/phones?search=${searchResult}`;

  //   clear searchInput
  // document.getElementById("search-input").value = "";

  try {
    const res = await fetch(URL);
    const data = await res.json();

    /*   
    slice part-----
    phonesInfoFX(data.data.slice(0,10)); //with slice
    phonesInfoFX(data.data); // without slice
    
    */

    phonesInfoFX(data.data, dataLimited); //object to array find
  } catch (err) {
    console.log(err);
  }
};

const phonesInfoFX = (phones, dataLimited) => {
  const phoneContainer = document.getElementById("phone-container");
  //   clear all divTag
  phoneContainer.innerHTML = "";

  //  slice show all
  const showAll = document.getElementById("show-all");
  if (dataLimited && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //   search error no found
  const noFound = document.getElementById("no-found");
  phones.length === 0 ? noFound.classList.remove("d-none") : noFound.classList.add("d-none");

  //   Method 2

  /*   if (phones.length === 0) {
    noFound.classList.remove("d-none");
  } else {
    noFound.classList.add("d-none");
  } */

  //   slice
  //   phones.slice(0, 4).forEach((phone) => {

  phones.forEach((phone) => {
    //  destructuring
    const { brand, phone_name, image, slug } = phone;

    const divTag = document.createElement("div");

    divTag.classList.add("col");
    divTag.innerHTML = `
            <div class="card h-100 p-4">
                    <h2>Brand: ${brand}</h2>
                    <img src="${image}" class="card-img-top img-fluid my-3" alt="..." />
                <div class="card-body">
                      <h5 class="card-title">Phone Name: ${phone_name}</h5>
                <div class="d-flex justify-content-center my-4 gap-2">
                      <button class="btn btn-primary text-center">BUY NOW</button>
                      <!-- Button trigger modal -->
                      <button onclick="showDetails('${slug}')" class="btn btn-primary text-center" type="button"  data-bs-toggle="modal" data-bs-target="#showDetailsPhone">Show Details</button>
                </div>
                </div>        
            </div>

    `;

    phoneContainer.appendChild(divTag);
  });

  //   stop spinnerFX
  spinnerFX(false);
};

// showDetails phone
const showDetails = (id) => {
  const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showDetailsModal(data.data))
    .catch((err) => {
      console.log(err);
    });
};

const showDetailsModal = (details) => {
  const { name, mainFeatures, image, others, releaseDate } = details;
  const { storage, displaySize, chipSet, memory, sensors } = mainFeatures;
  const { WLAN, Bluetooth, GPS, NFC, Radio, USB } = others;
  document.getElementById("showDetailsPhoneLabel").innerText = `${name}`;

  const modalDetails = document.getElementById("modal-details");

  modalDetails.innerHTML = `
  <img src="${image}" alt="">
  <p class="mt-2">Release Date: ${releaseDate ? releaseDate : "Up coming Phone"} </p>

  <p class="fw-bold">Main Features: <br> <span>Storage:${storage}</span> <br> <span>Display:${displaySize}</span> <br> <span>ChipSet: ${chipSet}</span> <br> <span>Memory:${memory}</span>
  <br> <span>Sensors: <br>  ${sensors}</span> </p>
  <p class="fw-bold">Other Feature:</p>
  <p>WLAN: ${WLAN}</p>
  <p>Bluetooth: ${Bluetooth ? Bluetooth : "no Bluetooth"}</p>
  <p>GPS: ${GPS}</p>
  <p>NFC: ${NFC ? NFC : "NO"}</p>
  <p>Radio: ${Radio}</p>
  <p>USB: ${USB}</p>  
 

  `;

  console.log(details);
};

loadPhoneFx("iphone");
