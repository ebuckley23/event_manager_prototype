import React, {PureComponent} from 'react';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import * as eventsActions from '../../reducers/events/actions';

class Registration extends PureComponent {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    eventId: ''
  }
  componentDidMount() {
    const {match = {}, actions} = this.props;
    const {params = {}} = match;
    const {eventId = ''} = params;
    actions.getEvent(eventId);
    this.setState({eventId});
  }
  render() {
    const {events: eventsState, actions, history} = this.props;
    const {firstName, lastName, email, eventId} = this.state;
    const {event} = eventsState;
    return (
      <React.Fragment>
        <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{paddingTop: '2em'}}>
          <Typography component={'h3'} variant={'h3'}>{event.name && event.name.text}</Typography>
          <img src={event.logo && event.logo.url} width={250} height={250} />
        </Grid>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justify='center'
          style={{height: '100vh'}}
        >
          <Grid item xs={9}>
            <TextField
              value={firstName}
              fullWidth
              label='First Name'
              onChange={(e) => this.setState({firstName: e.target.value})}
            />
            <TextField
              value={lastName}
              fullWidth
              label='Last Name'
              onChange={(e) => this.setState({lastName: e.target.value})}
            />
            <TextField
              value={email}
              fullWidth
              label='Email'
              onChange={(e) => this.setState({email: e.target.value})}
            />
            <Grid container justify='center' item>
              <Button variant='outlined'
                onClick={() => {
                  actions.addRegistrant(eventId, this.state);
                  this.setState({firstName: '', lastName: '', email: ''})
                }}
                disabled={!firstName && !lastName && !email}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  events: state.events
});

const mapActions = dispatch => ({
  actions: bindActionCreators({...eventsActions}, dispatch)
})

export default withRouter(connect(mapState, mapActions)(Registration));