import React from 'react';
import EditGeneral from '../components/EditGeneral';
import { Button } from '@material-ui/core';
import {
  Link
} from "react-router-dom";
import "../styles/Edit.css";
  
  export default class AddCharacter extends React.Component {
    
    constructor(props) {
      super(props);
      this.saveCharacter = this.saveCharacter.bind(this);
      this.state = {
        value: '1'
      };
    }

    saveCharacter(event){
      this.props.handleCharacterUpdate(this.props.character, event);
    }

    render() {
      return (
        <div className="form">
          <h1>Add Character</h1>
          <EditGeneral {...this.props} /> 
          <Button 
              className="saveCharacterButton"
              variant="contained" 
              color="primary" 
              onClick={this.saveCharacter} 
              // component={Link} 
              // to="/folio"
              >
            Save Character
          </Button>
        </div>
      );
    }
    
  }