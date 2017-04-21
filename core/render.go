package core

import (
	"html/template"
	"github.com/gin-gonic/gin/render"
)
const (
	templateDir = "../app/views/"
)

type Render map[string]*template.Template

var _ render.HTMLRender = Render{}

func NewRender() Render {
	return make(Render)
}

func (r Render) Add(name string, tmpl *template.Template) {
	if tmpl == nil {
		panic("template can not be nil")
	}
	if len(name) == 0 {
		panic("template name cannot be empty")
	}
	r[name] = tmpl
}

func (r Render) AddFromFiles(name string, files ...string) *template.Template {
	for index, _ := range files {
		files[index] = templateDir + files[index]
	}
	tmpl := template.Must(template.ParseFiles(files...))
	r.Add(name, tmpl)
	return tmpl
}

func (r Render) Instance(name string, data interface{}) render.Render {
	return render.HTML{
		Template: r[name],
		Data:     data,
	}
}