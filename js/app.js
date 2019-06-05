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
  let imgSize = "w92/";

  // event handlers
  $("#titleSearchBtn").on("click", function(e) {
    let keyword = $("#filter-search")
      .val()
      .trim();
    history.pushState({ page: "search" }, null, "/search/" + keyword);
    // console.log("pushed State in searchMovie() : search");
    $("#content").empty();
    searchMovie(keyword);
  });

  $("#filter-search").on("keypress", function(e) {
    let keyword = $("#filter-search")
      .val()
      .trim();
    if (e.keyCode == 13) {
      history.pushState({ page: "search" }, null, "/search/" + keyword);
      // console.log("pushed State in searchMovie() : search");
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
        // console.log(data);
        $.each(data.results, function(i, obj) {
          $("#content").append(`
            <div class="col-md-4 mb-3">
              <img src="${imgUrl}${imgSize}${obj.poster_path}" itemId="${obj.id}" class="img-fluid poster rounded float-left mr-3"><br>
              <p class="mt-5">${
                obj.title
              } <br><small>${obj.release_date}</small></p>
            </div>
            `);
        });
        $(".poster").on("click", function() {
          let itemId = $(this).attr("itemId");
          history.pushState({ page: "detail" }, null, "/movie/" + itemId);
          //console.log("pushed State in getItemDetail : detail");
          getItemDetail(itemId);
        });
      }
    });
  }
  makeItems();

  function getItemDetail(itemId) {
    url = "https://api.themoviedb.org/3/movie/";
    $.ajax({
      url: url + itemId + key,
      dataType: "jsonp"
    })
      .done(function(obj) {
        let imgSize = "w300/";
        $("#overview").append(`
        <div class="col-md-4  py-5 mb-3">
          <img src="${imgUrl}${imgSize}${obj.poster_path}" itemId=${obj.id} class="img-fluid poster rounded">
        </div>
        <div class="col-md-8">
        <h3 class="mt-5">${
          obj.title
        } <br><small>${obj.release_date}</small></h3>
        <h3>Overview</h3>
        <p class="lead">${obj.overview}</p>
        </div>
        `);
      })
      .fail(function(jqxhr, textStatus, error) {
        console.log("getItemDetail ajax error: " + textStatus + ", " + error);
      });
  }

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
        // console.log("pushed State in searchMovie() : search");
        $.each(data.results, function(i, obj) {
          if (obj.poster_path != null) {
            $("#content").append(`
            <div class="col-md-6 mb-3">
              <img src="${imgUrl}${imgSize}${
              obj.poster_path
            }" class="img-fluid rounded float-left mr-3"><br>
              <p class="mt-5">${obj.title} <br><small>${
              obj.release_date
            }</small></p>
            </div>
            `);
          } else {
            $("#content").append(`
            <div class="col-md-6 mb-3">
              <img src="https://via.placeholder.com/92x138.png" class="img-fluid rounded float-left mr-3"><br>
              <p class="mt-5">${obj.title} <br><small>${
              obj.release_date
            }</small></p>
            </div>
            `);
          }
        });
      }
    });
  }
  searchMovie();
});
