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
// import moment from 'react-moment'; 
import moment from "moment";

var striptags = require('striptags');
function UpdateStatusForm({ match }) {
  // const DetailJourney = ({ match }) => {
  let history = useHistory();
  let { id } = useParams();
  const [NewHunian, setNewHunian] = useState(false);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState({});
  const [form, setForm] = useState({

  }); 
  
  //Store product data
  const getStatus = async (id) => {
    try {
      const response = await API.get(`/status/${id}`);
      // Store product data to useState variabel
      console.log(response)
      setStatus(response.data.data);
      if (response.status == 200) {
        console.log("suksess")
        setForm({
          nama: response.data.data.nama,
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  useEffect(() => {
    getStatus(id)
    console.log(setStatus)
  }, [NewHunian]);
 
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
      const data = {
      nama: form.nama,
      };
      
      const response = await API.put(`/updatestatus/${id}`, data,);
      console.log(response);
      // setshow(true)
      history.push("/status");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(form.tanggallahir);
  
  
  return (
    <Container>
      <Row>
        <Col>

          <>
        
          <Form className="formStyle"  style={{marginTop:"40px"}} onSubmit={handleOnSubmit}> 
              <Form.Group>
                <Form.Control id="formHunian"
                  name="nama"
                  type="text"
                  required
                  placeholder="nama"
                  value={form.nama}
                  onChange={handleChange}
                />
              </Form.Group>
        
            
              <div id="btnAddWrap">
                <Button id="btnAdd" type="submit"  >
                  Update Status
              </Button>
              </div>
            </Form>
          </>

        </Col>
      </Row>
    </Container>
  )
}

export default UpdateStatusForm;
