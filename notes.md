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

Let's look at a [demo](http://localhost:8080/HelloWorld/lecture.html) looking at the same UI to search Wikipedia and display the top 10 entries.

### jQuery

```js
import $ from "jquery"
import { search } from "./utils/searchWikipedia"

const html = `
<div>
	<h1>Wikipedia</h1>
	<form id="form">
		<input id="input" value="bootcamp"/>
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
	.on("submit", event => { // <-- state change
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
				if ($("#descending").is(":checked")) { // <-- state
					li.prependTo($("#results")) // <-- time
				} else {
					li.appendTo($("#results")) // <-- time
				}
				li.find("button").on("click", () => { // <-- component
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

$("#descending").on("click", event => { // <-- state change
	$("#results li").each((i, li) => {
		$("#results").prepend(li) // <-- time
	})
})
```

**Advantages:**

...

**Disadvantages:**

- Code written as flows
- Does not call out state
- No entry point to change state
- With every feature request, multiple places to change code
- Hard to think about. Leads to lots of bugs

### Backbone



### Angular

```js
import angular from "angular"
import { search } from "./utils/searchWikipedia"

document.documentElement.setAttribute("ng-app", "wikipedia")

document.getElementById("app").innerHTML = `
<div ng-controller="MainController as main">
	<h1>Wikipedia</h1>
	<form ng-submit="main.handleSubmit()">
		<input ng-model="main.term"/>
		<button type="submit">Search</button>
	</form>
	<div ng-if="main.loading">Loading...</div>
	<div>
		<p>{{main.sortedResults().length}} results for: {{main.term}}<p>
		<p>
			<label>
				<input
					type="checkbox"
					ng-model="main.descending"
				>
				Sort Descending
			</label>
		</p>
	</div>
	<ul id="results">
		<li ng-repeat="result in main.sortedResults() track by result.title">
			<toggler title="{{result.title}}">
				<p>{{result.description}}</p>
			</toggler>
		</li>
	</ul>
</div>
`

const app = angular.module("wikipedia", [])

app.controller("MainController", function($rootScope) {
	const main = this
	main.term = "bootcamp" // <-- shared state!
	main.results = []
	main.loading = false
	main.descending = false

	main.getFriends = () => {
		return [{ name: "Jeremy" }]
	}

	main.handleSubmit = () => {
		main.loading = true
		search(main.term, (err, results) => {
			main.results = results
			main.loading = false
			$rootScope.$digest() // <-- time!
		})
	}

	main.sortedResults = () => {
		return main.descending
			? main.results.slice(0).reverse()
			: main.results
	}

	main.handleSubmit()
})

app.directive("toggler", () => {
	// <-- Global!
	return {
		restrict: "E", // WTH?
		scope: {
			title: "@" // WTH?
		},
		controller($scope) {
			$scope.isOpen = false
			$scope.toggle = () => {
				$scope.isOpen = !$scope.isOpen
			}
		},
		replace: true,
		transclude: true, // WTH?
		template: `
<div>
	<div>
		{{title}}
		<button ng-click="toggle()">show more</button>
	</div>
	<div ng-if="isOpen" ng-transclude></div>
<div>
`
	}
})
```