import { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import AddStatusForm from "../components/form/AddStatusForm";

function AddStatus(props) {

  const [showSignin, setshowSignin] = useState(false);

  return (
    <div>
      <Row>
        <Col>
        <AddStatusForm />
        </Col>

      </Row>
    </div>
  );
}

export default AddStatus;
