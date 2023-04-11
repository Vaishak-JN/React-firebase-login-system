import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ResetState } from '../redux/usersSlice';
import { Box, Button, Typography } from '@mui/material';

function Home() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            sessionStorage.removeItem("authToken")
            dispatch(ResetState())
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <>
            <Box sx={{ m: 3 }}>
                <Typography color="white" variant="h3" component="h3">
                    Hello World
                </Typography>
                <br />
                <Button variant="contained" color="success" onClick={handleLogout}>Logout</Button>
            </Box>
            <Box sx={{ m: 3, marginTop: "50px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography variant="h5" component="h5">
                    Created by Vaishak J Nair
                </Typography>
                <Typography color="white" variant="h5" component="a" href="https://github.com/Vaishak-JN/React-firebase-login-system" target="_blank">
                    View source code on Github
                </Typography>

                <Typography variant="h5" component="h5">
                    Made using React,Redux Toolkit,Formik,Yup,Firebase,React Router and Material UI
                </Typography>

            </Box>

        </>
    )
}

export default Home