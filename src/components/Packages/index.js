import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import "./style.css";

const Packages = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const apiUrl = "https://bahar.appssquare.com/api/admin/packages";
  const selectedIDs = [3, 2, 6, 7];
  var token = useSelector((state) => state.register.token);

  useEffect(() => {
    if (localStorage.getItem("register")) {
      let registerStorage = JSON.parse(localStorage.getItem("register"));
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
      .then((data) => {
        console.log(data);
        setDataSource(data.data);
      })
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
            toast.warning("Deleting Package", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
          )
          .then(() => {
            fetch(apiUrl, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json, */*",
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setDataSource(data.data);
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setLoading(false);
              });
          });
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
      dataIndex: "name_en",
    },
    {
      key: "3",
      title: "Arabic Name",
      dataIndex: "name_ar",
    },
    {
      key: "4",
      title: "Actions",
      dataIndex: "id",
      render: (id, data) => {
        return (
          <>
            <Link
              className="link-btn edit"
              to={`/update-package/${id}/${JSON.stringify(data)}`}
            >
              Edit
            </Link>
            {selectedIDs.includes(id) ? (
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
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        ></Table>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
