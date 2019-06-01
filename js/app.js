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
const imgSize = "w500/";

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
      type: "GET",
      success: function(movies) {
        $.each(movies, function(i, movie) {
          $movies = $("<li></li>");
          $movies.append(
            $("<img>").attr("src", imgUrl + imgSize + movie.poster_path)
          );
        });
      }
    });
  }
  makeItems();
});
