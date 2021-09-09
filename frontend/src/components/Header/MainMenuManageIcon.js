import React from 'react';
import { IconButton, Badge, MenuItem, Menu } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const useStyles = makeStyles(() => ({
  marginBorder: {
    marginLeft: '0.5rem',
  },
}));

function MainMenuManageIcon() {
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
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
      <Link to="/account" style={{ textDecoration: 'none', color: 'black' }}>
        <MenuItem id="account" onClick={handleMenuClose}>
          บัญชีของฉัน
        </MenuItem>
      </Link>
      <Link to="/signout" style={{ textDecoration: 'none', color: 'black' }}>
        <MenuItem id="signout" onClick={handleMenuClose}>
          ออกจากระบบ
        </MenuItem>
      </Link>
    </Menu>
  );

  return (
    <div className={classes.marginBorder}>
      <div>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'black' }}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={5} color="secondary">
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
      </div>
      {renderMenu}
    </div>
  );
}

export default MainMenuManageIcon;
