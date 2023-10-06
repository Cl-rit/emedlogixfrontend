import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        EmedLogix
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    receiveEmails: false,
  });
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorMessage1, setErrorMessage1] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (formData.username === "") {
      errors.username = "User name is required";
    }

    if (formData.email === "") {
      errors.email = "Email is required";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    if (formData.confirm_password === "") {
      errors.confirm_password = "Confirm password is required";
    } else if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }
    if (!acceptedTerms) {
      errors.acceptedTerms = "You must accept the Terms and Conditions";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await axios.post("/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password,
        });
        // console.log("API Response:", response.data);
        navigate("/");
      } catch (error) {
        // console.error("API Error:", error);
        if (error.response.data === "Email already exists") {
          // Email is already in use, display an error message
          setErrorMessage("The email ID provided is already in use.");
        } else {
          // Handle other error cases if needed
          setErrorMessage1("An error occurred during registration.");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="family-name"
                  error={!!validationErrors.username}
                  helperText={validationErrors.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  value={formData.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                />{" "}
                {errorMessage && (
                  <Typography variant="body2" color="error">
                    {errorMessage}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  id="confirmpassword"
                  autoComplete="new-password"
                  error={!!validationErrors.confirm_password}
                  helperText={validationErrors.confirm_password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirm_password: e.target.value,
                    })
                  }
                  value={formData.confirm_password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {formData.confirm_password.length > 0 && (
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="acceptedTerms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      color="primary"
                      error={validationErrors.acceptedTerms}
                    />
                  }
                />
                <label htmlFor="acceptedTerms">
                  I accept the Terms and Conditions
                </label>
                <Typography variant="body2" color="error">
                  {validationErrors.acceptedTerms}
                </Typography>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {errorMessage1 && (
              <Typography variant="body2" color="error">
                {errorMessage1}
              </Typography>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
