import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {withRouter} from 'react-router';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'

class Sidebar extends React.PureComponent {
  render() {
    const { sidebarOpen, classes, actions, history } = this.props;
    return (
      <SwipeableDrawer
        open={sidebarOpen}
        onClose={actions.toggleSideBar}
      >
        <div
          tabIndex={0}
          role='button'
        >
          <div className={classes.list}>
            <List>
              {menuOptions.map((option) => {
                return (
                  <ListItem button key={option.name} onClick={() => history.push(option.route)}>
                    <ListItemIcon>{option.icon()}</ListItemIcon>
                    <ListItemText primary={option.name}/>
                  </ListItem>
                )
              })}
            </List>
          </div>
        </div>
      </SwipeableDrawer>
    )
  }
}

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

export default withRouter(withStyles(styles)(Sidebar));

const menuOptions = [{
  name: 'Events',
  route: '/',
  icon: () => <SettingsApplicationsIcon />
}, {
  name: 'Admin',
  route: '/admin',
  icon: () => <SettingsApplicationsIcon />
}];