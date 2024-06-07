// // SignInPage.js
// import React from "react";
// import { SignIn } from "@clerk/clerk-react";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

// function SignInPage() {
//   return (
//     <div className="signin-page">
//       <h1>Sign In</h1>
//       <SignIn routing="signin" />
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//     </div>
//   );
// }

// export default SignInPage;

import { Box, Container, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
// Create a styled component for the background
const Background = styled(Box)({
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #3b82f6, #9333ea)", // Blue to purple gradient
});

// Create a styled component for the sign-in container
const SignInContainer = styled(Paper)({
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
});

export default function SignInPage() {
  return (
    <Background>
      <SignInContainer>
        <Typography variant="h4" gutterBottom>
          Welcome Back
        </Typography>
        <SignIn routing="signin" />
      </SignInContainer>
    </Background>
  );
}
