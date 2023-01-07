import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Input, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import axios from "../../../axios";
import { Link, Route } from "react-router-dom";

const AllDepartments = () => {
  const [departments, setDepartments] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, data: {} });

  useEffect(() => {
    axios
      .get("/api/department/get")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch(() => setDepartments([]));
  }, []);

  const removeDepartment = (id) => {
    axios.delete(`/api/department/delete/${id}`).then((response) => {
      let updateDepartment = [...departments].filter(
        (department) => department.id !== id
      );
      setDepartments(updateDepartment);
    });
  };

  return (
    <div className="institutes">
      <Modal
        title={modal?.data?.id ? "Edit Department name" : "Add Department name"}
        open={modal.isOpen}
        onOk={() => {
          if (modal.data.id) {
            axios
              .patch(`/api/department/edit/${modal.data.id}`, modal.data)
              .then((response) => {
                if (response.status === 200) {
                  let newDepartment = departments.map((element) => {
                    if (element.id === response.data.id) {
                      element = response.data;
                    }

                    return element;
                  });

                  setDepartments(newDepartment);

                  setModal({ isOpen: false, data: {} });
                } else {
                  // console.log(response);
                }
              });
          }
        }}
        onCancel={() => setModal({ isOpen: false, data: {} })}
      >
        <Input
          placeholder="Institute name"
          value={modal?.data?.name}
          onChange={(event) => {
            setModal({
              ...modal,
              data: {
                ...modal.data,
                name: event.target.value,
              },
            });
          }}
        />
      </Modal>

      <Route exact path="/dashboard/departments">
        {!departments ? (
          <></>
        ) : (
          <Table
            dataSource={departments}
            rowKey="id"
            columns={[
              {
                title: "ID",
                dataIndex: "id",
                key: "id",
              },
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Actions",
                dataIndex: "actions",
                width: 50,
                render: (_, row) => (
                  <div style={{ display: "flex", gap: 10 }}>
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => removeDepartment(row.id)}
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                    <EditOutlined
                      onClick={() => setModal({ isOpen: true, data: row })}
                    />
                  </div>
                ),
              },
            ]}
          />
        )}
      </Route>
    </div>
  );
};

export default AllDepartments;
