import { Card, Button, Row, Col, Container,Table } from "react-bootstrap";
import ModalSignin from "./modal/ModalSignin";
import { useState, useContext, useRef, useEffect } from "react";
import "../styles/customStyle.css";
import { UserContext } from "../context/userContext";
import Bookmark from "../assets/images/Bookmark.svg";
import { API } from "../config/api";
import { useHistory, Router, Link } from "react-router-dom";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import ExpendableText from "./ExpendableText"
import CardItem from "./CardItem";

// import draftToHtml from 'draftjs-to-html';

var striptags = require('striptags');
function CardList(props) {
  const { isBookmark, data, dataBookmark } = props
  let history = useHistory();
  console.log(data);
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
  console.log(data);

  return (
    <>
      <Row>
        <Col sm={12} >
          
          <Table striped bordered hover style={{ width: "1100px" }} >
            <thead style={{ backgroundColor: "#E5E5E5" }}>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>Income</th>
                <th> Status </th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>

            {data?.length <= 0 && (
              // <img src={not_found} width="100%" height="100%" alt="not found" />
              <>
              
              </>
            )}
            {data?.length > 0 &&
              data?.map((item, index) => (
                <tbody style={{ backgroundColor: "#FFFFFF" }} key={index}>

                  <tr id="TableStyle" >
                    <td value={item.id}> {item.id}</td>
                    <td> <p className="tableVal"> {item.name}</p> </td>
                    <td> <p className="tableVal"> {item.job}</p> </td>
                    
                    

                  </tr>

                </tbody>

              ))}
          </Table>
          {/* <ModalUpdateTransaction 
          setConfirmApprove={setConfirmApprove}
          show={show}
          handleClose={handleClose}

          handleApproveConfirm={handleApproveConfirm}
            />
          <ModalUpdateCancelTransaction 
          setConfirmCancel={setConfirmCancel}
          show={showCancel}
          handleCloseCancel={handleCloseCancel}
          handleCancelConfirm={handleCancelConfirm}
            /> */}
        </Col>
      </Row>
    </>

  );
}

export default CardList;
