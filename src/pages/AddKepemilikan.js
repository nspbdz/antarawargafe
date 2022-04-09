import { useState, useContext, useEffect } from "react";
import { Row, Button, Col } from "react-bootstrap";
import AddKepemilikanForm from "../components/form/AddKepemilikanForm";
import { API } from "../config/api";

function AddKepemilikan(props) {

  const [NewHunian, setNewHunian] = useState(false);
  const [hunian, setHunian] = useState([]);

  const [NewPemilik, setNewPemilik] = useState(false);
  const [pemilik, setPemilik] = useState([]);


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

  const getPemilik = async () => {
    try {
      const response = await API.get("/wargas");
      // Store product data to useState variabel
      setPemilik(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPemilik();
  }, [NewPemilik]);

  const [showSignin, setshowSignin] = useState(false);

  return (
    <div>
      <Row>
        <Col>
        <AddKepemilikanForm dataHunian={hunian} dataPemilik={pemilik} />
        </Col>

      </Row>
    </div>
  );
}

export default AddKepemilikan;
