import { useState } from "react"
import classes from "./Login.module.css"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, Paper } from "@mui/material";
import { app, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { SetToken, SetUser } from "../redux/usersSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';






const Login = () => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const gAuth = getAuth()
    const provider = new GoogleAuthProvider();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const googleSignIn = () => {

        signInWithPopup(gAuth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...

                // console.log("result", result)
                // console.log("credential", credential)
                // console.log("token", result)
                // console.log("user", result)

                sessionStorage.setItem('authToken', result._tokenResponse.refreshToken)
                dispatch(SetToken(result._tokenResponse.refreshToken))
                dispatch(SetUser(user))
                navigate("/")
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                toast.error(errorMessage, { position: "top-center", autoClose: 2000 })
                // ...
            });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                sessionStorage.setItem('authToken', userCredential._tokenResponse.refreshToken)
                dispatch(SetToken(userCredential._tokenResponse.refreshToken))
                // console.log(userCredential)
                const user = userCredential.user;
                dispatch(SetUser(user))
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage)
                toast.error(errorMessage, { position: "top-center", autoClose: 2000 })
            });
    }

    return (
        <Paper elevation={5} className="paper">
            <Card sx={{ minWidth: 500 }}>
                <CardContent>
                    <Typography variant="h3" component="h3">
                        Login
                    </Typography>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth size="medium"
                            // onBlur={handleBlur} 
                            id="email" name="email" value={email} onChange={handleEmailChange} label="Email" type="email" required sx={{ marginBottom: "20px" }}
                        // error={errors.name && touched.name} 
                        />

                        <TextField fullWidth size="medium"
                            // onBlur={handleBlur} 
                            id="password" name="password" value={password} onChange={handlePasswordChange} label="Password" type="password" required sx={{ marginBottom: "20px" }}
                        // error={errors.name && touched.name} 
                        />
                        <br />
                        <Button type="submit" variant="contained" color="primary">Login</Button>
                        {/* <button>Submit</button> */}
                    </form>

                    <Typography sx={{ margin: "10px 0" }} variant="h6" component="h6">
                        OR
                    </Typography>
                    <Button type="button" size="large" sx={{ backgroundColor: "#c62828" }} variant="contained" onClick={googleSignIn}>Login with Google  <GoogleIcon /></Button>
                </CardContent>

            </Card>
            <ToastContainer />
        </Paper >
    )
}

export default Login