import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

class AwardModal extends React.PureComponent {
  render() {
    const {classes, isOpen, onClose} = this.props;
    return (
      <Modal
        open={isOpen}
        onClose={onClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography>Click to start to randomize results</Typography>
          <Button>Start</Button>
          <Button>Reset</Button>
        </div>
      </Modal>
    )
  }
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

export default withStyles(styles)(AwardModal);