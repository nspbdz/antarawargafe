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
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
var striptags = require('striptags');
function UpdateKepemilikanForm({ match, }) {

  // const { dataHunian,dataPemilik } = props

  // const DetailJourney = ({ match }) => {
  let history = useHistory();
  let { id } = useParams();

  const [message, setMessage] = useState(null);
  const [wargaLingkungan, setwargaLingkungan] = useState(null);
  const [hunian, setHunian] = useState([])
  const [dataKepemilikan, setDataKepemilikan] = useState([])

  const [kepemilikan, setKepemilikan] = useState([])
  const [dataUpdate, setDataUpdate] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({});

  const [newKepemilikan, setNewKepemilikan] = useState(false);
  
  const [NewDataHunian, setNewDataHunian] = useState(false);
  const [dataHunian, setDataHunian] = useState([]);

  const [NewDataKeluarga, setNewDataKeluarga] = useState(false);
  const [dataKeluarga, setDataKeluarga] = useState([]);

  const [NewDataPemilik, setNewDataPemilik] = useState(false);
  const [dataPemilik, setDataPemilik] = useState([]);


  

  const getAllHunian = async () => {
    try {
      const response = await API.get("/hunians");
      // Store product data to useState variabel
      setDataHunian(response.data.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllHunian();
  }, [NewDataHunian]);

  const getPemilik = async () => {
    try {
      const response = await API.get("/wargas");
      // Store product data to useState variabel
      setDataPemilik(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPemilik();
  }, [NewDataPemilik]);


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
  dataPemilik.map((item,i) => 
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
  }
  console.log(hunian);
  console.log(kepemilikan);

  const getDataKepemilikan = async (id) => {
    try {
      const response = await API.get(`/kepemilikan/${id}`);
      // Store product data to useState variabel
      console.log(response)
      setDataKepemilikan(response.data.data);
      if (response.status == 200) {
        console.log("suksess")
        setForm({
          tanggalkepemilikan: response.data.data.tanggalkepemilikan,
          nomerrumah: response.data.data.nomerrumah,
          nomerblok: response.data.data.nomerblok,
          namawarga: response.data.data.namaWarga,
          
          // idh: response.data.data.idh,
          
        });
        setHunian(response.data.data.idHunian)
        setKepemilikan(response.data.data.idWarga)
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getDataKepemilikan(id)
    console.log(setHunian)
  }, [newKepemilikan]);
 

  const handleOnSubmit = async (e) => {
    console.log("tersubmit")
    try {
      e.preventDefault();
      const data = {
      tanggalkepemilikan: form.tanggalkepemilikan,
      idhunian:hunian,
      idwarga:kepemilikan,
      };
      
      const response = await API.put(`/updatekepemilikan/${id}`, data,);
      console.log(response);
      // setshow(true)
      // history.push("/kepemilikan");
    } catch (error) {
      console.log(error);
    }
  };

  let today  = new Date(form.tanggalkepemilikan);
  const dataTanggal=moment(today).format("YYYY-DD-MM")


  console.log(form);
   
  return (
    <Container>
      <Row>
        <Col>
          <>
          <Form className="formStyle"  style={{marginTop:"40px"}} onSubmit={handleOnSubmit}> 
          <div style={{ width: 300, margin: 20 }}>
            <div style={{ marginBottom: 20 }}>Hunian</div>
            <ReactSearchAutocomplete
              items={hunianData}
              placeholder ={`Blok.`+form.nomerblok + ` No.`+form.nomerrumah}
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
          
            <div style={{ marginBottom: 20 }}>Pemilik</div>
            <ReactSearchAutocomplete
              items={kepemilikanData}
              placeholder={form.namawarga}
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
              
            <Form.Group className="mb-3" controlId="tanggalkepemilikan">
              <Form.Control type="date" placeholder="tanggalkepemilikan" name="tanggalkepemilikan" value={dataTanggal} onChange={handleChange} />
            </Form.Group>
          
            <br/>
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
