const template = document.querySelector("#episode-card-template")
const wrapper = document.createDocumentFragment()


async function fetchEpisodes(showName) {
  const showPromise = await fetch(`https://api.tvmaze.com/search/shows?q=${showName}`)
  const showData = await showPromise.json()

  const showId = showData[0].show.id

  const episodePromise = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)

  const episodeData = await episodePromise.json()

  console.log(episodeData)

  document.querySelector(".page-section-title").textContent = `${showName} episodes`

  episodeData.forEach((episode) => {
    const clone = template.content.cloneNode(true)
    clone.querySelector(".episode-card").dataset.species = "dog"
    clone.querySelector("h3").textContent = episode.name
    clone.querySelector(".episode-description").innerHTML = episode.summary
    clone.querySelector(
      ".episode-age"
    ).textContent = `Season ${episode.season} episode ${episode.number} (${episode.airdate})`
    clone.querySelector(".episode-card-photo img").src = episode.image
      ? episode.image.original
      : "images/fallback.jpg"
    clone.querySelector(".episode-card-photo img").alt = `episode ${episode.name}`
    wrapper.appendChild(clone)
  })

  document.querySelector(".list-of-episodes").appendChild(wrapper)
}

const fetchButton = document.getElementById("fetchButton")
const searchInput = document.getElementById("searchInput")

fetchButton.addEventListener("click", () => {
  const listOfEpisodes = document.querySelector(".list-of-episodes")
  listOfEpisodes.innerHTML = ""
  fetchEpisodes(searchInput.value)
})
