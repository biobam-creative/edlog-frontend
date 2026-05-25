import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { activitiesService } from '../../../services/activitiesService';
import {
  PageContainer,
  Heading1,
  Heading3,
  BodyText,
  Card,
  CardHeader,
  CardBody,
} from '../../common';
import { FaCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';

const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.selected ? props.theme?.colors?.primary || '#007bff' : '#ddd'};
  background-color: ${props => props.selected ? props.theme?.colors?.primary || '#007bff' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme?.colors?.primary || '#007bff'};
  }
`;

const ActivityListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActivityItemContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: white;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ActivityIndicator = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 12px;
  margin-top: 4px;

  svg {
    font-size: 12px;
    color: ${props => getActivityColor(props.activityType)};
  }
`;

const ActivityDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActivityTitle = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 15px;
  line-height: 1.4;
`;

const ActivityDescription = styled(BodyText)`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const ActivityMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #999;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
  color: #666;

  svg {
    animation: spin 1s linear infinite;
    font-size: 20px;
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
  gap: 12px;
  padding: 20px;
  background-color: #ffe5e5;
  border-radius: 8px;
  color: #d32f2f;
  font-size: 14px;

  svg {
    flex-shrink: 0;
    font-size: 18px;
  }
`;

const NoActivityContainer = styled.div`
  padding: 40px;
  text-align: center;
  color: #999;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.theme?.colors?.primary || '#007bff'};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme?.colors?.primaryDark || '#0056b3'};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
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

// Helper to get activity type display
function getActivityTypeDisplay(activityType) {
  const displayMap = {
    assignment_created: 'Assignment Created',
    assignment_submitted: 'Assignment Submitted',
    assignment_graded: 'Assignment Graded',
    attendance_marked: 'Attendance Marked',
    grade_posted: 'Grade Posted',
    announcement_posted: 'Announcement Posted',
    message_sent: 'Message Sent',
    fee_payment: 'Fee Payment',
    book_issued: 'Book Issued',
    book_returned: 'Book Returned',
    report_generated: 'Report Generated',
    student_enrolled: 'Student Enrolled',
    staff_added: 'Staff Added',
    user_login: 'User Login',
    user_logout: 'User Logout',
    profile_updated: 'Profile Updated',
    other: 'Other Activity',
  };
  return displayMap[activityType] || activityType;
}

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    fetchActivities();
  }, [selectedType, selectedUserType, limit]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await activitiesService.getRecentActivities(
        limit,
        selectedType,
        selectedUserType
      );
      setActivities(response.data?.results || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const activityTypes = [
    'assignment_created',
    'assignment_submitted',
    'assignment_graded',
    'attendance_marked',
    'grade_posted',
    'announcement_posted',
  ];

  const userTypes = [
    { value: 'admin', label: 'Admin' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
    { value: 'parent', label: 'Parent' },
  ];

  if (error && activities.length === 0) {
    return (
      <PageContainer>
        <Heading1>Recent Activities</Heading1>
        <Card>
          <CardBody>
            <ErrorContainer>
              <FaExclamationCircle />
              <span>{error}</span>
            </ErrorContainer>
          </CardBody>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ActivitiesContainer>
        <div>
          <Heading1>Recent Activities</Heading1>
          <BodyText>View all activities across the system</BodyText>
        </div>

        <Card>
          <CardHeader>
            <Heading3>Filters</Heading3>
          </CardHeader>
          <CardBody>
            <FilterSection>
              <FilterButton
                selected={selectedType === null}
                onClick={() => setSelectedType(null)}
              >
                All Activities
              </FilterButton>
              {activityTypes.map(type => (
                <FilterButton
                  key={type}
                  selected={selectedType === type}
                  onClick={() => setSelectedType(type)}
                >
                  {getActivityTypeDisplay(type)}
                </FilterButton>
              ))}
            </FilterSection>

            <FilterSection>
              <FilterButton
                selected={selectedUserType === null}
                onClick={() => setSelectedUserType(null)}
              >
                All Users
              </FilterButton>
              {userTypes.map(userType => (
                <FilterButton
                  key={userType.value}
                  selected={selectedUserType === userType.value}
                  onClick={() => setSelectedUserType(userType.value)}
                >
                  {userType.label}
                </FilterButton>
              ))}
            </FilterSection>
          </CardBody>
        </Card>

        <Card>
          {loading && activities.length === 0 ? (
            <LoadingContainer>
              <FaSpinner />
              <span>Loading activities...</span>
            </LoadingContainer>
          ) : activities.length === 0 ? (
            <NoActivityContainer>
              <BodyText>No activities found matching your filters</BodyText>
            </NoActivityContainer>
          ) : (
            <>
              <ActivityListContainer>
                {activities.map(activity => (
                  <ActivityItemContainer key={activity.id}>
                    <ActivityIndicator activityType={activity.activity_type}>
                      <FaCircle />
                    </ActivityIndicator>
                    <ActivityDetails>
                      <ActivityTitle>{activity.description}</ActivityTitle>
                      <ActivityMeta>
                        <MetaItem>
                          <strong>{activity.actor_name}</strong>
                        </MetaItem>
                        <MetaItem>{getActivityTypeDisplay(activity.activity_type)}</MetaItem>
                        <MetaItem>{activity.time_ago}</MetaItem>
                      </ActivityMeta>
                    </ActivityDetails>
                  </ActivityItemContainer>
                ))}
              </ActivityListContainer>

              {activities.length > 0 && (
                <PaginationContainer>
                  <LoadMoreButton
                    onClick={() => setLimit(limit + 50)}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </LoadMoreButton>
                </PaginationContainer>
              )}
            </>
          )}
        </Card>
      </ActivitiesContainer>
    </PageContainer>
  );
};

export default Activities;
