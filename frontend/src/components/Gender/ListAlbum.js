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

let first = false;

export default function ListAlbum({ genderName }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { GlobalState, SetProductDP, SetCategoryDP } =
    useContext(GlobalContext);
  const [productListShow, SetProductListShow] = useState([]);
  const [loadMore, SetLoadMore] = useState(0);
  const [lengthList, SetLengthList] = useState(0);
  const genderChanged = useHasChanged(genderName);

  const handlechangeLoadMore = () => {
    SetLoadMore(loadMore + 1);
  };

  useEffect(() => {
    if (genderChanged) {
      first = true;
      SetCategoryDP({ id: null, name: null });
      GlobalState.gender.map((item) => {
        if (genderName === item.name) {
          getProductsAllByGender(item._id)
            .then((res) => {
              SetProductListShow(res.result);
              SetLengthList(res.result.length);
              SetLoadMore(0);
            })
            .catch(() => {
              SetProductListShow([]);
              SetLengthList(0);
            });
        }
      });
    } else {
      if (!GlobalState.category._id && !GlobalState.category.name && !first) {
        GlobalState.gender.map((item) => {
          if (genderName === item.name) {
            getProductsAllByGender(item._id)
              .then((res) => {
                SetProductListShow(res.result);
                SetLengthList(res.result.length);
                SetLoadMore(0);
              })
              .catch(() => {
                SetProductListShow([]);
                SetLengthList(0);
              });
          }
        });
      } else if (GlobalState.category._id) {
        getProductsAllByCategoryGender(GlobalState.category._id)
          .then((res) => {
            SetProductListShow(res.result);
            SetLengthList(res.result.length);
            SetLoadMore(0);
          })
          .catch((err) => {
            SetProductListShow([]);
            SetLengthList(0);
            SetCategoryDP({ _id: null, name: GlobalState.category.name });
          });
      } else if (first) {
        first = false;
      }
    }
  }, [genderName, GlobalState.category._id, GlobalState.category.name]);

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
            SetProductListShow([]);
            SetLengthList(0);
            SetCategoryDP({ _id: null, name: GlobalState.category.name });
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
              <Card
                className={classes.card}
                onClick={() => {
                  SetProductDP(item);
                  navigate(`/products/${item._id}`);
                }}
              >
                <CardActionArea>
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

      {GlobalState.category._id ? (
        lengthList > 19 ? (
          <div>
            <hr />
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
          <div>
            <hr />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <b>สิ้นสุดการแสดงสินค้า</b>
            </div>
          </div>
        )
      ) : lengthList === 0 ? (
        <div
          style={{
            marginTop: '20%',
            marginBottom: '20%',
            display: 'flex',
          }}
        >
          <div style={{ flexGrow: 1 }} />
          <Typography variant="h6">
            ไม่มีรายการสินค้า {GlobalState.category.name}
          </Typography>
          <div style={{ flexGrow: 1 }} />
        </div>
      ) : lengthList > 19 ? (
        <div>
          <hr />
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
        <div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <b>สิ้นสุดการแสดงสินค้า</b>
          </div>
        </div>
      )}
    </Container>
  );
}
