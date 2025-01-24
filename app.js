let PEOPLE_URL = 'https://swapi.dev/api/people/?page=1'
let SHIPS_URL = 'https://swapi.dev/api/starships/?page=1'

const shipBtn = document.querySelector('#shipBtn')
const personBtn = document.querySelector('#personBtn')

const tableTitle = document.querySelector('.table-title')
const tableTitleSpan = document.querySelector('.table-title-span')
const mainContent = document.querySelector('main')

const tableHeadRow = document.querySelector('.table-head-row')

const tableBody = document.querySelector('tbody')

const nextBtn = document.querySelector('#nextBtn')
const prevBtn = document.querySelector('#prevBtn')

let currUrl = ''

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

const fetchShips = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {

            let rowHTML = ``
            tableBody.innerHTML = ''
            for (const el of data.results) {
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
            }

            prevBtn.disabled = !data.previous
            nextBtn.disabled = !data.next

            prevBtn.onclick = () => fetchShips(data.previous)
            nextBtn.onclick = () => fetchShips(data.next)
        })
}
const fetchPeople = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let rowHTML = ``
            tableBody.innerHTML = ''
            for (const el of data.results) {
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
            }

            prevBtn.disabled = !data.previous
            nextBtn.disabled = !data.next

            prevBtn.onclick = () => fetchPeople(data.previous)
            nextBtn.onclick = () => fetchPeople(data.next)
        })


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