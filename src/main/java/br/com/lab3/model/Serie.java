package br.com.lab3.model;

import javax.persistence.*;

/**
 * Created by Agnaldo on 12/07/2017.
 */
@Entity(name = "serie")
@Table(name = "tb_serie")
public class Serie {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column
	private String title;
	@Column
	private String plot;
	@Column
	private String imdbRating;
	@Column
	private String rated;
	@Column
	private String myRating;
	@Column
	private String lastEpisode;
	@Column
	private String poster;
	@Column
	private String imdbID;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPlot() {
		return plot;
	}

	public void setPlot(String plot) {
		this.plot = plot;
	}

	public String getImdbRating() {
		return imdbRating;
	}

	public void setImdbRating(String imdbRating) {
		this.imdbRating = imdbRating;
	}

	public String getRated() {
		return rated;
	}

	public void setRated(String rated) {
		this.rated = rated;
	}

	public String getMyRating() {
		return myRating;
	}

	public void setMyRating(String myRating) {
		this.myRating = myRating;
	}

	public String getLastEpisode() {
		return lastEpisode;
	}

	public void setLastEpisode(String lastEpisode) {
		this.lastEpisode = lastEpisode;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

	public String getImdbID() {
		return imdbID;
	}

	public void setImdbID(String imdbID) {
		this.imdbID = imdbID;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((imdbID == null) ? 0 : imdbID.hashCode());
		return result;
	}
	
	
	// Equals baseado no imdbID da série
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Serie other = (Serie) obj;
		if (this.imdbID == null) {
			if (other.imdbID != null)
				return false;
		} else if (!this.imdbID.equals(other.imdbID))
			return false;
		return true;
	}

}