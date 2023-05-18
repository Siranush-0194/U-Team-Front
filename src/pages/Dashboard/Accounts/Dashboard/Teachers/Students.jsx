import { React } from "react";
import { useEffect, useState } from "react";

import { Avatar, List, Card, Select } from "antd";
import { useSelector } from "react-redux";

import axios from "../../../../../axios";

import "../../style.scss";
import { UserOutlined } from "@ant-design/icons";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [students, setStudents] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    axios
      .get(`/api/teacher/courses`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch(() => setCourses([]));
  }, []);

  const handleChangeCourse = (id) => {
    setSelectedCourseId(id);

    const selectedCourse = courses.find((course) => course.id === id);

    if (selectedCourse && !selectedCourse.data) {
      axios
        .get(`/api/course/get/${id}/students`)
        .then((response) => {
          const updatedCourses = courses.map((course) => {
            if (course.id === id) {
              return {
                ...course,
                data: response.data,
                parents: response.data
                  .filter((group) => !group.parentId)
                  .map((group) => ({
                    value: group.id,
                    label: group.number,
                  })),
              };
            }
            return course;
          });
          setCourses(updatedCourses);
          setStudents(response.data);
        })
        .catch(() => {
          const updatedCourses = courses.map((course) => {
            if (course.id === id) {
              return {
                ...course,
                data: [],
                parents: [],
              };
            }
            return course;
          });
          setCourses(updatedCourses);
          setStudents([]);
        });
    } else if (selectedCourse && selectedCourse.data) {
      setStudents(selectedCourse.data);
    } else {
      setStudents([]);
    }
  };

  return (
    <Card className="list">
      <Select  
        dropdownMatchSelectWidth={false}

        placeholder="Courses"
        value={selectedCourseId}
        style={{ width: "150px" }}
        onChange={handleChangeCourse}
      >
        {courses.map((course) => (
          <Option key={course.id} value={course.id}>
            {course.number + " " + course.degree + " " + course.type}
          </Option>
        ))}
      </Select>
      <List
        dataSource={students}
        renderItem={(student) => (
          <List.Item key={student.id}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined/>} size={50} src={student?.thumbnail} />}
              title={student.firstName}
              description={student.email}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Courses;
