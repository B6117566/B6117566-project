import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  TextField,
  Button,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {
  findProductById,
  getStocksByProductId,
} from '../services/ProductListGender';
import { SelectIDContext } from '../context/SelectIDProvider';

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
  const { SelectIDState } = useContext(SelectIDContext);
  const [productApi, SetProductApi] = useState([]);
  const [stockApi, SetStockApi] = useState([]);
  const [maxSelect, SetMaxSelect] = useState(0);

  const [sizeSelect, SetSizeSelect] = useState('');
  const [countSelect, SetCountSelect] = useState(1);

  const handleAlignment = (event, newAlignment) => {
    SetSizeSelect(newAlignment);
    SetCountSelect(1);
  };

  const handleCountSelect = (e) => {
    SetCountSelect(e.target.value);
  };

  useEffect(() => {
    if (!SelectIDState.product) {
      findProductById(productID).then((res) => {
        SetProductApi(res.result);
      });
      getStocksByProductId(productID).then((res) => {
        SetStockApi(res.result);
      });
    } else {
      SetProductApi(SelectIDState.product);
      getStocksByProductId(SelectIDState.product._id).then((res) => {
        SetStockApi(res.result);
      });
    }
  }, [SelectIDState.product]);

  useEffect(() => {
    stockApi.map((item) => {
      if (item._id === sizeSelect) {
        SetMaxSelect(item.quantity);
      }
    });
  }, [sizeSelect]);

  console.log(sizeSelect, SelectIDState, productApi, stockApi);

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
              <TextField
                id="outlined-number"
                type="number"
                name="count"
                value={countSelect}
                onChange={handleCountSelect}
                InputProps={{ inputProps: { min: 1, max: maxSelect } }}
                variant="outlined"
                className={classes.numberField}
              />
            </div>
            <br />
            <hr />
            <br />
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonClick}
            >
              <Typography variant="h6">
                <b>เพิ่มลงในตะกร้า</b>
              </Typography>
            </Button>
            <br />
            <div style={{ paddingBottom: '0.8rem' }} />
            <Button variant="outlined" className={classes.buttonClickBack}>
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
