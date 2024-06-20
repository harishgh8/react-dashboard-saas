import { UserButton, useOrganization, useUser } from "@clerk/clerk-react";
import { ArrowRightAlt, SettingsOutlined } from "@mui/icons-material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/Datacontext";
import { tokens } from "../../theme";

const Sidebar = () => {
  const { isLoaded, user } = useUser();
  const { organization, memberships } = useOrganization({ memberships: true });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    setData,
    data,
    setIsLoading,
    setError: setContextError,
    configNames,
    setConfigNames,
    setConfigName,
    isSelectConfigFromList,
    setIsSelectConfigFromList,
  } = useContext(DataContext);
  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  if (!user) return null;

  const updateUser = async () => {
    await user.update({
      firstName: "John",
      lastName: "Doe",
    });
  };

  useEffect(() => {
    const fetchConfigNames = async () => {
      try {
        const response = await axios.get("http://localhost:5006/api/configs");
        setConfigNames(response.data);
        console.log(response, "response config naems");
      } catch (error) {
        console.error("Error fetching config names:", error);
      }
    };

    fetchConfigNames();
  }, []);

  const handleConfigClick = async (configName) => {
    try {
      const response = await axios.get(
        `http://localhost:5006/api/config/${configName}`
      );
      const config = response.data;
      setConfigName(config.configName);
      // setUserId(config.userId);
      setPassword(config.password);
      setUrl(config.url);
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  if (!isLoaded || !user) {
    return null;
  }

  const Item = ({
    title,
    to,
    icon,
    selected,
    setSelected,
    toggleConfigList,
  }) => {
    const handleClick = () => {
      setSelected(title);
      if (toggleConfigList) {
        setIsSelectConfigFromList(true);
      } else {
        setIsSelectConfigFromList(false);
      }
    };

    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={handleClick}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  SubDiscord
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <UserButton />
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.firstName} {user?.lastName}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Configuration Settings"
              to="/"
              icon={<SettingsOutlined />}
              selected={selected}
              setSelected={setSelected}
              toggleConfigList={false}
            />

            <Item
              title="Select from the list"
              to="/"
              icon={<ArrowRightAlt />}
              selected={selected}
              setSelected={setSelected}
              toggleConfigList={true}
            />

            {/* <ul>
              {configNames.map(({ configName }, index) => (
                <li key={`${configName}-${index}`}>
                  <Typography
                    variant="h6"
                    color={colors.grey[200]}
                    sx={{ m: "15px 0 5px 20px", cursor: "pointer" }}
                    onClick={() => handleConfigClick(configName)}
                  >
                    {configName}
                  </Typography>
                </li>
              ))}
            </ul> */}

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
