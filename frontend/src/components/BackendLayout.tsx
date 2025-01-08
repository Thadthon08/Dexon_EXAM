import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Theme, useTheme } from "@mui/material";
import SideNav from "./Sidebar";
import Header from "./Header";

const BackendLayout: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Box sx={styles.container(theme)}>
        <SideNav />
        <Box component="main" sx={styles.mainSection(theme)}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

const styles = {
  container: (theme: Theme) => ({
    display: "flex",
    bgcolor: theme.palette.background.default,
  }),
  mainSection: (theme: Theme) => ({
    px: 4,
    py: 1,
    width: "100%",
    height: "100%",
    overflow: "auto",
    bgcolor: theme.palette.background.default,
    color: theme.palette.text.primary,
  }),
};

export default BackendLayout;
