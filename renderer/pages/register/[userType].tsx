import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRef, useEffect } from "react";
import { AUTH_EVENTS } from "../../util/events/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/AuthSlice";
import isEqual from "lodash/isEqual";
import capitalize from "lodash/capitalize";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Head from "next/head";

export default () => {
  const router = useRouter();
  const { query, replace } = router;
  const dispatch = useDispatch();
  const userType = query.userType ? String(query.userType).toUpperCase() : "";
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dateOfBirthRef = useRef();
  const branchRef = useRef();

  return (
    <>
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <IconButton size="small" color="default" onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      {/* registration form  */}
      <Head>
        <title> Create {capitalize(userType)} Account</title>
      </Head>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ height: "100%" }}
      >
        <Paper
          variant="outlined"
          style={{
            minWidth: 350,
            borderRadius: 20,
            padding: 30,
          }}
        >
          <div style={{ width: "100%" }}>
            <Typography variant="h3">Create Account</Typography>
            <br />
            <br />
            <br />
            <form onSubmit={() => {}}>
              <TextField
                variant="standard"
                fullWidth
                label="Name"
                ref={nameRef}
              />
              <br />
              <br />
              <TextField
                variant="standard"
                fullWidth
                label="Email"
                type="email"
                ref={emailRef}
              />
              <br />
              <br />
              <TextField
                variant="standard"
                fullWidth
                label={
                  userType === "JOBSEEKER"
                    ? "Date of Birth (DD-MM-YYYY)"
                    : "Branch"
                }
                ref={userType === "JOBSEEKER" ? dateOfBirthRef : branchRef}
              />
              <br />
              <br />
              <TextField
                variant="standard"
                fullWidth
                label="Password"
                type="password"
                ref={passwordRef}
              />
              <br />
              <br />
              <Button
                onClick={() => router.push("/login/" + String(query.userType))}
                variant="text"
                style={{ float: "right" }}
              >
                Login
              </Button>
              <br />
              <br />
              <br />
              <Button
                fullWidth
                color="primary"
                size="large"
                variant="contained"
                type="submit"
              >
                Create Account
              </Button>
            </form>
          </div>
        </Paper>
      </Grid>
    </>
  );
};
