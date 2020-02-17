import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav className="Nav">
      {/*<button onClick={() => props.clickPage("list")}>Bookmark List</button>{" "}*/}
      <Link to={"/"}>Bookmark List</Link>
      {/*<button onClick={() => props.clickPage("add")}>Add Bookmark</button>*/}
      <Link to={"/add-bookmark"}>Add Bookmark</Link>
    </nav>
  );
}

/*===== Programmatic Navigation (#2) ======== */
//Adding Links:
//The final change is to update Nav.js component
//We'll swap buttons for Link components that point to our new routes
//At this point it'll blow up with errors so make changes for both Nav & App tests
//As of right now there are broken redirects (they don't work!)
//Nav.js ===> App.js
