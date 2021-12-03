import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { checkUser, getSummonersName, getPendingPetitions, getUserLogged } from "./action";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import LoadingProfile from "./components/LoadingProfile/LoadingProfile";
import NewPetition from "./components/NewPetition/NewPetition";

function App() {

  const dispatch = useDispatch();
  const userLoggedIn = useSelector(state => state.userLoggedIn);
  const pendingPetitions = useSelector(state => state.petitionsPending)
  const summonersNames = useSelector(state => state.users)
  const champList = useSelector(state => state.champList)
  const userLogged = useSelector(state => state.userLogged)
  const [voted, setVoted] = useState(false)

  useEffect(() => {
    dispatch(checkUser());
    dispatch(getSummonersName());
    dispatch(getPendingPetitions());
    dispatch(getUserLogged());
  }, [])

  console.log("USER LOGGED: ", userLogged )

  useEffect(() => {
    dispatch(getPendingPetitions());
}, [voted])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {userLoggedIn ? 
          <Home 
            users={summonersNames}
            pendingPetitions={pendingPetitions}
            voted={voted}
            setVoted={setVoted}
            userLogged={userLogged}
          /> 
          : 
          <SignIn />}
        </Route>
        <Route exact path="/signin">
          <SignIn 
            
          />
        </Route>
        <Route exact path="/signup">
          <SignUp 
            
          />
        </Route>
        <Route exact path="/summoner/:summonerName">
            <LoadingProfile 
              userLogged={userLogged}
            />
        </Route>
        <Route exact path="/newPetition">
            <NewPetition 
              champList={champList}
              summonersNames={summonersNames}
            />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
