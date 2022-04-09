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
function UpdateKepemilikanForm({ match }) {
  // const DetailJourney = ({ match }) => {
  let history = useHistory();
  let { id } = useParams();
  const [NewHunian, setNewHunian] = useState(false);
  const [message, setMessage] = useState(null);
  const [hunian, setHunian] = useState({});
  const [form, setForm] = useState({

  }); 
  
  //Store product data
  const getHunian = async (id) => {
    try {
      const response = await API.get(`/hunian/${id}`);
      // Store product data to useState variabel
      console.log(response)
      setHunian(response.data.data);
      if (response.status == 200) {
        console.log("suksess")
        setForm({
          nomerblok: response.data.data.nomerblok,
          nomerrumah: response.data.data.nomerrumah,
          tipebangunan: response.data.data.tipebangunan,
          luastanah: response.data.data.luastanah,
          luasbangunan: response.data.data.luasbangunan,
          wargalingkungan: response.data.data.wargalingkungan,
          
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  useEffect(() => {
    getHunian(id)
    console.log(setHunian)
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
      nomerblok: form.nomerblok,
      nomerrumah: form.nomerrumah,
      tipebangunan: form.tipebangunan,
      luastanah: form.luastanah,
      luasbangunan: form.luasbangunan,
      };
      
      const response = await API.put(`/updatehunian/${id}`, data,);
      console.log(response);
      // setshow(true)
      history.push("/hunian");
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
      setHunian(e.target.value);
      console.log(e.target.value);
      
    }
  return (
    <Container>
      <Row>
        <Col>

          <>
        
          <Form className="formStyle"  style={{marginTop:"40px"}} onSubmit={handleOnSubmit}> 
              <Form.Group>
                <Form.Control id="formHunian"
                  name="nomerblok"
                  type="text"
                  required
                  placeholder="nomerblok"
                  value={form.nomerblok}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control id="formHunian"
                  name="nomerrumah"
                  type="text"
                  required
                  placeholder="nomerrumah"
                  value={form.nomerrumah}
                  onChange={handleChange}
                />
                
              </Form.Group>
              <Form.Group>
                <Form.Control id="formHunian"
                  name="tipebangunan"
                  type="text"
                  required
                  placeholder="tipebangunan"
                  value={form.tipebangunan}
                  onChange={handleChange}
                />
                
              </Form.Group>
            
              <Form.Group>
                <Form.Control id="formHunian"
                  name="luastanah"
                  type="text"
                  required
                  placeholder="luastanah"
                  value={form.luastanah}
                  onChange={handleChange}
                />
                
              </Form.Group>
            
              <Form.Group>
                <Form.Control id="formHunian"
                  name="luasbangunan"
                  type="text"
                  required
                  placeholder="luasbangunan"
                  value={form.luasbangunan}
                  onChange={handleChange}
                />
                
              </Form.Group>
            
              <div id="btnAddWrap">
                <Button id="btnAdd" type="submit"  >
                  Update Hunian
              </Button>
              </div>
            </Form>
          </>

        </Col>
      </Row>
    </Container>
  )
}

export default UpdateKepemilikanForm;
