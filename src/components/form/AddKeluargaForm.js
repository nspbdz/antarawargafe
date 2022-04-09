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
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function AddKeluargaForm(props) {
  const { dataHunian,dataWarga } = props

  let history = useHistory();
  const [message, setMessage] = useState(null);
  const [wargaLingkungan, setwargaLingkungan] = useState(null);
  const [hunian, setHunian] = useState([])
  const [kepemilikan, setKepemilikan] = useState([])
  const [fruit, setFruit] = useState();

  const [valueEditor, setValueEditor] = useState(EditorState.createEmpty());
  const [dataUpdate, setDataUpdate] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
  }); //Store product data

  const onSiteChanged = (e) => {
    setwargaLingkungan(e.target.value);
  console.log(e.target.value);
  
  }
  console.log(wargaLingkungan);
  
  var hunianData = [];
  dataHunian.map((item,i) => 
  {
    hunianData.push({
      id: item.id,
      name:" Blok " + item.nomerblok + " No."  + item.nomerrumah ,
  });
  });
  console.log(hunianData);

  var kepemilikanData = [];
  dataWarga.map((item,i) => 
  {
    kepemilikanData.push({
      id: item.id,
      name: item.nama,
  });
  });
  console.log(kepemilikanData);
  

 const handleOnSearch = (string, results) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      console.log(string, results)
    }
    const handleOnSelect = (item) => {
      // the item selected
      console.log(item)
      setHunian(item.id);
    }
    const handleOnHover = (result) => {
      console.log(result);
    };
  
    const handleOnFocus = () => {
      console.log("Focused");
    };
    
   
    const handleOnSelectKepemilikan = (item) => {
      // the item selected
      console.log(item)
      setKepemilikan(item.id);
    }
  
    const formatResult = (item) => {
      console.log(item)
      console.log(formatResult)
      return (
        <>
        
          {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
          <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
        </>
      )
    }
 

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
      formData.set("nik", form.nik);
      formData.set("nama", form.nama);
      formData.set("tempatlahir", form.tempatlahir);
      formData.set("tanggallahir", form.tanggallahir);
      formData.set("pekerjaan", form.pekerjaan);
      formData.set("wargalingkungan", wargaLingkungan);
      // formData.set("description", JSON.stringify(convertToRaw(valueEditor.getCurrentContent())));
      console.log(formData);

      const response = await API.post("/createwarga", formData, config);
      console.log(response);
      // setshow(true)
      // history.push("/");
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
          <div style={{ marginTop: 20, marginBottom: 20 }}>Create Keluarga</div>
          <Form className="formStyle"  style={{marginTop:"40px"}} onSubmit={handleOnSubmit}> 
        
          <Form.Group className="mb-3" controlId="nokk">
           <Form.Control type="text" placeholder="No.Kartu Keluarga" name="nokk" value={dataUpdate.nokk} onChange={handleChange} />
          </Form.Group>

          <div style={{ width: 300, margin: 20 }}>
        
            <div style={{ marginBottom: 20 }}>Hunian</div>
            <ReactSearchAutocomplete
              items={hunianData}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              formatResult={formatResult}

              // onClear={handleOnClear}
              styling={{ zIndex: 4 }} // To display it on top of the search box below
              autoFocus
            />
          </div>
          <div style={{ width: 300, margin: 20 }}>
          
            <div style={{ marginBottom: 20 }}>Kepala Keluarga</div>
            <ReactSearchAutocomplete
              items={kepemilikanData}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelectKepemilikan}
              onFocus={handleOnFocus}
              formatResult={formatResult}

              // onClear={handleOnClear}
              styling={{ zIndex: 4 }} // To display it on top of the search box below
              autoFocus
            />
          </div>
          <div style={{ marginBottom: 20 }}>Status Hunian</div>


          <select id="fruits" value={fruit} 
              onChange={(e) => setFruit(e.target.value)}>
            <option value="sewa">Sewa</option>
            <option value="miliksendiri">Milik Sendiri</option>
          </select>
          <div style={{ marginBottom: 20 }}> </div>
          
          {/* <h1>Selected Fruit: {fruit}</h1> */}
     
          <div style={{ marginBottom: 20 }}>Status </div>
          <Form.Group className="mb-3" controlId="nokk">
           <Form.Control type="text" placeholder="nokk" name="nokk" value={dataUpdate.nokk} onChange={handleChange} />
          </Form.Group>
      
          <br/>
          <div id="btnAddWrap">
            <Button id="btnAdd" type="submit"  >
              Add Keluarga
          </Button>
          </div>
        </Form>

          </>

        </Col>
      </Row>
    </Container>
  )
}

export default AddKeluargaForm;
