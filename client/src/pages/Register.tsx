import { zodResolver } from "@hookform/resolvers/zod";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

function Register() {
  const addressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z
      .string()
      .min(5, "Zip code must be at least 5 characters long")
      .refine((value) => /^\d+$/.test(value), {
        message: "Zip code must contain only numeric characters",
      }),
  });  

  const userSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phoneNumber: z
      .string()
      .optional() 
      .refine((value) => value === undefined || value === '' || ( /^[0-9]{10}$/.test(value)), {
        message: `Phone number must be exactly 10 digits and contain only numeric characters`,
      }),
    country: z.string().min(1, "Country is required"),
    address: addressSchema.optional(),
  });
 
  // Define types for form data
  type FormData = z.infer<typeof userSchema>;
  // Destructure useForm from react-hook-form
  const {
    // register: function to register input elements
    register,
    // handleSubmit: function to handle form submission
    handleSubmit,
    // watch: function to watch values of form inputs
    //  watch,
    // formState: object containing information about form state
    formState: { errors, touchedFields }, // Destructure errors and touchedFields from formState
  } = useForm<FormData>({
    // Call useForm hook with generic type FormData
    // resolver: specify resolver for form validation using Zod
    resolver: zodResolver(userSchema), // Pass Zod schema to resolver
    // defaultValues: specify default values for form inputs
    defaultValues: {
      email: "",
      password: "",
      phoneNumber: undefined,
      country: "",
      address: undefined,
    },
  });

  console.log("🚀 ~ Register ~ errors:", errors);

  const onSubmit = (data: FormData) => {
    console.log(data); // call api with submitted data
  };

  return (
    <Grid container spacing={2} sx={{ m: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          defaultValue={touchedFields.email}
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          defaultValue={touchedFields.password}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          defaultValue={touchedFields.phoneNumber}
          {...register("phoneNumber")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
        <TextField
          label="Street"
          fullWidth
          margin="normal"
          defaultValue={touchedFields.address?.street}
          {...register("address.street")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
        <TextField
          label="City"
          fullWidth
          margin="normal"
          defaultValue={touchedFields.address?.city}
          {...register("address.city")}
          error={!!errors.address?.city}
          helperText={errors.address?.city?.message}
        />
        <TextField
          label="Zip Code"
          fullWidth
          margin="normal"
          defaultValue={touchedFields.address?.zipCode}
          {...register("address.zipCode")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        <FormControl fullWidth margin="normal" error={!!errors.country}>
          <InputLabel>Country</InputLabel>
          <Select
            label="Country"
            {...register("country")}
            defaultValue={touchedFields.country}
            sx={{ my: 1 }}
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            {/* Add other countries as needed */}
          </Select>
          <FormHelperText>{errors.country?.message}</FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Grid>
  );
}

export default Register;