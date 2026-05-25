import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { activitiesService } from '../../../services/activitiesService';
import { Card, CardHeader, CardBody, Heading3, BodyText } from '../../common';
import { FaCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';

const ActivityListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActivityItemContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.theme?.colors?.backgroundLight || '#f8f9fa'};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme?.colors?.backgroundHover || '#f0f1f3'};
  }
`;

const ActivityIndicator = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 8px;
  margin-top: 4px;

  svg {
    font-size: 8px;
    color: ${props => getActivityColor(props.activityType)};
  }
`;

const ActivityDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ActivityTitle = styled(BodyText)`
  font-weight: 500;
  color: ${props => props.theme?.colors?.textPrimary || '#333'};
  font-size: 14px;
  line-height: 1.4;
`;

const ActivityTime = styled(BodyText)`
  font-size: 12px;
  color: ${props => props.theme?.colors?.textSecondary || '#666'};
`;

const ActivityActor = styled.span`
  font-weight: 600;
  color: ${props => props.theme?.colors?.primary || '#007bff'};
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  color: ${props => props.theme?.colors?.textSecondary || '#666'};

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background-color: #ffe5e5;
  border-radius: 8px;
  color: #d32f2f;
  font-size: 14px;

  svg {
    flex-shrink: 0;
  }
`;

const ViewAllButton = styled.a`
  display: inline-block;
  margin-top: 12px;
  padding: 8px 16px;
  background-color: ${props => props.theme?.colors?.primary || '#007bff'};
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme?.colors?.primaryDark || '#0056b3'};
  }
`;

const NoActivityContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: ${props => props.theme?.colors?.textSecondary || '#666'};
`;

// Helper function to get activity color
function getActivityColor(activityType) {
  const colors = {
    assignment_created: '#4CAF50',
    assignment_submitted: '#2196F3',
    assignment_graded: '#FF9800',
    attendance_marked: '#9C27B0',
    grade_posted: '#F44336',
    announcement_posted: '#00BCD4',
    message_sent: '#673AB7',
    fee_payment: '#8BC34A',
    book_issued: '#607D8B',
    book_returned: '#78909C',
    report_generated: '#5E35B1',
    student_enrolled: '#4CAF50',
    staff_added: '#2196F3',
    user_login: '#757575',
    user_logout: '#9E9E9E',
    profile_updated: '#FF5722',
    other: '#BDBDBD',
  };
  return colors[activityType] || colors.other;
}

// Helper function to format activity description
function formatActivityDescription(activity) {
  return `${activity.actor_name} - ${activity.description}`;
}

export const RecentActivities = ({
  limit = 10,
  activityType = null,
  userType = null,
  showViewAll = true,
  refreshInterval = 30000, // Refresh every 30 seconds
}) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await activitiesService.getRecentActivities(
          limit,
          activityType,
          userType
        );
        setActivities(response.data?.results || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Failed to load recent activities');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchActivities();

    // Set up interval for auto-refresh
    const interval = setInterval(fetchActivities, refreshInterval);

    // Cleanup
    return () => clearInterval(interval);
  }, [limit, activityType, userType, refreshInterval]);

  if (loading && activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <Heading3>Recent Activities</Heading3>
        </CardHeader>
        <CardBody>
          <LoadingContainer>
            <FaSpinner />
            <span>Loading activities...</span>
          </LoadingContainer>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <Heading3>Recent Activities</Heading3>
        </CardHeader>
        <CardBody>
          <ErrorContainer>
            <FaExclamationCircle />
            <span>{error}</span>
          </ErrorContainer>
        </CardBody>
      </Card>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <Heading3>Recent Activities</Heading3>
        </CardHeader>
        <CardBody>
          <NoActivityContainer>
            <BodyText>No recent activities to display</BodyText>
          </NoActivityContainer>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <Heading3>Recent Activities</Heading3>
      </CardHeader>
      <CardBody>
        <ActivityListContainer>
          {activities.map((activity) => (
            <ActivityItemContainer key={activity.id}>
              <ActivityIndicator activityType={activity.activity_type}>
                <FaCircle />
              </ActivityIndicator>
              <ActivityDetails>
                <ActivityTitle>
                  <ActivityActor>{activity.actor_name}</ActivityActor>
                  {' - '}
                  {activity.description}
                </ActivityTitle>
                <ActivityTime>{activity.time_ago}</ActivityTime>
              </ActivityDetails>
            </ActivityItemContainer>
          ))}
        </ActivityListContainer>
        {showViewAll && (
          <ViewAllButton href="/activities">View All Activities</ViewAllButton>
        )}
      </CardBody>
    </Card>
  );
};

export default RecentActivities;
