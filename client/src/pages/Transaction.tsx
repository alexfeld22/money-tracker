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

function Transaction() {
  const transactionSchema = z.object({
    currency: z.string().min(1, 'Currency is required'),
    amount: z.number().min(1, "Amount is required"),
    payee: z.string(),
    comment: z.string()
  });

  // Define types for form data
  type FormData = z.infer<typeof transactionSchema>;
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
    resolver: zodResolver(transactionSchema), // Pass Zod schema to resolver
    // defaultValues: specify default values for form inputs
    defaultValues: {
      currency: "USD",
      amount: undefined,
      payee: undefined,
      comment: "",
    },
  });

  console.log("🚀 ~ Register ~ errors:", errors);

  const onSubmit = (data: FormData) => {
    console.log(data); // call api with submitted data
  };

  return (
    <Grid container spacing={2} sx={{ m: "50px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Record a transaction
        </Typography>

        <FormControl fullWidth margin="normal" error={!!errors.currency}>
          <InputLabel>Currency</InputLabel>
          <Select
            label="Currency"
            {...register("currency")}
            defaultValue={touchedFields.currency}
            sx={{ my: 1 }}
          >
            <MenuItem value="USD">US Dollars</MenuItem>
            <MenuItem value="CAD">Canadian Dollars</MenuItem>
            <MenuItem value="EURO">Euro</MenuItem>
            <MenuItem value="ILS">Israeli Shekels</MenuItem>
            {/* Add other countries as needed */}
          </Select>
          <FormHelperText>{errors.currency?.message}</FormHelperText>
        </FormControl>

        <TextField
          label="Amount"
          fullWidth
          margin="normal"
          type="number"
          defaultValue={touchedFields.amount}
          {...register("amount")}
          error={!!errors.amount}
          helperText={errors.amount?.message}
        />
        <TextField
          label="Payee"
          fullWidth
          margin="normal"
          defaultValue={touchedFields.payee}
          {...register("payee")}
          error={!!errors.payee}
          helperText={errors.payee?.message}
        />
        <TextField
          label="Comment"
          fullWidth
          margin="normal"
          defaultValue={touchedFields.comment}
          {...register("comment")}
          error={!!errors.comment}
          helperText={errors.comment?.message}
        />

        

        <Button type="submit" variant="contained" color="primary">
          Record
        </Button>
      </form>
    </Grid>
  );
}

export default Transaction;
