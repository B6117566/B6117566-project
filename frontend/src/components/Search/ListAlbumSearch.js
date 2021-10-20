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
import { GlobalContext } from '../../context/GlobalProvider';
import { findProductsBySearch } from '../../services/ProductListGender';

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

export default function ListAlbumSearch({ search }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { SetProductDP } = useContext(GlobalContext);
  const [productListShow, SetProductListShow] = useState([]);
  const [loadMore, SetLoadMore] = useState(0);
  const [lengthList, SetLengthList] = useState(0);

  const handlechangeLoadMore = () => {
    SetLoadMore(loadMore + 1);
  };

  useEffect(() => {
    if (search) {
      findProductsBySearch(search)
        .then((res) => {
          SetProductListShow(res.result);
          SetLengthList(res.result.length);
          SetLoadMore(0);
        })
        .catch(() => {});
    }
  }, [search]);

  useEffect(() => {
    if (loadMore > 0) {
      findProductsBySearch(`${search}?offset=${loadMore * lengthList}`)
        .then((res) => {
          SetProductListShow([...productListShow, ...res.result]);
          if (res.result.length < lengthList) {
            SetLengthList(0);
          }
        })
        .catch(() => {});
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

      {productListShow.length ? (
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
      ) : (
        <div
          style={{
            marginTop: '20%',
            marginBottom: '20%',
            display: 'flex',
          }}
        >
          <div style={{ flexGrow: 1 }} />
          <Typography variant="h6">ไม่มีรายการสินค้า "{search}"</Typography>
          <div style={{ flexGrow: 1 }} />
        </div>
      )}
    </Container>
  );
}
