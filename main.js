const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const searchEl = document.getElementById('search');
const regionFilter = document.querySelectorAll('li');
let countryDetails = [] //New variable
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
        // Modified
        countryEl.addEventListener('click', function () {
            countryDetails.push(country)
            getCountry()
            window.scrollTo(0, 0);
        })
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
    const {
        value
    } = e.target;
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
// Modified
function getCountry() {
    let detail = countryDetails[0];
    const {
        name,
        population,
        capital,
        nativeName,
        region,
        flag,
        languages,
        borders
    } = detail

    let lanList = []
    languages.forEach(language => {
        lanList.push(language.name)
    })
    let countryModal = document.createElement('div')
    countryModal.classList.add('show-modal')
    countryModal.innerHTML = `
    <div class='details-container'>
    <div class='flag-container'>
        <img src='${flag}' />
    </div>
    <div class='item-details'>
    <h2>${name}</h2>
    <div class='list-split'>
    <ul>
        <li><span>Native Name: </span>: ${nativeName}</li>
        <li><span>Population:</span> ${population}</li>
        <li><span>Region:</span> ${region}</li>
        <li><span>Sub Region: </span> ${nativeName}</li>
        <li><span>Capital: </span> ${capital}</li>
    </ul>
    <ul>
        <li><span>Top Level Domain</span>: ${detail.topLevelDomain}</li>
        <li><span>Currencies:</span> ${detail.currencies[0].name}</li>
        <li><span class='ls'>Languages:</span> <span>${lanList.join(', ')}</span></li>
    </ul>
    </div>
    </div>
    </div>`

    let closeBTN = document.createElement('button')
    closeBTN.innerHTML = '&#8656; Back'
    closeBTN.classList.add('close-btn')
    countryModal.appendChild(closeBTN)
    let btn = document.createElement('div')
    btn.classList.add('border-btn-container')
    let span = document.createElement('span')



    countryModal.append(btn)
    borders.map(border => {
        let borderBtn = document.createElement('button')
        console.log(borders.length)
        if (borders.length == 0) {
            btn.style.visibility('none')
            span.innerHTML = ''
        } else {
            span.innerHTML = 'Boder Countries: '
            btn.prepend(span)
            borderBtn.innerHTML = border
            borderBtn.classList.add('border-btn')
            btn.append(borderBtn)

        }


    })
    let bodyContent = document.querySelector('.modal-container')
    bodyContent.classList.add('visible')
    bodyContent.appendChild(countryModal)



    closeBTN.addEventListener('click', function () {
        bodyContent.classList.replace('visible', 'hide')
        countryDetails = []
    })

    console.log(detail)
}