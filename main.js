const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
  const weatherData = await weatherPromise.json()

  const ourTemperature = weatherData.properties.periods[0].temperature
  document.querySelector("#temperature-output").textContent = ourTemperature

}

async function fetchEpisodes(showName) {
  const showPromise = await fetch(`https://api.tvmaze.com/search/shows?q=${showName}`)
  const showData = await showPromise.json()

  const showId = showData[0].show.id

  const episodePromise = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)

  const episodeData = await episodePromise.json()

  console.log(episodeData)

  document.querySelector(".page-section-title").textContent = `${showName} episodes`

  episodeData.forEach(episode => {
    const clone = template.content.cloneNode(true)
    clone.querySelector(".pet-card").dataset.species = 'dog'
    clone.querySelector("h3").textContent = episode.name
    clone.querySelector(".pet-description").innerHTML = episode.summary
    clone.querySelector(".pet-age").textContent = `Season ${episode.season} episode ${episode.number}`
    clone.querySelector(".pet-card-photo img").src = episode.image ? episode.image.original : "images/fallback.jpg"
    clone.querySelector(".pet-card-photo img").alt = `episode ${episode.name}`
    wrapper.appendChild(clone)
  })

  document.querySelector(".list-of-pets").appendChild(wrapper)

}

// start()

// fetchEpisodes('breaking bad')



const fetchButton = document.getElementById('fetchButton')
const searchInput = document.getElementById('searchInput')

fetchButton.addEventListener('click', () => {
  const listOfPets = document.querySelector(".list-of-pets")
  listOfPets.innerHTML = ""
  fetchEpisodes(searchInput.value)
})
