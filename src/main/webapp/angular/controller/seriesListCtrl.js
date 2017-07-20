angular.module('seriesList', []).controller("seriesController", function($scope, $http, seriesAPI){

  $scope.series = [];
  $scope.minhasSeries = [];
  $scope.watchList = [];
  $scope.userLogado;
  $scope.pesquisou = "";
  
  
  // Requisições na API do IMDB
  
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
  
  $scope.adicionaSerie = function(serie){
		var convertida = converter(serie);
	    if (!$scope.hasLogado()){
	      alert("Você precisa fazer login para adicionar séries ao seu perfil.");
	    }
	    if (!$scope.containsMinhasSeries(serie)){
	      var promise = seriesAPI.getFullSerieFromAPI(convertida);
	      promise.then(function(response){
	        var completa = response.data;
	        var plot = completa.Plot.substring(0,220) + "...";;
	        var add = converter(completa);
	        add.plot = plot;
	        $scope.minhasSeries.push(add);
	        $scope.putInProfile(add);
	        alert(add.title + " adicionado(a) ao seu perfil.")
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
	  
	  
	// Requisições na API Rest
	  
	  $scope.deleteProfile = function(serie){
		  var s = converter(serie);
	      $http({
	          method: 'DELETE',
	          url: 'http://localhost:8080/user/removerPerfil/' 
	            + $scope.userLogado.id + "/" + s.imdbID,
	        }).then(function (response) {
	          });
	    }

	    $scope.putInWatchList = function(serie){
	      $http({
	          method: 'POST',
	          url: 'http://localhost:8080/user/watchList/' + $scope.userLogado.id,
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
	          limparCampo("input[name = formCadastro]");
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
	              limparCampo("input[name = formCadastro]");
	            }
	            }, function errorCallback(response) {
	             console.log("Deu erro");
	            });
	    };
	    
	 //Outros Métodos

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
  
  var limparCampo = function(campo) {
		$(campo).val("");
	};

  
  //Pega as séries do usuário e coloca no scope
  $scope.pegaSeries = function(){
      if($scope.userLogado.profile != undefined){
        $scope.minhasSeries = angular.copy($scope.userLogado.profile);
      }
      if($scope.userLogado.watchlist != undefined){
        $scope.watchlist = angular.copy($scope.userLogado.watchlist);
      }
    }

  $scope.deletarMinhasSeries = function(serie){
    var index = $scope.minhasSeries.indexOf(serie);
    decisao = confirm("Deseja excluir a série " + serie.title + " do seu perfil?");
    if (decisao){
      $scope.minhasSeries.splice(index, 1);
      $scope.deleteProfile(serie);
      alert ("A série "+serie.title+" foi excluída do seu perfil");
    }
  };

  $scope.containsWatchList = function(serie){
    return contains($scope.watchList, serie);
  };

   $scope.adicionarWatchlist = function(serie){
    if (!$scope.hasLogado()){
      alert("Você precisa estar logado para adicionar uma série na WatchList.");
    }
    convertida = converter(serie);
    if (contains($scope.minhasSeries, convertida)){
      alert("Você já possui essa série no seu perfil.");
    }else{
      if (!contains($scope.watchList, convertida)){
        $scope.watchList.push(convertida);
        $scope.putInWatchList(convertida);
        alert(convertida.title + " adicionada a sua WatchList")
      }else{
        alert("Você já adicionou " + convertida.title + " a sua WatchList");
      }
    }
  };

  $scope.adicionaMinhaNota = function(minhaNota, serie){
    serie.myRating = minhaNota;
    limparCampo("input[name = modal]");
    $scope.putInProfile(serie);
  }

  $scope.adicionaUltimoEpi = function(ultimoEpi, serie){
    serie.lastEpisode = ultimoEpi;
    limparCampo("input[name = modal]");
    $scope.putInProfile(serie);
  }

  $scope.pesquisa = function(){
    return $scope.pesquisou == "Movie not found!";
  }
  
  
  //Converte as séries para os atributos começando com letras minúsculas
  var converter = function (serie){
    var json = {
      title: serie.Title,
      imdbRating: serie.imdbRating,
      rated: serie.Rated,
      poster: serie.Poster,
      imdbID: serie.imdbID
    };
    return json;
  }

  

    $scope.deslogar = function(){
    decisao = confirm("Deseja realmente deslogar?");
    if (decisao){
      $scope.userLogado = null;
      $scope.minhasSeries = [];
      $scope.watchlist = [];
      limparCampo("input[name = formCadastro]");
    }
    };
    
  $scope.hasLogado = function(){
      return $scope.userLogado != null;
    };


});