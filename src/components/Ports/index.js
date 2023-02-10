import { useState, useEffect } from "react";
import { Button, Table } from "antd";
import RefAutoComplete from "antd/es/auto-complete";

import "./style.css";
import { useSelector } from "react-redux";
import ProjectMenu from "../Menu";

const Ports = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const apiUrl = "https://bahar.appssquare.com/api/admin/ports";

  var token = useSelector((state) => state.register.token);

  // "https://jsonplaceholder.typicode.com/todos"

  useEffect(() => {
    if (localStorage.getItem("register")) {
      let registerStorage = JSON.parse(localStorage.getItem("register"));
      console.log(registerStorage.login);
      console.log(registerStorage.token);
      if (registerStorage.login && registerStorage.token !== "") {
        token = registerStorage.token;
      }
    }
    setLoading(true);
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setDataSource(data.data))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "English Name",
      // dataIndex: "userId",
      dataIndex: "name_en",
      // sorter: (record1, record2) => {
      //   return record1.userId > record2.userId;
      // },
    },
    {
      key: "3",
      title: "Arabic Name",
      // dataIndex: "completed",
      dataIndex: "name_ar",
      // render: (completed) => {
      //   return <p>{completed ? "Complete" : "In Progress"}</p>;
      // },
      // filters: [
      //   { text: "Complete", value: true },
      //   { text: "In Progress", value: false },
      // ],
      // onFilter: (value, record) => {
      //   return record.completed === value;
      // },
    },
    {
      key: "4",
      title: "Actions",
      render: () => {
        return (
          <>
            <Button className="action-btn" type="primary">
              Edit
            </Button>
            <Button className="action-btn" danger type="primary">
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="ports-container">
      <div className="ports-project">
        <h1 className="ports-heading">Ports</h1>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            style: {
              margin: "10px auto",
            },
            className: "pagi",
            current: page,
            pageSize: pageSize,
            // total: 200,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        ></Table>
      </div>
    </div>
  );
};
export default Ports;
