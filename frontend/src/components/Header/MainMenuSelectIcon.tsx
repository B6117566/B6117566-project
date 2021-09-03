import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

export default function MainMenuSelectIcon() {
  return (
    <div>
      <IconButton aria-label="show 4 new mails" color="inherit">
        <MailIcon />
      </IconButton>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <NotificationsIcon />
      </IconButton>
      <IconButton
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </div>
  );
}
