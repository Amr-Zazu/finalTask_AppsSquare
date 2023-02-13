import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

import "./style.css";

const Ports = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const apiUrl = "https://bahar.appssquare.com/api/admin/ports";

  var token = useSelector((state) => state.register.token);

  const selectedIDs = [
    1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    24,
  ];

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

  const portDelete = (id) => {
    Swal.fire({
      title: `Are You Sure To Delete this Port ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        fetch(`${apiUrl}/${id}`, {
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
            toast.warning("Deleting Port", {
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

  let lastIndex = 0;
  const updateIndex = () => {
    ++lastIndex;
    return lastIndex;
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
      title: "City ID",
      dataIndex: "city_id",
    },
    {
      key: "5",
      title: "Latitude",
      dataIndex: "latitude",
    },
    {
      key: "6",
      title: "Longitude",
      dataIndex: "longitude",
    },

    {
      key: "7",
      title: "Actions",
      dataIndex: "id",
      render: (id, data) => {
        // console.log(lastIndex);
        return (
          <>
            <Link
              className="link-btn edit"
              to={`/update-port/${id}/${JSON.stringify(data)}`}
            >
              Edit
            </Link>

            <Link className="link-btn view" to={`/port-details/${id}`}>
              View Details
            </Link>

            {selectedIDs.includes(id) ? (
              ""
            ) : (
              <Button
                className="action-btn"
                danger
                type="primary"
                onClick={function () {
                  portDelete(id);
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
    <div className="ports-container">
      <div className="ports-project">
        <Link to="/new-port" className="add-new-btn">
          Add New Port
        </Link>
        <h1 className="ports-heading">Ports</h1>
        {console.log(updateIndex())}
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
export default Ports;
