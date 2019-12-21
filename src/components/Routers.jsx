import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import Home from "../pages/Home";
import Folio from "../pages/Folio";
import Edit from "../pages/Edit";
import Login from "../pages/Login";
import Add from "../pages/AddCharacter";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import "../styles/App.css";
import request from 'request';
import util from 'util';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
const requestPromise = util.promisify(request);
const header = {'cache-control': 'no-cache',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip, deflate',
      Host: 'herwhxsper.com:3210',
      'Cache-Control': 'no-cache',
      Accept: '*/*',
      'Content-Type': 'application/json'  };
      

  export default class Routers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        writer: '',
        anchorEl: null,
        triggerList: [],
        elements: [
        ]
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleCharacterUpdate = this.handleCharacterUpdate.bind(this);
      this.deleteCharacter = this.deleteCharacter.bind(this);
      this.login = this.login.bind(this);
    }

    async componentDidMount() {
      var readUser = { method: 'GET',
        url: 'http://herwhxsper.com:3210/',
        headers: header,
        withCredentials: true
      };
      // var readCharacters = { method: 'POST',
      //   url: 'http://herwhxsper.com:3210/read_characters',
      //   headers: header,
      //   body: JSON.stringify([{writer: id}])
      // };
      
      let user = await requestPromise(readUser); 
      // let characters = await requestPromise(readCharacters); 
      // let l = JSON.parse(characters.body);
      console.log(user);
      if(user.statusCode === 200){
        this.setState({writer: JSON.parse(user.body).user});
        this.readCharacterData(this.state.writer);
      }
        
      //this.setState({elements: l});
    }
  

     handleChange = (event) => {
      this.setState({auth: event.target.checked});
    };
  
     handleMenu = (event) => {
      this.setState({anchorEl: event.currentTarget});
      // this.setState((state) => {
      //   // Important: read `state` instead of `this.state` when updating.
      //   return {anchorEl: event.currentTarget}
      // });
    };
  
     handleClose = () => {
      this.setState({anchorEl: null});
      // this.setState((state) => {
      //   // Important: read `state` instead of `this.state` when updating.
      //   return {anchorEl: null}
      // });
    };

    logout = () => {
      // this.setState({auth: false}, {anchorEl: null});
      this.setState((state) => {
        // Important: read `state` instead of `this.state` when updating.
        return {writer: '', anchorEl: null}
      });
      var logout = { method: 'GET',
        url: 'http://herwhxsper.com:3210/logout',
        headers: header,
        withCredentials: true
      };
      let isLoggedinString = requestPromise(logout);
    };

     login = async (l) => {
      //  let send = [];
      //  send.push(l);
      var login = { method: 'POST',
        url: 'http://herwhxsper.com:3210/login',
        headers: header,
        body: JSON.stringify(l),
        withCredentials: true
      };
      let isLoggedinString = await requestPromise(login);
      let isLoggedin = JSON.parse(isLoggedinString.body);
      this.setState({anchorEl: null});
      this.setState({writer: isLoggedin.user});
      if(isLoggedin.user)
        this.readCharacterData(isLoggedin.user);
    }

    readCharacterData =async (id) => {
      var readTriggers = { method: 'GET',
        url: 'http://herwhxsper.com:3210/read_triggers',
        headers: header,
        withCredentials: true
      };
      var readCharacters = { method: 'POST',
        url: 'http://herwhxsper.com:3210/read_characters',
        headers: header,
        body: JSON.stringify([{writer: id}]),
        withCredentials: true
      };
      
      let triggers = await requestPromise(readTriggers); 
      let characters = await requestPromise(readCharacters); 
      let l = JSON.parse(characters.body);
      this.setState({triggerList: JSON.parse(triggers.body)});
      this.setState({elements: l});
    }

    async handleCharacterUpdate(c, e) {
      console.log(c);
      let l = c;
      if(typeof(c.src) !== 'string'){
        const formData = new FormData();
        formData.append(
          'src',
          c.src,
          c.src.name
        );
        var status = await axios.post('http://herwhxsper.com:3210/avatar', formData);
        if(status.data.statusCode === 200)
          l.src = "/character_images/"+status.data.filename
      }
      let character = [];
      character.push(l);
      console.log(character);
      var updateCharacter = { method: 'POST',
        url: 'http://herwhxsper.com:3210/update_character',
        headers: header,
        body: JSON.stringify(character),
        withCredentials: true
      };
      let rows = await requestPromise(updateCharacter);
      if(l._id === undefined){
        rows = JSON.parse(rows.body);
        l._id=rows.id;
      }
      const sc = this.state.elements.map(element => element._id === c._id ? c : element);
      this.setState({elements: sc});
      return <Redirect push to="/folio"/>
    }

    async deleteCharacter (e) {
      let id = e.currentTarget.id;
      this.setState((state) => {
        let c = state.elements;
        let deleteC = [];
        c.forEach(element => {element._id!==id && deleteC.push(element)} );
        return { elements: deleteC }
      });
      var deleteCharacter = { method: 'POST',
        url: 'http://herwhxsper.com:3210/delete',
        headers: header,
        body: JSON.stringify([{id: id}]),
        withCredentials: true
      };
      let rows = await requestPromise(deleteCharacter);
    }



  render() {
    const open = Boolean(this.state.anchorEl);
    const theme = createMuiTheme({
      palette: {
        type: 'dark'
      },
    });
    return (
      <ThemeProvider theme={theme}>
    <Router>
        <div color="inherit">
      {/* <FormGroup>
        <FormControlLabel
          control={<Toggle checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static" color="inherit">
        <Toolbar color="inherit">
          
          <Typography variant="h6" className="title" color="inherit">
            CharaFolio
          </Typography>
          {this.state.writer && (
            <div>
              <IconButton
                className="MenuButtonAdd"
                aria-label="add new character"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                component={Link}
                to="/add"
                color="inherit"
              >
                <AddIcon />
              </IconButton>
              <IconButton
                className="MenuButtonAccount"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose} component={Link} to="/folio">Character Folio</MenuItem>
                <MenuItem onClick={this.handleClose} component={Link} to="/add">Add Character</MenuItem>
                <MenuItem onClick={this.handleClose} component={Link} to="/myaccount">My Account</MenuItem>
                <MenuItem onClick={this.logout} component={Link} to="/">Logout</MenuItem>
              </Menu>
            </div>
          )}
          {!this.state.writer && (
            <div>
              <IconButton
                className="MenuButtonAccount"
                aria-label="not loged in menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose} component={Link} to="/">Home</MenuItem>
                <MenuItem onClick={this.handleClose} component={Link} to="/about">About</MenuItem>
                <MenuItem onClick={this.handleClose} component={Link} to="/signup">Sign Up</MenuItem>
                <MenuItem onClick={this.handleClose} component={Link} to="/login">Log In</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
            <Switch>
            <Route exact path="/">
                <Home auth={this.state.writer} />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/login">
              {!this.state.writer && <Login login={this.login} /> }
              {this.state.writer && <Redirect to="/folio" />}
            </Route>
            <Route path="/folio" render={(props) => <Folio {...props} characters={this.state.elements} deleteCharacter={this.deleteCharacter} />} />
            <Route path="/myaccount">
                <MyAccount />
            </Route>
            {/* <Route path="/edit/:id" render={(props) => <Edit {...props} triggers={this.state.triggerList} character={this.state.elements.find(element => element.id === props.match.params.id)} handleCharacterUpdate={this.handleCharacterUpdate} />} /> */}
            <Route path='/edit/:id' render={({ match }) => {
                const { id } = match.params
                const character = this.state.elements.find(element => element._id === id)
                return character && <Edit character={character} handleCharacterUpdate={this.handleCharacterUpdate} triggerList={this.state.triggerList} />
              }} />
              <Route path='/add' render={() => {
                const character = this.state.elements;
                character.push({
                  name: '',
                  age: '',
                  src: '../character_images/Da_Rules.jpg', 
                  name: '', 
                  face_claim: '', 
                  triggers: [
                    {name: "None"}
                  ],
                  writer: this.state.writer,
                  deleted: false
                });
                return character[character.length-1] && <Add character={character[character.length-1]} handleCharacterUpdate={this.handleCharacterUpdate} triggerList={this.state.triggerList} />
              }} />
            </Switch>
        </Router>
        </ThemeProvider>
        )
  }
}
  
  function About() {
    return <h2>About</h2>;
  }

  function SignUp() {
    return <h2>Sign Up</h2>;
  }

  function MyAccount() {
    return <h2>My Account</h2>
  }