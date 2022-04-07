import { Row, Button, Col } from "react-bootstrap";
import UpdateStatusForm from "../components/form/UpdateStatusForm";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API } from "../config/api";

function UpdateStatus(props) {
  let { id } = useParams();
  const [status, setStatus] = useState({});
  const [NewStatus, setNewStatus] = useState(false);


  const getStatus = async (id) => {
    try {
      const response = await API.get("/status/" + id);
      // Store product data to useState variabel
      setStatus(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatus(id);
  }, [NewStatus]);

  return (
    <div>
      <Row>
        <Col>
        <UpdateStatusForm data={status} />
        </Col>

      </Row>
    </div>
  );
}

export default UpdateStatus;
