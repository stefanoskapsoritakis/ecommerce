import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import { createNewUser } from '../redux/reducers/usersReducer';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createNewUser({ firstName, lastName, email, password, avatar }));
        navigate("/");
    };

    return (
        <div data-testid="signup">
            <form onSubmit={e => handleSubmit(e)}>
                <Box sx={{
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="h3" gutterBottom>Register</Typography>
                    <Typography variant="body1" gutterBottom>First Name:</Typography>
                    <TextField id="outlined-basic" label="First Name" variant="outlined" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /><br />
                    <Typography variant="body1" gutterBottom>Last Name:</Typography>
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /><br />
                    <Typography variant="body1" gutterBottom>E-Mail:</Typography>
                    <TextField id="outlined-basic" label="E-Mail" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                    <Typography variant="body1" gutterBottom>Password:</Typography>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                    <Typography variant="body1" gutterBottom>Avatar:</Typography>
                    <TextField id="outlined-basic" label="Avatar" variant="outlined" type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} /><br />
                    <Button variant="contained" type="submit" endIcon={<SendIcon />}>Submit</Button>
                </Box>
            </form>
        </div>
    );
};

export default SignUp;
