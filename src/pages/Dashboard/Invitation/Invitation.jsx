

import React, { useState,useEffect } from 'react';
import axios from '../../../axios';

import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect
} from 'antd';


const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Invitation = () => {
  const [form] = Form.useForm();

  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
      
    const [institutes, setInstitutes] = useState(null);
    const [ departments, setDepartments ] = useState({});
    const [selectInstitute, setSelectInstitute] = useState(null);
    const [ course, setCourse] = useState({});
    const [selectDepartments, setSelectDepartments] = useState(null);
    const [selectGroup, setSelectGroup] = useState(null);

  useEffect(() => {
    axios.get("/api/institute/get").then((response) => {
      setInstitutes(response.data.map(institute => ({
        value: institute.id,
        label: institute.name
      })))
    }).catch(() => setInstitutes([]));

    axios.get("/api/group/get").then((response) => {
      let data = [];

      if (response.data) {
        response.data.forEach(group => {
          if (!group.parentId) {
            data.push({
              value: group.id,
              label: group.number,
              children: []
            })
          } else {
              let findData = data.find(item => item.value === group.parentId);

              findData.children.push({
                  value: group.id,
                  label: group.number
              })
          }

          setSelectGroup(data)
        });
      }
    });
  }, []);

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

  const handleChangeDepartments = (value) => {
    setSelectDepartments(value);

    if (!course[value]) {
      axios.get(`/api/department/get/${value}/courses`).then((response) => {
        setCourse({
          ...course,
          [value]: response.data.map(course => ({
            value: course.id,
            label: course.name
          }))
        })
      }).catch(() => setDepartments([]));
    }
  };

  const onFinish = async () => {
      const values = await form.validateFields();
      values.birthDate = values['birthDate'].format('YYYY-MM-DD')
      axios.post(`/send-invitation`, values).then((response) => {
        console.log(response);
      })
      
      // values
  }

  return (
    <>
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
        onValuesChange={onFormLayoutChange}    
      >
       
        
        <Form.Item label="FirstName" name='firstName' >
          <Input />
        </Form.Item>

        <Form.Item label="LastName" name='lastName'>
          <Input  />
        </Form.Item>

        <Form.Item label="Patronymic"  name='patronymic'>
          <Input />
        </Form.Item>

        <Form.Item label="DatePicker"  name='birthDate'>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Email"  name='email'>
          <Input />
        </Form.Item>

        <Form.Item  
          name='password' 
         label="Password"
         
         >
          <Input type="password"/>
        </Form.Item>

        <Form.Item label="Institute" name='instituteId'>
            <Select  defaultValue="..." options={institutes} onChange={handleChangeInstitute} />
        </Form.Item>

        <Form.Item label="Department" name='departmentId'>      
          <Select  defaultValue="..." options={departments[selectInstitute]} onChange={handleChangeDepartments} />
        </Form.Item>

        <Form.Item label="Course" name='courseId'>
          <Select defaultValue="..." options={course[selectDepartments]} />
        
        </Form.Item>

        
        <Form.Item label="Group" name='groupId'>
          <TreeSelect
            
            treeData={selectGroup}
          />
        </Form.Item>  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-form-button">
            Save
          </Button>
        </Form.Item>
 
      </Form>
    </>
 
  );
};

export default () => <Invitation/>;


