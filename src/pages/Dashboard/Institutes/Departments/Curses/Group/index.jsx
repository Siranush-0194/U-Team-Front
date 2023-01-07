import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  Popconfirm,
  Input,
  Modal,
  Button,
  Form,
  Select,
  Checkbox,
} from "antd";
import { Radio, Tabs } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import axios from "../../../../../../axios";
import { Route } from "react-router-dom";
import { render } from "@testing-library/react";

const Groups = () => {
  const { courseId, groupId, parentId } = useParams();
  const [modal, setModal] = useState(false);
  const [key, setKey] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [type, setType] = useState("groups");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const getTableData = useCallback(() => {
    axios
      .get(`/api/course/get/${courseId}/${type}`)
      .then((response) => {
        let groups = [];
        response.data.forEach((element) => {
          if (!element.parentId) {
            groups.push({
              ...element,
              children: [],
            });
          }

          if (element.parentId) {
            groups.forEach((g) => {
              if (g.id === element.parentId) {
                g.children.push(element);
              }
            });
          }
        });
        setTableData(groups);
      })
      .catch(() => setTableData([]));
  }, [type]);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const Columns = useMemo(() => {
    const columns = {
      groups: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Number",
          dataIndex: "number",
          key: "number",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          width: 50,
          render: (_, row) => (
            <div style={{ display: "flex", gap: 10 }}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => removeGroup(row.id, row.parentId)}
              >
                <DeleteOutlined />
              </Popconfirm>
              <EditOutlined
                onClick={() => {
                  setModal(true);
                  form.setFieldsValue(row);
                }}
              />
            </div>
          ),
        },
      ],
      teachers: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "First Name",
          dataIndex: "firstName",
          key: "name",
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          key: "lastName",
        },
        {
          title: "Patronymic",
          dataIndex: "patronymic",
          key: "patronymic",
        },
        {
          title: "Position",
          dataIndex: "position",
          key: "position",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          width: 50,
          render: (_, row) => (
            <div style={{ display: "flex", gap: 10 }}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => removeGroup(row.id, row.parentId)}
              >
                <DeleteOutlined />
              </Popconfirm>
              <EditOutlined
                onClick={() => {
                  setModal(true);
                  form.setFieldsValue(row);
                }}
              />
            </div>
          ),
        },
      ],
      students: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "First Name",
          dataIndex: "firstName",
          key: "name",
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          key: "lastName",
        },
        {
          title: "Patronymic",
          dataIndex: "patronymic",
          key: "patronymic",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          width: 50,
          render: (_, row) => (
            <div style={{ display: "flex", gap: 10 }}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => removeGroup(row.id, row.parentId)}
              >
                <DeleteOutlined />
              </Popconfirm>
              <EditOutlined
                onClick={() => {
                  setModal(true);
                  form.setFieldsValue(row);
                }}
              />
            </div>
          ),
        },
      ],
    };

    return columns[type];
  }, [type]);

  const removeGroup = useCallback(
    (id, parentId) => {
      axios.delete(`/api/group/delete/${id}`).then((response) => {
        if (parentId) {
          setTableData((prev) => {
            prev.map((element) => {
              if (element.id === parentId) {
                element.children = element.children.filter(
                  (item) => item.id !== id
                );
              }
            });
            return prev;
          });
        } else {
          setTableData((prev) => prev.filter((item) => item.id !== id));
        }

        setKey(key + 1);
      });
    },
    [type]
  );
  useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <div className="group">
      <Modal
        title={false ? "Edit group number" : "Add group number"}
        open={modal}
        onOk={() => {
          if (form.getFieldValue("id")) {
            axios
              .patch(
                `/api/group/edit/${form.getFieldValue("id")}`,

                form.getFieldsValue(),
                {
                  parent_id: parentId,
                }
              )
              .then((response) => {
                if (response.status === 200) {
                  let newGroup = tableData.map((element) => {
                    if (element.id === response.data.id) {
                      element = {
                        ...response.data,
                        children: element.children,
                      };
                    }
                    // }else{
                    //   (element.children.id === response.data.id)
                    // }
                    console.log(element.children);
                    return element;
                  });
                  setTableData(newGroup);
                  setTableData(getTableData);
                  // setModal({ isOpen: false, data: {} })
                  setModal(false);
                  let newSubGroup = tableData.map((element) => {
                    if (element.id === response.data.id) {
                      element = {
                        ...response.data,
                        children: element.children,
                      };
                    }
                    // }else{
                    //   (element.children.id === response.data.id)
                    // }
                    // console.log(element.children);
                    return element;
                  });
                }

                setKey(key + 1);
              });
          } else {
            axios
              .post(`/api/group/create`, {
                ...modal.data,
                ...form.getFieldsValue(),
                parent_id: form.getFieldValue("parentId"),
                course_id: courseId,
                group_id: groupId,
              })
              .then((response) => {
                if (response.status === 201) {
                  let asParent = true;
                  console.log(tableData);
                  tableData.forEach((element) => {
                    if (element.id === response.data.parentId) {
                      element.children.push(response.data);

                      asParent = false;
                    }
                  });

                  if (asParent) {
                    tableData.push({
                      ...response.data,
                      children: [],
                    });
                  }
                  setTableData(tableData);
                  form.resetFields();
                  setModal(false);

                  setKey(key + 1);
                }
              });
          }
        }}
        onCancel={() => {
          form.resetFields();
          setModal(false);
        }}
      >
        <Form form={form}>
          <Form.Item label="Number" name="number">
            <Input placeholder="Group number" />
          </Form.Item>

          <Form.Item label="ParentGroup" name="parentId">
            <Select
              placeholder="group"
              options={tableData?.map((data) => ({
                label: data.number,
                value: data.id,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Route
        exact
        path="/dashboard/institutes/:institutesId/:departmentID/:courseID"
      >
        <div style={{ display: "flex", gap: 10 }}>
          {/* <Radio.Button value="top">Groups</Radio.Button> */}

          <Button
            type="primary"
            onClick={() => {
              setModal(true);
              form.resetFields();
            }}
          >
            Add Group
          </Button>
          <Button type="primary" onClick={() => setType("groups")}>
            Groups
          </Button>
          <Button type="primary" onClick={() => setType("teachers")}>
            Teachers
          </Button>
          <Button type="primary" onClick={() => setType("students")}>
            Students
          </Button>
        </div>
        {!tableData ? (
          <></>
        ) : (
          <Table
            rowKey="id"
            dataSource={tableData}
            columns={Columns}
            loading={loading}
            key={key}
          />
        )}
      </Route>
    </div>
  );
};

export default Groups;
