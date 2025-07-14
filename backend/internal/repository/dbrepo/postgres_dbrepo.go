package dbrepo

import (
	"backend/internal/models"
	"context"
	"database/sql"
	"fmt"
	"time"
)

type PostgresDBRepo struct {
	DB *sql.DB
}

const dbTimeout = time.Second * 5

func (m *PostgresDBRepo) Connection() *sql.DB {
	return m.DB
}

func (m *PostgresDBRepo) AllMovies(genre ...int) ([]*models.Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	where := ""
	if len(genre) > 0 {
		where = fmt.Sprintf("where id in (select movie_id from movies_genres where genre_id = %d)", genre[0])
	}

	query := fmt.Sprintf(`
		select
			id, title, release_date, runtime, mpaa_rating, description,
			coalesce(image, ''), created_at, updated_at
		from
			movies %s
		order by
			title
	`, where)

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var movies []*models.Movie
	for rows.Next() {
		var movie models.Movie
		err := rows.Scan(
			&movie.ID,
			&movie.Title,
			&movie.ReleaseDate,
			&movie.RunTime,
			&movie.MPAARating,
			&movie.Description,
			&movie.Image,
			&movie.CreatedAt,
			&movie.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		movies = append(movies, &movie)
	}

	return movies, nil
}

func (m *PostgresDBRepo) GetMovieByID(id int) (*models.Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		select
			id, title, release_date, runtime, mpaa_rating, description,
			coalesce(image, ''), created_at, updated_at
		from
			movies
		where
			id = $1
	`

	var movie models.Movie
	movieRow := m.DB.QueryRowContext(ctx, query, id)
	err := movieRow.Scan(
		&movie.ID,
		&movie.Title,
		&movie.ReleaseDate,
		&movie.RunTime,
		&movie.MPAARating,
		&movie.Description,
		&movie.Image,
		&movie.CreatedAt,
		&movie.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	query = `
			select g.id, g.genre from movies_genres mg
			left join genres g on mg.genre_id = g.id
			where mg.movie_id = $1 order by g.genre
		`

	genreRows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, err
	}
	defer genreRows.Close()

	var genres []*models.Genre
	for genreRows.Next() {
		var genre models.Genre
		err := genreRows.Scan(
			&genre.ID,
			&genre.Genre,
		)
		if err != nil {
			return nil, err
		}

		genres = append(genres, &genre)
	}
	movie.Genres = genres

	return &movie, err
}

func (m *PostgresDBRepo) UpdateMovieByID(id int) (*models.Movie, []*models.Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		select
			id, title, release_date, runtime, mpaa_rating, description,
			coalesce(image, ''), created_at, updated_at
		from
			movies
		where
			id = $1
	`

	var movie models.Movie
	movieRow := m.DB.QueryRowContext(ctx, query, id)
	err := movieRow.Scan(
		&movie.ID,
		&movie.Title,
		&movie.ReleaseDate,
		&movie.RunTime,
		&movie.MPAARating,
		&movie.Description,
		&movie.Image,
		&movie.CreatedAt,
		&movie.UpdatedAt,
	)

	if err != nil {
		return nil, nil, err
	}

	query = `
		select g.id, g.genre from movies_genres mg
		left join genres g on (mg.genre_id = g.id)
		where mg.movie_id = $1
		order by g.genre
		`

	genreRows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, nil, err
	}
	defer genreRows.Close()

	var genres []*models.Genre
	var genresArray []int

	for genreRows.Next() {
		var genre models.Genre
		err := genreRows.Scan(
			&genre.ID,
			&genre.Genre,
		)
		if err != nil {
			return nil, nil, err
		}

		genres = append(genres, &genre)
		genresArray = append(genresArray, genre.ID)
	}
	movie.Genres = genres
	movie.GenresArray = genresArray

	var allGenres []*models.Genre

	query = `select id, genre from genres order by genre`
	genreRows, err = m.DB.QueryContext(ctx, query)
	if err != nil && err != sql.ErrNoRows {
		return nil, nil, err
	}
	defer genreRows.Close()

	for genreRows.Next() {
		var genre models.Genre
		err := genreRows.Scan(
			&genre.ID,
			&genre.Genre,
		)
		if err != nil {
			return nil, nil, err
		}

		allGenres = append(allGenres, &genre)
	}

	return &movie, allGenres, err
}

func (m *PostgresDBRepo) GetUserByEmail(email string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		select
			id, first_name, last_name, email, password, created_at, updated_at
		from
			users
		where
			email = $1
	`

	var user models.User
	row := m.DB.QueryRowContext(ctx, query, email)
	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m *PostgresDBRepo) GetUserByID(id int) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		select
			id, first_name, last_name, email, password, created_at, updated_at
		from
			users
		where
			id = $1
	`

	var user models.User
	row := m.DB.QueryRowContext(ctx, query, id)
	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m *PostgresDBRepo) AllGenres() ([]*models.Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, genre, created_at, updated_at from genres order by genre`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var genres []*models.Genre

	for rows.Next() {
		var genre models.Genre
		err := rows.Scan(
			&genre.ID,
			&genre.Genre,
			&genre.CreatedAt,
			&genre.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		genres = append(genres, &genre)
	}

	return genres, nil
}

func (m *PostgresDBRepo) AddMovie(movie models.Movie) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	insertMovie := `insert into movies (title, description, release_date, runtime,
						mpaa_rating, created_at, updated_at, image)
						values ($1, $2, $3, $4, $5, $6, $7, $8) returning id`

	var newID int

	err := m.DB.QueryRowContext(ctx, insertMovie,
		movie.Title,
		movie.Description,
		movie.ReleaseDate,
		movie.RunTime,
		movie.MPAARating,
		movie.CreatedAt,
		movie.UpdatedAt,
		movie.Image,
	).Scan(&newID)

	if err != nil {
		return 0, err
	}

	return newID, nil
}

func (m *PostgresDBRepo) UpdateMovie(movie models.Movie) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	stmt := `update movies set title = $1, description = $2, release_date = $3,
				runtime = $4, mpaa_rating = $5,
				updated_at = $6, image = $7 where id = $8`

	_, err := m.DB.ExecContext(ctx, stmt,
		movie.Title,
		movie.Description,
		movie.ReleaseDate,
		movie.RunTime,
		movie.MPAARating,
		movie.UpdatedAt,
		movie.Image,
		movie.ID,
	)

	if err != nil {
		return err
	}

	return nil
}

func (m *PostgresDBRepo) UpdateMovieGenres(id int, genreIDs []int) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	deleteMovie := `delete from movies_genres where movie_id = $1`
	_, err := m.DB.ExecContext(ctx, deleteMovie, id)
	if err != nil {
		return err
	}

	for _, genreId := range genreIDs {
		insertMovie := `insert into movies_genres (movie_id, genre_id) values ($1, $2)`
		_, err = m.DB.ExecContext(ctx, insertMovie, id, genreId)
		if err != nil {
			return err
		}
	}

	return nil
}

func (m *PostgresDBRepo) DeleteMovie(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	deleteMovie := `delete from movies where id = $1`
	_, err := m.DB.ExecContext(ctx, deleteMovie, id)
	if err != nil {
		return err
	}

	return nil
}
