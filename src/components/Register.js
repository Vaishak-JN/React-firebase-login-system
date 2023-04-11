import { useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("submit")
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/login")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    }
    return (
        <Paper elevation={5} className="paper">
            <Card sx={{ minWidth: 500 }}>
                <CardContent>
                    <Typography variant="h3" component="h3">
                        Register
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
                        <Button type="submit" variant="outlined">Register</Button>
                        {/* <button>Submit</button> */}
                    </form>
                </CardContent>

            </Card>

        </Paper >
    )
}

export default Register