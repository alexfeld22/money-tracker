import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


const TRANSACTIONS = [
  {
    transactionId: "2dc2ba1c-e371-4036-90fe-fe3500c94a3b",
    categoryId: "Education",
    currencyCode: "CAD",
    payee: "Microsoft",
    comment: "Chat GPT",
    userID: "90092e73-13a3-445c-8213-3d6576b2cb2e",
    amount: 3999.17,
    walletId: "40e4769c-2738-412e-b2dd-6b75f159be33",
    date: "2024-05-28T20:51:13.000Z",
    type: "outcome",
  },
  {
    transactionId: "2dc2ba1c-e371-4036-90fe-fe3500c94a3a",
    categoryId: "Education",
    currencyCode: "EUR",
    payee: "Microsoft",
    comment: "Chat GPT",
    userID: "90092e73-13a3-445c-8213-3d6576b2cb2e",
    amount: 3999.17,
    walletId: "40e4769c-2738-412e-b2dd-6b75f159be33",
    date: "2024-05-28T20:51:13.000Z",
    type: "outcome",
  },
  {
    transactionId: "2dc2ba1c-e371-4036-90fe-fe3500c94a3c",
    categoryId: "Education",
    currencyCode: "ILS",
    payee: "Keshet",
    comment: "Milk, butter, etc",
    userID: "90092e73-13a3-445c-8213-3d6576b2cb2e",
    amount: -3999.17,
    walletId: "40e4769c-2738-412e-b2dd-6b75f159be33",
    date: "2024-05-28T20:51:13.000Z",
    type: "income",
  },
];

function Record() {

    

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {TRANSACTIONS.map((item) => (
        <ListItem 
            alignItems="flex-start" 
            secondaryAction={ item.amount} 
            key={item.transactionId}
            //TODO: make it more presentable
            // sx={{background: item.amount > 0 ?"lightgreen" : "default"}}
            >
          <ListItemAvatar>
            <ChatBubbleOutlineIcon/>
          </ListItemAvatar>
          <ListItemText
            primary={item.categoryId}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline"}}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  mx="5px"
                >
                  {item.payee}
                </Typography>
                {item.comment}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default Record;
