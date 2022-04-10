import { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Alert, InputGroup, FormControl } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import "../../styles/customStyle.css";
import { useHistory, Router, Link } from "react-router-dom";
import { API } from "../../config/api";
import { CgAttachment } from "react-icons/cg";
import { useParams, useLocation } from "react-router-dom";
// import moment from 'react-moment'; 
import moment from "moment";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Select from 'react-select';

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
  


  const handleChange = (e) => {
    const a = e.target.value
    console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  }


  
  const handleOnSubmit = async (e) => {
    console.log("tersubmit")
    try {
      e.preventDefault();
      const data = {
      tanggalkepemilikan: form.tanggalkepemilikan,
      // idhunian:hunian,
      // idwarga:kepemilikan,
      };
      
      const response = await API.put(`/updatekepemilikan/${id}`, data,);
      console.log(response);
      // setshow(true)
      // history.push("/kepemilikan");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Row>
        <Col>

          <>
        
          <Form className="formStyle"  style={{marginTop:"40px"}} onSubmit={handleOnSubmit}> 
        
          <Form.Group className="mb-3" controlId="nomerkk">
           <Form.Control type="text" placeholder="No.Kartu Keluarga" name="nomerkk" value={dataUpdate.nomerkk} onChange={handleChange} />
          </Form.Group>

          <div style={{ width: 300, margin: 20 }}>
        
            <div style={{ marginBottom: 20 }}>Hunian</div>
            <ReactSearchAutocomplete
              // items={hunianData}
              // onSearch={handleOnSearch}
              // onHover={handleOnHover}
              // onSelect={handleOnSelect}
              // onFocus={handleOnFocus}
              // formatResult={formatResult}

              // onClear={handleOnClear}
              styling={{ zIndex: 4 }} // To display it on top of the search box below
              autoFocus
            />
          </div>
          <div style={{ width: 300, margin: 20 }}>
          
            <div style={{ marginBottom: 20 }}>Kepala Keluarga</div>
            <ReactSearchAutocomplete
              // items={kepemilikanData}
              // onSearch={handleOnSearch}
              // onHover={handleOnHover}
              // onSelect={handleOnSelectKepemilikan}
              // onFocus={handleOnFocus}
              // formatResult={formatResult}

              // onClear={handleOnClear}
              styling={{ zIndex: 4 }} // To display it on top of the search box below
              autoFocus
            />
          </div>

          <div style={{ marginBottom: 20 }}>Status Hunian</div>
          <div style={{ width: 300, margin: 20 }}>
            <Select
              name="form-field-name"
              // value={selectHunian}
              // onChange={handleOnSelectHunian}
              // defaultValue={selectStatusWarga}
              // onChange={setSelectStatusWarga}
              // clearable={this.state.clearable}
              // searchable={this.state.searchable}
              // labelKey='name'
              // valueKey='countryCode'
              // options={items}                  
            />
          </div>

          <div style={{ marginBottom: 20 }}>Status Warga</div>
          <div style={{ width: 300, margin: 20 }}>
            <Select
              name="form-field-name"
              // defaultValue={selectHunian}
              // onChange={setSelectHunian}
              // clearable={this.state.clearable}
              // searchable={this.state.searchable}
              // labelKey='name'
              // valueKey='countryCode'
              // options={statusWarga}                  
            />
          </div>
        
          <br/>
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
