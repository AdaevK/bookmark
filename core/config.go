package core

import (
	"io/ioutil"
	"gopkg.in/yaml.v2"

	"database/sql"
	_ "github.com/lib/pq"
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

func (config *Config)LoadDB() (*sql.DB, error) {
	db, err := sql.Open("postgres", "user="+config.DBUser+" password='"+config.DBPassword+"' host="+config.DBHost+" dbname="+config.DBName)
	if err != nil {
		return nil, err
	}
	if err = db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
