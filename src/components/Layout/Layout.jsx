// src/components/Layout/Layout.js
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Header,
  HeaderContent,
  Logo,
  Nav,
  UserMenu,
  UserAvatar,
  UserDropdown,
  DropdownItem,
} from "./Header.styles";
import {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  NavSection,
  NavSectionTitle,
  NavItem,
  NavIcon,
  MainContent,
  SidebarOverlay,
  SidebarFooter,
  UserInfo,
  UserDetails,
  UserName,
  UserRole,
} from "./Sidebar.styles";
import { Container, IconButton } from "../../components/common";
import logoColor from "../../assets/edlog logo color.png";
import { AiFillDashboard } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { RiTodoFill } from "react-icons/ri";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { FaFileUpload } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import { BsFileBarGraphFill } from "react-icons/bs";
import { IoPersonCircle } from "react-icons/io5";
import { PiGearFill } from "react-icons/pi";
import { BiSolidExit } from "react-icons/bi";

const Layout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    // Close sidebar on mobile when route changes

    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, [location, user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitials = () => {
    return `${user?.first_name?.[0] || ""}${
      user?.last_name?.[0] || ""
    }`.toUpperCase();
  };

  const adminNavigation = [
    {
      section: "Main",
      items: [{ path: "/app", label: "Dashboard", icon: <AiFillDashboard /> }],
    },
    {
      section: "Academic",
      items: [
        { path: "/app/students", label: "Students", icon: <FaPeopleGroup /> },
        { path: "/app/teachers", label: "Teachers", icon: <GiTeacher /> },
        { path: "/app/attendance", label: "Attendance", icon: <RiTodoFill /> },
        {
          path: "/app/assignments",
          label: "Assignments",
          icon: <MdAssignmentTurnedIn />,
        },
        {
          path: "/app/performance-input",
          label: "Input Report Comment",
          icon: <FaFileUpload />,
        },
        // { path: "/app/timetable", label: "Timetable", icon: <HiDocumentReport /> },
        {
          path: "/app/bulk-report",
          label: "Generate Bulk Report Card",
          icon: <HiDocumentReport />,
        },
        {
          path: "/app/score-upload",
          label: "Upload Score",
          icon: <FaFileUpload />,
        },
      ],
    },
    {
      section: "Administration",
      items: [
        { path: "/app/finance", label: "Finance", icon: <IoMdCash /> },
        {
          path: "/app/reports",
          label: "Reports",
          icon: <BsFileBarGraphFill />,
        },
        {
          path: "/app/Subjects",
          label: "Subjects",
          icon: <BsFileBarGraphFill />,
        },
        {
          path: "/app/academic-years",
          label: "Academic Years",
          icon: <BsFileBarGraphFill />,
        },
        {
          path: "/app/terms",
          label: "Terms",
          icon: <BsFileBarGraphFill />,
        },
        {
          path: "/app/grades",
          label: "Classes",
          icon: <BsFileBarGraphFill />,
        },
      ],
    },
  ];

  const teacherNavigation = [
    {
      section: "Main",
      items: [{ path: "/app", label: "Dashboard", icon: <AiFillDashboard /> }],
    },
    {
      section: "Academic",
      items: [
        { path: "/app/attendance", label: "Attendance", icon: <RiTodoFill /> },
        {
          path: "/app/assignments",
          label: "Assignments",
          icon: <MdAssignmentTurnedIn />,
        },
        // { path: "/app/timetable", label: "Timetable", icon:  },
        {
          path: "/app/score-upload",
          label: "Upload Score",
          icon: <FaFileUpload />,
        },
        {
          path: "/app/performance-input",
          label: "Input Report Comment",
          icon: <FaFileUpload />,
        },
      ],
    },
  ];

  const studentNavigation = [
    {
      section: "Main",
      items: [{ path: "/app", label: "Dashboard", icon: <AiFillDashboard /> }],
    },
    {
      section: "Academic",
      items: [
        {
          path: "/app/student-assignment",
          label: "Assignments",
          icon: <MdAssignmentTurnedIn />,
        },
        // { path: "/app/timetable", label: "Timetable", icon: <HiDocumentReport /> },
        {
          path: "/app/report-card",
          label: "Report Card",
          icon: <HiDocumentReport />,
        },
      ],
    },
    {
      section: "Administration",
      items: [{ path: "/app/finance", label: "Finance", icon: <IoMdCash /> }],
    },
  ];

  const parentNavigation = [
    {
      section: "Main",
      items: [{ path: "/app", label: "Dashboard", icon: <AiFillDashboard /> }],
    },
    {
      section: "Academic",
      items: [
        {
          path: "/app/report-card",
          label: "Report Card",
          icon: <HiDocumentReport />,
        },
      ],
    },
    {
      section: "Administration",
      items: [{ path: "/app/finance", label: "Finance", icon: <IoMdCash /> }],
    },
  ];

  const navigation = (userType) => {
    if (userType === "admin") {
      return adminNavigation;
    } else if (userType === "teacher") {
      return teacherNavigation;
    } else if (userType === "parent") {
      return parentNavigation;
    }
    return studentNavigation;
  };

  const isActivePath = (path) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  if (!user) {
    return navigate("/login");
  }
  return (
    <>
      <Header>
        <Container>
          <HeaderContent>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <IconButton
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  display: window.innerWidth <= 1024 ? "flex" : "none",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ☰
              </IconButton>
              <Logo>
                <img src={logoColor} alt="logo" style={{ height: "80px" }} />
              </Logo>
            </div>

            <Nav>
              <UserMenu>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <UserAvatar>{getInitials()}</UserAvatar>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "600", fontSize: "0.875rem" }}>
                      {user?.first_name} {user?.last_name}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      {user?.user_type}
                    </span>
                  </div>
                </div>

                {userDropdownOpen && (
                  <UserDropdown>
                    <DropdownItem
                      onClick={() => {
                        /* Profile settings */
                      }}
                    >
                      <IoPersonCircle /> Profile Settings
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        /* Preferences */
                      }}
                    >
                      <PiGearFill /> Preferences
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>
                      <BiSolidExit /> Logout
                    </DropdownItem>
                  </UserDropdown>
                )}
              </UserMenu>
            </Nav>
          </HeaderContent>
        </Container>
      </Header>

      <SidebarOverlay
        isOpen={sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <Logo>
            <img src={logoColor} alt="logo" style={{ height: "80px" }} />
          </Logo>
        </SidebarHeader>

        <SidebarNav>
          {
            // (user.user_type === "admin")
            navigation(user?.user_type || "").map((section) => (
              <NavSection key={section.section}>
                <NavSectionTitle>{section.section}</NavSectionTitle>
                {section.items.map((item) => (
                  <NavItem
                    key={item.path}
                    to={item.path}
                    active={isActivePath(item.path) ? 1 : 0}
                    onClick={() =>
                      window.innerWidth <= 1024 && setSidebarOpen(false)
                    }
                  >
                    <NavIcon>{item.icon}</NavIcon>
                    {item.label}
                  </NavItem>
                ))}
              </NavSection>
            ))
            // : "")
          }
        </SidebarNav>

        {/* <SidebarFooter>
          <UserInfo>
            <UserAvatar>{getInitials()}</UserAvatar>
            <UserDetails>
              <UserName>
                {user?.first_name} {user?.last_name}
              </UserName>
              <UserRole>{user?.user_type}</UserRole>
            </UserDetails>
          </UserInfo>
        </SidebarFooter> */}
      </Sidebar>

      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
};

export default Layout;
