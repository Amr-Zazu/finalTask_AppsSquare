import { useState, useEffect } from "react";
import { Button, Table } from "antd";
import RefAutoComplete from "antd/es/auto-complete";

import "./style.css";
import { useSelector } from "react-redux";
import ProjectMenu from "../Menu";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";
import UpdatePackage from "../UpdatePackage";

const Packages = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  const apiUrl = "https://bahar.appssquare.com/api/admin/packages";

  // const selectedIDs = [3, 2, 6, 7];
  // const [select, setSelect] = useState(false);

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

  const packageDelete = (id) => {
    Swal.fire({
      title: `Are You Sure To Delete this Package ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        fetch(`https://bahar.appssquare.com/api/admin/packages/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json, */*",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .then(setLoading(true))
          .then(
            toast.error("Deleting Package", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
          )
          .then(
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
              })
          );
      }
    });
  };

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
      dataIndex: "id",
      render: (id, data) => {
        return (
          <>
            <Link
              to={`/update-package/${id}/${JSON.stringify(data)}`}
              className="action-btn"
              type="primary"
              // onClick={() => {
              //   console.log(data);
              // }}
              // onClick={function () {
              //   packageUpdate(id);
              // }}
            >
              Update
            </Link>
            {id === 2 || id === 3 || id === 6 || id === 7 ? (
              ""
            ) : (
              <Button
                className="action-btn"
                danger
                type="primary"
                onClick={function () {
                  packageDelete(id);
                }}
              >
                Delete
              </Button>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="packages-container">
      <div className="packages-project">
        <Link to="/new-package" className="add-new-btn">
          Add New Package
        </Link>
        <h1 className="packages-heading">Packages</h1>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
export default Packages;
