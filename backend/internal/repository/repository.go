package repository

import (
	"backend/internal/models"
	"database/sql"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	AllMovies(genre ...int) ([]*models.Movie, error)
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
	GetMovieByID(id int) (*models.Movie, error)
	UpdateMovieByID(id int) (*models.Movie, []*models.Genre, error)
	AllGenres() ([]*models.Genre, error)
	AddMovie(movie models.Movie) (int, error)
	UpdateMovieGenres(id int, genreIDs []int) error
	UpdateMovie(movie models.Movie) error
	DeleteMovie(id int) error
}
