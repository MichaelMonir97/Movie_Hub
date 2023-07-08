const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTU2YjU2ZmUyNzE0ZGE0NTdmMDMxMTgxYTdjMjM0NSIsInN1YiI6IjYzZTJjMTIyYWY4NWRlMDBiMmJmM2RiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CTun-EeonMOKvrekH9ct5roCQJsuUOXopWK2qaNOTvA",
  },
};

const Base_Url =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const Search_Url = 'https://api.themoviedb.org/3/search/movie?query="';
const Img_Path = "https://image.tmdb.org/t/p/w1280";
const form = document.querySelector("form");
const search = document.querySelector(".search");
const main = document.querySelector(".main");
const searchIcon = document.querySelector("form i");
const errorContainer = document.querySelector(".error h2");
const logo = document.querySelector("header img");
function FetchingMovies(url) {
  main.innerHTML = "";
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        EmptyError();
        data.results.map((movieData) => {
          const movieDiv = document.createElement("div");
          const movieImg = movieData.backdrop_path
            ? Img_Path + movieData.backdrop_path
            : "./no-image-placeholder.webp";
          movieDiv.classList.add("movie");
          movieDiv.innerHTML = `
        <img src= ${movieImg} alt='movie_img'/>
        <div class="movie-info">
          <h3 class="title">${movieData.title}</h3>
          <span class="orange">${movieData.vote_average.toFixed(1)}</span>
        </div>
        <div class="overview">
          <h3>OverView</h3>
          <p>
          ${movieData.overview}
          </p>
        </div>
        `;
          main.appendChild(movieDiv);
        });
      } else {
        Erroring(search.value);
      }
    })
    .catch((err) => (errorContainer.innerHTML = err));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (search && search.value.trim() != "") {
    FetchingMovies(Search_Url + search.value);
  }
});

searchIcon.addEventListener("click", () => {
  if (search && search.value.trim() != "") {
    FetchingMovies(Search_Url + search.value);
  }
});

FetchingMovies(Base_Url);
logo.addEventListener("click", () => FetchingMovies(Base_Url));

function Erroring(text) {
  errorContainer.parentElement.classList.add("active");
  errorContainer.innerHTML = `Sorry, the movie you searched for, ${text}, does not exist.
  Please try again with a different movie title.`;
}
function EmptyError() {
  errorContainer.parentElement.classList.remove("active");
  errorContainer.innerHTML = "";
}
