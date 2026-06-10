const input = document.getElementById("movie");
const btnSearch = document.getElementById("btnSearch");
const movies = document.querySelector(".movies");
const movieDetails = document.querySelector(".movie-details");

btnSearch.addEventListener("click", () => {
  searchMovie();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btnSearch.click();
  }
});

async function searchMovie() {
  movies.innerHTML = "<h2>Loading movies...<h2>";
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=1e6a79fa&s=${input.value}`,
  );
  const data = await response.json();

  if (data.Response === "False") {
    movies.innerHTML = "<h2>Movie not found</h2>";
    return;
  }

  movies.innerHTML = "";
  data.Search.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie-card");

    if (movie.Poster === "N/A") {
      div.innerHTML = `
    <div class="no-poster">🎬 No Image</div>
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
    `;
    } else {
      div.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}">
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
    `;
    }

    div.addEventListener("click", async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=1e6a79fa&i=${movie.imdbID}`,
      );
      const details = await response.json();
      movieDetails.style.display = "block";
      movieDetails.innerHTML = `
      <h3>${details.Title}</h3>
      <p>⭐ IMDb: ${details.imdbRating}</p>
      <p>📅 ${details.Year}</p>
      <p>🎭 ${details.Genre}</p>
      <p>🎬 ${details.Director}</p>
      <p>${details.Plot}</p>
      `;

      movieDetails.scrollIntoView({
        behavior: "smooth",
      });
    });

    movies.appendChild(div);
  });

  console.log(data);
}
