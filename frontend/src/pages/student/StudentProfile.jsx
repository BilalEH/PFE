import useAuthContext from '../../api/auth';
import { Box, Paper, Typography, Avatar } from '@mui/material';

function StudentProfile() {
  const { importUser } = useAuthContext();
  const user = importUser();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100%" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{padding: 4,width: '100%',maxWidth: 500,margin: '20px',bgcolor: 'white',}}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src={user.avatar} 
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h4" component="h2" gutterBottom>
            Student Profile
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Last Name:</strong> {user.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>First Name:</strong> {user.firstName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>CIN:</strong> {user.cin}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Phone:</strong> {user.phone}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Role:</strong> {user.role}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default StudentProfile;
