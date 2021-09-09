import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 280,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    paddingLeft: theme.spacing(4),
    borderRadius: '30px',
    '&:hover': {
      backgroundColor: 'rgb(0, 0, 0, 0.1)',
    },
  },
  nested: {
    paddingLeft: theme.spacing(6),
    borderRadius: '30px',
    '&:hover': {
      backgroundColor: 'rgb(0, 0, 0, 0.1)',
    },
  },
}));

export default function Category() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button className={classes.button}>
        <ListItemText
          primary={<Typography variant="h6">สินค้าทั้งหมด</Typography>}
        />
      </ListItem>
      <ListItem button className={classes.button}>
        <ListItemText
          primary={<Typography variant="h6">เสื้อยืด</Typography>}
        />
      </ListItem>
      <ListItem button className={classes.button} onClick={handleClick}>
        <ListItemText primary={<Typography variant="h6">กางเกง</Typography>} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText
              primary={<Typography variant="h6">ขายาว</Typography>}
            />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
