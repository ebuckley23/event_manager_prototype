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
    award_item: '',
    counter: 0,
    finding_winner: false,
    winner: ''
  }
  componentDidMount() {
    const {match = {}, actions} = this.props;
    const {params = {}} = match;
    const {eventId = ''} = params;
    actions.getEventRegistrants(eventId);
  }

  handleStart = () => {
    const awardItem = this.state.award_item || prompt('Enter prize');
    if (awardItem) {
      this.setState({award_item: awardItem, finding_winner: true});
    }
    else{
      alert('no award specified');
    }
  }

  handleStop = () => {
    const {actions}= this.props;
    this.setState({finding_winner: false})
    actions.setWinnerHistory(this.state.winner, this.state.award_item);
    this.setState({award_item: ''})
  }

  handleWinner = (winner) => {
    this.setState({winner})
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
    return (
      <div>
        <CSSTransitionGroup
          transitionName="generateBtn"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}>
          <GenerateBtn
            finding_winner={this.state.finding_winner}
            onStart={this.handleStart}
            onReset={this.handleStop}
          />
        </CSSTransitionGroup>
        {!!signedInRegistrants.length && <CSSTransitionGroup
          transitionName="winnerField"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Winner
            winner={this.state.winner}
            setWinner={this.handleWinner}
            finding_winner={this.state.finding_winner}
            registrants={signedInRegistrants}
            award_item={this.state.award_item}
          />
        </CSSTransitionGroup>}
        <CSSTransitionGroup
          transitionName="winnerHistory"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}>
          <History award_history={this.props.award_history} />
        </CSSTransitionGroup>
      </div>
    )
  }
}

const mapState = state => ({
  events: state.events,
  award_history: state.events.award_history
});

const mapActions = dispatch => ({
  actions: bindActionCreators({...eventsActions}, dispatch)
})

export default withRouter(connect(mapState, mapActions)(Award_Generator));