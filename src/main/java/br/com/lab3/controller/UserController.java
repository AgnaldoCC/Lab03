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

import br.com.lab3.model.User;
import br.com.lab3.service.UserService;

/**
 * Created by Agnaldo on 11/07/2017.
 */

@RestController
public class UserController {

	@Autowired
	UserService us;

	@RequestMapping(method = RequestMethod.POST, value = "/users", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> cadastro(@RequestBody User user) {
		User cadastrado = us.cadastro(user);
		return new ResponseEntity<>(cadastrado, HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/users/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = us.getUserById(id);
		if (user.getNome() != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/users/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> login(@RequestBody User user) {		
		User logado = us.logar(user.getEmail(), user.getPassword());
		return new ResponseEntity<>(logado, HttpStatus.OK);
	}

}