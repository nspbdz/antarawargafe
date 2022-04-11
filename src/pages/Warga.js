import { useContext, useEffect, useState } from "react";
import { Col, Row,Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import WargaList from "../components/WargaList";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import "../styles/customStyle.css";
import SearchForm from "../components/form/SearchForm"

const Warga = () => {
  const router = useHistory();

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [searchJourney, setSearchJourney] = useState([]);

  const [show, setshow] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [NewDataUser, setNewDataUser] = useState(false);
  const [journey, setUserJourney] = useState([]);
  const [warga, setUserWarga] = useState([]);
  const [NewJourney, setNewJourney] = useState(false);

  const [confirm, setConfirm] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [idData, setIdData] = useState(null);

  const handleConfirm = async (id) => {
    console.log(id)
    setIdData(id)
    handleShowDelete();
  }

  
  const getWarga = async () => {
    try {
      const response = await API.get(`/wargas`);
      // Store product data to useState variabel
      console.log(response);
      setUserWarga(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWarga();
  }, [NewJourney]);
  console.log(warga)



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
  useEffect(() => {
    if (confirm) {
      deleteMyJourney();
      console.log("confirms")
      handleCloseDelete();
      history.push("/");
    }
  }, [confirm]);

  console.log(journey)
  console.log(confirm)

  const getSearchJourney = async () => {
    try {
      const response = await API.post(`/searchwarga?search=${search}`);
      // Store product data to useState variabel
      console.log(response)

      setSearchJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchJourney();
  }, [search]);

  const handlePushToDetail = (id) => {
    console.log(id);
    router.push(`addwarga`); 
    // router.push(`warga/${id}`); 
  };

  return (
    <>

      <Row style={{justifyContent:"center"}} >
        {state.isLogin == true && (
          <Col   md="auto">
            <div id="wrapTitle">
              {/* <span id="titleHome">Journey</span> */}
            </div>
            <SearchForm handleSearch={setSearch} />
            
            {search == ""
              ?
              <>
                {/* <span id="titleHome" >Today Journey  </span>
                <span id="titleHome" > Top Bookmarked</span>
                <MostBookmark data={bookmarkMostBookmarked} />*/}
                 <span id="titleHome" >All Warga </span>
              <Button  variant="success" onClick={() => handlePushToDetail()}   >
                  Create
              </Button>
                 
                 <WargaList data={warga} /> 
              </>
              :
              <>
                <span id="titleHome" >Search Warga  </span>
                <WargaList data={searchJourney} />

              </>

            }
          </Col>
        )}
      </Row>
    </>
  )
}

export default Warga
