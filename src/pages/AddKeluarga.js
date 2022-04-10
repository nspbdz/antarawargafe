import { Row, Button, Col } from "react-bootstrap";
import AddKeluargaForm from "../components/form/AddKeluargaForm";
import { API } from "../config/api";
import { useState, useContext, useEffect } from "react";

function AddKeluarga(props) {

  const [NewHunian, setNewHunian] = useState(false);
  const [hunian, setHunian] = useState([]);

  const [NewWarga, setNewWarga] = useState(false);
  const [warga, setWarga] = useState([]);

  const [NewStatus, setNewStatus] = useState(false);
  const [status, setStatus] = useState([]);

  const getHunian = async () => {
    try {
      const response = await API.get("/hunians");
      // Store product data to useState variabel
      setHunian(response.data.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHunian();
  }, [NewHunian]);

  const getWarga = async () => {
    try {
      const response = await API.get("/wargas");
      // Store product data to useState variabel
      setWarga(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWarga();
  }, [NewWarga]);

  const getStatus = async () => {
    try {
      const response = await API.get("/allstatus");
      // Store product data to useState variabel
      setStatus(response.data.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatus();
  }, [NewStatus]);

  const [showSignin, setshowSignin] = useState(false);

  return (
    <div>
      <Row>
        <Col>
        <AddKeluargaForm dataHunian={hunian} dataWarga={warga} dataStatus={status} />
        </Col>

      </Row>
    </div>
  );
}

export default AddKeluarga;
