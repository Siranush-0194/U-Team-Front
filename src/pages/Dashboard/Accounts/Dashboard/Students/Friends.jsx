import { React } from 'react';
import { useEffect,useState } from 'react';
import axios from '../../../../../axios';
import AccountsDashboard from '../accountsDashboard';
// import StudentAccount from './StudentsAcc';
import { Avatar, List,Card,Table } from 'antd';
import "../../style.scss";
import { useParams,Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';


const Friends = () => {
    const [students, setStudents] = useState(null);
    const {courseId} = useParams()
//   const form = Form.useForm()

const user = useSelector(function (state) {
    return state?.user;
  });

useEffect(() => {
    axios
          .get(
            `/api/course/get/${user.course.id}/students`
          )
          .then((response) => {
            console.log(response.data);
            setStudents(response.data);
            // console.log(response.data[0]);
            
          })         
          .catch(() => setStudents([]));
  }, [user]);
    
    
    return(
        
        <Card className='list'>
            {!students ? <> </> :
            <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={students}
            renderItem={(item) => (
              <List.Item
              >
                  <List.Item.Meta
                    avatar={<Avatar />}
                    title={item.firstName + " " + item.lastName}
                    description
                  />
              </List.Item>
            )}
          />}   
    
    </Card>
   
    )

    
  
}


export default Friends;