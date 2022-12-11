

import React, { useState, useEffect, useMemo } from 'react';
import axios from '../../../axios';
import { useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Cascader
} from 'antd';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TeacherInvitation = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const history = useHistory();
  const [institutes, setInstitutes] = useState(null);
  const [departments, setDepartments] = useState({});
  const [selectInstitute, setSelectInstitute] = useState(null);
  const [courses, setCourses] = useState(null);
  const [groups, setGroups] = useState(null);
  const [subgroup, setSubGroup] = useState(null);

  useEffect(() => {
    axios.get("/api/institute/get").then((response) => {
      setInstitutes(response.data.map(institute => ({
        value: institute.id,
        label: institute.name
      })))
    }).catch(() => setInstitutes([]));

    axios.get("/api/course/get").then((response) => {
      setCourses(response.data.map(course => ({
        value: course.id,
        label: course.number + "-" + course.degree + "-" + course.type,
        children: []
      })))
    }).catch(() => setCourses([]));

    axios.get("/api/group/get-course").then((response) => {
      let groups = [], subgroups = [];

      response.data.forEach(group => {
        if (!group.parentId) {
          groups.push({
            value: group.id,
            label: `${group.course.number} - ${group.number} ${group.course.degree} ${group.course.type}`,
            children: []
          })
        } else {
          subgroups.push({
            value: group.id,
            label: `${group.course.number} - ${group.number} ${group.course.degree} ${group.course.type}`,
            children: []
          })
        }
      });

      setGroups(groups);
      setSubGroup(subgroups);
    }).catch(() => setCourses([]));
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

  const rules = useSelector(function (state) {
    return state.rules;
  });

  const onFinish = async (values) => {
    values.birthDate = !values['birthDate'] ? undefined : values['birthDate'].format('YYYY-MM-DD');
    
    ["courseId", "groupId", "subgroupId"].forEach(key => {
      values[key] = values[key].map(element => element[0]);
    })


    // console.log(values);
    axios.post(`teacher/send-invitation`, values).then((response) => {
      form.resetFields();
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        let fields = ["firstName", "lastName","patronymic","birthDate","email", ];

        fields.forEach(field => {console.log(error.response.data.errors);
          if (error.response.data.errors[field]) {
            form.setFields([
              {
                name: field,
                errors: [t(error.response.data.errors[field][0])]
              }
            ]);
          }
        });
      }
    });
  }

  return (
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

      <Form.Item label="Position" name='position'>
        <Input />
      </Form.Item>

      <Form.Item label="Institute" name='instituteId'>
        <Select defaultValue="..." options={institutes} onChange={handleChangeInstitute} />
      </Form.Item>

      <Form.Item label="Department" name='departmentId'>
        <Select defaultValue="..." options={departments[selectInstitute]} />
      </Form.Item>

      <Form.Item label="Course" name='courseId'>
        <Cascader options={courses} multiple />
      </Form.Item>

      <Form.Item label="Group" name='groupId'>
        <Cascader options={groups} multiple/>
      </Form.Item>

      <Form.Item label="SubGroup" name='subgroupId'>
        <Cascader options={subgroup} multiple />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="submit-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeacherInvitation;
