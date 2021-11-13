import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Button,
  Layout,
  Spin,
  Divider,
  Modal,
  Form,
  Input,
  Select,
  Switch,
} from "antd";
import "./App.css";
const { Header, Content, Footer } = Layout;
const { Option } = Select;

function App() {
  const [apiData, setApiData] = useState(null); // State to hold response from API
  const [isModalVisible, setIsModalVisible] = useState(false); // To decide on opening and cloainf add row form in modal
  const [loading, setLoading] = useState(false);
  //ComponentDidMount
  useEffect(() => {
    //API call to fetch data from gorest.co.in
    const getUserAPI = "https://gorest.co.in/public/v1/users";

    //Since its simple get api call using fetch method instead of using axios
    fetch(getUserAPI, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.data && response.data.length > 0) {
          setApiData(response.data);
        }
      })
      .catch((err) => {
        alert("Error while fetching data from API");
      });
  }, []);

  const showAddForm = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    values.status = values.status ? 'active' : 'inactive';
    values.id= Math.random();
    let currentData = [...apiData];
    currentData.push(values)
    setApiData(currentData);
    setLoading(false);
    setIsModalVisible(false);
    alert("Row added successfully")
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["sm", "xs"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm", "xs"],
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      render: (gender) => (
        <>{gender.charAt(0).toUpperCase() + gender.slice(1)}</>
      ),
      responsive: ["sm", "xs"],
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
      responsive: ["sm", "xs"],
    },
  ];

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <h1 className="header">GameChange Interview</h1>
        </Header>
        <Content style={{ padding: "50px" }}>
          <div className="addBtnContainer">
            <Button
              type="primary"
              size="large"
              className="addBtn"
              onClick={showAddForm}
            >
              Add Row
            </Button>
          </div>
          <Divider />
          {apiData && <Table pagination={{ pageSize: 10}}  columns={columns} dataSource={apiData} />}

          {!apiData && (
            <div className="spinner">
              <Spin />
            </div>
          )}
        </Content>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" className="mt-2" label="Status">
              <Switch name="statusChange" defaultChecked={false} checkedChildren="Active" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Submit
            </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Footer>
          Mock UI ©2021 Created by shanthipalani
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
