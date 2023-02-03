import React, { useState, useMemo, useContext } from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuList from "./MenuListComponent";
import Drawer from "./DrawerComponent";
import { ColorModeContext } from "../../context/ColorModeContext";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/actions/login/loginActions";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const toggleColorMode = useContext(ColorModeContext);

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const drawerContent = useMemo(
    () => (
      <List>
        <ListItemButton divider onClick={handleToggleDrawer}>
          <ListItemIcon>
            <ListItemText>Link 1</ListItemText>
          </ListItemIcon>
        </ListItemButton>
        <ListItem divider onClick={handleToggleDrawer}>
          <ListItemIcon>
            <ListItemText>Link 2</ListItemText>
          </ListItemIcon>
        </ListItem>
        <ListItem divider onClick={handleToggleDrawer}>
          <ListItemText>Link 3</ListItemText>
        </ListItem>
        <ListItem divider>
          <IconButton onClick={toggleColorMode}>
            <ListItemText>Toggle {theme.palette.mode} mode</ListItemText>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </ListItem>
      </List>
    ),
    [handleToggleDrawer]
  );

  return (
    <AppBar
      elevation={2}
      sx={{ backgroundColor: "background.default", position: "relative" }}
    >
      <Toolbar>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {matches ? (
            <Drawer
              open={openDrawer}
              toggleOpen={handleToggleDrawer}
              content={drawerContent}
            />
          ) : (
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h6"
                sx={{
                  marginRight: 3,
                  cursor: "pointer",
                  color: "text.primary",
                }}
              >
                Link 1
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginRight: 3,
                  cursor: "pointer",
                  color: "text.primary",
                }}
              >
                Link 2
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  marginRight: 3,
                  cursor: "pointer",
                  color: "text.primary",
                }}
              >
                Link 3
              </Typography>
            </Box>
          )}
          <Box>
            <MenuList />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {matches ? (
              <Box>
                <IconButton onClick={handleToggleDrawer}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            ) : (
              <Box>
                <IconButton>
                  <Badge badgeContent={3} color="primary">
                    <ShoppingBasketIcon color="action" />
                  </Badge>
                </IconButton>
                <IconButton sx={{ ml: 1 }} onClick={toggleColorMode}>
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
                <IconButton onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
