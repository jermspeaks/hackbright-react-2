const fs = require("fs")
const path = require("path")
const React = require("react")
const ReactDOMServer = require("react-dom/server")

const e = React.createElement

function createMarkup(mainBundle) {
  return ReactDOMServer.renderToStaticMarkup(
    e(
      "html",
      null,
      e(
        "head",
        null,
        e("link", { rel: "stylesheet", href: "/shared.css" })
      ),
      e(
        "body",
        null,
        e("div", { id: "app" }),
        e("script", { src: "/__build__/shared.js" }),
        e("script", { src: "/__build__/" + mainBundle + ".js" })
      )
    )
  )
}

const RootDir = path.resolve(__dirname, "..")
const SubjectsDir = path.join(RootDir, "subjects")

const Subjects = {
  HelloWorld: "Hello World",
  // ImperativeToDeclarative: "Imperative to Declarative",
  CompoundComponents: "Compound Components",
  // HigherOrderComponents: "Higher Order Components",
  // RenderProps: "Render Props",
  // Routing: "Routing",
  Redux: "Redux"
}

const SubjectDirNames = Object.keys(Subjects)

const markup = ReactDOMServer.renderToStaticMarkup(
  e(
    "html",
    null,
    e(
      "head",
      null,
      e("link", { rel: "stylesheet", href: "/shared.css" })
    ),
    e(
      "body",
      { id: "index" },
      e(
        "table",
        { cellSpacing: 0, cellPadding: 0 },
        e(
          "tbody",
          null,
          SubjectDirNames.map(function(dir, index) {
            return e(
              "tr",
              { key: dir, className: index % 2 ? "odd" : "even" },
              e(
                "td",
                { className: "lecture-link" },
                e(
                  "a",
                  { href: "/" + dir + "/lecture.html" },
                  Subjects[dir]
                )
              ),
              e(
                "td",
                { className: "exercise-link" },
                e(
                  "a",
                  { href: "/" + dir + "/exercise.html" },
                  "exercise"
                )
              ),
              e(
                "td",
                { className: "solution-link" },
                e(
                  "a",
                  { href: "/" + dir + "/solution.html" },
                  "solution"
                )
              )
            )
          })
        )
      ),
		e(
			"div",
			null,
			"Original workshop materials from React Workshop"
	    )
    )
  )
)

fs.writeFileSync(path.join(SubjectsDir, "index.html"), markup)

SubjectDirNames.forEach(function(dir) {
  fs.writeFileSync(
    path.join(SubjectsDir, dir, "lecture.html"),
    createMarkup(dir + "-lecture")
  )
  fs.writeFileSync(
    path.join(SubjectsDir, dir, "exercise.html"),
    createMarkup(dir + "-exercise")
  )
  fs.writeFileSync(
    path.join(SubjectsDir, dir, "solution.html"),
    createMarkup(dir + "-solution")
  )
})
