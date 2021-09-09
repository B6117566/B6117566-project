import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(3),
    paddingLeft: '1.3%',
    paddingRight: '0%'
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function ListAlbum() {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid}>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea
                onClick={() => {
                  console.log('555');
                }}
              >
                <CardMedia
                  className={classes.cardMedia}
                  image="https://image.uniqlo.com/UQ/ST3/th/imagesgoods/441000/item/thgoods_68_441000.jpg?width=1008&impolicy=quality_75"
                  title=""
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h6">
                    WOMEN UNIQLO U เสื้อยืด HEATTECH ผ้าคอตตอน คอตั้ง แขนยาว
                  </Typography>
                  <Typography variant="h5">
                    <b>THB 190.00</b>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
