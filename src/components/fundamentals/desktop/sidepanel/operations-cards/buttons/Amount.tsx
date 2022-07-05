import { Box, TextField } from "@mui/material";

const Amount: React.FunctionComponent<{
  selectedValueAmount: number;
  handleChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ selectedValueAmount, handleChangeAmount }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        sx={{
          color: "#f2eecb",
          input: { color: "#f2eecb" },
          label: { color: "#f2eecb" },
          "& label.Mui-focused": {
            color: "#f2eecb",
          },
        }}
        id="standard-number"
        label="dollars"
        type="number"
        value={selectedValueAmount}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        onChange={handleChangeAmount}
      />
    </Box>
  );
};

export default Amount;
