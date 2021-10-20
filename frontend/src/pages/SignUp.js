import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Backdrop,
  Fade,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signupUser } from '../services/User';
import { getProvinces } from '../services/Province';
import { getAddressByProvinceId } from '../services/Address';
import { getUserRoleOfUser } from '../services/UserRole';
import { GlobalContext } from '../context/GlobalProvider';

const useStyles = makeStyles((theme) => ({
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
    margin: '2rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { SetAlertShow, SetAlertSelect, SetErrorMessage } =
    useContext(GlobalContext);

  const [provinceApi, SetProvinceApi] = useState([]);
  const [addressApi, SetAddressApi] = useState([]);
  const [addressFilterApi, SetAddressFilterApi] = useState([]);

  const [provinceSelect, SetProvinceSelect] = useState(true);
  const [districtSelect, SetDistrictSelect] = useState(true);

  const [province_id, SetProvinceId] = useState('');
  const [nameDistrict, SetNameDistrict] = useState('');
  const [postCode, SetPostCode] = useState('');

  const [address_id, SetAddressId] = useState('');
  const [userRole_Id, SetUserRoleId] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  const handleProvinceIdSelect = (e) => {
    SetProvinceId(e.target.value);
    SetProvinceSelect(false);
    SetDistrictSelect(true);
    SetNameDistrict('');
    SetAddressId('');
    SetPostCode('');
  };

  const handleNamedistrictSelect = (e) => {
    SetNameDistrict(e.target.value);
    SetDistrictSelect(false);
    SetAddressId('');
    SetPostCode('');
  };

  const handleAddressIdSelect = (e) => {
    SetAddressId(e.target.value);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('กรุณาใส่ E-mail')
      .email('รูปแบบ E-mail ไม่ถูกต้อง'),
    password: Yup.string()
      .required('กรุณาใส่รหัสผ่าน')
      .min(6, 'รหัสผ่านขั้นต่ำอย่างน้อย 6 ตัวอักษร')
      .max(16, 'รหัสผ่านต้องไม่เกิน 16 ตัวอักษร'),
    firstname: Yup.string().required('กรุณาใส่ชื่อ'),
    lastname: Yup.string().required('กรุณาใส่นามสกุล'),
    phone: Yup.string()
      .required('กรุณาใส่เบอร์โทรศัพท์')
      .min(10, 'กรุณาใส่เบอร์โทรศัพท์ 10 ตัว')
      .max(10, 'กรุณาใส่เบอร์โทรศัพท์ 10 ตัว')
      .matches(/^\d{10}$/, 'กรุณาใส่เบอร์โทรศัพท์เป็นตัวเลขเท่านั้น'),
    addressDetail: Yup.string().required('กรุณากรอกรายละเอียดที่อยู่'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    getProvinces()
      .then((res) => {
        SetProvinceApi(res.result);
      })
      .catch((error) => {
        try {
          const { status } = error.response;
          if (status === 404) {
            SetErrorMessage([
              'ระบบไม่มีข้อมูลจังหวัด',
              'กรุณาลองใหม่ในภายหลัง หรือติดต่อผู้ดูแลระบบ',
            ]);
            SetAlertShow(true);
            SetAlertSelect(false);
            setTimeout(() => {
              SetAlertShow(false);
            }, 3000);
          } else {
            SetErrorMessage([
              'ระบบไม่สามารถดึงข้อมูลจังหวัดได้',
              'กรุณาลองใหม่อีกครั้ง',
            ]);
            SetAlertShow(true);
            SetAlertSelect(false);
            setTimeout(() => {
              SetAlertShow(false);
            }, 3000);
          }
        } catch (error) {}
      });

    getUserRoleOfUser()
      .then((res) => {
        SetUserRoleId(res.result._id);
      })
      .catch((error) => {
        try {
          const { status } = error.response;
          if (status === 404) {
            SetErrorMessage([
              'ระบบไม่มีข้อมูลประเภทผู้ใช้',
              'กรุณาลองใหม่อีกครั้ง หรือติดต่อผู้ดูแลระบบ',
            ]);
            SetAlertShow(true);
            SetAlertSelect(false);
            setTimeout(() => {
              SetAlertShow(false);
            }, 3000);
          } else {
            SetErrorMessage([
              'ระบบไม่สามารถดึงข้อมูลประเภทผู้ใช้',
              'กรุณาลองใหม่ในภายหลัง',
            ]);
            SetAlertShow(true);
            SetAlertSelect(false);
            setTimeout(() => {
              SetAlertShow(false);
            }, 3000);
          }
        } catch (error) {}
      });
  }, []);

  useEffect(() => {
    if (province_id) {
      function getUniqueListBy(arr, key) {
        return [...new Map(arr.map((item) => [item[key], item])).values()];
      }
      getAddressByProvinceId(province_id)
        .then((res) => {
          SetAddressApi(res.result);
          SetAddressFilterApi(getUniqueListBy(res.result, 'districtName'));
        })
        .catch((error) => {
          try {
            const { status } = error.response;
            if (status === 404) {
              SetErrorMessage([
                'ระบบไม่มีข้อมูลอำเภอ ตำบล รหัสไปรษณีย์',
                'กรุณาลองใหม่ในภายหลัง หรือติดต่อผู้ดูแลระบบ',
              ]);
              SetAlertShow(true);
              SetAlertSelect(false);
              setTimeout(() => {
                SetAlertShow(false);
              }, 3000);
            } else {
              SetErrorMessage([
                'ระบบไม่สามารถดึงข้อมูลอำเภอ ตำบล รหัสไปรษณีย์ได้',
                'กรุณาลองใหม่อีกครั้ง',
              ]);
              SetAlertShow(true);
              SetAlertSelect(false);
              setTimeout(() => {
                SetAlertShow(false);
              }, 3000);
            }
          } catch (error) {}
        });
    } else {
      SetProvinceSelect(true);
      SetDistrictSelect(true);
    }
  }, [province_id]);

  const onSubmit = (data) => {
    signupUser({
      ...data,
      userRole_id: userRole_Id,
      address_id: address_id,
    })
      .then((res) => {
        handleOpen();
      })
      .catch((error) => {
        try {
          const { status } = error.response;
          if (status === 400 || status === 409) {
            SetErrorMessage([
              error.response.data.result.messages,
              'กรุณาลองใหม่อีกครั้ง',
            ]);
            SetAlertShow(true);
            SetAlertSelect(false);
            setTimeout(() => {
              SetAlertShow(false);
            }, 3000);
          }
        } catch (error) {
          SetErrorMessage([
            'ระบบไม่สามารถทำตามคำร้องขอได้',
            'กรุณาลองใหม่อีกครั้ง',
          ]);
          SetAlertShow(true);
          SetAlertSelect(false);
          setTimeout(() => {
            SetAlertShow(false);
          }, 3000);
        }
      });
  };

  return (
    <Container className={classes.root}>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 300,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">
                สร้างบัญชีผู้ใช้ใหม่เรียบร้อยแล้ว
              </h2>
              <Button
                variant="contained"
                style={{
                  color: 'white',
                  background: 'rgba(0, 0, 0, 1)',
                  borderRadius: '0px',
                  width: '100%',
                }}
                onClick={handleClose}
              >
                <Typography variant="subtitle1">
                  <b>เข้าสู่ระบบ</b>
                </Typography>
              </Button>
            </div>
          </Fade>
        </Modal>
      </div>

      <Typography
        style={{
          marginTop: '2rem',
          marginBottom: '1rem',
        }}
        variant="h4"
      >
        <b>สร้างบัญชีผู้ใช้ใหม่ </b>
      </Typography>
      <Typography variant="h6">
        (<b style={{ fontSize: '20px' }}> * </b>
        คือ โปรดระบุ )
      </Typography>
      <br />

      <Paper variant="outlined" className={classes.root}>
        <div className={classes.propertyShow}>
          <Grid item xs={6}>
            <div className={classes.propertyElement}>
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
                id="firstname"
                name="firstname"
                label="ชื่อ"
                {...register('firstname')}
                placeholder="กรอกชื่อ"
                variant="outlined"
                error={errors.firstname ? true : false}
                helperText={errors.firstname?.message}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.propertyElement}>
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
              <TextField
                required
                id="lastname"
                name="lastname"
                label="นามสกุล"
                {...register('lastname')}
                placeholder="กรอกนามสกุล"
                variant="outlined"
                error={errors.lastname ? true : false}
                helperText={errors.lastname?.message}
              />
            </div>
          </Grid>
        </div>
        <div>
          <hr />
        </div>
        <div className={classes.propertyShow}>
          <Grid item xs={6}>
            <div className={classes.propertyElement}>
              <TextField
                required
                id="phone"
                name="phone"
                label="เบอร์โทรศัพท์"
                {...register('phone')}
                placeholder="กรอกเบอร์โทรศัพท์"
                variant="outlined"
                error={errors.phone ? true : false}
                helperText={errors.phone?.message}
              />
              <br />
              <TextField
                required
                id="addressDetail"
                name="addressDetail"
                label="รายละเอียดที่อยู่"
                multiline
                rows={9}
                {...register('addressDetail')}
                placeholder="กรอกรายละเอียดที่อยู่"
                variant="outlined"
                error={errors.addressDetail ? true : false}
                helperText={errors.addressDetail?.message}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.propertyElement}>
              <FormControl variant="outlined">
                <InputLabel required id="simple-select-outlined-label">
                  จังหวัด
                </InputLabel>
                <Select
                  labelId="simple-select-outlined-label"
                  id="province_id"
                  name="province_id"
                  label="จังหวัด"
                  value={province_id}
                  onChange={handleProvinceIdSelect}
                >
                  {provinceApi.map((item) => {
                    return (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <FormControl variant="outlined">
                <InputLabel
                  required
                  disabled={provinceSelect}
                  id="simple-select-outlined-label-A"
                >
                  อำเภอ
                </InputLabel>
                <Select
                  disabled={provinceSelect}
                  labelId="simple-select-outlined-label-A"
                  id="district"
                  name="district"
                  label="อำเภอ"
                  value={nameDistrict}
                  onChange={handleNamedistrictSelect}
                >
                  {addressFilterApi.map((item) => {
                    return (
                      <MenuItem key={item._id} value={item.districtName}>
                        {item.districtName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <FormControl variant="outlined">
                <InputLabel
                  required
                  disabled={districtSelect}
                  id="simple-select-outlined-label-B"
                >
                  ตำบล
                </InputLabel>
                <Select
                  disabled={districtSelect}
                  labelId="simple-select-outlined-label-B"
                  id="subDistrict"
                  name="subDistrict"
                  label="ตำบล"
                  value={address_id}
                  onChange={handleAddressIdSelect}
                >
                  {addressApi
                    .filter(
                      (itemFilter) => itemFilter.districtName === nameDistrict
                    )
                    .map((item) => {
                      return (
                        <MenuItem
                          key={item._id}
                          value={item._id}
                          onClick={() => {
                            SetPostCode(item.zipcode);
                          }}
                        >
                          {item.subDistrictName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <br />
              <TextField
                disabled
                id="zipcode"
                name="zipcode"
                label="รหัสไปรษณีย์"
                value={postCode}
                variant="outlined"
              />
            </div>
          </Grid>
        </div>
        <Button
          variant="contained"
          disabled={!(isValid && address_id)}
          style={
            isValid && address_id
              ? {
                  color: 'white',
                  background: 'rgba(0, 0, 0, 1)',
                  borderRadius: '0px',
                  width: '100%',
                }
              : {
                  borderRadius: '0px',
                  width: '100%',
                }
          }
          onClick={handleSubmit(onSubmit)}
        >
          <Typography variant="subtitle1">
            <b>ลงทะเบียน</b>
          </Typography>
        </Button>
      </Paper>
    </Container>
  );
}
