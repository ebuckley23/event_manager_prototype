import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withStyles } from '@material-ui/core';
import * as eventsActions from '../../reducers/events/actions';

class Admin extends React.PureComponent {
  componentDidMount() {
    const {actions} = this.props;
    actions.getEvents();
  }
  render() {
    const { classes, events: eventsState } = this.props;
    const {events, userEventState} = eventsState;
    return (
      <div>Nothing to see here</div>
    )
  }
}

const mapState = state => ({
  events: state.events
});

const mapActions = dispatch => ({
  actions: bindActionCreators({...eventsActions}, dispatch)
});

const styles = {};
export default connect(mapState, mapActions)(withStyles(styles)(Admin));