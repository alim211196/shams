import { TextField } from "@mui/material";
import moment from "moment";

const CustomTimePicker = ({
  name,
  value,
  onChange,
  label,
  required,
  ...props
}) => {
  return (
    <TextField
      name={name}
      value={value}
      onClick={(e) => e.target.showPicker && e.target.showPicker()}
      onFocus={(e) => e.target.showPicker && e.target.showPicker()}
      onChange={onChange}
      label={label}
      required={required}
      type="time" // Always set this as datetime-local
      fullWidth
      InputLabelProps={{ shrink: true }} // Ensures label is not overlapping
      inputProps={{
        min: moment().format("HH:mm"), // Prevent past dates
      }}
      {...props}
    />
  );
};

export default CustomTimePicker;
