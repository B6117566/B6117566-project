import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signinUser } from '../services/User';
import { findUserRoleById } from '../services/UserRole';
import { GlobalContext } from '../context/GlobalProvider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
  },
  propertyShow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  propertyElement: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2rem',
    width: '50%',
  },
});

export default function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errorShow, SetErrorShow] = useState(false);
  const [errorMessage, SetErrorMessage] = useState('');
  const { SetUserLoginDP, SetAuthorPartDP } = useContext(GlobalContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('กรุณาใส่ E-mail')
      .email('รูปแบบ E-mail ไม่ถูกต้อง'),
    password: Yup.string()
      .required('กรุณาใส่รหัสผ่าน')
      .min(6, 'รหัสผ่านขั้นต่ำอย่างน้อย 6 ตัวอักษร')
      .max(16, 'รหัสผ่านต้องไม่เกิน 16 ตัวอักษร'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    signinUser(data)
      .then((res) => {
        const data = { ...res.result, isAuthen: true };
        localStorage.setItem('user', JSON.stringify(data));
        SetUserLoginDP(data);
        findUserRoleById(res.result.userRole._id).then((res2) => {
          SetAuthorPartDP(res2.result.authorizationPart);
        });
        navigate(-1);
      })
      .catch((error) => {
        try {
          const { status } = error.response;
          if (status === 401) {
            SetErrorShow(true);
            SetErrorMessage('รหัสผ่านไม่ถูกต้อง');
            setTimeout(() => {
              SetErrorShow(false);
            }, 3000);
          } else if (status === 400) {
            SetErrorShow(true);
            SetErrorMessage('E-mail หรือ รหัสผ่านไม่ถูกต้อง');
            setTimeout(() => {
              SetErrorShow(false);
            }, 3000);
          }
        } catch (error) {
          SetErrorShow(true);
          SetErrorMessage('ระบบไม่สามารถทำตามคำร้องขอได้ กรุณาลองใหม่อีกครั้ง');
          setTimeout(() => {
            SetErrorShow(false);
          }, 3000);
        }
      });
  };

  return (
    <Container className={classes.root}>
      <Paper variant="outlined" className={classes.propertyShow}>
        <div className={classes.propertyElement}>
          <Typography variant="h4">
            <b>เข้าสู่ระบบ</b>
            {errorShow ? (
              <b style={{ color: 'red', fontSize: '18px' }}>
                {' '}
                # {errorMessage}!
              </b>
            ) : (
              <></>
            )}
          </Typography>
          <br />

          <Typography variant="subtitle1">
            เข้าสู่ระบบด้วยอีเมลและรหัสผ่าน (
            <b style={{ fontSize: '20px' }}> * </b>
            คือ โปรดระบุ )
          </Typography>
          <br />

          <TextField
            required
            id="email"
            name="email"
            label="E-mail"
            {...register('email')}
            placeholder="กรอก E-mail"
            variant="outlined"
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
          <br />

          <TextField
            required
            id="password"
            name="password"
            label="รหัสผ่าน"
            type="password"
            {...register('password')}
            placeholder="กรอกรหัสผ่าน"
            variant="outlined"
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
          <br />

          <Button
            variant="contained"
            disabled={!isValid}
            style={
              isValid
                ? {
                    color: 'white',
                    background: 'rgba(0, 0, 0, 1)',
                    borderRadius: '0px',
                    width: '100%',
                    maxWidth: '18rem',
                  }
                : {
                    borderRadius: '0px',
                    width: '100%',
                    maxWidth: '18rem',
                  }
            }
            onClick={handleSubmit(onSubmit)}
          >
            <Typography variant="subtitle1">
              <b>เข้าสู่ระบบ</b>
            </Typography>
          </Button>
        </div>
        <hr
          style={{
            border: '1px solid black',
            borderRadius: '1rem',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
          }}
        />
        <div className={classes.propertyElement}>
          <Typography variant="h4">
            <b>สร้างบัญชีผู้ใช้ใหม่</b>
          </Typography>
          <br />
          <Typography variant="subtitle1">
            สร้างบัญชีผู้ใช้ เพื่อการใช้งานที่สะดวก ชำระเงินได้รวดเร็วยิ่งขึ้น!
          </Typography>
          <br />

          <Link to={`/auth/signup`} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              style={{
                color: 'white',
                background: 'rgba(0, 0, 0, 1)',
                borderRadius: '0px',
                width: '100%',
                maxWidth: '18rem',
              }}
            >
              <Typography variant="subtitle1">
                <b>สร้างบัญชีผู้ใช้ใหม่</b>
              </Typography>
            </Button>
          </Link>
        </div>
      </Paper>
    </Container>
  );
}
