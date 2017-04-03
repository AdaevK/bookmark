package core

import (
	"io/ioutil"
	"gopkg.in/yaml.v2"
)

type Base struct {
	Port   string `yaml:"port"`
	Debug  bool   `yaml:"debug"`
}

type Database struct {
	Host     string `yaml:"host"`
	User     string `yaml:"user"`
	Password string `yaml:"password"`
	Name     string `yaml:"name"`
}

type Config struct {
	Base     `yaml:"base"`
	Database `yaml:"database"`
}

func LoadConfig(filename string) (config Config, err error) {
	configFile, err := ioutil.ReadFile(filename)
	if err != nil {
		return
	}
	err = yaml.Unmarshal(configFile, &config)
	return
}
