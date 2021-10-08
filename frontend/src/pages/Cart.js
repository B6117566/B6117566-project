import React from 'react';

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
} from '@material-ui/core';
import { useState } from 'react';

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
  cartShow: {
    display: 'flex',
    flexDirection: 'row',
  },
  cartDetail: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1rem',
    width: '100%',
  },
  card: {
    width: '32%',
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
  const [countSelectArray, SetCountSelectArray] = useState([
    ...Array(10).keys(),
  ]);
  const [countSelect, SetCountSelect] = useState(1);
  const handleCountSelect = (e) => {
    SetCountSelect(e.target.value);
  };

  return (
    <Container className={classes.root}>
      <Typography
        style={{
          marginTop: '2rem',
          marginBottom: '1rem',
        }}
        variant="h4"
      >
        <b>ตระกร้าสินค้า</b>
      </Typography>
      <Paper variant="outlined" className={classes.propertyShow}>
        <Grid item xs={8}>
          <div className={classes.propertyElement}>
            <div className={classes.cartShow}>
              <div className={classes.card}>
                <Card>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://image.uniqlo.com/UQ/ST3/th/imagesgoods/440882/item/thgoods_09_440882.jpg?width=648&impolicy=quality_75"
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
                    <b>MEN เสื้อแขนสั้น Manga Demon Slayer UT</b>
                  </Typography>
                  <div style={{ flexGrow: 1 }} />
                  <Typography variant="h6">
                    <b>X</b>
                  </Typography>
                </div>
                <Typography>รหัสสินค้า : 440882</Typography>
                <Typography>ขนาด : S</Typography>
                <br />
                <Typography>
                  <b>THB 590.00</b>
                </Typography>
                <br />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Typography>จำนวน </Typography>

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      id="select-number"
                      value={countSelect}
                      onChange={handleCountSelect}
                      style={{ maxHeight: '45px' }}
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
              </div>
            </div>
            <br />
            <div>
              <hr />
            </div>
          </div>
        </Grid>
        <hr style={{ width: '30px', border: '0px' }} />
        <Grid item xs={4}>
          <div className={classes.propertyElement}>
            <Paper variant="outlined">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0.8rem',
                }}
              >
                <Typography variant="h6">
                  สรุปคำสั่งซื้อ | <b>2</b> รายการ
                </Typography>
                <br />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Typography variant="h6">
                    <b>ราคารวมทั้งหมด</b>
                  </Typography>
                  <div style={{ flexGrow: 1 }} />
                  <Typography variant="h6">
                    <b>THB 1,180.00</b>
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
            >
              <Typography variant="subtitle1">
                <b>สั่งสินค้า</b>
              </Typography>
            </Button>
          </div>
        </Grid>
      </Paper>
    </Container>
  );
}
