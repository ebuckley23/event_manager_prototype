import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import * as eventManagerActions from '../reducers/event_manager/actions';

class EventManager extends PureComponent {
  render() {
    const {children, actions, event_manager, history} = this.props;
    const {sidebarOpen} = event_manager;
    return (
      <React.Fragment>
        <Header {...{actions, history}} />
        <Sidebar {...{sidebarOpen, actions}} />
        {children}
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  event_manager: state.event_manager
});

const mapActions = dispatch => ({
  actions: bindActionCreators({...eventManagerActions}, dispatch)
});

export default withRouter(connect(mapState, mapActions)(EventManager));