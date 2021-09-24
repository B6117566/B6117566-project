import React from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
        <div style={{ marginTop: '10%', justifyContent: 'center' }}>
          <Typography color="textPrimary" variant="h2">
            ไม่พบหน้านี้
          </Typography>
          <hr />
          <br />
          <Typography color="textPrimary" variant="subtitle1">
            ขออภัย เกิดข้อผิดพลาดขึ้น ไม่พบหน้าที่คุณค้นหา
            กรุณาตรวจสอบให้แน่ใจว่า URL ถูกต้อง หรือลองไปที่หน้าอื่นของเรา
          </Typography>
          <br />
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="secondary"
              style={{ width: '100%', height: '3rem' }}
            >
              <Typography variant="h6">
                <b>หน้าหลัก</b>
              </Typography>
            </Button>
          </Link>
        </div>
      </Container>
    </Box>
  </>
);

export default NotFound;
