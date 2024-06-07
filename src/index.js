import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import SignInPage from "./scenes/SignInPage/SignInPage";

// Retrieve your Clerk publishable key from the environment variables
const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const testVariable = process.env.REACT_APP_TEST_VARIABLE;

console.log("Clerk Publishable Key:", clerkPublishableKey);
console.log("Test Variable:", testVariable);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
      {/* <SignInPage /> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
