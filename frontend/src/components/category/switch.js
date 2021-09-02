import React, {Component} from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

class Switch1 extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          id: this.props.id,
          value : this.props.value,
      };
    }
    render() {
      return (
        <Switch 
          value={this.state.id} 
          defaultChecked={ this.state.value == '1' ? true : false } 
          onChange={this.props.updateStatus} 
        />
      );
    }
}

export default Switch1;
