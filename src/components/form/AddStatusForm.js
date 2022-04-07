import { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Alert, InputGroup, FormControl } from "react-bootstrap";
import { Modal } from "react-bootstrap";
// import kopiadd from "../../assets/images/coffee/kopiadd.png"
import "../../styles/customStyle.css";
import draftToHtml from 'draftjs-to-html';

import { useHistory, Router, Link } from "react-router-dom";
// import ModalProduct from "../modal/ModalProduct"
import { API } from "../../config/api";
import { CgAttachment } from "react-icons/cg";
import { EditorState, Modifier, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function AddStatusForm() {
  let history = useHistory();
  const [message, setMessage] = useState(null);
  const [wargaLingkungan, setwargaLingkungan] = useState(null);

  const [valueEditor, setValueEditor] = useState(EditorState.createEmpty());
  const [dataUpdate, setDataUpdate] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    nama: null,
  }); //Store product data

  const onSiteChanged = (e) => {
    setwargaLingkungan(e.target.value);
  console.log(e.target.value);
  
  }
  console.log(wargaLingkungan);


  const handleChange = (e) => {
    const a = e.target.value
    console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
    if (form.image == null) {
      const alert = (
        <Alert variant="success" className="py-1">
          Attachment Harus Di isi
        </Alert>
      );
      setMessage(alert);
    } else {
      setMessage("")
    }

  }

  // console.log(form.image)
  const handleOnSubmit = async (e) => {
    console.log("tersubmit")
    console.log(form);

    try {
      e.preventDefault();
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      // Store data with FormData as object
      const formData = new FormData();
      formData.set("nama", form.nama);
     
      // formData.set("description", JSON.stringify(convertToRaw(valueEditor.getCurrentContent())));
      console.log(formData);

      const response = await API.post("/createstatus", formData, config);
      console.log(response);
      // setshow(true)
      history.push("/status");
    } catch (error) {
      console.log(error);
    }
  };
 
  console.log(valueEditor)
  return (
    //  <p>add journey</p>
    <Container>
      <Row>
        <Col>
          <>
          <Form className="formStyle"  style={{marginTop:"40px"}} onSubmit={handleOnSubmit}> 
         <h4 className="titleForm"> Status</h4>
          <Form.Group className="mb-3" controlId="nama">
           <Form.Control type="text" placeholder="nama" name="nama" value={dataUpdate.nama} onChange={handleChange} />
          </Form.Group>
       <br/>
              <div id="btnAddWrap">
                <Button id="btnAdd" type="submit"  >
                  Add Status
              </Button>
              </div>
            </Form>

          </>

        </Col>
      </Row>
    </Container>
  )
}

export default AddStatusForm;
