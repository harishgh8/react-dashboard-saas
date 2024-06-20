import React, { useState, useContext, useEffect } from "react";
import {
  fetchData,
  saveConfig,
  fetchConfig,
  fetchConfigNames,
} from "../../api/api";
import { DataContext } from "../../context/Datacontext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import DataTable from "../DataTable";
import { useNavigate } from "react-router-dom";

const ConfigForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showData, setShowData] = useState(false);
  const [formCompData, setFormCompData] = useState(null);
  const navigate = useNavigate();

  const {
    data,
    setData,
    isLoading,
    setIsLoading,
    setError: setContextError,
    configName,
    setConfigName,
    configNames,
    setConfigNames,
    isSelectConfigFromList,
    setIsSelectConfigFromList,
  } = useContext(DataContext);

  useEffect(() => {
    fetchConfigNames()
      .then((configs) => setConfigNames(configs))
      .catch((error) => console.error("Error fetching config names:", error));
  }, []);

  useEffect(() => {
    if (configName) {
      fetchConfig(configName)
        .then((config) => {
          if (config) {
            setUserId(config.userId);
            setPassword(config.password);
            setUrl(config.url);
          }
        })
        .catch((error) => {
          console.error("Error fetching config:", error);
        });
    }
  }, [configName]);

  const handleFetchData = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSuccess(false);
    setShowData(false);
    setIsLoading(true);

    try {
      const data = await fetchData(userId, password, url);
      setData(data);
      setFormCompData(data);
      setIsSuccess(true);
    } catch (error) {
      setError(error.toString());
      setContextError(error.toString());
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSuccess(false);
    setShowData(false);
    setIsLoading(true);

    // Check for unique configuration name
    if (configNames.some((config) => config.configName === configName)) {
      setError("Configuration name already exists. Choose a different name.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchData(userId, password, url);
      setData(data);
      setFormCompData(data);
      setIsSuccess(true);
      await saveConfig({ configName, userId, password, url });
      fetchConfigNames().then((configs) => setConfigNames(configs));
    } catch (error) {
      setError(error.toString());
      setContextError(error.toString());
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowData = () => {
    navigate("/Datatable"); // Navigate to the /Datatable route
  };

  const handleConfigChange = (e) => {
    setConfigName(e.target.value);
  };

  const handleCreateNew = () => {
    setConfigName("");
    setUserId("");
    setPassword("");
    setUrl("");
    setIsSuccess(false);
    setError(null);
  };
  return (
    <>
      <Container maxWidth="md">
        <Box
          component="form"
          onSubmit={isSelectConfigFromList ? handleFetchData : handleSaveConfig}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4, p: 6 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {(isSelectConfigFromList &&
              "Select a configuration from the List") ||
              "Configuration settings"}
          </Typography>
          {!isSelectConfigFromList && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCreateNew}
                    sx={{ minWidth: 200 }}
                  >
                    Create a New configuration
                  </Button>
                </Grid>
              </Grid>
              <TextField
                label="Configuration Name"
                variant="outlined"
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                required
              />
              <TextField
                label="User ID"
                variant="outlined"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                label="API URL"
                variant="outlined"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </>
          )}

          {isSelectConfigFromList && (
            <>
              <Grid item xs={7}>
                <FormControl variant="outlined" sx={{ minWidth: 400 }}>
                  <InputLabel>Saved Configurations</InputLabel>
                  <Select
                    value={configName}
                    onChange={handleConfigChange}
                    label="Saved Configurations"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {configNames.map((config) => (
                      <MenuItem key={config._id} value={config.configName}>
                        {config.configName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ minWidth: 150 }}
              >
                {(isSelectConfigFromList && "Connect") || "Save"}
              </Button>
            </Grid>
            <Grid item xs={4}>
              {isSuccess && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleShowData}
                  sx={{ minWidth: 150 }}
                >
                  Review Data
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>

        {isSuccess && (
          <>
            <Alert severity="success" sx={{ ml: 6, mr: 6 }}>
              Connection complete!
            </Alert>
          </>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2, ml: 6, mr: 6 }}>
            Connection not complete: {error}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default ConfigForm;
