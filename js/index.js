"use strict";

const searchBtn = document.querySelector(".search-icon");
const search = document.querySelector("#search");
const svgmap = document.querySelector("svg");
const countryContainer = document.querySelector(".countryContainer");

// Search Btn Function
searchBtn.addEventListener("click", () => {
  if (search.value === "") alert("Enter valid Country name");
  else CountryDetails(search.value).then(countryCard);

  search.value = "";
});

// Fetching Country Info
const CountryDetails = async (name) => {
  console.log(search.value);
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  const country = await response.json();

  return country;
};

// Appending Country Card
const countryCard = (res) => {
  var curr = res[0].currencies;
  var code;
  let sym;
  for (const key in curr) {
    sym = curr[key].symbol;
    code = key;
  }

  const map = svgmap.querySelector(`#${res[0].cca2}`);
  map.style.fill = "#fff";

  const card = `<div class="countryCard">
                    <img src="${res[0].flags.svg}" />
                    <h1 class="name">${res[0].name.common}</h1>
                    <div class="countryDetails">
                        <h1 class="country capital"><span>Capital</span> - ${res[0].capital}</h1>
                        <h1 class="country continent"><span>Continent</span> - ${res[0].region}</h1>
                        <h1 class="country population"><span>Population</span> - ${res[0].population}</h1>
                        <h1 class="country currency"><span>Currency</span> - ${code} || <span>Symbol</span> - ${sym}</h1>
                        <h1 class="country area"><span>Area</span> - ${res[0].area}km²</h1>
                        <h1 class="country time"><span>Time Zone</span> - ${res[0].timezones}</h1>
                        <h1 class="country border"><span>Borders Shared</span> - ${res[0].borders}</h1>
                    </div>
                </div>`;

  countryContainer.innerHTML = card;
};
