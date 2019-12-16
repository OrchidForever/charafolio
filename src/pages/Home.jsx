import React from 'react';
import {
    Redirect
  } from "react-router-dom";

function Home(props) {
    const [auth, setAuth] = React.useState(props.auth);
  return (
    <div className="container">
    {auth && (
        <Redirect to="/folio" />
    )}
    {!auth && (
        <div className="Home">
        <h2>Welcome to the new way to store your characters.</h2>
        </div>
    )}
    </div>
  );
}

export default Home;
