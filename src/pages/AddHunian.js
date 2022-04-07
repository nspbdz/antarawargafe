import { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import AddHunianForm from "../components/form/AddHunianForm";

function AddHunian(props) {

  const [showSignin, setshowSignin] = useState(false);

  return (
    <div>
      <Row>
        <Col>
        <AddHunianForm />
        </Col>

      </Row>
    </div>
  );
}

export default AddHunian;
