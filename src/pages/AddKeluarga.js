import { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import AddKeluargaForm from "../components/form/AddKeluargaForm";

function AddKeluarga(props) {

  const [showSignin, setshowSignin] = useState(false);

  return (
    <div>
      <Row>
        <Col>
        <AddKeluargaForm />
        </Col>

      </Row>
    </div>
  );
}

export default AddKeluarga;
