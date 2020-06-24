const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');



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
                    <img src='${country.flag}' alt="Germany" />
            </div>
            <div class="country-info">
                    <h2>${country.name}</h2>
                    <p><strong>Populaton:</strong>${country.population}</p>
                    <p><strong>Region:</strong>${country.region}</p>
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