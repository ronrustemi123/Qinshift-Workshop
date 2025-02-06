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


const fetchShips = async (url) => {
    try {
        handleError(false, '')
        handleLoading(true)
        const res = await fetch(url)
        handleLoading(false)

        const data = await res.json()


        let rowHTML = ``
        tableBody.innerHTML = ``
        data?.results?.forEach(el => {
            const row = document.createElement('tr')
            rowHTML = `
            <td>${el.name}</td>
            <td>${el.model}</td>
            <td>${el.manufacturer}</td>
            <td>$${el.cost_in_credits}</td>
            <td>${el.crew}</td>
            <td>${el.passengers}</td>
            <td>${el.starship_class}</td>
        `
            row.innerHTML = rowHTML
            rowHTML = ``
            tableBody.appendChild(row)
        })

        prevBtn.disabled = !data.previous
        nextBtn.disabled = !data.next

        prevBtn.onclick = () => fetchShips(data.previous)
        nextBtn.onclick = () => fetchShips(data.next)
    } catch (error) {
        console.log(error)
        handleError(true, `Failed to fetch ships`)
    }
}

const fetchPeople = async (url) => {
    try {
        handleError(false, '')
        handleLoading(true)
        const res = await fetch(url)
        handleLoading(false)

        const data = await res.json()


        let rowHTML = ``
        tableBody.innerHTML = ``
        data?.results?.forEach(el => {
            const row = document.createElement('tr')
            rowHTML = `
                            <td>${el.name}</td>
                    <td>${el.height}cm</td>
                    <td>${el.mass}kg</td>
                    <td>${el.gender}</td>
                    <td>${el.birth_year}</td>
                    <td>${el.films.length}</td>
            `
            row.innerHTML = rowHTML
            rowHTML = ``
            tableBody.appendChild(row)
        })

        prevBtn.disabled = !data.previous
        nextBtn.disabled = !data.next

        prevBtn.onclick = () => fetchPeople(data.previous)
        nextBtn.onclick = () => fetchPeople(data.next)
    } catch (error) {
        console.log(error)
        handleError(true, `Failed to fetch people`)
    }
}

const fetchPlanets = async (url) => {
    try {
        handleError(false, '')
        handleLoading(true)
        const res = await fetch(url)
        handleLoading(false)

        const data = await res.json()


        let rowHTML = ``
        tableBody.innerHTML = ``
        data?.results?.forEach(el => {
            const row = document.createElement('tr')
            rowHTML = `
                            <td>${el.name}</td>
                    <td>${el.population}cm</td>
                    <td>${el.climate}kg</td>
                    <td>${el.gravity}</td>
                    <td>${el.terrain}</td>
            `
            row.innerHTML = rowHTML
            rowHTML = ``
            tableBody.appendChild(row)
        })

        prevBtn.disabled = !data.previous
        nextBtn.disabled = !data.next

        prevBtn.onclick = () => fetchPlanets(data.previous)
        nextBtn.onclick = () => fetchPlanets(data.next)
    } catch (error) {
        console.log(error)
        handleError(true, `Failed to fetch planets`)
    }
}

shipBtn.addEventListener('click', () => {
    mainContent.style.display = 'block'
    tableTitleSpan.textContent = 'Starship'

    tableHeadRow.innerHTML = shipTableColumns
    fetchShips(SHIPS_URL)

})


personBtn.addEventListener("click", () => {
    mainContent.style.display = 'block'
    tableTitleSpan.textContent = 'Person'

    tableHeadRow.innerHTML = personTableColumns
    fetchPeople(PEOPLE_URL)

})
planetBtn.addEventListener("click", () => {
    mainContent.style.display = 'block'
    tableTitleSpan.textContent = 'Planet'

    tableHeadRow.innerHTML = personTableColumns
    fetchPlanets(PLANETS_URL)

})