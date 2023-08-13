import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { App } from "./App";

// need to check why env file not working
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/sign-in/*"
          element={
            <SignIn
              routing="path"
              path="/sign-in"
              afterSignInUrl={"/up-skill"}
            />
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <SignUp
              routing="path"
              path="/sign-up"
              afterSignInUrl={"/up-skill"}
            />
          }
        />
        <Route
          path="/up-skill"
          element={
            <>
              <SignedIn>
                <App />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
