import { Row, Button, Col } from "react-bootstrap";
import UpdateKeluargaForm from "../components/form/UpdateKeluargaForm";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API } from "../config/api";

function UpdateKeluarga(props) {
  let { id } = useParams();
  const [journey, setJourney] = useState({});
  const [NewJourney, setNewJourney] = useState(false);


  const getJourney = async (id) => {
    try {
      const response = await API.get("/warga/" + id);
      // Store product data to useState variabel
      setJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJourney(id);
  }, [NewJourney]);
  console.log(journey.birthdate);
  console.log(journey)
  return (
    <div>
      <Row>
        <Col>
        <UpdateKeluargaForm data={journey} />
        </Col>

      </Row>
    </div>
  );
}

export default UpdateKeluarga;
