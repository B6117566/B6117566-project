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
import { updateUserSomeField, findUserById } from '../services/User';
import { getProvinces } from '../services/Province';
import { getAddressByProvinceId } from '../services/Address';
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

export default function Account() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { GlobalState, SetAlertShow, SetAlertSelect, SetErrorMessage } =
    useContext(GlobalContext);
  const [userApi, SetUserApi] = useState({});
  const [userApiCompare, SetUserApiCompare] = useState({});
  const [provinceApi, SetProvinceApi] = useState([]);
  const [addressApi, SetAddressApi] = useState([]);
  const [addressFilterApi, SetAddressFilterApi] = useState([]);

  const [provinceSelect, SetProvinceSelect] = useState(false);
  const [districtSelect, SetDistrictSelect] = useState(false);

  const [province_id, SetProvinceId] = useState('');
  const [nameDistrict, SetNameDistrict] = useState('');
  const [postCode, SetPostCode] = useState('');

  const [address_id, SetAddressId] = useState('');

  const [buttonState, SetButtonState] = useState(true);
  const [open, setOpen] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUserApi((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    findUserById(GlobalState.user._id)
      .then((res) => {
        SetUserApi(res.result);
        SetUserApiCompare(res.result);
        SetProvinceId(res.result.address_id.province_id._id);
        SetNameDistrict(res.result.address_id.districtName);
        SetPostCode(res.result.address_id.zipcode);
        SetAddressId(res.result.address_id._id);
      })
      .catch((error) => {
        try {
          const { status } = error.response;
          if (status !== 404) {
            SetErrorMessage([
              'ระบบไม่สามารถดึงข้อมูลบัญชีผู้ใช้ได้',
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
    }
  }, [province_id]);

  useEffect(() => {
    if (Object.keys(userApi).length && Object.keys(userApiCompare).length) {
      if (!shallowEqual(userApiCompare, userApi)) {
        SetButtonState(false);
      } else if (userApiCompare.address_id._id !== address_id) {
        SetButtonState(false);
      } else {
        SetButtonState(true);
      }
    }
  }, [userApi, address_id]);

  const onSubmit = () => {
    updateUserSomeField(GlobalState.user._id, {
      firstname: userApi.firstname,
      lastname: userApi.lastname,
      phone: userApi.phone,
      addressDetail: userApi.addressDetail,
      address_id: address_id,
    })
      .then((res) => {
        handleOpen();
      })
      .catch((error) => {
        try {
          const { status } = error.response;
          if (status === 400) {
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
                แก้ไขข้อมูลบัญชีผู้ใช้เรียบร้อยแล้ว
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
                  <b>ย้อนกลับ</b>
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
        <b>บัญชีผู้ใช้</b>
      </Typography>

      <Paper variant="outlined" className={classes.root}>
        <div className={classes.propertyShow}>
          <Grid item xs={6}>
            <div className={classes.propertyElement}>
              <TextField
                disabled
                id="email"
                name="email"
                label="E-mail"
                value={userApi.email || ''}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <br />
              <TextField
                required
                id="firstname"
                name="firstname"
                label="ชื่อ"
                value={userApi.firstname || ''}
                onChange={handleChange}
                placeholder="กรอกชื่อ"
                variant="outlined"
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.propertyElement}>
              <TextField
                required
                id="phone"
                name="phone"
                label="เบอร์โทรศัพท์"
                value={userApi.phone || ''}
                onChange={handleChange}
                placeholder="กรอกเบอร์โทรศัพท์"
                variant="outlined"
              />
              <br />
              <TextField
                required
                id="lastname"
                name="lastname"
                label="นามสกุล"
                value={userApi.lastname || ''}
                onChange={handleChange}
                placeholder="กรอกนามสกุล"
                variant="outlined"
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
                id="addressDetail"
                name="addressDetail"
                label="รายละเอียดที่อยู่"
                multiline
                rows={5}
                value={userApi.addressDetail || ''}
                onChange={handleChange}
                placeholder="กรอกรายละเอียดที่อยู่"
                variant="outlined"
              />
              <br />
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
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.propertyElement}>
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
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </div>
          </Grid>
        </div>
        <Button
          variant="contained"
          disabled={buttonState}
          style={
            !buttonState
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
          onClick={onSubmit}
        >
          <Typography variant="subtitle1">
            <b>บันทึก</b>
          </Typography>
        </Button>
      </Paper>
    </Container>
  );
}
