import React from 'react';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GridList from '@material-ui/core/GridList';
import { GridListTile, Typography, Paper, ListItemText, Checkbox, ListItemSecondaryAction, IconButton, Input, Grid } from '@material-ui/core';
import * as eventsActions from '../../reducers/events/actions';
import ListItem from '@material-ui/core/ListItem';
import InfoIcon from '@material-ui/icons/Info';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

class SignIn extends React.PureComponent {
  state = {
    generateResults: false,
    searchText: '',
    eventId: ''
  }

  handleClose() {
    this.setState({generateResults: false});
  }
  componentDidMount() {
    const {match = {}, actions} = this.props;
    const {params = {}} = match;
    const {eventId = ''} = params;
    this.setState({eventId})
    actions.getEventRegistrants(eventId);
  }
  render() {
    const {events: eventsState, actions} = this.props;
    const {searchText, eventId} = this.state;
    const {award_creator, award_winner_email} = eventsState;
    const {registrants = []} = award_creator;

    return (
      <div className={''} style={{paddingTop: '2em'}}>
        <Typography align='center' component='h2' variant='h2'>{`Registrants ${registrants.length}`}</Typography>
        <Grid>
          <Input
            id='search_icon'
            value={this.state.searchText}
            onChange={(e) => this.setState({searchText: e.target.value})}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='search'
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Paper style={{paddingTop: '2em', paddingRight: '2em', paddingLeft: '2em'}}>
          <GridList cellHeight={80} xs={12} sm={8}>
            {registrants.filter(r => {
              const toLower = searchText.toLowerCase();
              const {registrant} = r;
              const {firstName, lastName} = registrant.name;
              return firstName.toLowerCase().includes(toLower) || lastName.toLowerCase().includes(toLower) || registrant.email.toLowerCase().includes(toLower);
            }).map((r, index) => {
              const {registrant, signedIn} = r;
              const {firstName, lastName} = registrant.name || {};
              const present_color = 'mediumseagreen';
              const absent_color = 'lightblue';
              const backgroundColor = signedIn ? present_color : absent_color;
              return (
                <GridListTile key={registrant.email} cols={1}>
                  <ListItem key={registrant.email} role={undefined} style={{backgroundColor}} button>
                    <Checkbox
                      color='primary'
                      checked={signedIn}
                      tabIndex={-1}
                      onChange={() => actions.signInRegistrant(eventId, r._id, index)}
                    />
                    <ListItemText primary={`${lastName}, ${firstName}`} secondary={registrant.email} />
                    {/* <ListItemSecondaryAction>
                      <IconButton aria-label="Info">
                        <InfoIcon />
                      </IconButton>
                    </ListItemSecondaryAction> */}
                  </ListItem>
                </GridListTile>
              )
            })}
          </GridList>
        </Paper>
      </div>
    )
  }
}

const mapState = state => ({
  events: state.events
});

const mapActions = dispatch => ({
  actions: bindActionCreators({...eventsActions}, dispatch)
})

export default withRouter(connect(mapState, mapActions)(SignIn));