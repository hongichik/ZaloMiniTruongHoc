import React from "react";
import { App } from "zmp-ui";
import AppRouter from "@/pages";

function Layout() {
  return (
    <App>
      <AppRouter />
    </App>
  );
}

export default Layout;