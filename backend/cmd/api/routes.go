package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {
	mux := chi.NewRouter()
	mux.Use(middleware.Recoverer)
	mux.Use(app.enableCORS)

	mux.Get("/", app.Home)
	mux.Post("/authenticate", app.authenticate)
	mux.Get("/refresh", app.refreshToken)
	mux.Get("/logout", app.logout)
	mux.Get("/movies", app.AllMovies)
	mux.Get("/movie/{id}", app.GetMovie)
	mux.Get("/genres", app.AllGenres)

	mux.Route("/admin", func(mux chi.Router) {
		mux.Use(app.authRequired)

		mux.Get("/movies", app.MovieCatalog)
		mux.Get("/movie/{id}", app.GetMovieAdmin)
		mux.Put("/movie/0", app.AddMovie)
		mux.Patch("/movie/{id}", app.UpdateMovie)
		mux.Delete("/movie/{id}", app.DeleteMovie)
	})

	return mux
}
