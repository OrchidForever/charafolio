import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Masonry from 'react-masonry-component';
import "../styles/Folio.css";
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import {
    Link
  } from "react-router-dom";
// import Chip from '@material-ui/core/Chip';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';

export default class Folio extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      characters: props.characters,
      deleteCharacter: props.deleteCharacter
    };
    // this.deleteCharacter = this.deleteCharacter.bind(this);
  }

  // const [characters, setCharacters] = React.useState(props.characters);
  // const classes = useStyles();
  // const theme = useTheme();
  deleteCharacter = (e) => {
    this.props.deleteCharacter(e);
  }

  render () {
    let me = this;
    const childElements = this.props.characters.map(function (element){
      return (
          <Card className="card" key={element._id}>
          <div className="details">
            <CardContent className="content">
              <Typography component="h6" variant="h6">
                  {element.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                  {element.fc}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
              {element.triggers.map((value, index) => {
                  if(element.triggers.length-1 === index)
                      return value.name;
                  else
                      return value.name+", ";
              })
              }
              </Typography>
            </CardContent>
            <div className="controls">
              <IconButton 
                  aria-label="Edit Character Information"
                  component={Link} to={`/edit/${element._id}`}
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="View Character Information">
                <LinkIcon />
              </IconButton>
              <IconButton aria-label="Delete Character" onClick={me.deleteCharacter} id={element._id}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <CardMedia
            className="cover"
            image={element.src}
            title="Character Photo"
          />
        </Card>
       );
    });


    return (
      <Masonry
      color="inherit"
                  className={'class-name'} // default ''
                  elementType={'div'} // default 'div'
                  disableImagesLoaded={false} // default false
                  updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              >
                  {childElements}
              </Masonry>
  
    );
  }
  
}