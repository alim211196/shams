import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
} from "@mui/material";
import { closeModal } from "../../redux/slices/deleteModalSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteConfirmationModal = () => {
  const dispatch = useDispatch();
  const { isOpen, title, description, onConfirm } = useSelector(
    (state) => state.deleteModal
  );

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => dispatch(closeModal())}
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography id="delete-dialog-description">{description}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(closeModal())}
        >
          No
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            if (onConfirm) onConfirm();
            dispatch(closeModal());
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
