import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { TransactionType } from "../types/transaction-type";
import { ListItemIcon } from "@mui/material";

type TransactionProps = {
    transaction: TransactionType;
  };

function TransactionItem({transaction}: TransactionProps) {

  const trTypes ={
    income: 'green',
    outcome: 'red'
  }

  return (
        <ListItem 
            alignItems="flex-start" 
            secondaryAction={ <Typography color={trTypes.income}>{transaction.amount}</Typography>} 
            key={transaction.transactionId}
            //TODO: make it more presentable
            // sx={{background: item.amount > 0 ?"lightgreen" : "default"}}
            >
          <ListItemIcon>
            <ChatBubbleOutlineIcon/>
          </ListItemIcon>
          <ListItemText
            primary={transaction.categoryId}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline"}}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  mx="5px"
                >
                  {transaction.payee}
                </Typography>
                {transaction.comment}
              </React.Fragment>
            }
          />
        </ListItem>
  )}

export default TransactionItem;
