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

function AddHunianForm() {
  let history = useHistory();
  const [message, setMessage] = useState(null);
  const [wargaLingkungan, setwargaLingkungan] = useState(null);

  const [valueEditor, setValueEditor] = useState(EditorState.createEmpty());
  const [dataUpdate, setDataUpdate] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    nomerblok: "",
    nomerrumah: "",
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
      formData.set("nomerblok", form.nomerblok);
      formData.set("nomerrumah", form.nomerrumah);
      formData.set("tipebangunan", form.tipebangunan);
      formData.set("luastanah", form.luastanah);
      formData.set("luasbangunan", form.luasbangunan);
      formData.set("wargalingkungan", wargaLingkungan);
      // formData.set("description", JSON.stringify(convertToRaw(valueEditor.getCurrentContent())));
      console.log(formData);

      const response = await API.post("/createhunian", formData, config);
      console.log(response);
      // setshow(true)
      history.push("/hunian");
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
         <h4 className="titleForm"> Hunian</h4>
         {/* // data_id:
      // nomerblok:ab
      // nomerrumah:90
      // tipebangunan :90/10
      // luastanah : 100m
      // luasbangunan : 120m */}
          <Form.Group className="mb-3" controlId="nomerblok">
           <Form.Control type="text" placeholder="nomerblok" name="nomerblok" value={dataUpdate.nomerblok} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nomerrumah">
            <Form.Control type="text" placeholder="nomerrumah"  name="nomerrumah" value={dataUpdate.nomerrumah} onChange={handleChange} />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="tipebangunan">
            <Form.Control type="text" placeholder="tipebangunan" name="tipebangunan" value={dataUpdate.tipebangunan} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="luastanah">
            <Form.Control type="text" placeholder="luastanah" name="luastanah" value={dataUpdate.luastanah} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="luasbangunan">
            <Form.Control type="text" placeholder="luasbangunan" name="luasbangunan" value={dataUpdate.luasbangunan} onChange={handleChange} />
          </Form.Group>
       <br/>
              <div id="btnAddWrap">
                <Button id="btnAdd" type="submit"  >
                  Add Hunian
              </Button>
              </div>
            </Form>

          </>

        </Col>
      </Row>
    </Container>
  )
}

export default AddHunianForm;
