import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "../../styles/customStyle.css";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import { API } from "../../config/api";

const ModalCreateAnggotaKeluarga = (props) => {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [warga, setwarga] = useState([])
  const [KepalaKeluarga, setKepalaKeluarga] = useState([])
  const [statusKeluarga, setStatusKeluarga] = useState([])

  const [kepemilikan, setKepemilikan] = useState([])
  const [NewDataKepalaKeluarga, setNewDataKepalaKeluarga] = useState(false);
  const [dataKepalaKeluarga, setDataKepalaKeluarga] = useState([]);

  const [NewDataWarga, setNewDataWarga] = useState(false);
  const [dataWarga, setDataWarga] = useState([]);

  const [NewDataStatus, setNewDataStatus] = useState(false);
  const [dataStatus, setDataStatus] = useState([]);


  const [message, setMessage] = useState(null);
  const { handleClose, handleLogin, show } = props;
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    const a = e.target.value
    console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

  }
 
  const getAllStatus = async () => {
    try {
      const response = await API.get("/allstatus");
      // Store product data to useState variabel
      setDataStatus(response.data.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllStatus();
  }, [NewDataStatus]);

  const getAllWarga = async () => {
    try {
      const response = await API.get("/warganullstatus");
      // Store product data to useState variabel
      setDataWarga(response.data.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllWarga();
  }, [NewDataWarga]);

  const getAllKepalaKeluarga = async () => {
    try {
      const response = await API.get("/kepalakeluarga");
      // Store product data to useState variabel
      setDataKepalaKeluarga(response.data.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllKepalaKeluarga();
  }, [NewDataKepalaKeluarga]);

  console.log(dataKepalaKeluarga);
  var kepalaKeluargaData = [];
  dataKepalaKeluarga.map((item,i) => 
  {
    kepalaKeluargaData.push({
      id: item.id,
      name:item.nama
  });
  });

  var allWargaData = [];
  dataWarga.map((item,i) => 
  {
    allWargaData.push({
      id: item.id,
      name:item.nama
  });
  });

  var allStatusKeluargaData = [];
  dataStatus.map((item,i) => 
  {
    allStatusKeluargaData.push({
      id: item.id,
      name:item.nama
  });
  });

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
     formData.set("idwarga", warga);
      formData.set("idkepalakeluarga", KepalaKeluarga);
      formData.set("idstatusanggotakeluarga", statusKeluarga);
      console.log(formData);

      const response = await API.post("/createanggotakeluarga", formData, config);
      console.log(response);
      // setshow(true)
      // history.push("/addkeluarga");
      const alert = (
        <Alert variant="danger" className="py-1">
          Success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
          const alert = (
              <Alert variant="danger" className="py-1">
                update failed
              </Alert>
            );
            setMessage(alert);
            console.log(error);
      console.log(error);
    }
  };
  // const handleCreateAnggotaKeluarga = async (e) => {
  //   console.log(warga);
  //   console.log(KepalaKeluarga);
  //   console.log(statusKeluarga);
  //   try {

  //     e.preventDefault();
  //     // Configuration
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };

  //     // Data body
  //     // const formData = new FormData();
  //     // formData.set("idwarga", warga);
  //     // formData.set("idkeluarga", KepalaKeluarga);
  //     // formData.set("idstatus", statusKeluarga);
  //     // console.log(formData)
  //     const data = {
  //       idwarga: warga,
  //     idkeluarga: KepalaKeluarga,
  //     // idstatus: statusKeluarga,
  //     };
  //     // update data for user process
  //     const response = await API.post("/createanggotakeluarga", data,);
  //     history.push("/addkeluarga");
  //     console.log(response);

   
  //   } catch (error) {
  //     const alert = (
  //       <Alert variant="danger" className="py-1">
  //         update failed
  //       </Alert>
  //     );
  //     setMessage(alert);
  //     console.log(error);
  //   }
  // };

  const handleOnSearch = (string, results) => {
    console.log(string, results)
  }
  
  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };
  
  const SelectWarga = (item) => {
    // the item selected
    console.log(item)
    setwarga(item.id);
  }

  const SelectKepalaKeluarga = (item) => {
    // the item selected
    console.log(item)
    setKepalaKeluarga(item.id);
  }
  const SelectStatusAnggotaKeluarga = (item) => {
    // the item selected
    console.log(item)
    setStatusKeluarga(item.id);
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
console.log(message)

  return (

    <Modal show={show} onHide={handleClose} centered className="my-modal">
      <Modal.Body>

          <Form className="formStyle"  style={{marginTop:"40px"}} onSubmit={handleOnSubmit}> 
        {message}
        {/* <Form
          onSubmit={handleCreateAnggotaKeluarga}
          style={{ paddingLeft: "33px", paddingRight: "33px", }}> */}
       
          <div style={{ width: 300, margin: 20 }}>
        
        <div style={{ marginBottom: 20 }}>Kepala Keluarga</div>
        <ReactSearchAutocomplete
          items={kepalaKeluargaData}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={SelectKepalaKeluarga}
          onFocus={handleOnFocus}
          formatResult={formatResult}

          // onClear={handleOnClear}
          styling={{ zIndex: 4 }} // To display it on top of the search box below
          autoFocus
        />
      </div>
      <div style={{ width: 300, margin: 20 }}>
        
        <div style={{ marginBottom: 20 }}>Nama Warga</div>
        <ReactSearchAutocomplete
          items={allWargaData}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={SelectWarga}
          onFocus={handleOnFocus}
          formatResult={formatResult}

          // onClear={handleOnClear}
          styling={{ zIndex: 4 }} // To display it on top of the search box below
          autoFocus
        />
      </div>

      <div style={{ width: 300, margin: 20 }}>
        
        <div style={{ marginBottom: 20 }}>Status Anggota Keluarga</div>
        <ReactSearchAutocomplete
          items={allStatusKeluargaData}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={SelectStatusAnggotaKeluarga}
          onFocus={handleOnFocus}
          formatResult={formatResult}

          // onClear={handleOnClear}
          styling={{ zIndex: 4 }} // To display it on top of the search box below
          autoFocus
        />
      </div>

          <div id="btnAddWrap">
            <Button id="btnAddKeluarga" type="submit"  >
              Add Keluarga
          </Button>
          {/* </div> */}
        &nbsp;
        {/* <div id="btnAddWrap"> */}
            <Button id="btnAddKeluarga" onClick={() => history.goBack()}  >
              Kembali
          </Button>
          </div>
        </Form>


      </Modal.Body>
    </Modal>
  );
};

export default ModalCreateAnggotaKeluarga;
