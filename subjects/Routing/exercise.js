////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Wrap the <Home> component in <App>'s render method in a <Router>. This
//   provides the right context for the <Link>s and <Route>s we will create
// - Create a <Link> to /user/:userId for each person in <Home>
// - When a person's <Link> is clicked, render <Profile> instead of <Home>.
//   Hints: You can get the person's userId from <Profile>'s "match" prop
//   which it gets from the router. Also, you'll probably want to wrap
//   <Home> and <Profile> in a <Switch> in <App>'s render method
//
// Got extra time?
//
// - Render a <NoMatch> when the URL is something other than / or a user profile
//   URL. Manually type in a bad URL to get the <NoMatch> component to show up.
// - Add a <Link> to the profile page that links back to Home so users don't
//   have to use the Back button to get back to the home page
// - Add a <Redirect> from "/users/:userID" to "/profile/:userID", then type in
//   the url "users/1" into the url and hit enter
////////////////////////////////////////////////////////////////////////////////
import React from "react"
import ReactDOM from "react-dom"
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import Gravatar from "./utils/Gravatar"

const USERS = [
  { id: 1, name: "Ryan Florence", email: "rpflorence@gmail.com" },
  { id: 2, name: "Michael Jackson", email: "mjijackson@gmail.com" }
]

function getUserByID(id) {
  for (let i = 0; i < USERS.length; ++i)
    if (USERS[i].id === parseInt(id, 10)) return USERS[i]

  return null
}

class Home extends React.Component {
  render() {
    const contactItems = USERS.map(user => (
      <li key={user.email}>{user.name}</li>
    ))

    return (
      <div>
        <h2>Home</h2>
        <ul className="people-list">{contactItems}</ul>
      </div>
    )
  }
}

class Profile extends React.Component {
  render() {
    const userId = 1 // TODO: Get this from the URL!
    const user = getUserByID(userId)

    if (user == null) return <p>Cannot find user with id {userId}</p>

    return (
      <div className="profile">
        <Gravatar email={user.email} /> {user.name}
      </div>
    )
  }
}

class NoMatch extends React.Component {
  render() {
    return (
      <div>
        <h1>No routes matched...</h1>
        <p>
          <Link to="/">Go home</Link>
        </p>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>People Viewer</h1>
        <Home />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
