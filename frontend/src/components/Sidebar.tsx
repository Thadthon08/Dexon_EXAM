import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

const NavLinks = [
  {
    id: 1,
    name: "Index Page",
    link: "/index",
    icon: <DashboardOutlinedIcon />,
  },
];

const SideNav: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleSidebar } = useProSidebar();
  const [activeMenu, setActiveMenu] = useState<string>(NavLinks[0].link);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Sidebar
      style={{
        height: "100vh",
        minHeight: "100vh",
        top: 0,
      }}
      breakPoint="md"
    >
      <Box sx={styles.avatarContainer}>
        <Avatar
          sx={styles.avatar}
          alt="Logo"
          src="https://picsum.photos/id/1/200/300"
        />
      </Box>

      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            backgroundColor: active
              ? theme.palette.action.selected
              : "transparent",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }),
        }}
      >
        {NavLinks.map((nav) => (
          <MenuItem
            key={nav.id}
            active={activeMenu === nav.link}
            component={<Link to={nav.link} />}
            icon={nav.icon}
            onClick={() => handleMenuClick(nav.link)}
          >
            <Typography variant="body1">{nav.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    my: 5,
  },
  avatar: {
    width: "50%",
    height: "auto",
    borderRadius: "50%",
    aspectRatio: "1 / 1",
  },
};

export default SideNav;
