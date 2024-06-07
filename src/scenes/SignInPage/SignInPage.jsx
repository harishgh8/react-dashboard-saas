import { SignIn } from "@clerk/clerk-react";
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
// Create a styled component for the background
const Background = styled(Box)({
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  background: "#141b2d",
});

export default function SignInPage() {
  return (
    <Background>
      <SignIn routing="signin" />
    </Background>
  );
}
