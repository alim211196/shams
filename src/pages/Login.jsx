import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MailOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import graphicImg from "../assets/graphicImages.jpeg";
import { loginService } from "../services/staffService";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getS3ImageUrl } from "../utils/helper";

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const authData = useSelector((state) => state.settings.authData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = { email, password };
      const { data } = await loginService(user);
      if (data) {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      }
    } catch (err) {
      toast(err.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {!isMobile && (
        <Grid
          size={{ sm: 6 }}
          component={Paper}
          elevation={0}
          sx={{
            width: "50%",
            background:
              "linear-gradient(180deg, #e0e1f7 0%, #f3f4fa 99.99%, #efeffc 100%)",
            padding: "32px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box sx={{ width: "150px" }}>
            <img src={"/LogoContainer.png"} alt="Logo" />
          </Box>
          <Typography
            component="h2"
            variant="h2"
            sx={{ fontSize: "32px", lineHeight: "50px", color: "#000" }}
          >
            {authData?.heading1 || "Upskill & Advance your"}
            <Typography
              component="span"
              variant="h2"
              sx={{ color: "#080e54", display: "block" }}
            >
              {authData?.heading2 || "Media Pro."}
            </Typography>
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              src={
                authData?.banner_image
                  ? getS3ImageUrl("auth_page", authData?.banner_image)
                  : "/graphicImages.jpeg"
              }
              alt="Graphic"
              style={{ width: "300px" }}
            />
          </Box>
        </Grid>
      )}

      <Grid size={{ xs: 12, sm: 6 }}>
        <Box
          sx={{
            my: [2, 2, 2],
            mx: [2, 8, 20],
            display: "flex",
            flexDirection: "column",
            justifyContent: ["start", "center", "center"],
            height: "90vh",
          }}
        >
          {isMobile && (
            <Box sx={{ textAlign: "center" }}>
              <img src={"/logo-login.png"} alt="Logo" />
            </Box>
          )}

          <Box sx={{ py: 2 }}>
            <Typography
              component="h3"
              variant="h3"
              sx={{ fontSize: "24px", fontWeight: 700, color: "#000", py: 1 }}
            >
              {authData?.title || "Welcome back"}
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#212b36",
                lineHeight: "1.4",
              }}
            >
              {authData?.description ||
                "Enter details to login to your account"}
            </Typography>
          </Box>

          <Grid
            container
            spacing={2}
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid size={{ xs: 12 }}>
              <Typography
                sx={{
                  color: "#212b36",
                  mb: 1,
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <MailOutline />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography
                sx={{
                  color: "#212b36",
                  mb: 1,
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!email || !password || loading}
                sx={{
                  fontWeight: 700,
                  backgroundColor: "#094d8c",
                  borderColor: "#094d8c",
                  transition: "all 0.5s ease",
                  border: "1px solid #fff",
                  mt: 2,
                  color: "#fff",
                  "&:hover": {
                    boxShadow: "0 50px #fff inset !important",
                    color: "#080e54",
                    border: "1px solid #080e54",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="white" />
                ) : (
                  "Log In"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
