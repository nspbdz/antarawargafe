import { Row, Button, Col } from "react-bootstrap";
import UpdateKepemilikanForm from "../components/form/UpdateKepemilikanForm";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API } from "../config/api";

function UpdateKepemilikan(props) {
  let { id } = useParams();
  const [journey, setJourney] = useState({});
  const [NewJourney, setNewJourney] = useState(false);


  const getJourney = async (id) => {
    try {
      const response = await API.get("/hunian/" + id);
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
        <UpdateKepemilikanForm data={journey} />
        </Col>

      </Row>
    </div>
  );
}

export default UpdateKepemilikan;
