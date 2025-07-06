package data

import (
	"backend/internal/models"
	"time"
)

func GetMoviesData() []models.Movie {
	var movies []models.Movie

	// The Shawshank Redemption
	rd, _ := time.Parse("2006-01-02", "1994-09-23")
	shawshank := models.Movie{
		ID:          1,
		Title:       "The Shawshank Redemption",
		Description: "Two inmates find hope and redemption in prison.",
		ReleaseDate: rd,
		RunTime:     142,
		MPAARating:  "R",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	// The Godfather
	rd, _ = time.Parse("2006-01-02", "1972-03-15")
	godfather := models.Movie{
		ID:          2,
		Title:       "The Godfather",
		Description: "Crime dynasty patriarch passes control to his son.",
		ReleaseDate: rd,
		RunTime:     208,
		MPAARating:  "R",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	// The Dark Knight
	rd, _ = time.Parse("2006-01-02", "2008-07-18")
	darkKnight := models.Movie{
		ID:          3,
		Title:       "The Dark Knight",
		Description: "Batman battles the Joker in Gotham City.",
		ReleaseDate: rd,
		RunTime:     152,
		MPAARating:  "PG-13",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	// The Godfather: Part II
	rd, _ = time.Parse("2006-01-02", "1974-12-12")
	godfatherII := models.Movie{
		ID:          4,
		Title:       "The Godfather: Part II",
		Description: "Vito Corleone's rise to power in organized crime.",
		ReleaseDate: rd,
		RunTime:     200,
		MPAARating:  "R",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	// 12 Angry Men
	rd, _ = time.Parse("2006-01-02", "1957-04-10")
	angryMen := models.Movie{
		ID:          5,
		Title:       "12 Angry Men",
		Description: "Juror challenges the majority in a murder trial.",
		ReleaseDate: rd,
		RunTime:     96,
		MPAARating:  "NR",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, shawshank, godfather, darkKnight, godfatherII, angryMen)
	return movies
}
