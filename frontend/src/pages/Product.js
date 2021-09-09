import React from 'react';
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
    maxWidth: '50px',
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
  const { productId } = useParams();

  const [sizeSelect, setSizeSelect] = React.useState('');
  const handleAlignment = (event, newAlignment) => {
    setSizeSelect(newAlignment);
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} lg={7}>
            <div className={classes.centerImage}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://image.uniqlo.com/UQ/ST3/th/imagesgoods/441000/item/thgoods_68_441000.jpg?width=1008&impolicy=quality_75"
                  title=""
                />
              </Card>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={5}>
            <Typography variant="h4">
              <b>MEN เสื้อยืด Supima Cotton คอกลม แขนสั้น</b>
            </Typography>
            <br />
            <Typography variant="h5">
              <b>THB 390.00</b>
            </Typography>
            <br />
            <Typography variant="body1">
              ผ้าคอตตอน Supima® 100% ให้ความรู้สึกนุ่ม ยืดหยุ่น และเป็นมันเงา
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
                <ToggleButton
                  value="s"
                  disabled={false}
                  style={{ backgroundColor: 'none' }}
                >
                  <Typography variant="body1" className={classes.fontColor}>
                    <b>S</b>
                  </Typography>
                </ToggleButton>
                <ToggleButton
                  value="m"
                  disabled={false}
                  style={{ backgroundColor: 'none' }}
                >
                  <Typography variant="body1" className={classes.fontColor}>
                    <b>M</b>
                  </Typography>
                </ToggleButton>
                <ToggleButton
                  value="l"
                  disabled={false}
                  style={{ backgroundColor: 'none' }}
                >
                  <Typography variant="body1" className={classes.fontColor}>
                    <b>L</b>
                  </Typography>
                </ToggleButton>
                <ToggleButton
                  value="xl"
                  disabled={true}
                  style={{ backgroundColor: '#aaaaaa' }}
                >
                  <Typography variant="body1">
                    <b>XL</b>
                  </Typography>
                </ToggleButton>
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
                defaultValue={0}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
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
