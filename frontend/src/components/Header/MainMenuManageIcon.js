import React, { useContext } from 'react';
import { IconButton, Badge, MenuItem, Menu } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { GlobalContext } from '../../context/GlobalProvider';

const useStyles = makeStyles(() => ({
  marginBorder: {
    marginLeft: '0.5rem',
  },
}));

function MainMenuManageIcon() {
  const classes = useStyles();
  let navigate = useNavigate();
  const { GlobalState, SetAuthorPartDP, SetUserLoginDP } =
    useContext(GlobalContext);
  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/order" style={{ textDecoration: 'none', color: 'black' }}>
        <MenuItem id="account" onClick={handleMenuClose}>
          รายการสั่งซื้อ
        </MenuItem>
      </Link>
      <Link to="/account" style={{ textDecoration: 'none', color: 'black' }}>
        <MenuItem id="account" onClick={handleMenuClose}>
          บัญชีของฉัน
        </MenuItem>
      </Link>

      <MenuItem
        id="signout"
        onClick={async () => {
          handleMenuClose();
          const userNull = {
            _id: null,
            firstname: null,
            lastname: null,
            userRole: {
              _id: null,
              role: null,
            },
            token: null,
            isAuthen: false,
          };
          localStorage.setItem('user', JSON.stringify(userNull));
          SetUserLoginDP(userNull);
          SetAuthorPartDP(null);
          navigate('/');
        }}
      >
        ออกจากระบบ
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.marginBorder}>
      <div>
        {GlobalState.user.isAuthen ? (
          <>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'black' }}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
            {renderMenu}
          </>
        ) : (
          <Link
            to="/auth/signin"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
          </Link>
        )}
      </div>
    </div>
  );
}

export default MainMenuManageIcon;
