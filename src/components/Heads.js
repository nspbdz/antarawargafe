import React from "react";
// import {Nav,NavDropdown,Navbar,Container} from "react-bootstrap";
import { withRouter } from "react-router";
import { Navbar, Nav, Button, Form, Collapse } from 'bootstrap-4-react';
import { useState, useRef, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Badge, FormControl, InputGroup,   } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import ModalSignin from "../components/modal/ModalSignin";
import ModalSignup from "../components/modal/ModalSignup";
// import UserDropdown from "./dropdown/UserDropdown"
import "../styles/customStyle.css";
import { API } from "../config/api";
import { FilterContext } from "../context/filterContext";

// const =() =>{
const Hed = props => {


    const [state, dispatch] = useContext(UserContext);
console.log(state)
  const [showSignup, setshowSignup] = useState(false);
  const [user, setUser] = useState([]);
  const [newUser, setNewUser] = useState(false);
  const [show, setshow] = useState(false);
  const [title, setTitle] = useState(null);
  const [newTitle, setNewTitle] = useState(false);
  const [navBackground, setNavBackground] = useState(false)
  const navRef = useRef()
  navRef.current = navBackground
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50
      if (navRef.current !== show) {
        setNavBackground(show)
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])


  useEffect(() => {
    if (!state.isLogin) {
      setshow(true);
    }
    return () => {
      setshow(false)
    }
  }, [state])

  const router = useHistory();
  const handlePushToSignUp = () => {
    router.push("/signup");
  };

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" })
  };
  // console.log(state.user.listAs)
  const getUser = async () => {
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      setUser(response.data.data);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getUser();
  }, [newUser]);


  const ClickHereLogin = () => {
    setshow(false)
    setshowSignup(true)
  }

  const ClickHereRegister = () => {
    setshowSignup(false)
    setshow(true)
  }

  console.log(user)



    return (
        <>
    
    <Navbar expand="lg" dark bg="dark" >
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
          <Navbar.Toggler target="#navbarColor1" />
          <Collapse navbar id="navbarColor1">
            <Navbar.Nav mr="auto">
              {/* <Nav.ItemLink href="home" active>Home</Nav.ItemLink> */}
              {/* <Nav.ItemLink href="profile">Profile</Nav.ItemLink> */}
              <Link to="/warga" id="dropText" >Data Warga</Link>
              <Link to="/keluarga" id="dropText" >Data Keluarga</Link>
              <Link to="/hunian" id="dropText" >Data Hunian</Link>
              <Link to="/status" id="dropText" >Data Status</Link>
              <Link to="/kepemilikan" id="dropText" >Data Kepemilikan</Link>

              {/* <Nav.ItemLink href="warga">Data Warga</Nav.ItemLink> */}

              <Nav.ItemLink href="keluarga"></Nav.ItemLink>
            </Navbar.Nav>
            {/* <Form inline my="2 lg-0">
              <Form.Input type="search" placeholder="Search" mr="sm-2" />
              <Button outline info my="2 sm-0">Search</Button>
            </Form> */}
        {!state.isLogin && (

             <div id="wrapBtnSign">
              <button id="btnLogin" className="mr-2  my-2" onClick={() => setshow(true)} >
                <p id="textBtnLogin"> Login</p>
              </button>
            </div>
        
        )}

       
            
             <ModalSignin ClickHereLogin={ClickHereLogin} show={show} handleClose={() => setshow(false)} 
              // className="Modal"
              // overlayClassName="Overlay"
             handleLogin={dispatch} />

            <ModalSignup
            showSignup={showSignup}
            ClickHereRegister={ClickHereRegister}
            handleClose={() => setshowSignup(false)}
            // className="Modal"
          //  overlayClassName="Overlay"
            /> 
          </Collapse>
        </Navbar>
        </>
        );
  
    }
    const Heads = withRouter(Hed);
    export default Heads