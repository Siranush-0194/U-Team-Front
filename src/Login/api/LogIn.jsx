// import React,{useState} from "react";
// import { ReactDOM } from "react";


// import "./login.css";
// async function loginUser(credentials) {


//   return fetch('  http://127.0.0.1:8000/login',
//    {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
//  }
 



// function App (){
// const [errorMessages, setErrorMessages]=useState ({});
// const [isSubmitted, setIsSubmitted] = useState(false);



// const database=[
//     {
//         email:"a@mail.ru",
//         password:"aaaa"
//     },

//     {
//         email:"b@mail.ru",
//         password:"bbbb"
//     },
//     {
//         email:"c@mail.ru",
//         password:"cccc"
//     }
// ];

// const errors ={
//     mail:"invalid mail",
//     pass:"invalid password"
// };

// const handleSubmit = (event) => {
//     event.preventDefault();

//     let {em,pass} = document.forms[0];

//     const userData = database.find((user)=>user.email===em.value);

//     if(userData){
//         if(userData.password !==pass.value){
//             setErrorMessages({name:"pass", message: errors.pass});

//         } else {
//             setIsSubmitted(true);
//         }
//     } else {
//         setErrorMessages({name:"em",message:errors.em});
//     }
// };

// const renderErrorMessage=(name)=>
// name ===errorMessages.name && (
//     <div className="error">{errorMessages.message}</div>

//     );
//     const renderForm = (
//         <div className="form">
//           <form onSubmit={handleSubmit}>
//             <div className="input-container">
//               <label>Username </label>
//               <input type="text" name="em " required />
//               {renderErrorMessage("em")}
//             </div>
//             <div className="input-container">
//               <label>Password </label>
//               <input type="password" name="pass" required />
//               {renderErrorMessage("pass")}
//             </div>
//             <div className="button-container">
//               <input type="submit" />
//             </div>
//           </form>
//         </div>
//       );
    
//       return (
//         <div className="app">
//           <div className="login-form">
//             <div className="title">Sign In</div>
//             {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
//           </div>
//         </div>
//       );
//     }
    
    









// export default App;

import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from './axios';
const LOGIN_URL = '';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json',},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login