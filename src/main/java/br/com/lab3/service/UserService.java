package br.com.lab3.service;


import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.lab3.model.User;
import br.com.lab3.repository.UserRepository;

/**
 * Created by Agnaldo on 11/07/2017.
 */

@Component
public class UserService {

	@Autowired
	UserRepository ur;

	public User cadastro(User user) {
		return ur.save(user);
	}

	public Collection<User> getUsers() {

		return ur.findAll();
	}

	public User logar(String email, String password) {
		List<User> users = ur.findAll();
		for (User user : users) {
			if (user.getEmail().equals(email)) {
				if (user.getPassword().equals(password)) {
					return user;
				}
			}
		}
		return new User();
	}
	
	public User getUserById(Long id) {
		
		User user = ur.findOne(id);
		if(user != null) {
			return user;
		}
		return new User();
		
	}

}
