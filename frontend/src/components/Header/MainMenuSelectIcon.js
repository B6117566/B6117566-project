import React, { useContext, useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getGenders } from '../../services/ProductListGender';
import { GlobalContext } from '../../context/GlobalProvider';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginLeft: '2rem',
    height: '2.5rem',
  },
  gap: {
    marginLeft: '0.5rem',
  },
  title: { fontSize: '1.1rem' },
}));

export default function MainMenuSelectIcon() {
  const classes = useStyles();
  const [gendersApi, SetGenderApi] = useState([]);
  const { SetGenderDP } = useContext(GlobalContext);

  useEffect(() => {
    getGenders().then((res) => {
      SetGenderApi(res.result);
      SetGenderDP(res.result);
    });
  }, []);

  const genderElements = gendersApi.map((item) => {
    return (
      <div className={classes.gap} key={item._id}>
        <Link to={`/genders/${item.name}`} style={{ textDecoration: 'none' }}>
          <Button>
            <b className={classes.title}>{item.name}</b>
          </Button>
        </Link>
      </div>
    );
  });

  return <div className={classes.root}>{genderElements}</div>;
}
