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

    return (
        <React.Fragment>
        <form className={classes.container} autoComplete="off">
        <div className={classes.div}>
            <TextField
                label="Biography"
                name="bio"
                multiline
                rows="6"
                defaultValue={character.bio}
                onChange={handleChange}
                //className={classes.textField}
                margin="normal"
                fullWidth
            />
        </div>
        </form>
        <br />
        </React.Fragment>
    );
}