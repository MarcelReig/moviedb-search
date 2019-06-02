/**
 * Author : Marcel Reig
 * Description :
 *    Movie Database with functions
 *      - list popular movies
 *      - get detail information for selected movie
 *      - search movie
 *    Data from themoviedb Open API
 */

const baseURL = "https://api.themoviedb.org/3/";
const key = "?api_key=0721fb3764192b1547c7f9a484a2391a";
const key2 = "&api_key=0721fb3764192b1547c7f9a484a2391a";
const imgUrl = "https://image.tmdb.org/t/p/";
const imgSize = "w92/";

$(document).ready(function() {
  // event handlers
  // $("#titleSearchBtn").on("click", function(e) {
  //   let keyword = $("#filter-search").val();
  // });

  function makeItems() {
    let $movies = $("#movies");
    suburl = "discover/movie?sort_by=popularity.desc"; // sort popular movies
    $.ajax({
      url: baseURL + suburl + key2,
      // url: "books.json",
      dataType: "json",
      type: "get",
      success: function(datos) {
        console.log(datos);
        $.each(datos.results, function(i, obj) {
          $("#popular-movies").append(`
          <div class="col-md-6 mb-3">
            <img src="${imgUrl}${imgSize}${obj.poster_path}" class="img-fluid rounded float-left mr-3"><br>
            <p class="mt-5">${obj.title} ${obj.release_date}</p>
          </div>
            `);
        });
      }
    });
  }

  makeItems();
});
