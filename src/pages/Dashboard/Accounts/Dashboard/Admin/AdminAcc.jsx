import { React, useState, useEffect } from "react";

import axios from "../../../../../axios";

import "../../style.scss";

const AdminAccount = () => {
  const [user, setUser] = useState();
  const [department, setDepartment] = useState();
  const [institute, setInstitute] = useState();

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        console.log(response);

        setUser(response.data);
        axios
          .get(`/api/department/get/${response?.data?.departmentId}`)
          .then((response) => {
            setDepartment(response.data);
            axios
              .get(`/api/institute/get/${response?.data?.instituteId}`)
              .then((response) => {
                // console.log(response.data.name);
                setInstitute(response.data);
              })
              .catch(() => setInstitute([]));
          })
          .catch(() => setDepartment([]));
      })
      .catch(() => setUser([]));
  }, []);

  return (
    <>
      <div style={{ fontWeight: "bold" }}>
        {user?.firstName + "   " + user?.lastName + " " + user?.patronymic}
      </div>

      <div style={{ fontWeight: "bold" }} label="Position">
        {user?.position}
      </div>

      <div label="Institute">{institute?.name}</div>
      <div label="Department ">{department?.name}</div>

      <div label="Mail:">{user?.email}</div>
    </>
  );
};

export default AdminAccount;
