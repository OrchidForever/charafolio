import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EditGeneral from '../components/EditGeneral';
import Home from './Home';
import { Button } from '@material-ui/core';
import {
  Link
} from "react-router-dom";
import "../styles/Edit.css";
  
  export default class Edit extends React.Component {
    
    constructor(props) {
      super(props);
      this.saveCharacter = this.saveCharacter.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        value: '1'
      };
    }
  
    handleChange(e, newValue) {
      this.setState((state) => {
        // Important: read `state` instead of `this.state` when updating.
        return {value: newValue}
      });
    }

    saveCharacter(event){
      this.props.handleCharacterUpdate(this.props.character, event);
    }

    render() {
      return (
        <div className="tabpanel">
          <AppBar position="static">
            <Tabs value={this.state.value} onChange={this.handleChange} aria-label="wrapped label tabs example">
              <Tab value='1' label="General Infomation" />
              <Tab value="2" label="More Information" />
            </Tabs>
          </AppBar>
          <h1>Edit Character: {this.props.character.name}</h1>
          {this.state.value === '1' && <EditGeneral {...this.props} /> }
          {this.state.value === '2' && <Home value={this.value} index="2" /> }
          <Button 
              className="saveCharacterButton"
              variant="contained" 
              color="primary" 
              onClick={this.saveCharacter} 
              component={Link} 
              to="/folio"
              >
            Save Character
          </Button>
        </div>
      );
    }
    
  }