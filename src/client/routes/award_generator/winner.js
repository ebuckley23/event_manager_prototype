import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
export default class Winner extends React.PureComponent {
  state = {
    emails: [],
    winners_email: ''
  }
  componentDidMount() {
    const {registrants} = this.props;
    this.setState({registrants});
    const timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }
  tick = () => {
    const {finding_winner, setWinner} = this.props;
    if (finding_winner) {
      const registrantsSize = this.state.registrants.length;
      const randomIndex = Math.floor((Math.random() * registrantsSize), + 0);
      setWinner(this.state.registrants[randomIndex]);
    }
  }

  render() {
    const {finding_winner, award_item, winner} = this.props;
    return (
      <div>
        <Grid container direction='row' justify='center' alignItems='center' style={{padding: '2em'}}>
          {!finding_winner && winner.email && <Chip label={winner.email} color='secondary' variant='outlined' />}
        </Grid>
        {finding_winner && <Typography align='center' component={'h5'} variant='h5'>{`Searching for a winner for ${award_item}`}</Typography>}
        <Grid container direction='row' justify='center' alignItems='center' style={{padding: '1.5em'}}>
          {finding_winner && <LinearProgress style={{height: '1.5em', width: '50%'}} />}
          {finding_winner && <LinearProgress style={{height: '1.5em', width: '50%'}} color='secondary' variant='query' />}
        </Grid>
      </div>
    );
  }
}