package core

import (
	"io/ioutil"
	"gopkg.in/yaml.v2"
)

type Base struct {
	Port        string `yaml:"port"`
	SessionName string `yaml:"session_name"`
	Debug       bool   `yaml:"debug"`
}

type Database struct {
	Host     string `yaml:"host"`
	User     string `yaml:"user"`
	Password string `yaml:"password"`
	Name     string `yaml:"name"`
}

type Config struct {
	Base             `yaml:"base"`
	Database         `yaml:"database"`
	SecretKey []byte
}

func LoadConfig(filename string) (config Config, err error) {
	configFile, err := ioutil.ReadFile(filename)
	if err != nil {
		return
	}
	err = yaml.Unmarshal(configFile, &config)
	return
}

func (config *Config)LoadKey(filename string) (err error) {
	if config.SecretKey, err = ioutil.ReadFile(filename); err != nil {
		return
	}
	return
}
