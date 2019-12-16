import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    div: {
      margin: '0 auto',
      width: '22em',
      textAlign: 'center'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    h1: {
      width: '100%'
    },
    submit: {
        textAlign: 'center',
        margin: '0 auto'
    },
  }));

export default function Login(props) {
    const [login, setLogin] = React.useState({username: '', password: ''});
    const classes = useStyles();
    const handleChange = (event, val) => {
        let { target: { name, value } } = event;
        let l = login;
        l[name] = value;
        setLogin(l);
      };
    const loginApp = () => {
        props.login(login);
    };

    return (
        <React.Fragment>
        <form action='auth' className={classes.container} autoComplete="off">
        <div className={classes.div}>
            <h1 className={classes.h1}>Login</h1>
            <TextField
                label="User Name"
                name="username"
                defaultValue={login.username}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
                fullWidth
            />
            <br />
            <TextField
              className={classes.textField}
              label="Password"
              name='password'
              type='password'
              defaultValue={login.password}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <br />
            <Button 
              className="loginButton"
              variant="contained" 
              color="primary" 
              onClick={loginApp}
              >
            Login
          </Button>
        </div>
        </form>
        
        </React.Fragment>
    );
}