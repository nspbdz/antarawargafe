import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/form/SearchForm";
import HunianList from "../components/HunianList";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import "../styles/customStyle.css";

const Hunian = () => {
  const router = useHistory();

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [searchHunian, setSearchHunian] = useState([]);

  const [show, setshow] = useState(false);
  const [NewDataUser, setNewDataUser] = useState(false);
  const [journey, setUserJourney] = useState([]);
  const [hunian, setHunian] = useState([]);
  const [NewHunian, setNewHunian] = useState(false);

  const [confirm, setConfirm] = useState(null);
  const [idData, setIdData] = useState(null);

  
  const getHunian = async () => {
    try {
      const response = await API.get(`/hunians`);
      // Store product data to useState variabel
      console.log(response);
      setHunian(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHunian();
  }, [NewHunian]);
  console.log(hunian)



  const deleteMyJourney = async () => {
    console.log(idData)
    try {
      const response = await API.delete(`/journey/${idData}`);
      // Store product data to useState variabel
      setUserJourney(response.data.data.journeys);
    } catch (error) {
      console.log(error);
    }
  };
 

  console.log(journey)
  console.log(confirm)

  const getSearchJourney = async () => {
    try {
      const response = await API.post(`/searchhunian?search=${search}`);
      // Store product data to useState variabel
      console.log(response)

      setSearchHunian(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchJourney();
  }, [search]);

  const handlePushToCreate = (id) => {
    console.log(id);
    router.push(`addhunian`); 
    // router.push(`warga/${id}`); 
  };

  return (
    <>

      <Row >
        {state.isLogin == true && (
          <Col   >
            <div id="wrapTitle">
              {/* <span id="titleHome">Journey</span> */}
            </div>
            <SearchForm handleSearch={setSearch} />
            
            {search == ""
              ?
              <>
                 <span id="titleHome" >All Hunian </span>
                <Button  variant="success" onClick={() => handlePushToCreate()}   >
                    Create
                </Button>
                 
                 <HunianList data={hunian} /> 
              </>
              :
              <>
                <span id="titleHome" >Search Hunian  </span>
                <HunianList data={searchHunian} />
              </>
            }
          </Col>
        )}
      </Row>
    </>
  )
}

export default Hunian
