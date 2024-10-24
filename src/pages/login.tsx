import { Box, Button, CircularProgress, Grid2, TextField } from "@mui/material";
import { useState } from "react";
import PasswordInput from "../components/inputs/PasswordInput";
import { signInUser } from "../queryFn";
import { IUser } from "../types";
import { signInUserAuth } from "../shared/authService";
import alertStore from "../store/alertStore";

interface IErrors {
  email: string;
  password: string;
  submit: string;
}

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<IErrors>({
    email: "",
    password: "",
    submit: "",
  });
  const showAlert = alertStore((state) => state.showAlert);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = async () => {
    const newErrors: IErrors = { email: "", password: "", submit: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters long";
    }

    setErrors(newErrors);
    if (Object.values(newErrors).every((v) => v === "")) {
      try {
        setIsLoading(true);
        const request = await signInUser<IUser[]>(
          formData.email,
          formData.password
        );
        if (request.data && request.data.length > 0) {
          signInUserAuth(request.data[0]);
        } else {
          showAlert("User not found, verify user credentials!", "error");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        showAlert("Error during user api request", "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      showAlert(
        Object.values(newErrors)
          .filter((v) => v !== "")
          .join(", "),
        "error"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
  };

  return (
    <Grid2 container spacing={2} className="bg-zinc-900 h-svh items-center">
      <Grid2 size={{ xs: 2 }}></Grid2>
      <Grid2 size={{ xs: 8 }}>
        <Box
          component="form"
          maxWidth={"50ch"}
          margin={"auto"}
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className="text-6xl font-black">Sign In</h1>
          <TextField
            error={Boolean(errors.email)}
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            margin="normal"
            fullWidth
            onChange={handleInputChange}
            required
            helperText={errors.email}
          />
          <PasswordInput
            error={errors.password}
            onInputChange={handleInputChange}
            value={formData.password}
          />
          <Button
            type="submit"
            sx={{ mt: 3 }}
            fullWidth
            color="primary"
            disabled={isLoading}
            variant="contained"
          >
            {isLoading ? <CircularProgress /> : "SIGN IN"}
          </Button>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 2 }}></Grid2>
    </Grid2>
  );
}

export default LoginPage;
