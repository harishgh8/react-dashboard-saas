// import React, { useState, useContext } from "react";
// import { fetchData } from "../../api/api";
// import { DataContext } from "../../context/Datacontext";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Alert,
// } from "@mui/material";
// import DataTable from "../DataTable/index";

// const FormComponent = () => {
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [url, setUrl] = useState("");
//   const [error, setError] = useState(null);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [showData, setShowData] = useState(false);
//   const [formCompdata, setFormCompData] = useState(null);

//   const {
//     setData,
//     setIsLoading,
//     setError: setContextError,
//   } = useContext(DataContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsSuccess(false);
//     setShowData(false);
//     setIsLoading(true);
//     try {
//       const data = await fetchData(userId, password, url);
//       setData(data);
//       setFormCompData(data);
//       setIsSuccess(true);
//     } catch (error) {
//       setError(error.toString());
//       setContextError(error.toString());
//       setIsSuccess(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleShowData = () => {
//     setShowData(true);
//   };

//   return (
//     <>
//       <Container maxWidth="md">
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4, p: 6 }}
//         >
//           <Typography variant="h4" component="h1" gutterBottom>
//             API Data Fetcher
//           </Typography>
//           <TextField
//             label="User ID"
//             variant="outlined"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             required
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <TextField
//             label="API URL"
//             variant="outlined"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             required
//           />
//           <Button type="submit" variant="contained" color="secondary">
//             Submit
//           </Button>
//         </Box>

//         {isSuccess && (
//           <>
//             <Alert severity="success" sx={{ mt: 2, ml: 6, mr: 6 }}>
//               Connection complete!
//             </Alert>
//             <Button
//               variant="contained"
//               color="secondary"
//               sx={{ mt: 2, ml: 6, mr: 6 }}
//               onClick={handleShowData}
//             >
//               Show Data
//             </Button>
//           </>
//         )}

//         {error && (
//           <Alert severity="error" sx={{ mt: 2, ml: 6, mr: 6 }}>
//             Connection not complete: {error}
//           </Alert>
//         )}
//       </Container>
//       {/* {showData && (
//         <Box mt={4}>
//           <Typography variant="h6">Data:</Typography>
//           <pre>{JSON.stringify(formCompdata, null, 2)}</pre>
//         </Box>
//       )} */}
//       {showData && (
//         <Container maxWidth="md">
//           <DataTable />{" "}
//         </Container>
//       )}
//     </>
//   );
// };

// export default FormComponent;

import React, { useState, useContext } from "react";
import { DataContext } from "../../context/Datacontext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import DataTable from "../DataTable";

const FormComponent = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    setData,
    setIsLoading,
    setError: setContextError,
  } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSuccess(false);
    setIsLoading(true);
    try {
      const response = await fetch("/.netlify/functions/fetchData", {
        method: "POST",
        body: JSON.stringify({ userId, password, url }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setData(data);
        setIsSuccess(true);
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      setError(error.toString());
      setContextError(error.toString());
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          API Data Fetcher
        </Typography>
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
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>

      {isSuccess && (
        <>
          <Alert severity="success" sx={{ mt: 2 }}>
            Connection complete!
          </Alert>
          <DataTable />
        </>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Connection not complete: {error}
        </Alert>
      )}
    </Container>
  );
};

export default FormComponent;
