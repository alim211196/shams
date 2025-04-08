import React, { memo } from "react";
import { Paper, Grid } from "@mui/material";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomButton from "../../common/CustomButton";
import CustomDateTimePicker from "../../common/CustomDateTimePicker";
import moment from "moment-timezone";
import CustomAutocomplete from "../../common/CustomAutocomplete";

const MeetingForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  checkPermission,
}) => {
  const timezones = moment?.tz?.names(); // Get all timezones
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleEnablePasswordToggle = () => {
  //   setFormData((prev) => {
  //     const updatedData = { ...prev, enablePassword: !prev.enablePassword };
  //     console.log("Updated formData:", updatedData);
  //     return updatedData;
  //   });
  // };

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: "0px !important" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Topic" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder={"Enter meeting topic"}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Date & Time" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomDateTimePicker
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              placeholder="Select Date & Time"
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Duration" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter meeting duration"
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Timezone" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomAutocomplete
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              options={timezones.map((tz) => ({
                value: tz,
                label: tz,
              }))}
              placeholder="Select Timezone"
              required
            />
          </Grid>
          {/* <Grid size={{ xs: 12 }}>
            <Divider />
          </Grid>
          <Grid
            size={{ xs: 12, md: 10 }}
            display="flex"
            justifyContent="flex-start"
            gap={2}
          >
            <CustomLabel
              label={`To set up a password for this meeting, you need to enable the "Enable Password" option.`}
              isRequired
            />
            <FormControlLabel
              control={
                <CustomSwitch
                  sx={{ m: 1 }}
                  checked={formData.enablePassword === true}
                  onChange={handleEnablePasswordToggle}
                />
              }
            />
          </Grid>

          {formData.enablePassword && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Password" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomPasswordField
                  name="password"
                  value={formData.enablePassword ? formData.password : ""}
                  onChange={handleChange}
                  placeholder={"Enter Password"}
                />
              </Grid>
            </>
          )} */}

          <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
            <CustomButton
              type="submit"
              color="primary"
              loading={loading}
              disabled={!checkPermission}
            >
              Save
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default memo(MeetingForm);
