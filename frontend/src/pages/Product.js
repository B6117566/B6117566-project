import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  Button,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {
  findProductById,
  getStocksByProductId,
  insertCart,
} from '../services/ProductListGender';
import { GlobalContext } from '../context/GlobalProvider';

const useStyles = makeStyles({
  root: { marginTop: '2rem' },
  centerImage: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '75%',
    boxShadow: '5px 7px 8px 0 rgba(0, 0, 0, 0.2)',
  },
  cardMedia: {
    paddingTop: '100%',
  },
  fontColor: {
    color: 'black',
  },
  numberField: {
    boxShadow: '0px 4px 6px 0 rgba(0, 0, 0, 0.1)',
    marginTop: '0.8rem',
    marginLeft: '0.8rem',
  },
  buttonClick: {
    width: '100%',
    height: '3rem',
  },
  buttonClickBack: {
    width: '100%',
    height: '3rem',
    boxShadow: '0px 4px 6px 0 rgba(0, 0, 0, 0.1)',
  },
  formControl: {
    minWidth: 100,
    marginLeft: '0.8rem',
  },
});

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(1.5),
    maxWidth: '90px',
    maxHeight: '50px',
    minWidth: '50px',
    minHeight: '50px',
    boxShadow: '0px 4px 6px 0 rgba(0, 0, 0, 0.1)',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
      border: '1px solid',
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
      border: '1px solid',
    },
    '&:hover': {
      border: '2px solid',
    },
  },
}))(ToggleButtonGroup);

export default function Product() {
  const classes = useStyles();
  const { productID } = useParams();
  const navigate = useNavigate();
  const { GlobalState, SetAlertShow, SetAlertSelect, SetErrorMessage } =
    useContext(GlobalContext);
  const [productApi, SetProductApi] = useState([]);
  const [stockApi, SetStockApi] = useState([]);
  const [countSelectArray, SetCountSelectArray] = useState([]);
  const [buttonSelect, SetButtonSelect] = useState(false);

  const [cartState, SetCartState] = useState(false);
  const [sizeSelect, SetSizeSelect] = useState(null);
  const [countSelect, SetCountSelect] = useState(1);

  const handleAlignment = (event, newAlignment) => {
    SetSizeSelect(newAlignment);
    SetCountSelect(1);
  };

  const handleCountSelect = (e) => {
    SetCountSelect(e.target.value);
  };

  const handleOnClickAddCart = () => {
    if (GlobalState.user.isAuthen) {
      if (sizeSelect) {
        const data = {
          quantity: Number(countSelect),
          stock_id: sizeSelect,
          user_id: GlobalState.user._id,
        };
        insertCart(data).then((res) => {
          if (res.status === 201) {
            SetCartState((prev) => !prev);
            SetErrorMessage([
              'เพิ่ม สินค้าลงในตะกร้าเรียบร้อยแล้ว',
              'โปรดตรวจสอบในตระกร้า',
            ]);
            SetAlertShow(true);
            SetAlertSelect(true);
            setTimeout(() => {
              SetAlertShow(false);
            }, 3000);
          } else {
            SetErrorMessage([
              'เพิ่ม สินค้าลงในตะกร้าไม่สำเร็จ',
              'กรุณาลองใหม่อีกครั้ง',
            ]);
            SetAlertShow(true);
            SetAlertSelect(false);
            setTimeout(() => {
              SetAlertShow(false);
            }, 3000);
          }
        });
      }
    } else {
      navigate(`/auth/signin`);
    }
  };

  useEffect(() => {
    function getStocks(id) {
      getStocksByProductId(id)
        .then((res) => {
          SetStockApi(res.result);
        })
        .catch(() => {
          SetStockApi([]);
        });
    }
    if (!GlobalState.product) {
      findProductById(productID)
        .then((res) => {
          SetProductApi(res.result);
        })
        .catch(() => {
          SetProductApi([]);
        });
      getStocks(productID);
    } else {
      SetProductApi(GlobalState.product);
      getStocks(GlobalState.product._id);
    }
  }, [GlobalState.product, cartState]);

  useEffect(() => {
    if (!sizeSelect) {
      SetButtonSelect(true);
      SetCountSelectArray([]);
    } else {
      stockApi.map((item) => {
        if (item._id === sizeSelect) {
          if (item.quantity < 11) {
            SetCountSelectArray([...Array(item.quantity).keys()]);
          } else {
            SetCountSelectArray([...Array(10).keys()]);
          }
        }
      });
      SetButtonSelect(false);
    }
  }, [sizeSelect]);

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} lg={7}>
            <div className={classes.centerImage}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={productApi.img}
                  src="image"
                  title=""
                />
              </Card>
            </div>
            <div>
              <br />
              <hr />
              <b>รายละเอียด</b>
              <br />
              <div
                dangerouslySetInnerHTML={{ __html: productApi.longDescription }}
              />
              <br />
              <hr />
              <b>วัสดุ</b>
              <br />
              <p>รหัสสินค้า {productApi.code}</p>
              <p>รายละเอียดเนื้อผ้า</p>
              <p>- {productApi.composition}</p>
              <p>คำแนะนำในการซัก</p>
              <p>- {productApi.washingInformation}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={5}>
            <Typography variant="h4">
              <b>{productApi.name}</b>
            </Typography>
            <br />
            <Typography variant="h5">
              <b>THB {productApi.prices}</b>
            </Typography>
            <br />
            <Typography variant="body1">
              {productApi.shortDescription}
            </Typography>
            <br />
            <hr />
            <br />
            <Typography variant="h6">
              <b>ขนาด :</b>
            </Typography>
            <div>
              <StyledToggleButtonGroup
                value={sizeSelect}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                {stockApi.map((item) => {
                  return item.quantity > 0 ? (
                    <ToggleButton
                      value={item._id}
                      disabled={false}
                      style={{ backgroundColor: 'none' }}
                      key={item._id}
                    >
                      <Typography variant="body1" className={classes.fontColor}>
                        <b>{item.size_id.name}</b>
                      </Typography>
                    </ToggleButton>
                  ) : (
                    <ToggleButton
                      value={item._id}
                      disabled={true}
                      style={{ backgroundColor: '#aaaaaa' }}
                      key={item._id}
                    >
                      <Typography variant="body1">
                        <b>{item.size_id.name}</b>
                      </Typography>
                    </ToggleButton>
                  );
                })}
              </StyledToggleButtonGroup>
            </div>
            <br />
            <div>
              <Typography variant="h6">
                <b>จำนวน</b>
              </Typography>
              <br />
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  id="select-number"
                  value={countSelect}
                  onChange={handleCountSelect}
                  disabled={buttonSelect}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: '35%',
                        width: '10%',
                      },
                    },
                  }}
                >
                  {countSelectArray.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item + 1}>
                        {item + 1}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <br />
            <hr />
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonClick}
              onClick={handleOnClickAddCart}
              disabled={buttonSelect}
              style={{ marginTop: '0.5rem' }}
            >
              <Typography variant="h6">
                <b>เพิ่มลงในตะกร้า</b>
              </Typography>
            </Button>
            <br />
            <div style={{ paddingBottom: '0.8rem' }} />
            <Button
              variant="outlined"
              className={classes.buttonClickBack}
              onClick={() => {
                navigate(-1);
              }}
            >
              <Typography variant="h6">
                <b>กลับไปเลือกสินค้าต่อ</b>
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
