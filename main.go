package main

import (
	"bitbucket.org/kirill_adaev/bookmarks/core"
	"flag"
)

func main() {
	configFile := flag.String("config", "config.yml", "config file")
	flag.Parse()

	var (
		err error
		app = core.Application{}
	)

	if app.Config, err = core.LoadConfig(*configFile); err != nil {
		panic(err)
	}

	if err := app.Config.LoadKey("secret.yml"); err != nil {
		panic(err)
	}

	if err := app.Run(); err != nil {
		panic(err)
	}
}
