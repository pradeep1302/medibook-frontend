import React, { useState } from "react";
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { selectId, selectRole } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const role = useSelector(selectRole);
  const id = useSelector(selectId);

  const goHome = () => {
    navigate("/");
  };
  var menu;
  if (role == "doctor")
    menu = [
      {
        title: "Appointments",
        icon: <FaTh />,
        path: "/doctor",
      },
      {
        title: "Patients",
        icon: <BiImageAdd />,
        path: "/patients",
      },
      {
        title: "Account",
        icon: <FaRegChartBar />,
        childrens: [
          {
            title: "Profile",
            path: "/profile",
          },
          {
            title: "Edit Profile",
            path: "/edit-profile",
          },
        ],
      },
      {
        title: "Report Bug",
        icon: <FaCommentAlt />,
        path: "/contact-us",
      },
    ];
  else
    menu = [
      {
        title: "Appointments",
        icon: <FaTh />,
        path: "/patient",
      },
      {
        title: "Reports",
        icon: <BiImageAdd />,
        path: `/reports/${id}`,
      },
      {
        title: "Account",
        icon: <FaRegChartBar />,
        childrens: [
          {
            title: "Profile",
            path: "/profile",
          },
          {
            title: "Edit Profile",
            path: "/edit-profile",
          },
        ],
      },
      {
        title: "Report Bug",
        icon: <FaCommentAlt />,
        path: "/contact-us",
      },
    ];

  const { children } = props;

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <RiProductHuntLine
              size={35}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
          </div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
