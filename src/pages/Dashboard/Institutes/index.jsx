import React, { useEffect, useState, Suspense, lazy } from "react";
import { Table, Popconfirm, Input, Modal, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "../../../axios";
import { Link, Route } from "react-router-dom";
import Departments from './Departments';

const Institutes = () => {
  const [institutes, setInstitutes] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, data: {} });

  useEffect(() => {
    axios
      .get("/api/institute/get")
      .then((response) => {
        setInstitutes(response.data);
      })
      .catch(() => setInstitutes([]));
  }, []);

  const removeInstitute = (id) => {
    axios.delete(`/api/institute/delete/${id}`).then((response) => {
      let updateInstitutes = [...institutes].filter(
        (institute) => institute.id !== id
      );
      setInstitutes(updateInstitutes);
    });
  };

  return (
    <div className="institutes">
      <Modal
        title={modal?.data?.id ? "Edit Institute name" : "Add Institute name"}
        open={modal.isOpen}
        onOk={() => {
          if (modal.data.id) {
            axios
              .patch(`/api/institute/edit/${modal.data.id}`, modal.data)
              .then((response) => {
                if (response.status === 200) {
                  let newInstitutes = institutes.map((element) => {
                    if (element.id === response.data.id) {
                      element = response.data;
                    }

                    return element;
                  });

                  setInstitutes(newInstitutes);

                  setModal({ isOpen: false, data: {} });
                }
              });
          } else {
            axios.post(`/api/institute/create`, modal.data).then((response) => {
              if (response.status === 201) {
                setInstitutes(institutes.concat(response.data));

                setModal({ isOpen: false, data: {} });
              } else {
                console.log(response);
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

      <Route exact path="/dashboard/institutes">
        <Button
          type="primary"
          onClick={() => setModal({ isOpen: true, data: {} })}
        >
          Add Institute
        </Button>
        {!institutes ? (
          <></>
        ) : (
          <Table
            dataSource={institutes}
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
                render: (name, row) => (
                  <Link to={`/dashboard/institutes/${row.id}`}>{name}</Link>
                ),
              },
              {
                title: "Actions",
                dataIndex: "actions",
                width: 50,
                render: (_, row) => (
                  <div style={{ display: "flex", gap: 10 }}>
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => removeInstitute(row.id)}
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                    <EditOutlined
                      onClick={() => setModal({ isOpen: true, data: row })}
                    />
                  </div>
                ),
              },
              {
                title: "Show",
                dataIndex: "show",
                width: 50,
                render: (show, row) => (
                  <Link to={`/dashboard/institutes/${row.id}`}>
                    {<Button type="primary">Show Departments</Button>}
                  </Link>
                ),
              },
            ]}
          />
        )}
      </Route>
      <Route path="/dashboard/institutes/:instituteId">
        <Suspense>
          <Departments />
        </Suspense>
      </Route>
    </div>
  );
};

export default Institutes;
