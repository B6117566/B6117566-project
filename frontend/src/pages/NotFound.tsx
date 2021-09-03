import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

const NotFound = () => (
  <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          404: The page you are looking for isn’t here
        </Typography>
      </Container>
    </Box>
  </>
);

export default NotFound;
