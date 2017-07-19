package br.com.lab3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.lab3.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
}