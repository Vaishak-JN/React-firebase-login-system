import { TextField, Paper, Box, Card, CardActions, CardContent, Button, Typography } from "@mui/material";
import { app, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { SetToken, SetUser } from "../redux/usersSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleIcon from '@mui/icons-material/Google';
import { useFormik } from "formik"
import * as yup from 'yup';


export const formValidationSchema = yup.object({
    email: yup.string().required("Enter a valid email").email('must be a valid email'),
    password: yup.string().required("Enter a password").min(5, "password must be atleast 5 characters"),
})


const Form = ({ title, type }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const gAuth = getAuth()
    const provider = new GoogleAuthProvider();


    const { handleSubmit, values, handleBlur, handleChange, errors, touched, handleReset } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        // using yup
        validationSchema: formValidationSchema,
        onSubmit: values => {
            // e.preventDefault()
            if (type === "login") {
                handleLogin()
            } else {
                handleRegister()
            }
        }


    })

    const googleSignIn = () => {

        signInWithPopup(gAuth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)


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

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in
                sessionStorage.setItem('authToken', userCredential._tokenResponse.refreshToken)
                dispatch(SetToken(userCredential._tokenResponse.refreshToken))
                // console.log(userCredential)
                const user = userCredential.user;
                dispatch(SetUser(user))
                navigate("/")
                // console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage)
                toast.error(errorMessage, { position: "top-center", autoClose: 2000 })
            });
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        // console.log("submit")
        await createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;


                handleReset()
                navigate("/login")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage);

                toast.error(errorMessage, { position: "top-center", autoClose: 2000 })

            });
    }



    return (
        <Paper elevation={5} className="paper">
            <Card sx={{ minWidth: 500 }}>
                <CardContent>
                    <Typography variant="h3" component="h3">
                        {title}
                    </Typography>
                    <br />
                    <form onSubmit={type === "login" ? handleLogin : handleRegister}>
                        <TextField fullWidth size="medium"
                            onBlur={handleBlur}
                            id="email" name="email" value={values.email} onChange={handleChange} label="Email" type="email" required sx={{}}
                            error={errors.email && touched.email}

                        />
                        {errors.email && touched.email && <Typography color="error" variant="p" component="p">{errors.email}</Typography>}
                        <TextField fullWidth size="medium"
                            onBlur={handleBlur}
                            id="password" name="password" value={values.password} onChange={handleChange} label="Password" type="password" required sx={{ marginTop: "20px" }}
                            error={errors.password && touched.password}
                        />
                        {errors.password && touched.password && <Typography color="error" variant="p" component="p">{errors.password}</Typography>}
                        <br />
                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: "20px" }}>{type}</Button>
                        <Button type="submit" variant="contained" color="secondary" sx={{ marginTop: "20px", marginLeft: "20px" }}
                            onClick={() => navigate(type === "login" ? "/register" : "/login")}
                        >
                            {type === "login" ? "Register" : "Login"}
                        </Button>

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

export default Form