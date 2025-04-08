import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import roleReducer from "./slices/roleSlice";
import adminReducer from "./slices/adminSlice";
import instructorReducer from "./slices/instructorSlice";
import studentReducer from "./slices/studentSlice";
import categoryReducer from "./slices/categorySlice";
import courseReducer from "./slices/courseSlice";
import deleteModalReducer from "./slices/deleteModalSlice";
import languageReducer from "./slices/languageSlice";
import userReducer from "./slices/userSlice";
import cacheReducer from "./slices/cacheSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // roles: roleReducer,
    admins: adminReducer,
    instructors: instructorReducer,
    students: studentReducer,
    Categories: categoryReducer,
    courses: courseReducer,
    deleteModal: deleteModalReducer,
    languages: languageReducer,
    user: userReducer,
    settings: cacheReducer,
  },
});
