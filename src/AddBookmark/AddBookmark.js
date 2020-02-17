import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import config from "../config";
import "./AddBookmark.css";

const Required = () => <span className="AddBookmark__required">*</span>;

class AddBookmark extends Component {
  static defaultProps = {
    onAddBookmark: () => {}
  };

  state = {
    error: null
  };

  handleSubmit = e => {
    e.preventDefault();
    // get the form fields from the event
    const { title, url, description, rating } = e.target;
    const bookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value
    };
    this.setState({ error: null });
    fetch(config.API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(bookmark),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        title.value = "";
        url.value = "";
        description.value = "";
        rating.value = "";
        this.props.history.push("/"); //added after wrapping comp in withRouter
        this.props.onAddBookmark(data);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;
    const { onClickCancel } = this.props;
    return (
      <section className="AddBookmark">
        <h2>Create a bookmark</h2>
        <form className="AddBookmark__form" onSubmit={this.handleSubmit}>
          <div className="AddBookmark__error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor="title">
              Title <Required />
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Great website!"
              required
            />
          </div>
          <div>
            <label htmlFor="url">
              URL <Required />
            </label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="https://www.great-website.com/"
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" />
          </div>
          <div>
            <label htmlFor="rating">
              Rating <Required />
            </label>
            <input
              type="number"
              name="rating"
              id="rating"
              defaultValue="1"
              min="1"
              max="5"
              required
            />
          </div>
          <div className="AddBookmark__buttons">
            <button type="button" onClick={onClickCancel}>
              Cancel
            </button>{" "}
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(AddBookmark);

/*============ Programmatic Navigation (#5) ========= */
//Navigating after successfully adding a bookmark:
//We want to wait for the result of the POST request for a new bookmark
//If it's successful (only if) we want to navigate back to the bookmark list
//Issue:
//handleSubmit method performs a fetch request
//at the end of the promise chain - the submission was successful & we call this.props.onAddBookmark
//How can we get the history object inside of handleSubmit - it isn't available as a prop to AddBookmark component
//Solutions: 2 options
// 1. Pass history as a prop to AddBookmark inside the render prop of App
// 2. Use the withRouter higher order component
// 1st options is straightforward - but imagine if AddBookmark was deeper down in the tree
//...we'd have to pass history as a props at each child comp until it reaches AddBookmark
//2nd option allows us to access the history from any depth of the comp tree
//How to do this:
// Import withRouter from 'react-router-dom'
//Wrap the component inside the HOC = pass the comp into the HOC as an arg & export default the result
//Now we can get the history inside our promise chainf & programmatically navigate on success
//Now everything works!!!
