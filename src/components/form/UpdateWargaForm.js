import { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Alert, InputGroup, FormControl } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import "../../styles/customStyle.css";
import draftToHtml from 'draftjs-to-html';
import { useHistory, Router, Link } from "react-router-dom";
import { API } from "../../config/api";
import { CgAttachment } from "react-icons/cg";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, convertFromRaw,  } from 'draft-js';
import { useParams, useLocation } from "react-router-dom";


var striptags = require('striptags');
function UpdateWargaForm({ match }) {
  // const DetailJourney = ({ match }) => {
  let history = useHistory();
  let { id } = useParams();

  const [NewJourney, setNewJourney] = useState(false);
  const [loadNewJourney, setLoadNewJourney] = useState(false);


  const [confirm, setConfirm] = useState(null);
  const [dataUpdate, setDataUpdate] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [preview, setPreview] = useState([])
  const [formData, setFormData] = useState([])
  const [message, setMessage] = useState(null);
  const [journey, setJourney] = useState({});
  const [form, setForm] = useState({
    nik: journey.nik,
    name: journey.name,
    tempatlahir: journey.placeofbirth,
    pekerjaan: journey.pekerjaan,
    tanggallahir: journey.birthdate,
    wargalingkungan: journey.wargalingkungan,
    
    
  }); 
  
  //Store product data
  const getJourney = async (id) => {
    try {
      const response = await API.get(`/warga/${id}`);
      // Store product data to useState variabel
      console.log(response)
      setJourney(response.data.data);
      if (response.status == 200) {
        console.log("suksess")
        setForm({
          nik: response.data.data.nik,
          name: response.data.data.name,
          tempatlahir: response.data.data.placeofbirth,
          pekerjaan: response.data.data.pekerjaan,
          tanggallahir: response.data.data.birthdate,
          wargalingkungan: response.data.data.wargalingkungan,
          
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getJourney(id)
    console.log(journey)
  }, [NewJourney]);
  console.log(form)
  console.log(form.nik)
  
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
  const handleOnSubmit = async (e) => {
    console.log("tersubmit")
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
      formData.append("image", form.image, form.image.name);
      formData.set("title", form.title);
      console.log(formData);
      
      const response = await API.patch(`/journey/${id}`, formData, config);
      console.log(response);
      // setshow(true)
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(form.birthdate);
  
  return (
    <Container>
      <Row>
        <Col>

          <>
            <Form
              className="formStyle" style={{ marginTop: "40px" }}
              onSubmit={handleOnSubmit}
              >
              <Form.Group>
                <Form.Control id="formProducts"
                  name="nik"
                  type="text"
                  required
                  placeholder="nik"
                  value={form.nik}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control id="formProducts"
                  name="name"
                  type="text"
                  required
                  placeholder="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control id="formProducts"
                  name="tempatlahir"
                  type="text"
                  required
                  placeholder="tempatlahir"
                  value={form.tempatlahir}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="tanggallahir">
            <Form.Control type="date" placeholder="tanggallahir" name="tanggallahir" value={form.tanggallahir} onChange={handleChange} />
          </Form.Group>
              <div id="btnAddWrap">
                <Button id="btnAdd" type="submit"  >
                  Update Journey
              </Button>
              </div>
            </Form>
          </>

        </Col>
      </Row>
    </Container>
  )
}

export default UpdateWargaForm;
