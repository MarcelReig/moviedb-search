/**
 * Author : Marcel Reig
 * Description :
 *    Movie Database with functions
 *      - list popular movies
 *      - search movie
 *      - get detail information for selected movie
 *    Data from themoviedb Open API
 */

$(document).ready(function() {
  // variables
  const baseURL = "https://api.themoviedb.org/3/";
  const key = "?api_key=0721fb3764192b1547c7f9a484a2391a";
  const byPopularity = "discover/movie?sort_by=popularity.desc";
  const key2 = "&api_key=0721fb3764192b1547c7f9a484a2391a";
  const imgUrl = "https://image.tmdb.org/t/p/";
  const imgSize = "w92/";

  // event handlers
  $("#titleSearchBtn").on("click", function(e) {
    let keyword = $("#filter-search")
      .val()
      .trim();
    history.pushState({ page: "search" }, null, "/search/" + keyword);
    console.log("pushed State in searchMovie() : search");
    $("#content").empty();
    searchMovie(keyword);
  });

  $("#filter-search").on("keypress", function(e) {
    let keyword = $("#filter-search")
      .val()
      .trim();
    if (e.keyCode == 13) {
      history.pushState({ page: "search" }, null, "/search/" + keyword);
      console.log("pushed State in searchMovie() : search");
      $("#content").empty();
      searchMovie(keyword);
    }
  });

  // List popular movies
  function makeItems() {
    $.ajax({
      url: baseURL + byPopularity + key2,
      dataType: "json",
      type: "get",
      success: function(data) {
        console.log(data);
        $.each(data.results, function(i, obj) {
          $("#content").append(`
            <div class="col-md-6 mb-3">
              <img src="${imgUrl}${imgSize}${obj.poster_path}" class="img-fluid rounded float-left mr-3"><br>
              <p class="mt-5">${
                obj.title
              } <br><small>${obj.release_date}</small></p>
            </div>
            `);
        });
      }
    });
  }
  makeItems();

  // Search function
  function searchMovie(keyword) {
    let url = "https://api.themoviedb.org/3/search/movie";
    let suburl = "?query=";
    $.ajax({
      url: url + suburl + keyword + key2,
      dataType: "jsonp",
      type: "get",
      success: function(data) {
        history.pushState({ page: "search" }, null, "/search/" + keyword);
        console.log("pushed State in searchMovie() : search");
        $.each(data.results, function(i, obj) {
          $("#content").append(`
            <div class="col-md-6 mb-3">
              <img src="${imgUrl}${imgSize}${obj.poster_path}" class="img-fluid rounded float-left mr-3"><br>
              <p class="mt-5">${
                obj.title
              } <br><small>${obj.release_date}</small></p>
            </div>
            `);
        });
      }
    });
  }
  searchMovie();
});
