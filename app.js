let PEOPLE_URL = 'https://swapi.dev/api/people/?page=1'
let SHIPS_URL = 'https://swapi.dev/api/starships/?page=1'
let PLANETS_URL = 'https://swapi.dev/api/planets/?page=1'

const shipBtn = document.querySelector('#shipBtn')
const personBtn = document.querySelector('#personBtn')
const planetBtn = document.querySelector('#planetBtn')

const btnContainer = document.querySelector('.btn-container')

const tableTitle = document.querySelector('.table-title')
const tableTitleSpan = document.querySelector('.table-title-span')
const mainContent = document.querySelector('main')

const tableHeadRow = document.querySelector('.table-head-row')

const tableBody = document.querySelector('tbody')

const nextBtn = document.querySelector('#nextBtn')
const prevBtn = document.querySelector('#prevBtn')

const loader = document.querySelector('#loader')
const errorDisplay = document.querySelector('#error')

const tableContainer = document.querySelector('table')

const shipTableColumns = `
    <th>Name</th>
    <th>Model</th>
    <th>Manufacturer</th>
    <th>Cost</th>
    <th>Crew</th>
    <th>Passengers</th>
    <th>Class</th>
`
const personTableColumns = `
    <th>Name</th>
    <th>Height</th>
    <th>Mass</th>
    <th>Gender</th>
    <th>Birth Year</th>
    <th>Appearances</th>
`

const planetsTableColumns = `
    <th>Name</th>
    <th>Population</th>
    <th>Climate</th>
    <th>Gravity</th>
    <th>Terrain</th>
`

let isLoading = false

const handleLoading = e => {
    isLoading = e
    loader.style.display = isLoading ? 'block' : 'none';
    tableContainer.style.display = isLoading ? 'none' : 'table';
    btnContainer.style.display = isLoading ? 'none' : 'flex';
}

let error = false

const handleError = (err, msg) => {
    error = err
    if (error === true) {
        handleLoading(false)
    }
    errorDisplay.style.display = error ? 'block' : 'none'
    errorDisplay.innerHTML = `<p>${msg}</p>`
    tableContainer.style.display = error ? 'none' : 'table';
    btnContainer.style.display = error ? 'none' : 'flex';
}


const fetchAll = async (url, rowData) => {
    try {
        handleError(false, '');
        handleLoading(true);
        const res = await fetch(url);
        handleLoading(false);

        const data = await res.json();

        let tableRowsHTML = '';
        data.results.forEach(dataRes => {
            let rowHTML = '<tr>';
            rowData.forEach(el => {
                if (el !== 'films[length]') {
                    rowHTML += `<td>${dataRes[el]}</td>`;
                } else {
                    rowHTML += `<td>${dataRes.films.length}</td>`;
                }
            });
            rowHTML += '</tr>';
            tableRowsHTML += rowHTML;
        });

        tableBody.innerHTML = tableRowsHTML;

        prevBtn.disabled = !data.previous;
        nextBtn.disabled = !data.next;

        prevBtn.onclick = () => fetchAll(data.previous, rowData);
        nextBtn.onclick = () => fetchAll(data.next, rowData);
    } catch (error) {
        console.error(error);
        handleError(true, 'Failed to fetch planets');
    }
};

shipBtn.addEventListener('click', () => {
    mainContent.style.display = 'block'
    tableTitleSpan.textContent = 'Starship'

    tableHeadRow.innerHTML = shipTableColumns
    fetchAll(SHIPS_URL, ['name', 'model', 'manufacturer', 'cost_in_credits', 'crew', 'passengers', 'starship_class'])

})


personBtn.addEventListener("click", () => {
    mainContent.style.display = 'block'
    tableTitleSpan.textContent = 'Person'

    tableHeadRow.innerHTML = personTableColumns
    fetchAll(PEOPLE_URL, ['name', 'height', 'mass', 'gender', 'birth_year', 'films[length]'])

})
planetBtn.addEventListener("click", () => {
    mainContent.style.display = 'block'
    tableTitleSpan.textContent = 'Planet'

    tableHeadRow.innerHTML = planetsTableColumns
    fetchAll(PLANETS_URL, ['name', 'population', 'climate', 'gravity', 'terrain'])

})