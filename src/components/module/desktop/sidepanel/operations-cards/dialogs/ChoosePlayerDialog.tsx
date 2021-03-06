import {
  Dialog,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";

interface Operation {
  [index: string]: any;
}

const operationsText: Operation = {
  "Receive Bank Payment": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Find a Debtor Bank`
        : `You are not owed anything at the moment`;
    },
  },
  "Send Bank Payment": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Find a Creditor Bank`
        : `You do not owe anyone at the moment`;
    },
  },
  "Withdraw From": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Find a Bank to withdraw your funds`
        : `You need to open an accuont`;
    },
  },
  "Transfer To": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Find a Payee`
        : `There are no other customers`;
    },
  },
  "Deposit To": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Make a deposit`
        : `You need to open an account`;
    },
  },
};

export interface ChoosePlayerProps {
  open: boolean;
  setSelectedValuePlayer: (v: any) => void;
  onClose: () => void;
  selectedBankers: any[];
  methodText: string;
}

export default function ChoosePlayer(props: ChoosePlayerProps) {
  const { onClose, setSelectedValuePlayer, open, selectedBankers, methodText } =
    props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: any) => {
    setSelectedValuePlayer(value);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: 0 }}>
          {methodText}
        </Typography>
        <Typography variant="subtitle1">
          {operationsText[methodText].moreThanOne(selectedBankers)}
        </Typography>
        <List sx={{ pt: 0 }}>
          {selectedBankers.map((banker, i) => (
            <ListItem
              button
              onClick={() => handleListItemClick(banker)}
              key={i}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={banker.id} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}
