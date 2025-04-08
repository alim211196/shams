import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: "Are you sure?",
  description: "",
  onConfirm: null,
};

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      return { ...state, ...action.payload, isOpen: true };
    },
    closeModal: (state) => {
      return { ...state, isOpen: false };
    },
  },
});

export const { openModal, closeModal } = deleteModalSlice.actions;
export default deleteModalSlice.reducer;
