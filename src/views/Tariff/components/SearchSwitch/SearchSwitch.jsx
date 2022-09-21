import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const PurpleSwitch = withStyles(theme=>({
  switchBase: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.primary.main,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  checked: {},
  track: {},
}))(Switch);

export default function CustomizedSwitches({onChangeSwitch,stateSwitch}) {
  const [state, setState] = React.useState(stateSwitch);

  const handleChange = (event) => {
    setState(!state);
  };

  React.useEffect(()=>{
    onChangeSwitch(state)
  },[state,onChangeSwitch])

  React.useEffect(()=>{
    setState(stateSwitch);
  },[stateSwitch])
  return (
    <FormGroup>
      <FormControlLabel
        control={<PurpleSwitch checked={state} onChange={handleChange} name="checked" />}
        label="Búsqueda General"
      />
    </FormGroup>
  );
}
