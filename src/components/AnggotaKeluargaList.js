import { Card, Button, Row, Col, Container,Table } from "react-bootstrap";
import { useState, useContext, useRef, useEffect } from "react";
import "../styles/customStyle.css";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useHistory, Router, Link } from "react-router-dom";

function KeluargaList(props) {
  const {data } = props
  let history = useHistory();
  console.log(data);
  const [show, setshow] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);
  const [state, dispatch] = useContext(UserContext);

 
  const handlePushToSignUp = () => {
    history.push("/signup");
  };

  const handlePushToUpdateKeluarga = (id) => {
    // console.log(id);
    history.push(`updatekeluarga/${id}`);
  };
  console.log(data);

  return (
    <>
    <Row>
      <Col sm={12} >
        
        <Table id="tables" striped bordered hover style={{ width: "650px" }} >
          <thead style={{ backgroundColor: "#E5E5E5" }}>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Nik</th>
              <th>Status</th>
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
                  <td> <p className="tableVal"> {item.namaWarga}</p> </td>
                  <td> <p className="tableVal"> {item.nik}</p> </td>
                  <td> <p className="tableVal"> {item.namaStatus}</p> </td>
                  {/* <td> <p className="tableVal"> {`Blok.`+ item.nomerblok + ` No.`+ item.nomerrumah}</p> </td> */}
                  {/* <td> <p className="tableVal"> {item.hunianstatus == 1 ?"Milik Sendiri":"Sewa"}</p> </td> */}
                  <td  > 
              <Row>
                {/* <Col sm="6"> <Button variant="danger" onClick={() => CancelStatus(item.id)}> */}
                <Col sm="6"> <Button variant="success" onClick={() => handlePushToUpdateKeluarga(item.id)} >
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

export default KeluargaList;
