import { Dialog, Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";

interface Banker {
  id: string;
  city: string;
  type: string;
  assets: any;
  liabilities: any;
  coins: any;
  goods: number;
  coinAsset: any;
  coinLiability: any;
}

export interface ChooseActorProps {
  open: boolean;
  setSelectedValueActor: (v: Banker) => void;
  onClose: () => void;
  selectedBankers: any[];
}

export default function ChooseActor(props: ChooseActorProps) {
  const { onClose, setSelectedValueActor, open, selectedBankers } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: Banker) => {
    setSelectedValueActor(value);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: 0 }}>
          Draw Bill
        </Typography>
        <Typography variant="subtitle1">
          Find an importer willing to buy your goods
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