import { Card, Row, Col, Container, Carousel } from "react-bootstrap";
import SearchForm from "../components/form/SearchForm"
import CardList from "../components/CardList";
import MostBookmark from "../components/MostBookmark";
import phuket from "../../src/assets/images/phuket.svg";
import { useState, useContext, useEffect } from "react";
import "../styles/customStyle.css"
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { FilterContext } from "../context/filterContext";
// import Header from "../components/Header";
import Sidebar from "./Sidebar.js";
// import Heads from "./Heads.js";
import './Dashboard.css'



const Home = () => {
  const [stateFilter, filterDispatch] = useContext(FilterContext)

  const [state, dispatch] = useContext(UserContext);
  const [journey, setJourney] = useState([]);
  const [alljourney, setAllJourney] = useState([]);
  const [NewJourney, setNewJourney] = useState(false);
  const [search, setSearch] = useState("");

  const [searchJourney, setSearchJourney] = useState([]);
  const [NewBookmark, setNewBookmark] = useState(false);
  const [bookmark, setBookmark] = useState([]);
  const [mostBookmark, setMostBookmark] = useState([]);

  const getMostBookmark = async () => {
    try {
      const response = await API.get("/mostbookmark");
      // Store product data to useState variabel
      setMostBookmark(response.data.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getMostBookmark();
  }, [NewBookmark]);
  console.log(mostBookmark)
  const getBookmark = async () => {
    try {
      const response = await API.get("/bookmark");
      // Store product data to useState variabel
      setBookmark(response.data.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookmark();
  }, [NewBookmark]);

  const getTodayJourney = async () => {
    try {
      const response = await API.get("/wargas");
      // Store product data to useState variabel
      setJourney(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodayJourney();
  }, [NewJourney]);
  console.log(journey)

  const getAllJourney = async () => {
    try {
      const response = await API.get("/wargas");
      // Store product data to useState variabel
      setAllJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJourney();
  }, [NewJourney]);

  console.log(alljourney)


  const getSearchJourney = async () => {
    try {
      const response = await API.get(`/searchjourney?title=${search}`);
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


  let bookmarkIds = bookmark.map(group => group.idJourney);

  let bookmarkMostBookmarked = mostBookmark.map(group => (
    { ...group, bookmark: bookmarkIds.includes(group.idJourney) })
  );
  console.log(bookmarkMostBookmarked)

  let bookmarkAllJourney = alljourney.map(group => (
    { ...group, bookmark: bookmarkIds.includes(group.id) })
  );

  let bookmarkSearchJourney = searchJourney.map(group => (
    { ...group, bookmark: bookmarkIds.includes(group.id) })
  );

  console.log("bookmarkAllJourney", bookmarkAllJourney)

  return (

    <>

      <Row >
        {state.isLogin == true && (
          <Col   >
            <div id="wrapTitle">
              {/* <span id="titleHome">Journey</span> */}
            </div>
            {/* <SearchForm handleSearch={setSearch} /> */}
            {search == ""
              ?
              <>
                {/* <span id="titleHome" >Today Journey  </span>
                <span id="titleHome" > Top Bookmarked</span>
                <MostBookmark data={bookmarkMostBookmarked} />*/}
                 <span id="titleHome" >All Journey </span>
                 <CardList data={bookmarkAllJourney} /> 
              </>
              :
              <>
                <span id="titleHome" >Search Journey  </span>
                <CardList data={bookmarkSearchJourney} />

              </>

            }
          </Col>
        )}
      </Row>


      <Row className="justify-content-md-center" >
        
        {!state.isLogin && (

            
<>
         <Container fluid>
                {/* <Heads /> */}
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      {/* <Sidebar /> */}
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                        {/* <CardList data={alljourney} /> */}
                    </Col> 
                </Row>

            </Container>
        </>
          // <Col md="auto" >

          //   <span id="titleHome" >Journey</span>
          //   <SearchForm handleSearch={setSearch} />

          //   {search !== ""
          //     ?
          //     <>
          //       <span id="titleHome" >Search Journey  </span>
          //       <CardList data={bookmarkSearchJourney} />

          //     </>
          //     :
          //     <>
          //       <span id="titleHome" >Today Journey  </span>
          //       <CardList data={journey} />
          //       <span id="titleHome" >All journey </span>
          //       <CardList data={alljourney} />
          //     </>



          //   }
          // </Col> 

        )}
      </Row>
    </>

  )
}
export default Home;
