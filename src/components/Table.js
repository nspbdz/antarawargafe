import { Card, Button, Row, Col, Container } from "react-bootstrap";
import ModalSignin from "./modal/ModalSignin";
import { useState, useContext, useRef, useEffect } from "react";
import "../styles/customStyle.css";
import { UserContext } from "../context/userContext";
import Bookmark from "../assets/images/Bookmark.svg";
import { API } from "../config/api";
import { useHistory, Router, Link } from "react-router-dom";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import ExpendableText from "./ExpendableText"
// import draftToHtml from 'draftjs-to-html';

var striptags = require('striptags');
function CardList(props) {
  const { isBookmark, data, dataBookmark } = props
  let history = useHistory();

  const [show, setshow] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);

  const [state, dispatch] = useContext(UserContext);

  const handleAddBookmark = async (idJourney) => {
    console.log("tersubmit")
    console.log(idJourney)
    try {
      //   // e.preventDefault();

      const response = await API.post(`/bookmark/${idJourney}`);
      console.log(response);
      history.push("/bookmark");

    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBookmark = async (idJourney) => {
    // console.log("terdelete")
    try {
      //   // e.preventDefault();

      const response = await API.delete(`/bookmark/${idJourney}`);
      // console.log(response);
      // setshow(true)
      history.push("/bookmark");

    } catch (error) {
      console.log(error);
    }
  };
  const handlePushToSignUp = () => {
    history.push("/signup");
  };

  const handlePushToDetail = (id) => {
    // console.log(id);

    history.push(`journey/${id}`);
  };
  return (
    <>

      <Container>
        <Row>
          {data?.length <= 0 && (
            <span id="titleNotFound" >Data Tidak Ada  </span>
          )}
          {data.map((item, index) => (
            <>
              <Col md="auto">
              <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan={2}>Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
{/* 
                <Card data-div_id={item.id} id="styleCard" >
                  <div class="wrapCardImg" onClick={() => handlePushToDetail(item.id)}>
                    <Card.Img variant="top" src={item.image} id="imgCard" />
                  </div>
                  <Card.Body id="bodyCard" >

                    {state.isLogin == true &&
                      <>
                        {item.bookmark === true
                          ?
                          <div class="card-img-overlay" id="wrapBookmarkStyle" onClick={() => handleDeleteBookmark(item.id)}>
                            <BsBookmarkFill id="bookmarkStyle" />
                          </div>
                          :
                          <div class="card-img-overlay" id="wrapBookmarkStyle" onClick={() => handleAddBookmark(item.id)}>
                            <BsBookmark id="bookmarkStyle" />
                          </div>
                        }

                      </>
                    }
                    {state.isLogin !== true &&
                      <div class="card-img-overlay" id="wrapBookmarkStyle" onClick={() => setshow(true)}>
                        <BsBookmark id="bookmarkStyle" />
                      </div>
                    }
                    <Card.Title id="cardTitle" >
                      <span id="titleCardList" >{item.title}  </span>
                      <span id="dateCardList">   {item.createdAt} {item.user?.fullName} </span>
                      {/* <ExpendableText maxHeight={85} id="descriptionCardList">
                        {striptags(draftToHtml(JSON.parse(item.description)))}
                      </ExpendableText> */}

                    </Card.Title>
                  </Card.Body>
                  <ModalSignin show={show} handleClose={() => setshow(false)} />
                </Card>
                 */}

              </Col>
            </>
          ))}
        </Row>
      </Container>
    </>


  );
}

export default CardList;
