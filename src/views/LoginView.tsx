import React from "react";
import LoginForm from "../components/LoginForm";
import { Box, Typography } from "@material-ui/core";
import { Routes } from "../types/Routes";
import { Link as RouterLink } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <LoginForm />
      <Box p={1}>
        <Typography align="center">Don't have an account yet?</Typography>
        <RouterLink to={Routes.REGISTER}>
          <Typography align="center" color="secondary">
            Register
          </Typography>
        </RouterLink>
      </Box>
    </>
  );
}
