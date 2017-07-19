package br.com.lab3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.lab3.model.Serie;
import br.com.lab3.repository.SerieRepository;

/**
 * Created by Agnaldo on 12/07/2017.
 */

@Component
public class SerieService {

    @Autowired
    SerieRepository sr;

    public Serie cadastroSerie(Serie serie) {

        return sr.save(serie);

    }

    public Serie getSerieById(long id) {

        if(sr.exists(id)) {
            return sr.findOne(id);
        }
        return new Serie();

    }

    public boolean removeSerie(long id) {

        if(sr.exists(id)) {
            sr.delete(id);
            return true;
        }
        return false;
    }
    

}