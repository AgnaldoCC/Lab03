package br.com.lab3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.lab3.model.Serie;

/**
 * Created by Agnaldo on 12/07/2017.
 */
@Repository
public interface SerieRepository extends JpaRepository<Serie,Long> {
}