import { Card, Button, Row, Col, Container,Table } from "react-bootstrap";
import ModalSignin from "./modal/ModalSignin";
import { useState, useContext, useRef, useEffect } from "react";
import "../styles/customStyle.css";
import { UserContext } from "../context/userContext";
import Bookmark from "../assets/images/Bookmark.svg";
import { API } from "../config/api";
import { useHistory, Router, Link } from "react-router-dom";

// import draftToHtml from 'draftjs-to-html';

var striptags = require('striptags');
function HunianList(props) {
  const { data, } = props
  let history = useHistory();
  console.log(data);
  const [show, setshow] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);

  const [state, dispatch] = useContext(UserContext);

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

  const handlePushToUpdateHunian = (id) => {
    // console.log(id);

    history.push(`updatehunian/${id}`);
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
            <th>Blok/No.Rumah</th>
            <th>Tipe</th>
            <th>Luas Tanah</th>
            <th>Luas Bangunan</th>
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
                  <td> <p className="tableVal"> {`Blok.`+ item.nomerblok + ` No.`+ item.nomerrumah}</p> </td>
                  <td> <p className="tableVal"> {item.tipebangunan}</p> </td>
                  <td> <p className="tableVal"> {item.luastanah}</p> </td>
                  <td> <p className="tableVal"> {item.luasbangunan}</p> </td>
                  {/* <td> <p className="tableVal"> {item.job}</p> </td> */}
                  <td  > 
              <Row>
                {/* <Col sm="6"> <Button variant="danger" onClick={() => CancelStatus(item.id)}> */}
                <Col sm="6"> <Button variant="success" onClick={() => handlePushToUpdateHunian(item.id)} >
                  Ubah
                </Button></Col>
                <Col sm="5">  <Button  variant="danger" >
                {/* <Col sm="5">  <Button  variant="success" onClick={() => approveStatus(item.id)}> */}
                  Delete
                </Button></Col>
                <Col sm="1"></Col>
              </Row>
              
              
            
              </td>

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

export default HunianList;
