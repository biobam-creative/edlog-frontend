// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dashboardService } from "../../../services";
import { useAuth } from "../../../contexts/AuthContext";
import {
  DashboardHeader,
  WelcomeSection,
  QuickActions,
  StatsGrid,
  DashboardStatCard,
  StatIcon,
  StatContent,
  StatValue,
  StatLabel,
  RecentActivityCard,
  ActivityList,
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityTitle,
  ActivityTime,
} from "./Dashboard.styles";
import {
  Heading1,
  Heading2,
  BodyText,
  Button,
  Card,
  CardHeader,
  CardBody,
  PageContainer,
} from "../../common";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, activityData] = await Promise.all([
        dashboardService.getDashboardStats(),
        getRecentActivity(), // Mock function for now
      ]);
      setStats(statsData);
      setRecentActivity(activityData);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock function for recent activity
  const getRecentActivity = async () => {
    return [
      {
        id: 1,
        type: "assignment",
        title: "Mathematics Assignment Submitted",
        description: "Algebra basics assignment submitted by John Doe",
        time: "2 hours ago",
        icon: "📝",
      },
      {
        id: 2,
        type: "attendance",
        title: "Attendance Marked",
        description: "Class 10A attendance marked for today",
        time: "4 hours ago",
        icon: "✅",
      },
      {
        id: 3,
        type: "payment",
        title: "Fee Payment Received",
        description: "Monthly fee payment received from Sarah Wilson",
        time: "1 day ago",
        icon: "💳",
      },
      {
        id: 4,
        type: "announcement",
        title: "New Announcement Published",
        description: "Sports day schedule announced",
        time: "2 days ago",
        icon: "📢",
      },
    ];
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <PageContainer>
        <div>Loading dashboard...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <DashboardHeader>
        <WelcomeSection>
          <Heading1>
            {getGreeting()}, {user?.first_name}!
          </Heading1>
          <BodyText>
            Welcome to your school management dashboard. Here's what's happening
            today.
          </BodyText>
        </WelcomeSection>
        <QuickActions>
          <Button as={Link} to="/app/attendance" variant="primary">
            Mark Attendance
          </Button>
          <Button as={Link} to="/app/assignments" variant="secondary">
            Create Assignment
          </Button>
        </QuickActions>
      </DashboardHeader>

      {stats && (
        <StatsGrid>
          <DashboardStatCard>
            <StatIcon color="#10b981">👥</StatIcon>
            <StatContent>
              <StatValue>{stats.total_students}</StatValue>
              <StatLabel>Total Students</StatLabel>
            </StatContent>
          </DashboardStatCard>

          <DashboardStatCard>
            <StatIcon color="#3b82f6">👨‍🏫</StatIcon>
            <StatContent>
              <StatValue>{stats.total_teachers}</StatValue>
              <StatLabel>Teachers</StatLabel>
            </StatContent>
          </DashboardStatCard>

          <DashboardStatCard>
            <StatIcon color="#f59e0b">🏫</StatIcon>
            <StatContent>
              <StatValue>{stats.total_classes}</StatValue>
              <StatLabel>Classes</StatLabel>
            </StatContent>
          </DashboardStatCard>

          <DashboardStatCard>
            <StatIcon color="#ef4444">📊</StatIcon>
            <StatContent>
              <StatValue>{stats.today_attendance}%</StatValue>
              <StatLabel>Today's Attendance</StatLabel>
            </StatContent>
          </DashboardStatCard>
        </StatsGrid>
      )}

      <RecentActivityCard>
        <CardHeader>
          <Heading2>Recent Activity</Heading2>
        </CardHeader>
        <CardBody>
          <ActivityList>
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id}>
                <ActivityIcon>{activity.icon}</ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <BodyText marginBottom="0" color="#64748b">
                    {activity.description}
                  </BodyText>
                </ActivityContent>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityItem>
            ))}
          </ActivityList>
        </CardBody>
      </RecentActivityCard>
    </PageContainer>
  );
};

export default Dashboard;
