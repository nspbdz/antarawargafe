import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/form/SearchForm";
import StatusList from "../components/StatusList";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import "../styles/customStyle.css";

const Status = () => {
  const router = useHistory();

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [searchStatus, setSearchStatus] = useState([]);

  const [show, setshow] = useState(false);
  const [NewDataUser, setNewDataUser] = useState(false);
  const [journey, setUserJourney] = useState([]);
  const [status, setStatus] = useState([]);
  const [NewStatus, setNewStatus] = useState(false);

  const [confirm, setConfirm] = useState(null);
  const [idData, setIdData] = useState(null);

  
  const getStatus = async () => {
    try {
      const response = await API.get(`/allstatus`);
      // Store product data to useState variabel
      console.log(response);
      setStatus(response.data.data);
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {
    getStatus();
  }, [NewStatus]);
  console.log(status)



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
      const response = await API.post(`/searchstatus?search=${search}`);
      // Store product data to useState variabel
      console.log(response)

      setSearchStatus(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchJourney();
  }, [search]);

  const handlePushToCreate = (id) => {
    console.log(id);
    router.push(`addstatus`); 
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
                 <span id="titleHome" >All Status </span>
                <Button  variant="success" onClick={() => handlePushToCreate()}   >
                    Create
                </Button>
                 
                 <StatusList data={status} /> 
              </>
              :
              <>
                <span id="titleHome" >Search Status  </span>
                <StatusList data={searchStatus} />
              </>
            }
          </Col>
        )}
      </Row>
    </>
  )
}

export default Status
