import React from 'react';
import { Avatar, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootContainer = styled(Container)({
  marginTop: theme => theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const AvatarImage = styled(Avatar)({
  width: theme => theme.spacing(10),
  height: theme => theme.spacing(10),
  marginBottom: theme => theme.spacing(2),
});

const UserProfilePage: React.FC = () => {
  return (
    <RootContainer maxWidth="sm">
      <AvatarImage alt="User Avatar" src="/path/to/avatar.jpg" />
      <Typography variant="h4" gutterBottom>
        John Doe
      </Typography>
      <Typography variant="body1" paragraph>
        Email: johndoe@example.com
      </Typography>
      <Typography variant="body1" paragraph>
        Location: New York, USA
      </Typography>
      <Button variant="contained" color="primary">
        Edit Profile
      </Button>
    </RootContainer>
  );
};

export default UserProfilePage;
