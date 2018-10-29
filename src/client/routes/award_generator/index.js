import React from 'react';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { CSSTransitionGroup } from 'react-transition-group';
import * as eventsActions from '../../reducers/events/actions';
import GenerateBtn from './generate_button';
import Winner from './winner';
import History from './history';
import './ag.scss';
class Award_Generator extends React.PureComponent {
  state = {
    items: ['Ebuclkey', 'Ariea', 'Testing']
  }
  componentDidMount() {
    const {match = {}, actions} = this.props;
    const {params = {}} = match;
    const {eventId = ''} = params;
    actions.getEventRegistrants(eventId);
  }
  handleAdd = () => {
    const newItems = this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  }
  render() {
    const {events: eventsState} = this.props;
    const {award_creator, award_winner_email} = eventsState;
    const {registrants = []} = award_creator;
    const signedInRegistrants = registrants.reduce((acc, r) => {
      if (!r.signedIn) return acc;
      const {registrant} = r;
      return acc.concat(registrant);
    }, []);
    const items = this.state.items.map((item, i) => (
      <div key={item}>
        {item}
      </div>
    ))
    return (
      <div>
        <button onClick={this.handleAdd}>Start</button>
        <CSSTransitionGroup
          transitionName="generateBtn"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}>
          <GenerateBtn />
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="winnerField"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Winner />
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="winnerHistory"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}>
          <History />
        </CSSTransitionGroup>
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

export default withRouter(connect(mapState, mapActions)(Award_Generator));