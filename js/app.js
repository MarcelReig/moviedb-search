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
  let imgSize = "w300/";

  // event handlers
  $("#titleSearchBtn").on("click", function(e) {
    let keyword = $("#filter-search")
      .val()
      .trim();
    $("#content").empty();
    $("#overview").empty();
    searchMovie(keyword);
  });

  $("#filter-search").on("keypress", function(e) {
    let keyword = $("#filter-search")
      .val()
      .trim();
    if (e.keyCode == 13) {
      $("#content").empty();
      $("#overview").empty();
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
        $.each(data.results, function(i, obj) {
          $("#content").append(`
          <div class="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
              <div class="card" style="min-height: 500px;">
                <img src="${imgUrl}${imgSize}${obj.poster_path}" itemId="${obj.id}" class="card-img-top poster" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${obj.title}</h5>
                  <p class="card-text">${obj.release_date}</p>
                </div>
                <div class="card-footer bg-transparent border-white"><a href="#" class="btn btn-outline-dark poster" itemId="${
                  obj.id
                }">Overview</a></div>
              </div>
          </div>
          `);
        });
        $(".poster").on("click", function() {
          let itemId = $(this).attr("itemId");
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
        let imgSize = "w780/";
        $("#overview").empty();
        $("#overview").append(`
        <div class="row wrapp-overview">
        <div class="col-md-4  pt-5 mb-3">
          <img src="${imgUrl}${imgSize}${obj.poster_path}" itemId=${obj.id} class="img-fluid poster rounded">
        </div>
        <div class="col-md-8">
        <button type="button" class="close close-overview my-3 mr-3" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        <h3 class="mt-5">${
          obj.title
        } <br><small>${obj.release_date}</small></h3>
        <h3>Overview</h3>
        <p class="lead">${obj.overview}</p>
        </div>
        </div
        `);
      })

      .fail(function(jqxhr, textStatus, error) {
        console.log("getItemDetail ajax error: " + textStatus + ", " + error);
      });

    $(document).on("click", "button.close-overview", function() {
      console.log("remove-overview-clicked");
      $(".wrapp-overview").remove();
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
        $.each(data.results, function(i, obj) {
          if (obj.poster_path != null) {
            $("#content").append(`
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
            <div class="card" style="min-height: 500px;">
              <img src="${imgUrl}${imgSize}${obj.poster_path}" itemId="${
              obj.id
            }" class="card-img-top poster" alt="Card image cap">
              <div class="card-body">
              <h5 class="card-title">${obj.title}</h5>
              <p class="card-text">${obj.release_date}</p>
              </div>
              <div class="card-footer bg-transparent border-white"><a href="#" class="btn btn-outline-dark poster" itemId="${
                obj.id
              }">Overview</a></div>
            </div>
            </div>
            `);
          } else {
            $("#content").append(`
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
            <div class="card" style="min-height: 500px;">
              <img src="https://via.placeholder.com/300x450.png" class="card-img-top poster" itemId="${
                obj.id
              }" alt="Card image cap">
              <div class="card-body">
              <h5 class="card-title">${obj.title}</h5>
              <p class="card-text">${obj.release_date}</p>
              </div>
              <div class="card-footer bg-transparent border-white"><a href="#" class="btn btn-outline-dark poster" itemId="${
                obj.id
              }">Overview</a></div>
            </div>
        </div>
            `);
          }
        });
        $(".poster").on("click", function() {
          let itemId = $(this).attr("itemId");
          getItemDetail(itemId);
        });
      }
    });
  }
  searchMovie();
});
