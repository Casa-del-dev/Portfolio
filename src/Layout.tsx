import React from "react";
import "./Layout.css";

import { Header } from "./Components/Header";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="container-fluid">{props.children}</main>
    </>
  );
};

export default Layout;
