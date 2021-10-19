import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { getCategorysByGenderId } from '../../services/ProductListGender';
import { GlobalContext } from '../../context/GlobalProvider';

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

export default function Category({ genderName }) {
  const classes = useStyles();
  const { GlobalState, SetGenderIDDP, SetCategoryDP } =
    useContext(GlobalContext);
  const [categoryApi, SetCategoryApi] = useState([]);
  const [open, setOpen] = useState({ Boolean });

  const handleClick = (e) => {
    setOpen({ [e]: !open[e] });
  };

  const handleSelectCategory = (id, name) => {
    SetCategoryDP({ _id: id, name: name });
  };

  useEffect(() => {
    GlobalState.gender.map((item) => {
      if (genderName === item.name) {
        SetGenderIDDP(item._id);
        getCategorysByGenderId(item._id)
          .then((res) => {
            SetCategoryApi(res.result);
          })
          .catch(() => {
            SetCategoryApi([]);
          });
      }
    });
  }, [genderName]);

  const categoryElement = categoryApi.map((categoryItem) => {
    return (
      <div key={categoryItem._id}>
        <ListItem
          button
          className={classes.button}
          onClick={() => {
            handleClick(categoryItem.class.name);
          }}
        >
          <ListItemText
            primary={
              <Typography variant="h6">{categoryItem.class.name}</Typography>
            }
          />
          {open[categoryItem.class.name] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          component="li"
          in={open[categoryItem.class.name]}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            {categoryItem.category.map((sitem) => {
              return (
                <ListItem
                  button
                  className={classes.nested}
                  key={sitem._id}
                  onClick={() => {
                    handleSelectCategory(sitem._id, sitem.name);
                  }}
                >
                  <ListItemText key={sitem._id} primary={sitem.name} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </div>
    );
  });

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem
        button
        className={classes.button}
        onClick={() => {
          handleSelectCategory(null, null);
        }}
      >
        <ListItemText
          primary={<Typography variant="h6">สินค้าทั้งหมด</Typography>}
        />
      </ListItem>
      {categoryElement}
    </List>
  );
}
