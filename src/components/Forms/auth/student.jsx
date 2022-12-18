import React, { useState, useEffect, useMemo } from 'react';
import axios from '../../../axios';
import { useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  message
} from 'antd';
import { useTranslation } from 'react-i18next';

const StudentInvitation = () => {
  const [form] = Form.useForm();
  const [institutes, setInstitutes] = useState(null);
  const [departments, setDepartments] = useState({});
  const [selectInstitute, setSelectInstitute] = useState(null);
  const [course, setCourse] = useState({});
  const [group, setGroup] = useState({});
  const [subgroup, setSubGroup] = useState(null);
  const [selectDepartments, setSelectDepartments] = useState(null);
  const [selectCourse, setSelectCourse] = useState(null);
  const [type, setType] = useState("admin");
  const { t } = useTranslation()

  const [messageApi, contextHolder] = message.useMessage();

  
  const success = (message) => {
    messageApi.open({
    type: 'success',
    content: message,
    duration: 10,
  });
};

  useEffect(() => {
    axios.get("/api/institute/get").then((response) => {
      setInstitutes(response.data.map(institute => ({
        value: institute.id,
        label: institute.name
      })))
    }).catch(() => setInstitutes([]));
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
            label: course.number + "-" + course.degree + "-" + course.type
          }))
        })
      }).catch(() => setDepartments([]));
    }
  };

  const handleChangeCourse = (id) => {
    setSelectCourse(id);

    if (!group[id]) {
      axios.get(`/api/course/get/${id}/groups`).then((response) => {
        setGroup({
          ...group,
          [id]: {
            data: response.data,
            parents: response.data.filter(g => !g.parentId).map(group => ({
              value: group.id,
              label: group.number
            }))
          }
        })
      }).catch(() => setGroup([]));
    }
  };

  const handleSubGroup = (id) => {
    setSubGroup(group[selectCourse].data.filter(subGroup => subGroup.parentId === id).map(subGroup => ({
      value: subGroup.id,
      label: subGroup.number
    })));
  }

  const rules = useSelector(function (state) {
    return state.rules;
  });

  const rule = useMemo(() => {
    return rules[type];
  }, [type, rules]);

  const onFinish = async () => {
    const values = await form.validateFields();
    values.birthDate = !values['birthDate'] ? "" : values['birthDate'].format('YYYY-MM-DD');

    axios.post(`student/send-invitation`, values).then((response) => {
      if (response?.status === 200) {
        success(response?.data.message);
        form.resetFields();
      }
    }).catch((error) => {
      
      if (error.response && error.response.data && error.response.data.errors) {
        let fields = ["firstName", "lastName","patronymic","birthDate","email","group","courseId", "departmentId","groupId","instituteId","subgroupId"];

        fields.forEach(field => {;
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
      <Form.Item label={t("FirstName")} name='firstName' >
        <Input />
      </Form.Item>

      <Form.Item label={t("LastName")} name='lastName'>
        <Input />
      </Form.Item>

      <Form.Item label={t("Patronymic")} name='patronymic'>
        <Input />
      </Form.Item>

      <Form.Item label={t("DatePicker")} name='birthDate'>
        <DatePicker />
      </Form.Item>

      <Form.Item label={t("Email")} name='email'>
        <Input />
      </Form.Item>

      <Form.Item label={t("Institute")} name='instituteId'>
        <Select defaultValue="..." options={institutes} onChange={handleChangeInstitute}   />
      </Form.Item>

      <Form.Item label={t("Department")} name='departmentId'>
        <Select defaultValue="..." options={departments[selectInstitute]} onChange={handleChangeDepartments} />
      </Form.Item>

      <Form.Item label={t("Course")} name='courseId'>
        <Select defaultValue="..." options={course[selectDepartments]} onChange={handleChangeCourse} />
      </Form.Item>

      <Form.Item label={t("Group")} name='groupId'>
        <Select defaultValue="..." options={group[selectCourse]?.parents} onChange={handleSubGroup} />
      </Form.Item>

      <Form.Item label={t("SubGroup")} name='subgroupId'>
        <Select defaultValue="..." options={subgroup} />
      </Form.Item>

      <Form.Item>
        {contextHolder}
        <Button type="primary" htmlType="subZmit" className="submit-form-button">
          {t('Submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StudentInvitation;