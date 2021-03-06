import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Select,
  FormControl,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import {
  getCartsByUserId,
  deleteCart,
  updateCartSomeField,
} from '../services/Cart';
import { updateStockSomeField } from '../services/Stock';
import { insertOrder } from '../services/Order';
import { GlobalContext } from '../context/GlobalProvider';

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
    width: '250px',
  },
  cardMedia: {
    paddingTop: '100%',
  },
  formControl: {
    minWidth: 150,
    marginLeft: '0.8rem',
    marginTop: '-0.4rem',
  },
});

export default function Cart() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { GlobalState, SetAlertShow, SetAlertSelect, SetErrorMessage } =
    useContext(GlobalContext);
  const [cartApi, SetCartApi] = useState([]);
  const [idList, SetIDList] = useState([]);
  const [totalPrice, SetTotalPrice] = useState(0);
  const [totalCount, SetTotalCount] = useState(0);

  const [deleteSelectState, SetDeleteSelectState] = useState(false);
  const [orderState, SetOrderState] = useState(false);

  const handleCountSelect = (index, e, id) => {
    updateCartSomeField(id, { quantity: e.target.value })
      .then(() => {
        const data = cartApi;
        data[index].quantity = e.target.value;
        SetCartApi([...data]);
      })
      .catch((error) => {
        try {
          const { status } = error.response;
          if (status === 400 || status === 401) {
            navigate('/auth/signin');
          } else if (status === 403) {
            navigate('/404');
          }
        } catch (err) {}
      });
  };

  const handleOrder = async () => {
    let checkErrorUpdate = true;
    let checkErrorStockQuantity = true;
    let checkErrorOrder = true;

    await Promise.all(
      cartApi.map(async (item) => {
        await updateCartSomeField(item._id, { isCart: false }).catch(
          (error) => {
            checkErrorUpdate = false;
            try {
              const { status } = error.response;
              if (status === 400 || status === 401) {
                navigate('/auth/signin');
              } else if (status === 403) {
                navigate('/404');
              }
            } catch (err) {}
          }
        );
        await updateStockSomeField(item.stock_id._id, {
          quantity: item.stock_id.quantity - item.quantity,
        }).catch((error) => {
          checkErrorStockQuantity = false;
          try {
            const { status } = error.response;
            if (status === 400 || status === 401) {
              navigate('/auth/signin');
            } else if (status === 403) {
              navigate('/404');
            }
          } catch (err) {}
        });
      })
    );

    if (checkErrorUpdate && checkErrorStockQuantity) {
      try {
        await insertOrder({
          total: totalPrice,
          cart_id: idList,
          user_id: GlobalState.user._id,
        });
      } catch (error) {
        checkErrorOrder = false;
        try {
          const { status } = error.response;
          if (status === 400 || status === 401) {
            navigate('/auth/signin');
          } else if (status === 403) {
            navigate('/404');
          }
        } catch (err) {}
      }
    }

    if (checkErrorUpdate && checkErrorOrder && checkErrorStockQuantity) {
      SetOrderState((prev) => !prev);
      SetErrorMessage([
        '?????????????????????????????????????????????????????????????????????',
        '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
      ]);
      SetAlertShow(true);
      SetAlertSelect(true);
      setTimeout(() => {
        SetAlertShow(false);
      }, 3000);
    } else {
      SetErrorMessage(['?????????????????????????????????????????????????????????', '????????????????????????????????????????????????????????????']);
      SetAlertShow(true);
      SetAlertSelect(false);
      setTimeout(() => {
        SetAlertShow(false);
      }, 3000);
    }
  };

  const handleDeleteSelect = (id) => {
    deleteCart(id)
      .then(() => {
        SetDeleteSelectState((prev) => !prev);
        SetErrorMessage([
          '?????? ?????????????????????????????????????????????????????????????????????????????????',
          '????????????????????????????????????????????????????????????',
        ]);
        SetAlertShow(true);
        SetAlertSelect(true);
        setTimeout(() => {
          SetAlertShow(false);
        }, 3000);
      })
      .catch((error) => {
        try {
          const { status } = error.response;
          if (status === 404) {
            SetErrorMessage([
              '?????? ?????????????????????????????????????????????????????????????????????',
              '????????????????????????????????????????????????????????????',
            ]);
            SetAlertShow(true);
            SetAlertSelect(false);
            setTimeout(() => {
              SetAlertShow(false);
            }, 3000);
          } else if (status === 400 || status === 401) {
            navigate('/auth/signin');
          } else if (status === 403) {
            navigate('/404');
          }
        } catch (error) {
          SetErrorMessage([
            '???????????????????????????????????????????????????????????????????????????????????????',
            '????????????????????????????????????????????????????????????',
          ]);
          SetAlertShow(true);
          SetAlertSelect(false);
          setTimeout(() => {
            SetAlertShow(false);
          }, 3000);
        }
      });
  };

  useEffect(() => {
    getCartsByUserId(GlobalState.user._id)
      .then((res) => {
        SetCartApi(res.result);
        SetIDList(
          res.result.map((item) => {
            return item._id;
          })
        );
      })
      .catch((error) => {
        SetCartApi([]);
        try {
          const { status } = error.response;
          if (status === 400 || status === 401) {
            navigate('/auth/signin');
          } else if (status === 403) {
            navigate('/404');
          } else if (status !== 404) {
            SetErrorMessage([
              '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
              '????????????????????????????????????????????????????????????',
            ]);
            SetAlertShow(true);
            SetAlertSelect(false);
            setTimeout(() => {
              SetAlertShow(false);
            }, 3000);
          }
        } catch (err) {}
      });
  }, [deleteSelectState, orderState]);

  useEffect(() => {
    SetTotalPrice(0);
    SetTotalCount(0);
    cartApi.map((item) => {
      SetTotalCount((prev) => {
        return prev + 1;
      });
      SetTotalPrice((prev) => {
        return item.quantity * item.stock_id.product_id.prices + prev;
      });
    });
  }, [cartApi]);

  const listCartShow = cartApi.map((item, index) => {
    return (
      <div key={item._id}>
        <div className={classes.propertyShow}>
          <div className={classes.card}>
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image={item.stock_id.product_id.img}
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
              <Typography variant="h6">
                <b>{item.stock_id.product_id.name}</b>
              </Typography>
              <div style={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                onClick={() => {
                  handleDeleteSelect(item._id);
                }}
              >
                <ClearIcon />
              </IconButton>
            </div>
            <Typography>
              ?????????????????????????????? : {item.stock_id.product_id.code}
            </Typography>
            <Typography>???????????? : {item.stock_id.size_id.name}</Typography>
            <br />
            <Typography>
              <b>THB {item.stock_id.product_id.prices}</b>
            </Typography>
            <br />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography>??????????????? </Typography>
              <div style={{ flexGrow: 1 }} />
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  id="select-quantity"
                  name="select-quantity"
                  value={item.quantity}
                  onChange={(e) => {
                    handleCountSelect(index, e, item._id);
                  }}
                  style={{ marginTop: '-1rem' }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: '35%',
                        width: '10%',
                      },
                    },
                  }}
                >
                  {[...Array(item.stock_id.quantity).keys()].map(
                    (itemA, indexA) => {
                      if (indexA < 10) {
                        return (
                          <MenuItem key={indexA} value={itemA + 1}>
                            {itemA + 1}
                          </MenuItem>
                        );
                      }
                    }
                  )}
                </Select>
              </FormControl>
              <div style={{ flexGrow: 1 }} />
              <Typography>
                <b>
                  ?????????????????? : THB {item.quantity * item.stock_id.product_id.prices}
                </b>
              </Typography>
            </div>
          </div>
        </div>
        {cartApi.length === 1 ? (
          <></>
        ) : (
          <div>
            <br />
            <hr />
            <br />
          </div>
        )}
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
        <b>??????????????????</b>
      </Typography>
      <Paper
        variant="outlined"
        className={classes.propertyShow}
        style={{ marginBottom: '2rem' }}
      >
        {cartApi.length ? (
          <>
            <Grid item xs={8}>
              <Paper
                elevation={3}
                className={classes.propertyElement}
                style={{ marginBottom: '1rem' }}
              >
                <div className={classes.propertyElement}>{listCartShow}</div>
              </Paper>
            </Grid>

            <hr style={{ width: '20px', border: '0px' }} />
            <Grid item xs={4}>
              <div
                className={classes.propertyElement}
                style={{ position: 'sticky', top: 85 }}
              >
                <Paper variant="outlined">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      margin: '0.8rem',
                    }}
                  >
                    <Typography variant="h6">
                      ?????????????????????????????????????????? | <b>{totalCount}</b> ??????????????????
                    </Typography>
                    <br />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Typography variant="h6">
                        <b>??????????????????????????????????????????</b>
                      </Typography>
                      <div style={{ flexGrow: 1 }} />
                      <Typography variant="h6">
                        <b>THB {totalPrice}</b>
                      </Typography>
                    </div>
                  </div>
                </Paper>
                <br />
                <div>
                  <hr />
                </div>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: '0px',
                    width: '100%',
                  }}
                  onClick={handleOrder}
                >
                  <Typography variant="subtitle1">
                    <b>??????????????????????????????</b>
                  </Typography>
                </Button>
              </div>
            </Grid>
          </>
        ) : (
          <>
            <div style={{ flexGrow: 1 }} />
            <Typography
              style={{
                marginTop: '5rem',
                marginBottom: '5rem',
              }}
              variant="h5"
            >
              ????????????????????????????????????????????????????????????
            </Typography>
            <div style={{ flexGrow: 1 }} />
          </>
        )}
      </Paper>
    </Container>
  );
}
