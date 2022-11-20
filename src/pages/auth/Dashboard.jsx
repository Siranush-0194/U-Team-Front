import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../../axios';

function Dashboard() {
    const history = useHistory();
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            const response = await axios.post("/logout");

            dispatch({ type: "logout" });

            history.push("/");
        } catch (error) {
            
        }
    };

    return (
        <div>
            Dashboard

            <Button type='primary' danger onClick={logout}>Logout</Button>
        </div>
    );
}

export default Dashboard;