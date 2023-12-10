import { useEffect } from 'react'
import { Card, CardContent, Container, Button, Typography, IconButton, InputAdornment, OutlinedInput, FormControl, InputLabel, Snackbar, Alert } from '@mui/material'
import api from '@/services/api'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [photo, setPhoto] = useState('')
  const [firstName, setFistName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Assuming api.getProfile() returns user details
        const userProfile = await api.getProfile();

        // Update state with user details
        setPhoto(userProfile.photo || '');
        setFirstName(userProfile.first_name || '');
        setLastName(userProfile.last_name || '');
        setUsername(userProfile.username || '');
        setEmail(userProfile.email || '');
        setPassword(''); // You might want to handle this based on your use case
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, []);


  useEffect(() => {
    api.getProfile()
  }, [])

 
  rreturn (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h4">User Profile</Typography>
          <div>
            <img src={photo} alt="User" />
          </div>
          <div>
            <Typography>First Name: {firstName}</Typography>
            <Typography>Last Name: {lastName}</Typography>
            <Typography>Username: {username}</Typography>
            <Typography>Email: {email}</Typography>
            {/* Add other details as needed */}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}


export default Profile