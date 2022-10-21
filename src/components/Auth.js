import { useState } from "react";
import { Box, Button, TextField, Typography, useStepContext, Paper } from "@mui/material";
import Logo from '../resources/logos/StyleHub-Logo-Splash.png'
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

export const Auth = ({setAuth, isLoggedIn}) => {
const navigate = useNavigate()
const [isRegistered, setIsRegistered] = useState(false);
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('');
const [error, setError] = useState(null)

const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, email, password)
    
    axios
    .post('https://stylehub.herokuapp.com/auth/users/', {
        username: username,
        password: password,
        email: email,
    })
    
    .then(() =>
        axios.post(
        'https://stylehub.herokuapp.com/auth/token/login',
        {
        username: username,
        password: password,
        })
    )
    .then((res) =>
        setAuth(username, res.data.auth_token))
        // console.log(res.data.auth_token)
    
    .catch((error) => {
        if (error.response.data.username)
            setError(error.response.data.username);
    
        if (error.response.data.password)
            setError(error.response.data.password)
    })
    
}

const handleLogin = (e) => {
    console.log({ username, password })
    e.preventDefault()
    setError(null)

    axios
    .post('https://stylehub.herokuapp.com/auth/token/login/', {
        username: username,
        password: password,
    })
    .then((res) => {
        console.log(res.data)
        const token = res.data.auth_token
        setAuth(username, token)
    
    })
    .catch((error) => {
        console.log(error)
        if (error.response.data.username)
        setError(error.response.data.username);
    
    if (error.response.data.password)
        setError(error.response.data.password)
    })
    console.log(username, password)
}

    if (isLoggedIn) {
        return <Navigate to="closet" />
    }

const resetState = () => {
    setIsRegistered(!isRegistered);
    setUsername('')
    setEmail('')
    setPassword('')

}

// console.log(isRegistered);

    return (  
        <div>
            <form
            onSubmit={isRegistered ? handleRegister : handleLogin}
            >
                <Box
                display="flex"
                flexDirection={"column"}
                maxWidth={300}
                alignItems="center"
                justifyContent={"center"}
                margin="auto"
                marginTop={5}
                padding={3}
                borderRadius={0}
                boxShadow={"5px 5px 10px #ccc"}>

                <Box
                component="img"
                sx={{ height: 100, marginRight: 2, }}
                alt="main logo"
                src={Logo}
                />
                
                <TextField
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                value={username}
                type={"text"}
                variant="outlined"
                style={{ color: "red" }}
                placeholder="username"
                margin="normal"
                required
                />

            {isRegistered && 
                <TextField
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                value={email}
                type={"email"}
                variant="outlined"
                placeholder="email"
                margin="normal"
                required
                />
            }
                <TextField
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                value={password}
                type={"password"}
                variant="outlined"
                placeholder="password" 
                margin="normal"
                required
                />

                <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#9cc4d9" }}
                sx={{ marginTop: 3, }}
                >
                    {isRegistered ? "Sign up" : "Sign In"}
                </Button>


                <Typography
                sx={{ marginTop: 3 }}> 
                {isRegistered ? "Have an account?" : "Don't have an account?"}
                </Typography>

                <Button
                onClick={resetState}
                sx={{ marginTop: 0, }}
                >
                    {isRegistered ? "Sign In" : "Sign Up"}
                </Button>
                
                </Box>
            </form>
        </div>
    );
}