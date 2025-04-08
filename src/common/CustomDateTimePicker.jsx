import { TextField } from "@mui/material";
import moment from "moment";

const CustomDateTimePicker = ({
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
      value={value || moment().format("YYYY-MM-DDTHH:mm")}
      onClick={(e) => e.target.showPicker && e.target.showPicker()}
      onFocus={(e) => e.target.showPicker && e.target.showPicker()}
      onChange={onChange}
      label={label}
      required={required}
      type="datetime-local" // Always set this as datetime-local
      fullWidth
      InputLabelProps={{ shrink: true }} // Ensures label is not overlapping
      inputProps={{
        min: moment().format("YYYY-MM-DDTHH:mm"), // Prevent past dates
      }}
      {...props}
    />
  );
};

export default CustomDateTimePicker;
