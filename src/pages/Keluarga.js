import { useContext, useEffect, useState } from "react";
import { Col, Row,Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import KeluargaList from "../components/KeluargaList";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import "../styles/customStyle.css";
import SearchForm from "../components/form/SearchForm"

const Keluarga = () => {
  const router = useHistory();

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [searchKeluarga, setSearchKeluarga] = useState([]);

  const [show, setshow] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [NewDataUser, setNewDataUser] = useState(false);
  const [allKeluarga, setAllKeluargas] = useState([]);
  const [NewKeluarga, setNewKeluarga] = useState(false);
  const [idData, setIdData] = useState(null);

  const getKeluarga = async () => {
    try {
      const response = await API.get(`/keluargas`);
      // Store product data to useState variabel
      console.log(response);
      setAllKeluargas(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKeluarga();
  }, [NewKeluarga]);
  console.log(allKeluarga)

  const getSearchKeluarga = async () => {
    try {
      const response = await API.post(`/searchkeluarga?search=${search}`);
      // Store product data to useState variabel
      console.log(response)

      setSearchKeluarga(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchKeluarga();
  }, [search]);

  const handlePushToAdd = (id) => {
    console.log(id);
    router.push(`addkeluarga`); 
    // router.push(`allKeluarga/${id}`); 
  };

  return (
    <>

      <Row className="tableCenter" >
          {state.isLogin == true && (
          <Col   md="auto">
            <div id="wrapTitle">
            </div>
            <SearchForm handleSearch={setSearch} />
            {search == ""
              ?
              <>
              <span id="titleHome" >All Keluarga </span>
              <Button  variant="success" onClick={() => handlePushToAdd()}   >
                  Create
              </Button>
                 
              <KeluargaList data={allKeluarga} /> 
              </>
              :
              <>
                <span id="titleHome" >Search Keluarga  </span>
                <KeluargaList data={searchKeluarga} />
              </>
            }
          </Col>
        )}
      </Row>
    </>
  )
}

export default Keluarga
