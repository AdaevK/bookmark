package engine

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
	DBHost     string `yaml:"host"`
	DBUser     string `yaml:"user"`
	DBPassword string `yaml:"password"`
	DBName     string `yaml:"name"`
}

type Config struct {
	Base      Base       `yaml:"base"`
	Database  Database   `yaml:"database"`
	Env       string     `yaml:"environment"`
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

func (c *Config)LoadKey(filename string) (err error) {
	if c.SecretKey, err = ioutil.ReadFile(filename); err != nil {
		return
	}
	return
}

func (c *Config)ServerAddress() (string) {
	return ":" + c.Base.Port
}

func (c *Config)IsProduction() (bool) {
	return c.Env == "production"
}
