import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const Header = (props) => {
  const {classes, actions, history} = props;
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton onClick={actions.toggleSideBar} className={classes.menuButton} color='inherit' aria-label='Menu'>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' color='inherit' className={classes.grow}>
          Event Manager (Proof of Concept)
        </Typography>
        <Button color='inherit'>
          <a style={{textDecoration: 'none', color: 'inherit'}} target='_blank' href='https://github.com/ebuckley23/event_manager_prototype'>Source Code</a>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export default withStyles(styles)(Header);