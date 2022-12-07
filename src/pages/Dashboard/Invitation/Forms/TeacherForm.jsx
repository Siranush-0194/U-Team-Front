

import React, { useState, useEffect,useMemo } from 'react';
import axios from '../../../../axios';
import { useSelector } from 'react-redux';

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Cascader,
  Checkbox
} from 'antd';



import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const TeacherInvitation = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const history = useHistory();



  const [institutes, setInstitutes] = useState(null);
  const [departments, setDepartments] = useState({});
  const [selectInstitute, setSelectInstitute] = useState(null);
  const [courses, setCourses] = useState(null);
  const [groups, setGroups] = useState({});
  const [subgroup, setSubGroup] = useState(null);
  const [selectDepartments, setSelectDepartments] = useState(null);
  const [selectGroup, setSelectGroup] = useState(null);
  const [selectCourse, setSelectCourse] = useState(null);
  const [type, setType] = useState("admin");


  useEffect(() => {
    axios.get("/api/institute/get").then((response) => {
      setInstitutes(response.data.map(institute => ({
        value: institute.id,
        label: institute.name
      })))
    }).catch(() => setInstitutes([]));

    axios.get("/api/course/get").then((response) => {
      console.log(response);
      setCourses(response.data.map( course => ({
        value: course.id,
        label: course.number + "-" + course.degree + "-" + course.type,
        children: []
      })))
    }).catch(() => setCourses([]));
  
},[])

      


  const handleChangeInstitute = (value) => {
    setSelectInstitute(value);

    if (!departments[value]) {
      axios.get(`/api/institute/get/${value}/departments`).then((response) => {
        setDepartments({
          ...departments,
          [value]: response.data.map(department => ({
            value: department.id,
            label: department.name
          }))
        })
      }).catch(() => setDepartments([]));
    }
  };
  




  // const handleChangeCourse = (id) => {
  //   setSelectCourse(id);  
    
  //   if (!groups[id]) {
  //     axios.get(`/api/course/get/${id}/groups`).then((response) => {
  //       setGroups({
  //         ...groups,
  //         [id]: {
  //           data: response.data,
  //           parents: response.data.filter(g => !g.parentId).map(group => ({
  //             value: group.id,
  //             label: group.number
  //           }))
  //         }
  //       })
  //     }).catch(() => setGroups([]));
  //   }
  // };

  // const handleSubGroup = (id) => {
  //   setSubGroup(groups[selectCourse].data.filter(subGroup => subGroup.parentId === id).map(subGroup => ({
  //     value: subGroup.id,
  //     label: subGroup.number
  //   })));
  // }
 


  const rules = useSelector(function (state) {
    return state.rules;
  });

  const rule = useMemo(() => {
    return rules[type];
  }, [type, rules]);
  
 
  const NavigateAdminInvitation=()=>{
    history.push('/dashboard/admin-invitation')
  }

  const NavigateStudentInvitation=()=>{
    history.push('/dashboard/invitation')
  }

  const onFinish = async () => {
    const values = await form.validateFields();
    values.birthDate = values['birthDate'].format('YYYY-MM-DD')
    axios.post(`teacher/send-invitation`, values).then((response) => { });
  }

  


  const options = [
    {
      label: 'Bamboo',
      value: 'bamboo',
      children: [
        {
          label: 'Little',
          value: 'little',
          children: [
            {
              label: 'Toy Fish',
              value: 'fish',
            },
            {
              label: 'Toy Cards',
              value: 'cards',
            },
            {
              label: 'Toy Bird',
              value: 'bird',
            },
          ],
        },
      ],
    },
  ];
const { SHOW_CHILD } = Cascader;

  return (
    <>
     {/* <Card     
      actions={['admin', 'student', 'teacher'].map(item => {
        return <Button type="primary" ghost={type !== item} className="form-button" onClick={() => setType(item)}>{item}</Button>;
      })}
    > */}
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item label="FirstName" name='firstName' >
          <Input />
        </Form.Item>

        <Form.Item label="LastName" name='lastName'>
          <Input />
        </Form.Item>
        

        <Form.Item label="Patronymic" name='patronymic'>
          <Input />
        </Form.Item>
   
        <Form.Item label="DatePicker" name='birthDate'>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Email" name='email'>
          <Input />
        </Form.Item>

        <Form.Item label="Institute" name='instituteId'>
          <Select defaultValue="..." options=  {institutes} onChange={handleChangeInstitute} />
        </Form.Item>

        <Form.Item label="Department" name='departmentId'>
          <Select defaultValue="..." options={departments[selectInstitute]} />
        </Form.Item>

        <Form.Item label="Course" name='courseId'>       
          <Cascader options={courses} multiple //  onChange={handleChangeCourse}  
            />         
        </Form.Item>     
   
   
        <Form.Item label="Group" name='groupId'>
          <Select     defaultValue="..." options={groups[selectCourse]?.parents} 
          // onChange={handleSubGroup} 
           />
        </Form.Item>

        <Form.Item label="SubGroup" name='subgroupId'>
          <Select   defaultValue="..." options={subgroup} />
        </Form.Item>


        {/* <Cascader
        style={{
          width: '100%',
          height:'100%',
        }}
        options={courses}
        onChange={(event) => {
          console.log(event);
        }}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
      
      /> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-form-button">
            Save
          </Button>
        </Form.Item>
        <Button onClick={NavigateAdminInvitation}>Admin</Button>
        <Button onClick={NavigateStudentInvitation}>Student</Button>
     
      </Form>
      {/* </Card> */}
    </>
  );
};

export default () => <TeacherInvitation />;
