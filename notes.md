# React Techniques

## Intro

### What we will cover:

- Why React, Part 2
- Boilerplate Overview
- Compound Components
- Redux

## Why React, Part 2

What was front-end development like before React?

Let’s go over a history of front-end libraries exploring…

- jQuery
- Backbone
- Angular

[Demo link](http://localhost:8080/HelloWorld/lecture.html)

```js
import $ from "jquery"
import { search } from "./utils/searchWikipedia"

const html = `
<div>
	<h1>Wikipedia</h1>
	<form id="form">
		<input id="input" value="taco"/>
		<button type="submit">Search</button>
	</form>
	<div id="loading">Loading...</div>
	<div id="meta">
		<p>Results for: <span id="title"></span><p>
		<p>
		<label>
			<input type="checkbox" id="descending">
				Sort Descending
		</label>
		</p>
	</div>
	<ul id="results"></ul>
</div>
`

$("#app").html(html) // <-- component

$("#form")
	.on("submit", event => {
		// <-- state change
		event.preventDefault()
		const term = $("#input").val() // <-- state
		$("#loading").show() // <-- time
		$("#meta").hide() // <-- time
		$("#results").empty() // <-- time
		search(term, (err, results) => {
			$("#loading").hide() // <-- time
			$("#meta").show() // <-- time
			$("#title").html(term) // <-- time
			results.forEach(result => {
				const li = $("<li/>")
				const html = `
<div>
	${result.title}
	<button>show more</button>
</div>
<div class="toggler" style="display: none">
	<p>${result.description}</p>
</div>
`
				li.html(html) // <-- time
				if ($("#descending").is(":checked")) {
					// <-- state
					li.prependTo($("#results")) // <-- time
				} else {
					li.appendTo($("#results")) // <-- time
				}
				li.find("button").on("click", () => {
					// <-- component
					li.find(".toggler").toggle() // <-- time
					const isHidden = li.find(".toggler").is(":hidden") // <-- state
					li
						.find("button")
						.html(isHidden ? "show more" : "hide") // <-- time
				})
			})
		})
	})
	.trigger("submit") // <-- state change

$("#descending").on("click", event => {
	// <-- state change
	$("#results li").each((i, li) => {
		$("#results").prepend(li) // <-- time
	})
})
```