import { Container, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

export default function About() {
  return (
    <Toolbar style={{ boxShadow: '0 3px 10px 0 rgba(0, 0, 0, 0.1)' , backgroundColor: '#EEEEEE'}}>
      <Container>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography>สงวนลิขสิทธิ์ © บริษัท Clothing Store จำกัด</Typography>
          <div style={{ flexGrow: 1 }} />
        </div>
      </Container>
    </Toolbar>
  );
}
