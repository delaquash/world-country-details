const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const searchEl = document.getElementById('search');
const regionFilter = document.querySelectorAll('li');



getCountries();
async function getCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await res.json();
    displayCountries(countries);
}

function displayCountries(countries) {
    countriesEl.innerHTML = '';
    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('country');
        countryEl.innerHTML = `
            <div>
                    <img src="${country.flag}" alt="Germany" />
            </div>
            <div class="country-info">
                    <h2 class="country-name">${country.name}</h2>
                    <p><strong>Populaton:</strong>${country.population}</p>
                    <p class="country-region"><strong>Region:</strong>${country.region}</p>
                    <p><strong>Capital:</strong>${country.capital}</p>
            </div>
    `;
        countriesEl.appendChild(countryEl);
    });
}

// toggle theme - dark & light
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// show and hide the filters (li tags)
filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
});
//How to search for preferredcountry
searchEl.addEventListener('input', e => {
    const { value } = e.target;
    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
            // .card => .card-body => .country-name
            name.parentElement.parentElement.style.display = "block";
        } else {
            name.parentElement.parentElement.style.display = "none";
        }
    });
});
// How to search for country using any preferred region
regionFilter.forEach(filter => {
    filter.addEventListener('click', () => {
        const countryRegion = document.querySelectorAll('.country-region');
        countryRegion.forEach(region => {
            if (region.innerText.toLowerCase().includes(filter.innerText.toLowerCase())) {
                region.parentElement.parentElement.style.display = "block";
            } else {
                region.parentElement.parentElement.style.display = "none";
            }
        });
    });

});