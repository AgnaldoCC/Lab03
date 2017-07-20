angular.module('seriesList', []).controller("seriesController", function($scope, $http, seriesAPI){

  $scope.series = [];
  $scope.minhasSeries = [];
  $scope.watchList = [];
  $scope.userLogado;
  $scope.pesquisou = "";

  $scope.getSeries = function(nome){
    $scope.series = [];
    $scope.pesquisou = "";
    var promise = seriesAPI.getSeriesFromAPI(nome);
    promise.then(function(response){
      if(response.data.Response == "False"){
          $scope.pesquisou = response.data.Error;
      }else{
          $scope.series = response.data.Search;
      };

    }, function error(response){
      console.log("Erro");
    })
    return promise;
  };

  var contains = function(array, serie){
    for (var i = 0; i < array.length; i++) {
      if (array[i].imdbID == serie.imdbID){
        return true;
      }
    }return false;
  };

  $scope.containsMinhasSeries = function(serie){
    return contains($scope.minhasSeries, serie);
  };

  $scope.adicionaSerie = function(serie){
    if (!$scope.hasLogado()){
      alert("Você precisa fazer login para adicionar séries ao seu perfil.");
    }
    if (!$scope.containsMinhasSeries(serie)){
      var promise = seriesAPI.getFullSerieFromAPI(serie);
      promise.then(function(response){
        var completa = response.data;
        var convertida = converter(completa);
        console.log(convertida);
        $scope.minhasSeries.push(convertida);
        $scope.putInProfile(convertida);
        alert(serie.Title + " adicionado(a) ao seu perfil.")
      }).catch(function(error){
        console.log(error);
      });
    }else{
      alert("Você já adicionou " + serie.Title + " ao seu perfil.");
    };

    if (contains($scope.watchList, serie)){
      var index = $scope.watchList.indexOf(serie);
      $scope.watchList.splice(index, 1);
    }
  };

  $scope.deletarMinhasSeries = function(serie){
    var index = $scope.minhasSeries.indexOf(serie);
    decisao = confirm("Deseja excluir a série " + serie.Title + " do seu perfil?");
    if (decisao){
      $scope.minhasSeries.splice(index, 1);
      $scope.deleteProfile(serie);
      alert ("A série "+serie.Title+" foi excluída do seu perfil");
    }
  };

  $scope.containsWatchList = function(serie){
    return contains($scope.watchList, serie);
  };

   $scope.adicionarWatchlist = function(serie){
    if (!$scope.hasLogado()){
      alert("Você precisa estar logado para adicionar uma série na WatchList.");
    }
    convertida = $scope.converter(serie);
    if (contains($scope.minhasSeries, serie)){
      alert("Você já possui essa série no seu perfil.");
    }else{
      if (!contains($scope.watchList, serie)){
        $scope.watchList.push(serie);
        $scope.putInWatchList(convertida);
        alert(serie.Title + " adicionada a sua WatchList")
      }else{
        alert("Você já adicionou " + serie.Title + " a sua WatchList");
      }
    }
  };

  $scope.adicionaMinhaNota = function(minhaNota, serie){
    serie.nota = minhaNota;
    $scope.putInProfile(serie);
  }

  $scope.adicionaUltimoEpi = function(ultimoEpi, serie){
    serie.ultimoEpi = ultimoEpi;
    $scope.putInProfile(serie);
  }

  $scope.pesquisa = function(){
    return $scope.pesquisou == "Movie not found!";
  }

  var converter = function (serie){
    var json = {
      title: serie.Title,
      plot: serie.Plot,
      imdbRating: serie.imdbRating,
      rated: serie.Rated,
      myRating: serie.nota,
      lastEpisode: serie.ultimoEpi,
      poster: serie.Poster,
      imdbID: serie.imdbID
    };
    return json;
  }

  $scope.deleteWatchList = function(serie){
      $http({
          method: 'DELETE',
          url: 'http://localhost:8080/user/removeWatchList/' 
            + $scope.userLogado.id + "/" + serie.imdbID,
        }).then(function successCallback(response) {
          }, function errorCallback(response) {
           console.log("Erro!");
          });
  }

  $scope.deleteProfile = function(serie){
      $http({
          method: 'DELETE',
          url: 'http://localhost:8080/user/removeProfile/' 
            + $scope.userLogado.id + "/" + serie.imdbID,
        }).then(function successCallback(response) {
          }, function errorCallback(response) {
           console.log("Erro!");
          });
    }

    $scope.pegaSeries = function(){
      if($scope.userLogado.profile != undefined){
        $scope.minhasSeries = angular.copy($scope.userLogado.profile);
      }
      if($scope.userLogado.watchlist != undefined){
        $scope.watchlist = angular.copy($scope.userLogado.watchlist);
      }
    }

    $scope.putInWatchList = function(serie){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/user/watchlist/' + $scope.userLogado.id,
          data: serie
        }).then(function(response) {
          });
    };

    $scope.putInProfile = function(serie){
      $http({
            method: 'POST',
            url: 'http://localhost:8080/user/perfil/' + $scope.userLogado.id,
            data: serie
          }).then(function successCallback(response) {
            }, function errorCallback(response) {
             console.log("Deu erro no perfil");
            });
    };

    $scope.cadastro = function(user){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/users',
          data: user  
        }).then(function(response) {
          alert(user.nome + " cadastrado com sucesso.");
          console.log(response.data);
          });
    };

    $scope.login = function(user){
      $http({
            method: 'POST',
            url: 'http://localhost:8080/users/login',
            data: user 
          }).then(function(response) {
            if(response.data.nome == null){
              alert("Email ou senha incorretos. Tente novamente.");
            }else{
              alert("Bem vindo ao Controle de Séries.");
              $scope.userLogado = response.data;
              $scope.pegaSeries();
            }
            }, function errorCallback(response) {
             console.log("Deu erro");
            });
    };

    $scope.deslogar = function(){
    decisao = confirm("Deseja realmente deslogar?");
    if (decisao){
      $scope.userLogado = null;
      $scope.mySeries = [];
      $scope.watchlist = [];
    }
    };
    
  $scope.hasLogado = function(){
      return $scope.userLogado != null;
    };


});