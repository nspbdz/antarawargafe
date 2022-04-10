import { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Alert, InputGroup, FormControl } from "react-bootstrap";
import { Modal } from "react-bootstrap";
// import kopiadd from "../../assets/images/coffee/kopiadd.png"
import "../../styles/customStyle.css";
import Select from 'react-select';
import { useHistory, Router, Link } from "react-router-dom";
// import ModalProduct from "../modal/ModalProduct"
import { API } from "../../config/api";
import { CgAttachment } from "react-icons/cg";
import { EditorState, Modifier, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import AnggotaKeluargaList from "../AnggotaKeluargaList";
import ModalCreateAnggotaKeluarga from "../modal/ModalCreateAnggotaKeluarga"

function AddKeluargaForm(props) {
  const { dataHunian,dataWarga,dataStatus } = props

  let history = useHistory();

  const [selectHunian, setSelectHunian] = useState([])
  const [selectStatusAnggotaKeluarga, setSelectStatusAnggotaKeluarga] = useState([])

  const [message, setMessage] = useState(null);
  const [wargaLingkungan, setwargaLingkungan] = useState(null);
  const [hunian, setHunian] = useState([])
  const [kepemilikan, setKepemilikan] = useState([])
  
  const [NewDataKeluarga, setNewDataKeluarga] = useState(false);
  const [dataKeluarga, setDataKeluarga] = useState([]);

  const [valueEditor, setValueEditor] = useState(EditorState.createEmpty());
  const [dataUpdate, setDataUpdate] = useState([])
 
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
  }); //Store product data

  const getAllKeluarga = async () => {
    try {
      const response = await API.get("/lastkeluarga");
      // Store product data to useState variabel
      setDataKeluarga(response.data.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllKeluarga();
  }, [NewDataKeluarga]);

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
 
    console.log(selectHunian);
    // console.log(selectStatusWarga?.value);

  const handleChange = (e) => {
    const a = e.target.value
    console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

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
      formData.set("nomerkk", form.nomerkk);
      formData.set("idhunian", hunian);
      formData.set("idwarga", kepemilikan);
      formData.set("hunianstatus", selectHunian?.value);
      formData.set("statusanggotakeluarga", selectStatusAnggotaKeluarga?.value);
      console.log(formData);
      const response = await API.post("/createkeluarga", formData, config);
      console.log(response);
      setNewDataKeluarga(true);
      // setshow(true)
      // history.push("/keluarga");
    } catch (error) {
      console.log(error);
    }
  };
 
  var statusAnggotaKeluarga = dataStatus.map(function (item) {
    return { value: item.id, label: item.nama };
  })

  const items = [
    {
      value: 'sewa',
      label: 'sewa'
    },
    {
      value: "milik sendiri",
      label: 'milik sendiri'
    },
  
  ]
  console.log(valueEditor)

  
  const handlePushToAddAnggotaKeluarga = (id) => {
    console.log(id);
    setShow(true)
    // router.push(`addkeluarga`); 
    // router.push(`allKeluarga/${id}`); 
  };
  console.log(dataKeluarga);
  return (
    //  <p>add journey</p>
    <Container>
      <Row>
        <Col>
          <>
          <div style={{ marginTop: 20, marginBottom: 20 }}>Create Keluarga</div>
          <Form className="formStyle"  style={{marginTop:"40px"}} onSubmit={handleOnSubmit}> 
        
          <Form.Group className="mb-3" controlId="nomerkk">
           <Form.Control type="text" placeholder="No.Kartu Keluarga" name="nomerkk" value={dataUpdate.nomerkk} onChange={handleChange} />
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
              styling={{ zIndex: 4 }} // To display it on top of the search box below
              autoFocus
            />
          </div>

          <div style={{ marginBottom: 20 }}>Status Hunian</div>
          <div style={{ width: 300, margin: 20 }}>
            <Select
              name="form-field-name"
              defaultValue={selectHunian}
              onChange={setSelectHunian}
              labelKey='name'
              valueKey='StatusHunian'
              options={items}                  
            />
          </div>

          <div style={{ marginBottom: 20 }}>Status Anggota Warga</div>
          <div style={{ width: 300, margin: 20 }}>
            <Select
              name="form-field-name"
              defaultValue={selectStatusAnggotaKeluarga}
              onChange={setSelectStatusAnggotaKeluarga}
              labelKey='name'
              valueKey='StatusAnggotaKeluarga'
              options={statusAnggotaKeluarga}                  
            />
          </div>
        
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

        <br></br>
      <Row>
        <div>Daftar Anggota Keluarga</div>
        <br></br>
        {/* <span id="titleHome" >All Keluarga </span> */}
        <Button  variant="success" onClick={() => handlePushToAddAnggotaKeluarga()}   >
            Create
        </Button>
        <Col>
        <AnggotaKeluargaList data={dataKeluarga} />
        <ModalCreateAnggotaKeluarga show={show} handleClose={() => setShow(false)} />

        </Col>
      </Row>
    </Container>
  )
}

export default AddKeluargaForm;
