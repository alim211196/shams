import React from "react";
import { Outlet } from "react-router-dom";
import MiniDrawer from "./index";

const AdminLayout = () => {
  return (
    <MiniDrawer>
      {/* The Outlet will render the matched child route here */}
      <Outlet />
    </MiniDrawer>
  );
};

export default AdminLayout;
