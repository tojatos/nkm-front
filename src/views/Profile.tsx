import React from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import { RootState } from "../app/store";
import { useMountEffect } from "../app/utils";
import axios from "axios";
import { SECRET_URL } from "../app/consts";

function Profile() {
  const authData = useSelector((state: RootState) => state.authData);

  return (
    <Paper>
      <Typography variant="h2">Profil</Typography>
      <Typography variant="h4">Hello, {authData.login} :)</Typography>
    </Paper>
  );
}

export default Profile;
