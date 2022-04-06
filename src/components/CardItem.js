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
// import draftToHtml from 'draftjs-to-html';


var striptags = require('striptags');
function CardItem(props) {
    const { isBookmark, data, dataBookmark,item } = props
    let history = useHistory();
    console.log(item);

  const [show, setshow] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);

  const [state, dispatch] = useContext(UserContext);

  return (
    <>

      <Container>
        <Row>
          {item?.length <= 0 && (
            <span id="titleNotFound" >Data Tidak Ada  </span>
          )}
          {item.map((items, index) => (
            <>
            <Col md="auto">

            <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    </Col>
            </>
         ))}

        </Row>
      </Container>
    </>


  );
}

export default CardItem;
