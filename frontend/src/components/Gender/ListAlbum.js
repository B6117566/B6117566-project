import React, { useContext, useEffect, useRef, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CardActionArea, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalProvider';
import {
  getProductsAllByGender,
  getProductsAllByCategoryGender,
} from '../../services/ProductListGender';
import { AlertProductContext } from '../../pages/Gender';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(3),
    paddingLeft: '1.3%',
    paddingRight: '0%',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const useHasChanged = (val) => {
  const prevVal = usePrevious(val);
  return prevVal !== val;
};

export default function ListAlbum({ genderName }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { GlobalState, SetProductDP, SetCategoryDP } =
    useContext(GlobalContext);
  const [productListShow, SetProductListShow] = useState([]);
  const [loadMore, SetLoadMore] = useState(0);
  const [lengthList, SetLengthList] = useState(0);
  const { handleErrorProductShow, SetNameCategoryAlert } =
    useContext(AlertProductContext);
  const genderChanged = useHasChanged(genderName);

  const handlechangeLoadMore = () => {
    SetLoadMore(loadMore + 1);
  };

  useEffect(() => {
    if (genderChanged) {
      SetCategoryDP({ id: null, name: null });
      GlobalState.gender.map((item) => {
        if (genderName === item.name) {
          getProductsAllByGender(item._id).then((res) => {
            SetProductListShow(res.result);
            SetLengthList(res.result.length);
            SetLoadMore(0);
          });
        }
      });
    } else {
      if (!GlobalState.category._id) {
        GlobalState.gender.map((item) => {
          if (genderName === item.name) {
            getProductsAllByGender(item._id).then((res) => {
              SetProductListShow(res.result);
              SetLengthList(res.result.length);
              SetLoadMore(0);
            });
          }
        });
      } else {
        getProductsAllByCategoryGender(GlobalState.category._id)
          .then((res) => {
            SetProductListShow(res.result);
            SetLengthList(res.result.length);
            SetLoadMore(0);
          })
          .catch((err) => {
            console.error(
              'ระบบไม่สามารถขอรายการ',
              GlobalState.category.name,
              'ได้'
            );
            SetNameCategoryAlert(GlobalState.category.name);
            handleErrorProductShow();
            SetCategoryDP({ id: null, name: null });
          });
      }
    }
  }, [genderName, GlobalState.category._id]);

  useEffect(() => {
    if (loadMore > 0) {
      if (!GlobalState.category._id) {
        getProductsAllByGender(
          `${GlobalState.gender_id}?offset=${loadMore * lengthList}`
        ).then((res) => {
          SetProductListShow([...productListShow, ...res.result]);
          if (res.result.length < lengthList) {
            SetLengthList(0);
          }
        });
      } else {
        getProductsAllByCategoryGender(
          `${GlobalState.category._id}?offset=${loadMore * lengthList}`
        )
          .then((res) => {
            SetProductListShow([...productListShow, ...res.result]);
            if (res.result.length <= lengthList) {
              SetLengthList(0);
            }
          })
          .catch((err) => {
            console.error(
              'ระบบไม่สามารถขอรายการ',
              GlobalState.category.name,
              'ได้'
            );
            SetNameCategoryAlert(GlobalState.category.name);
            handleErrorProductShow();
            SetCategoryDP({ id: null, name: null });
          });
      }
    }
  }, [loadMore]);

  return (
    <Container className={classes.cardGrid}>
      <Grid container spacing={2}>
        {productListShow.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item._id}>
            {item.isSale ? (
              <Card className={classes.card}>
                <CardActionArea
                  onClick={() => {
                    SetProductDP(item);
                    navigate(`/products/${item._id}`);
                  }}
                >
                  <CardMedia
                    className={classes.cardMedia}
                    image={item.img}
                    title=""
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6">
                      {item.name}
                    </Typography>
                    <Typography variant="h5">
                      <b>THB {item.prices} </b>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ) : (
              <></>
            )}
          </Grid>
        ))}
      </Grid>
      <br />
      <hr />
      {lengthList > 19 ? (
        <div>
          <Button
            color="primary"
            style={{ width: '100%', height: '3rem' }}
            onClick={handlechangeLoadMore}
          >
            <Typography variant="h6">
              <b>แสดงสินค้าเพิ่มเติม</b>
            </Typography>
          </Button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <b>สิ้นสุดการแสดงสินค้า</b>
        </div>
      )}
    </Container>
  );
}
