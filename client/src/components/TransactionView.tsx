import { Box, TextField, FormControl, InputAdornment, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { TransactionType } from '../types/transaction-type';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';

// Example data for wallets
const walletOptions = [
  { label: 'Personal Wallet euro', value: 'euro personal' },
  { label: 'Business Wallet usd', value: 'usd business' },
  { label: 'Travel Wallet bitcoin', value: 'bitcoin travel' },
];

const euroSymbol = '€'

type TransactionProps = {
    transaction: TransactionType
}

const TransactionForm = ({transaction}: TransactionProps) => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h6">View Transaction</Typography>
      
      <FormControl fullWidth margin="normal">
        <TextField
          label="Currency"
          value={transaction.currencyCode}
          InputProps={{
            startAdornment: <InputAdornment position="start">{euroSymbol}</InputAdornment>,
            readOnly: true,
          }}
        />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <TextField
          label="Amount"
          value={transaction.amount}
          InputProps={{
            readOnly: true,
          }}
        />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <TextField
          label="Category"
          value={transaction.categoryId}
          InputProps={{
            startAdornment: <InputAdornment position="start"><RamenDiningOutlinedIcon fontSize='small' /></InputAdornment>,
            readOnly: true,
          }}
        />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <Autocomplete
          options={walletOptions}
          getOptionLabel={(option) => option.label}
          value={walletOptions.find(option => option.value === transaction.walletId)}
          renderInput={(params) => <TextField {...params} label="Wallet" InputProps={{ ...params.InputProps, readOnly: true }} />}
        />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <TextField
          label="Payee"
          value={transaction.payee}
          InputProps={{
            readOnly: true,
          }}
        />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <TextField
          label="Comment"
          value={transaction.comment}
          multiline
          InputProps={{
            readOnly: true,
          }}
        />
      </FormControl>
    </Box>
  );
};


export default TransactionForm;
