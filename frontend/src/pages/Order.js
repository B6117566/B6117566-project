import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Card,
  CardMedia,
} from '@material-ui/core';
import { getOrdersByUserId } from '../services/Order';
import { GlobalContext } from '../context/GlobalProvider';
import moment from 'moment';
import 'moment/locale/th';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  propertyShow: {
    display: 'flex',
    flexDirection: 'row',
  },
  propertyElement: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
  },
  cartDetail: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1rem',
    width: '100%',
  },
  card: {
    width: '200px',
  },
  cardMedia: {
    paddingTop: '100%',
  },
});

export default function Order() {
  const classes = useStyles();
  const { GlobalState, SetAlertShow, SetAlertSelect, SetErrorMessage } =
    useContext(GlobalContext);
  const [orderApi, SetOrderApi] = useState([]);

  useEffect(() => {
    moment.locale('th');
    getOrdersByUserId(GlobalState.user._id)
      .then((res) => {
        SetOrderApi(res.result);
      })
      .catch((error) => {
        try {
          const { status } = error.response;
          if (status !== 404) {
            SetOrderApi([]);
            SetErrorMessage([
              'ระบบไม่สามารถดึงรายการรายการสั่งซื้อได้',
              'กรุณาลองใหม่อีกครั้ง',
            ]);
            SetAlertShow(true);
            SetAlertSelect(false);
            setTimeout(() => {
              SetAlertShow(false);
            }, 3000);
          }
        } catch (error) {}
      });
  }, []);

  const listCartShow = orderApi.map((item, index) => {
    return (
      <div key={item._id}>
        <div
          style={{
            marginBottom: '1.5rem',
            margin: '1rem',
          }}
        >
          {index > 0 ? (
            <hr style={{ marginTop: '2.5rem', marginBottom: '0.8rem' }} />
          ) : (
            <></>
          )}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography
              style={{
                marginBottom: '0.7rem',
              }}
              variant="h5"
            >
              <b>รายการที่ {index + 1}</b>
            </Typography>
            <Typography
              style={{
                marginLeft: '1rem',
                marginTop: '0.2rem',
              }}
              variant="h6"
            >
              สร้างเมื่อวันที่ {moment(item.createdAt).format('LLL')}
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Typography
              style={{
                marginBottom: '0.7rem',
                marginRight: '3rem',
              }}
              variant="h6"
            >
              ราคารวมทั้งหมด : <b>THB {item.total} </b>
            </Typography>
          </div>
          <hr style={{ marginBottom: '1.5rem' }} />
        </div>
        {item.cart_id.map((item2, index2) => {
          return (
            <div key={item2._id}>
              <div className={classes.propertyElement}>
                <div className={classes.propertyShow}>
                  <div className={classes.card}>
                    <Card>
                      <CardMedia
                        className={classes.cardMedia}
                        image={item2.stock_id.product_id.img}
                        src="image"
                        title=""
                      />
                    </Card>
                  </div>
                  <div className={classes.cartDetail}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Typography variant="h5">
                        <b>{item2.stock_id.product_id.name}</b>
                      </Typography>
                      <div style={{ flexGrow: 1 }} />
                    </div>
                    <Typography>
                      รหัสสินค้า : {item2.stock_id.product_id.code}
                    </Typography>
                    <Typography>
                      ขนาด : {item2.stock_id.size_id.name}
                    </Typography>
                    <br />
                    <Typography>
                      <b>THB {item2.stock_id.product_id.prices}</b>
                    </Typography>
                    <br />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Typography>จำนวน : </Typography>
                      <Typography
                        variant="h6"
                        style={{ marginLeft: '1rem', marginTop: '-0.3rem' }}
                      >
                        <b>{item2.quantity}</b>
                      </Typography>
                      <div style={{ flexGrow: 1 }} />
                      <Typography variant="h6" style={{ marginRight: '3rem' }}>
                        ยอดรวม :{' '}
                        <b>
                          THB{' '}
                          {item2.quantity * item2.stock_id.product_id.prices}
                        </b>
                      </Typography>
                    </div>
                  </div>
                </div>
                {item.cart_id.length === 1 ||
                item.cart_id.length === index2 + 1 ? (
                  <></>
                ) : (
                  <div>
                    <br />
                    <hr style={{ width: '93%' }} />
                    <br />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <Container className={classes.root}>
      <Typography
        style={{
          marginTop: '2rem',
          marginBottom: '1rem',
        }}
        variant="h4"
      >
        <b>รายการสั่งซื้อ</b>
      </Typography>
      <Paper
        variant="outlined"
        className={classes.root}
        style={{ marginBottom: '1rem' }}
      >
        {orderApi.length ? (
          <>
            <Paper
              elevation={3}
              style={{
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                margin: '1rem',
              }}
            >
              <Grid item xs={12}>
                {listCartShow}
              </Grid>
              <hr style={{ border: '0px' }} />
            </Paper>
          </>
        ) : (
          <div
            style={{ display: 'flex', flexDirection: 'row', margin: '1rem' }}
          >
            <div style={{ flexGrow: 1 }} />
            <Typography
              style={{
                marginTop: '5rem',
                marginBottom: '5rem',
              }}
              variant="h5"
            >
              รายการสั่งซื้อของคุณว่างอยู่
            </Typography>
            <div style={{ flexGrow: 1 }} />
          </div>
        )}
      </Paper>
    </Container>
  );
}
