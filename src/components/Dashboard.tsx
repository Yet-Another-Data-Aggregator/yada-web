/**
 * Dashboard component
 * author: Shaun Jorstad
 *
 * route: '/dashboard'
 * purpose: currently displays the logged in user's UID and provides a button to log out
 */

import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { getUserPrivilege } from "../FireConfig";
import AuthCheck from "./AuthCheck";
import SideNavbar, { NavItem } from "./SideNavbar";
import React, { useState } from "react";
import { Animated } from "react-animated-css";
import { Route } from "react-router-dom";
import Sites from "./Sites";
import ChannelTemplates from "./ChannelTemplates";
import UserManagement from "./UserManagement";
import Settings from "./Settings";
import Content from "./Content";

// import iconts
import homeIcon from "../assets/icons/home.svg";
import sitesIcon from "../assets/icons/site.svg";
import templatesIcon from "../assets/icons/hvac.svg";
import settingsIcon from "../assets/icons/settings.svg";
import usersIcon from "../assets/icons/accountManagement.svg";

export default function Dashboard() {
  const currentUser = useSelector((state: RootState) => state.auth.userUID);
  const [userPrivilege, setPrivilege] = useState("User");

  getUserPrivilege().then((privilege) => {
    setPrivilege(privilege);
  });

  // if there is no logged in user redirect home
  if (currentUser === null || currentUser === undefined) {
    return <AuthCheck />;
  }

  const anyUser = ["Owner", "Admin", "Power", "User"];
  const restricted = ["Owner", "Admin"];

  let navItems: any[] = [
    <NavItem
      key={"/dashboard"}
      name={"dashboard"}
      route={"/app/dashboard"}
      icon={homeIcon}
      requiredPermissions={anyUser}
      currentPermission={userPrivilege}
    />,
    <NavItem
      key={"/sites"}
      name={"sites"}
      icon={sitesIcon}
      route={"/app/sites"}
      requiredPermissions={anyUser}
      currentPermission={userPrivilege}
    />,
    <NavItem
      key={"/templates"}
      name={"templates"}
      icon={templatesIcon}
      route={"/app/channel-templates"}
      requiredPermissions={anyUser}
      currentPermission={userPrivilege}
    />,
    <NavItem
      key={"/users"}
      name={"users"}
      icon={usersIcon}
      route={"/app/user-management"}
      requiredPermissions={restricted}
      currentPermission={userPrivilege}
    />,
    <NavItem
      key={"/settings"}
      name={"settings"}
      icon={settingsIcon}
      route={"/app/settings"}
      requiredPermissions={anyUser}
      currentPermission={userPrivilege}
    />,
  ];

  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div className="withSideNavbar">
        <SideNavbar
          autoCollapse={true}
          roundRightCorners={true}
          currentPrivilege={userPrivilege}
          items={navItems}
        />
        <Route exact path="/app/dashboard">
          <Content
            head={
              <div className="dashboard">
                <h1>Dashboard: </h1>
              </div>
            }
            body={
              <div className="dashboard">
                <p>logged in user: </p>
                <p>{JSON.stringify(currentUser)}</p>
              </div>
            }
          />
        </Route>
        <Route path="/app/sites" component={Sites} />
        <Route
          exact
          path="/app/channel-templates"
          component={ChannelTemplates}
        />
        <Route exact path="/app/user-management" component={UserManagement} />
        <Route exact path="/app/settings" component={Settings} />
      </div>
    </Animated>
  );
}
