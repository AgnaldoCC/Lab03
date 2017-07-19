angular.module("seriesList").service("seriesAPI",function($http){

	this.getSeriesFromAPI = function(nome){
		return $http.get('http://www.omdbapi.com/?s=' + nome + '&type=series&apikey=93330d3c');
	}

	this.getFullSerieFromAPI = function(serie){
		return $http.get('https://omdbapi.com/?i=' + serie.imdbID + '&plot=full&apikey=93330d3c');
	}
});