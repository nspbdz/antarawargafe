import { useState, useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/userContext";
import ModalSignin from "./components/modal/ModalSignin"
import Home from "./pages/Home";
import Header from "./components/Header";
// import Header from "./components/Header";
import Heads from "./components/Heads"
import Warga from "./pages/Warga";
import Keluarga from "./pages/Keluarga";
import Hunian from "./pages/Hunian";
import Status from "./pages/Status";
import Kepemilikan from "./pages/Kepemilikan";

import Bookmark from "./pages/Bookmark";
import DetailJourney from "./pages/DetailJourney"
// import AddJourney from "./pages/AddJourney"

import ListJourney from "./pages/ListJourney"
import AddJourney from "./pages/AddJourney"
import UpdateJourney from "./pages/UpdateJourney"

import AddWarga from "./pages/AddWarga"
import UpdateWarga from "./pages/UpdateWarga"

import AddKeluarga from "./pages/AddKeluarga"
import UpdateKeluarga from "./pages/UpdateKeluarga"

import AddHunian from "./pages/AddHunian"
import UpdateHunian from "./pages/UpdateHunian"

import AddStatus from "./pages/AddStatus"
import UpdateStatus from "./pages/UpdateStatus"

import AddKepemilikan from "./pages/AddKepemilikan"
import UpdateKepemilikan from "./pages/UpdateKepemilikan"


import { API, setAuthToken } from "./config/api";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
console.log(localStorage.token)
function App() {
  const [show, setshow] = useState(false);
  const [newCheckUser, setNewCheckUser] = useState(false);

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  // console.clear();

  // console.log(state);
  // console.log(state.user.listAs);
  console.log(localStorage.token)
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!state.isLogin) {
      setshow(true);
    }
    //   // Redirect Auth
    if (state.isLogin === false) {
      history.push("/");
    }
    // else {
    //   if (state.user.listAs === 1) {
    //     history.push("/");
    //   } else if (state.user.listAs === "customer") {
    //     history.push("/");
    //   }
    // }
    return () => {
      setshow(false)
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // console.log(response)
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      console.log(response);

      // Get user data
      let payload = response.data.data.user;
      console.log(payload)
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
// }, [newCheckUser]);
  // console.log(checkUser)
  return (
    <>
      {/* <Header /> */}
      <Heads />
      

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/journey/:id" component={DetailJourney} />
        <Route exact path="/listjourney" component={ListJourney} />
        <Route exact path="/addjourney" component={AddJourney} />
        <Route exact path="/updatejourney/:id" component={UpdateJourney} />
        <Route exact path="/updatejourney/:id" component={UpdateJourney} />
      
        <Route exact path="/addwarga" component={AddWarga} />
        <Route exact path="/Updatewarga/:id" component={UpdateWarga} />

        <Route exact path="/addkeluarga" component={AddKeluarga} />
        <Route exact path="/Updatekeluarga/:id" component={UpdateKeluarga} />

        <Route exact path="/addhunian" component={AddHunian} />
        <Route exact path="/Updatehunian/:id" component={UpdateHunian} />
        
        <Route exact path="/addstatus" component={AddStatus} />
        <Route exact path="/Updatestatus/:id" component={UpdateStatus} />
       
        <Route exact path="/addkepemilikan" component={AddKepemilikan} />
        <Route exact path="/Updatekepemilikan/:id" component={UpdateKepemilikan} />
       
        <Route exact path="/warga" component={Warga} />
        <Route exact path="/keluarga" component={Keluarga} />
        <Route exact path="/hunian" component={Hunian} />
        <Route exact path="/status" component={Status} />
        <Route exact path="/kepemilikan" component={Kepemilikan} />

        
        <Route exact path="/bookmark" component={Bookmark} />

      </Switch>

    </>
  );
}

export default App;
