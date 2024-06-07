import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Retrieve your Clerk publishable key from the environment variables
const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const testVariable = process.env.REACT_APP_TEST_VARIABLE;

console.log("Clerk Publishable Key:", clerkPublishableKey);
console.log("Test Variable:", testVariable);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
