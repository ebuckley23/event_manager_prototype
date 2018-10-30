import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default ({onStart, onReset, finding_winner}) => {
  return (
    <Grid container spacing={8} direction='row' justify='center' style={{padding: '2em'}}>
      <Grid item>
        <Button color='primary' style={{width: '7em', height: '7em', borderRadius: '50%'}} onClick={onStart} variant='contained'>
          Start
        </Button>
      </Grid>
      {finding_winner && (
        <Grid item>
          <Button color='secondary' style={{width: '7em', height: '7em', borderRadius: '50%'}} onClick={onReset} variant='contained'>
            Stop
          </Button>
        </Grid>
      )}
    </Grid>
  )
}