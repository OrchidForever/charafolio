import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    div: {
      margin: '0 auto',
      width: '42em'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    h1: {
      width: '100%',
      color: 'white'
    },
    submit: {
        textAlign: 'center',
        margin: '0 auto'
    },
    cancel: {
        float: 'right'
    },
    input: {
      display: 'none',
    },
  }));

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
              name: 'age'
            },
          });
        }}
        thousandSeparator
        isNumericString
      />
    );
  }

export default function EditGeneral(props) {
    const [character, setCharacter] = React.useState(props.character);
    const [file, setFile] = React.useState();
    const classes = useStyles();
    const handleChange = (event, val) => {
        let { target: { name, value } } = event;
        let c = character;
        if(name === undefined){
          name = "triggers";
          value = val;
        }
        if(name === 'src'){
          value = event.target.files['0'];
        }
        c[name] = value;
        setCharacter(c);
      };

      const fileUpload = (event, value) => {
        var FormData = require('form-data');
        var fs = require('fs');
        var form = new FormData();
        form.append('src', event.target.value);
        form.submit('http://herwhxsper.com:3210/avatar', function(err, res) {
        // res – response object (http.IncomingMessage)  //
          console.log(res);
          res.resume();
        });
      }

    return (
        <React.Fragment>
        <form className={classes.container} autoComplete="off">
        <div className={classes.div}>
            <TextField
                label="Character Name"
                name="name"
                multiline
                rowsMax="4"
                defaultValue={character.name}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
            />
            <TextField
                label="Face Claim"
                name="fc"
                multiline
                rowsMax="4"
                defaultValue={character.fc}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
            />
            <TextField
              className={classes.textField}
              label="Age"
              name='age'
              defaultValue={character.age}
              onChange={handleChange}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              margin="normal"
            />
            <TextField
              className={classes.textField}
              label="Alias"
              name='alias'
              defaultValue={character.alias}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Birthday"
              type="date"
              name="birthday"
              defaultValue={character.birthday}
              className={classes.textField}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className={classes.textField}
              label="Gender"
              name='gender'
              defaultValue={character.gender}
              onChange={handleChange}
              margin="normal"
            />
            <Autocomplete
                multiple
                id="tags-outlined"
                className="triggers"
                options={props.triggerList}
                getOptionLabel={option => option.name}
                defaultValue={typeof(character.triggers) === 'string' ? JSON.parse(character.triggers) : character.triggers }
                filterSelectedOptions
                onChange={handleChange}
                renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Triggers"
                    margin="normal"
                    fullWidth
                />
                )}
            />
            <input
              accept="image/*"
              id="avatar_upload"
              name="src"
              className={classes.input}
              id="outlined-button-file"
              multiple
              type="file"
              onChange={e => handleChange(e)}
            />
            <label htmlFor="outlined-button-file">
              <Button variant="outlined" component="span">
                Upload
              </Button>
            </label>
        </div>
        </form>
        <br />
        </React.Fragment>
    );
}