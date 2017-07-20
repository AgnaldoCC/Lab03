package br.com.lab3.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

/**
 * Created by Agnaldo on 12/07/2017.
 */

@Entity(name = "user")
@Table(name = "tb_user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column
	private String nome;
	@Column
	private String email;
	@Column
	private String password;
	@OneToMany
	private List<Serie> profile = new ArrayList<>();
	@OneToMany
	private List<Serie> watchlist = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Serie> getProfile() {
		return profile;
	}

	public void setProfile(List<Serie> profile) {
		this.profile = profile;
	}

	public List<Serie> getWatchlist() {
		return watchlist;
	}

	public void setWatchlist(List<Serie> watchlist) {
		this.watchlist = watchlist;
	}

	public void addWatchlist(Serie serie) {

		this.watchlist.add(serie);
	}

	public void addProfile(Serie serie) {
		int i = profile.indexOf(serie);
		if (profile.contains(serie)) {
			profile.set(i, serie);
		} else {
			profile.add(serie);
		}
	}
	
	public boolean removeById(List<Serie> array, String id) {
		for (Serie serie : array) {
			if (serie.getImdbID().equals(id)) {
				array.remove(serie);
				return true;
			}
		}
		return false;
	}
	
	public boolean removeProfile(String id) {
		return removeById(this.profile, id);
	}
	
}