
import { useRef, useState, useEffect, useContext} from 'react';

import AuthContext from '../AdminPage/Login/context/AuthProvider';

import axios from '../modules/axios';

import { useNavigate } from 'react-router-dom';
import { Routes}from 'react-router-dom';
import '../login.css';

const LOGIN_URL_TEACHER = '/teacher/login';

function TeachLogin () {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [email, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const[success,setSuccess]=useState(false);
    // const [cookie, setcookie] = useCookies(['admin']);

  




    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])
console.log(email +"      "+ password);

   
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            
            const response = await axios.post(LOGIN_URL_TEACHER,
                JSON.stringify({ email, password }),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept' : 'application/json'
                    },
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
           
                
           

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                console.log(e.errMsg)
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
 
    return (
        <div>
        <Routes>
          
         
        </Routes>
      
       
        <>
        
            {success ? (     
                navigate("/teachposts")
          
                
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
                            value={email}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                                                                        
                          <button >  Sign In</button>
                       
                    </form>
                    <a href='admin'>Login as admin</a>
                    <a href='student'>Login as student</a>
                   
                </section>
            )}
        </>
        </div>
    )
}

export default TeachLogin;