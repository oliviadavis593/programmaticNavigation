import React, { Component } from "react";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarkList from "./BookmarkList/BookmarkList";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";
import { Route } from "react-router";

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {
  state = {
    //page: "list",
    bookmarks,
    error: null
  };

  /*changePage = page => {
    this.setState({ page });
  };*/

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null
      //page: "list"
    });
  };

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark]
    });
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }));
  }

  render() {
    //const { page, bookmarks } = this.state;
    const { bookmarks } = this.state;
    return (
      <main className="App">
        <h1>Bookmarks!</h1>
        {/*<Nav clickPage={this.changePage} /> */}
        <Nav />
        <div className="content" aria-live="polite">
          {/*{page === "add" && (
            <AddBookmark
              onAddBookmark={this.addBookmark}
              onClickCancel={() => this.changePage("list")}
            />
          )}*/}

          <Route //refactored to fix broken re-directs
            path="/add-bookmark"
            render={({ history }) => {
              //console.log(history)
              return (
                <AddBookmark
                  onAddBookmark={this.addBookmark}
                  //onClickCancel={() => {/*what here? */}}
                  onClickCancel={() => history.push("/")} //fixing cancel button
                />
              );
            }}
          />
          {/*{page === "list" && <BookmarkList bookmarks={bookmarks} />} */}
          <Route
            exact
            path="/"
            render={() => <BookmarkList bookmarks={bookmarks} />}
          />
        </div>
      </main>
    );
  }
}

export default App;

/*===== Programmatic Navigation (#1) ======== */
//Replacing page management using state for Routes:
//We'll need to swap the page management using state for Routes
//How to do this:
// import Route
// Remove the state for setting the page
//Remove the references to the page state in updates
//Remove the page state from render
//In the render we don't need to pass the changePage callback prop into the <Nav>
//Swap the conditional rendering logic for Route components
//Note:
//We're using a different prop on the Route
//Previously we used component props which takes a React component as its value
//No we're using render prop - here render props takes a function
//We've done this bcz we need to control some props that get added to the AddBookmakrk & BookmarkList components
//Using render allows us to write the JSX for these 2 comps & thus specify the props to pass
//Another Note:
// We've set the paths to exactly / for list of bookmarks & /add-bookmark for add bookmark form
// We also aren't using changePage inside onClickCancel (...later)
//App.js ===> Nav.js

/*================================================ */

/* ======= Programmatic Navigation (#3)=======*/
//Broken redirects:
//Problem:
//We have specific route for the list of bookmarks & add bookmark page
// When we click 'cancel' on form = it no longer redirects back to the list
// When we create a new bookmark = it no longer redirects backs to the list
//Solution:
//We'll use history
// How to do this:
//Update the render props for the /add-bookmark route inside App.js to use route props as a parameter
//We can destruct history key out of the route props when describing the function params
//Now we can navigate /add-bookmark route using the nav links
//& history object will be logged to the console

/*================================================ */

/*============ Programmatic Navigation (#4) ========= */
//Fixing the cancel button:
// With history available inside render props for /add-bookmark
//We cna now use it in the onClickCancel callback prop
//How to do this:
//history object provides a method called push
//We call push a& supply the path we want to programmatically navigate to
//So we update the callback to navigate back to the list, /, when the cancel button is clicked
//Now the cancel button works
//App.js ===> AddBookmark.js
