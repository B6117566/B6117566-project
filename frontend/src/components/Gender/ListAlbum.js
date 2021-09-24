import React, { useContext, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CardActionArea, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { SelectIDContext } from '../../context/SelectIDProvider';
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

export default function ListAlbum({ genderName }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { SelectIDState, SetProductDP, SetCategoryDP } =
    useContext(SelectIDContext);
  const [productListShow, SetProductListShow] = useState([]);
  const [loadMore, SetLoadMore] = useState(0);
  const [lengthList, SetLengthList] = useState(0);

  const handlechangeLoadMore = () => {
    SetLoadMore(loadMore + 1);
  };

  useEffect(() => {
    SelectIDState.gender.map((item) => {
      if (genderName === item.name) {
        getProductsAllByGender(item._id).then((res) => {
          SetProductListShow(res.result);
          SetLengthList(res.result.length);
          SetLoadMore(0);
        });
      }
    });
  }, [genderName, !SelectIDState.category._id]);

  useEffect(() => {
    if (SelectIDState.category._id) {
      getProductsAllByCategoryGender(SelectIDState.category._id)
        .then((res) => {
          SetProductListShow(res.result);
          SetLengthList(res.result.length);
          SetLoadMore(0);
        })
        .catch((err) => {
          console.error(
            'ระบบไม่สามารถขอรายการ',
            SelectIDState.category.name,
            'ได้'
          );
          SetCategoryDP({ id: null, name: null });
        });
    }
  }, [SelectIDState.category._id]);

  useEffect(() => {
    if (!SelectIDState.category._id && loadMore > 0) {
      getProductsAllByGender(
        `${SelectIDState.gender_id}?offset=${loadMore * lengthList}`
      ).then((res) => {
        SetProductListShow([...productListShow, ...res.result]);
        if (res.result.length < lengthList) {
          SetLengthList(0);
        }
      });
    } else if (SelectIDState.category._id && loadMore > 0) {
      getProductsAllByCategoryGender(
        `${SelectIDState.category._id}?offset=${loadMore * lengthList}`
      )
        .then((res) => {
          SetProductListShow([...productListShow, ...res.result]);
          if (res.result.length <= lengthList) {
            SetLengthList(0);
          }
          console.log(res.result.length, lengthList);
        })
        .catch((err) => {
          console.error(
            'ระบบไม่สามารถขอรายการ',
            SelectIDState.category.name,
            'ได้'
          );
          SetCategoryDP({ id: null, name: null });
        });
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
              <b>โหลดเพิ่มเติม</b>
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
          <b>สิ้นสุดการค้นหา</b>
        </div>
      )}
    </Container>
  );
}
