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
function UpdateWargaForm({ match }) {
  // const DetailJourney = ({ match }) => {
  let history = useHistory();
  let { id } = useParams();
  const [lingkungan, setLingkungan] = useState(null);

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
  const [warga, setWarga] = useState({});

  const [form, setForm] = useState({
    // nik: warga.nik,
    // nama: warga.nama,
    // tempatlahir: warga.tempatlahir,
    // pekerjaan: warga.pekerjaan,
    // tanggallahir: warga.tanggallahir,
    // wargalingkungan: warga.wargalingkungan,
    
  }); 
  
  //Store product data
  const getWarga = async (id) => {
    try {
      const response = await API.get(`/warga/${id}`);
      // Store product data to useState variabel
      console.log(response)
      setWarga(response.data.data);
      if (response.status == 200) {
        console.log("suksess")
        setForm({
          nik: response.data.data.nik,
          nama: response.data.data.nama,
          tempatlahir: response.data.data.tempatlahir,
          pekerjaan: response.data.data.pekerjaan,
          tanggallahir: response.data.data.tanggallahir,
          iswarga_lingkungan: response.data.data.iswarga_lingkungan,
          
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  const getIsWargaLingkungan = async (id) => {
    try {
      const response = await API.get(`/warga/${id}`);
      // Store product data to useState variabel
      console.log(response)
      // setWarga(response.data.data);
      if (response.status == 200) {
        console.log("suksess")
        setLingkungan(response.data.data.iswarga_lingkungan);
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getWarga(id)
    console.log(setWarga)
  }, [NewJourney]);
  useEffect(() => {
    getIsWargaLingkungan(id)
    console.log(lingkungan)
  }, [NewJourney]);
  // console.log(form)
  // console.log(form.nik)
  
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
  console.log(lingkungan)

  const handleOnSubmit = async (e) => {
    console.log("tersubmit")
    try {
      e.preventDefault();
    
      const data = {
        nik: form.nik,
        nama: form.nama,
      tempatlahir: form.tempatlahir,
      tanggallahir: form.tanggallahir,
      pekerjaan: form.pekerjaan,
       iswargaLingkungan: lingkungan,
      };
      
      const response = await API.put(`/updatewarga/${id}`, data,);
      console.log(response);
      // setshow(true)
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(form.tanggallahir);
  
  console.log(form.tanggallahir);
  // const today =  form.tanggallahir
  let today  = new Date(form.tanggallahir);
  const asd=moment(today).format("YYYY-DD-MM")
  console.log(asd);

    const [gender, setGender] = useState("Female");
  
   
    const onSiteChanged = (e) => {
      setLingkungan(e.target.value);
      console.log(e.target.value);
      
    }
  return (
    <Container>
      <Row>
        <Col>

          <>
        
          <Form className="formStyle"  style={{marginTop:"40px"}} onSubmit={handleOnSubmit}> 
        
              <Form.Group>
                <Form.Control id="formProducts"
                  name="nama"
                  type="text"
                  required
                  placeholder="nama"
                  value={form.nama}
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
              <Form.Group>
                <Form.Control id="formProducts"
                  name="pekerjaan"
                  type="text"
                  required
                  placeholder="pekerjaan"
                  value={form.pekerjaan}
                  onChange={handleChange}
                />
                
              </Form.Group>
              <Form.Group className="mb-3" controlId="tanggallahir">
              <Form.Control
              type="date"
                placeholder="tanggallahir"
                name="tanggallahir" 
                //  value={tanggal} 
                value={asd}
            
                onChange={handleChange} />
                </Form.Group>
                <div onChange={onSiteChanged}>
                <input type="radio" value="1" name="warga_lingkungan" checked={lingkungan == 1} />    &nbsp; warga Lingkungan &nbsp;

                <input type="radio" value="2" name="warga_lingkungan" checked={lingkungan == 2}/>  &nbsp; warga Luar Lingkungan
              </div>

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
