import { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import AddWargaForm from "../components/form/AddWargaForm";

function AddWarga(props) {

  const [showSignin, setshowSignin] = useState(false);

  return (
    <div>
      <Row>
        <Col>
        <AddWargaForm />
        </Col>

      </Row>
    </div>
  );
}

export default AddWarga;
