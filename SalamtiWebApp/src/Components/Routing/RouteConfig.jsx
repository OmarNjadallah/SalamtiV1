import React from "react";
import Layout from "../Common/Layout";
// Pages
import Login from "../Pages/LoginPage";
import DashBoard from "../Pages/DashBoardPage";
import AccountManagement from "../Pages/AccountManagementPage";
import Cases from "../Pages/CasesPage";
import LiveMap from "../Pages/LiveTrackingPage";

// Route configuration
const routes = [
  {
    path: "/",
    component: <Login />,
    isProtected: false,
  },
  {
    path: "/DashBoard",
    component: (
      <Layout>
        <DashBoard />
      </Layout>
    ),
    isProtected: true,
  },
  {
    path: "/AccountManagement",
    component: (
      <Layout>
        <AccountManagement />
      </Layout>
    ),
    isProtected: true,
  },
  {
    path: "/Cases",
    component: (
      <Layout>
        <Cases />
      </Layout>
    ),
    isProtected: true,
  },
  {
    path: "/LiveMap",
    component: (
      <Layout>
        <LiveMap />
      </Layout>
    ),
    isProtected: true,
  },
];

export default routes;
