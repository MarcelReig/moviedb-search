const baseURL="https://api.themoviedb.org/3/",key="?api_key=0721fb3764192b1547c7f9a484a2391a",key2="&api_key=0721fb3764192b1547c7f9a484a2391a",imgUrl="https://image.tmdb.org/t/p/",imgSize="w500/";$(document).ready(function(){!function(){let e=$("#movies");suburl="discover/movie?sort_by=popularity.desc",$.ajax({url:baseURL+suburl+key2,type:"GET",success:function(i){$.each(i,function(i,t){(e=$("<li></li>")).append($("<img>").attr("src",imgUrl+imgSize+t.poster_path))})}})}()});