import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, IconButton } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as eventsActions from '../../reducers/events/actions';

class Events extends PureComponent {
  componentDidMount() {
    const {actions} = this.props;
    actions.getEvents();
  }
  state = {
    spacing: '16',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes, events: eventsState, history } = this.props;
    const {events} = eventsState;
    return (
      <div className={classes.root} spacing={16}>
          <Grid container alignItems='center' style={{height: '100vh'}} justify='center' spacing={24}>
            {events.map(evt => (
              <Grid key={evt.id} item>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label='PNBP' className={classes.avatar}>
                        PNBP
                      </Avatar>
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={evt.name.text}
                    subheader={evt.date}
                    className={classes.header}
                  />
                  <CardMedia
                    className={classes.media}
                    image={evt.logo.url}
                    title={evt.name.text}
                  />
                  <CardContent className={classes.description}>
                    <Typography component='p'>{evt.description.text}</Typography>
                  </CardContent>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <Button size="small" color="primary" onClick={() => history.push(`/registration/${evt.id}`)}>
                      Register
                    </Button>
                    <Button size="small" color="primary" onClick={() => history.push(`/sign_in/${evt.id}`)}>
                      Sign In
                    </Button>
                    <Button size="small" color="secondary" onClick={() => history.push(`/award_generator/${evt.id}`)}>
                      Award Generator!
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  card: {
    width: 345,
    height: 450
  },
  media: {
    height: '50%'
  },
  avatar: {
    backgroundColor: red[500],
  },
  description: {
    height: '10%'
  },
  header: {
    height: '15%'
  }
});

const mapState = state => ({
  events: state.events
});

const mapActions = dispatch => ({
  actions: bindActionCreators({...eventsActions}, dispatch)
})

export default withRouter(connect(mapState, mapActions)(withStyles(styles)(Events)));