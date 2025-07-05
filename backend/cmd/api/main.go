package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type application struct {
	Domain string
}

func main() {
	// TODO: Set application config
	var app application

	// TODO: Read from command line

	// TODO: Connect to database

	app.Domain = "example.com"

	log.Println("Listening on port", port)

	// TODO: Start a web server
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}
