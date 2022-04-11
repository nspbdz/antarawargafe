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
import ModalDeleteWarga from "../components/modal/ModalDeleteWarga"

// import draftToHtml from 'draftjs-to-html';

var striptags = require('striptags');
function WargaList(props) {
  const { isBookmark, data, dataBookmark } = props
  let history = useHistory();
console.log(data);
  const [show, setshow] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);

  const [state, dispatch] = useContext(UserContext);

  
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

 
  const handlePushToSignUp = () => {
    history.push("/signup");
  };

  const handlePushToUpdateWarga = (id) => {
    // console.log(id);

    history.push(`updatewarga/${id}`);
  };
  console.log(data);


  return (
    <>
    <Row>
      <Col sm={12} >
        
        <Table responsive striped bordered hover  >
          <thead style={{ backgroundColor: "#E5E5E5" }}>
            <tr>
              <th>No</th>
              <th>Nik</th>
              <th>Nama</th>
              <th>Pekerjaan</th>
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
                  <td> <p className="tableVal"> {item.nik}</p> </td>
                  <td> <p className="tableVal"> {item.nama}</p> </td>
                  <td> <p className="tableVal"> {item.pekerjaan}</p> </td>
                  {/* <td> <p className="tableVal"> {item.job}</p> </td> */}
                  <td  > 
              <Row>
                {/* <Col sm="6"> <Button variant="danger" onClick={() => CancelStatus(item.id)}> */}
                <Col sm="6"> <Button variant="success" onClick={() => handlePushToUpdateWarga(item.id)} >
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
            <ModalDeleteWarga
            show={showDelete}
            handleCloseDelete={handleCloseDelete}
            setConfirm={setConfirm}
          />
      </Col>
    </Row>
  </>

  );
}

export default WargaList;
