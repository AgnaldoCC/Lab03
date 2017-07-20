package br.com.lab3.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.lab3.model.Serie;
import br.com.lab3.model.User;
import br.com.lab3.service.SerieService;
import br.com.lab3.service.UserService;

/**
 * Created by Agnaldo on 12/07/2017.
 */

@RequestMapping("/user/")
@RestController
public class SerieController {

    @Autowired
    SerieService serieService;
    @Autowired
    UserService userService;

    @RequestMapping(method = RequestMethod.POST, value = "perfil/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Serie> putProfile(@RequestBody Serie serie, @PathVariable("id") Long id) {

        Serie cadastrada = serieService.cadastroSerie(serie);
        User cadastrado = userService.getUserById(id);
        cadastrado.addProfile(cadastrada);
        userService.cadastro(cadastrado);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @RequestMapping(method = RequestMethod.POST, value = "watchList/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Serie> putWatchlist(@RequestBody Serie serie, @PathVariable Long id) {
    	
    	Serie cadastrada = serieService.cadastroSerie(serie);
        User cadastrado = userService.getUserById(id);
        cadastrado.addWatchlist(cadastrada);
        userService.cadastro(cadastrado);
        return new ResponseEntity<>(HttpStatus.CREATED);
	}

    @RequestMapping(method = RequestMethod.DELETE, value = "removerPerfil/{id}/{id2}")
    public ResponseEntity<String> deleteProfile(@PathVariable Long id, @PathVariable String id2) {

    	User encontrado = userService.getUserById(id);
		encontrado.removeProfile(id2);
		userService.cadastro(encontrado);
		return new ResponseEntity<>("Serie removida com sucesso", HttpStatus.OK);

    }
    
}