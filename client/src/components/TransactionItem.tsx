import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { TransactionType } from "../types/transaction-type";
import { ListItemIcon } from "@mui/material";

type TransactionProps = {
    transaction: TransactionType;
  };

function TransactionItem({transaction}: TransactionProps) {

  return (
        <ListItem 
            alignItems="flex-start" 
            secondaryAction={ transaction.amount} 
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
