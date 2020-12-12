import React, { useState, Fragment } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Portal from '@material-ui/core/Portal';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  dropdown: {
    position: 'fixed',
    width: 200,
    top: '64px',
    left: '40%',
    padding: theme.spacing(1),
    border: '1px solid #fff',
    backgroundColor: theme.palette.primary.main,
  },
}));
const Notifications = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <NotificationsIcon />
      </IconButton>
      {open ? (
        <Portal>
          <div className={classes.dropdown}>
            Click me, I will stay visible until you click outside.
          </div>
        </Portal>
      ) : null}
    </Fragment>
  );
};

export default Notifications;
