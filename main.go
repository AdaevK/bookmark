package main

import (
	"flag"

	application "bookmarks/app"
)

func main() {
	configFile := flag.String("config", "config.yml", "config file")
	flag.Parse()

	app, err := application.NewApplication(*configFile, "secret.key")
	if err != nil {
		panic(err)
	}

	app.RunServer()
}
