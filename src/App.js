// TODO: Current outfit should only pull drafted outfit if it belongs to current user

import logo from './logo.svg';
import './reactTags.css'
import './App.css';
import { TopNavbar } from './components/TopNavbar';
import { BottomNavbar } from './components/BottomNavbar';
import { Routes, Route, Switch } from 'react-router';
import { AddClosetItem } from './components/AddClosetItem'
import { CurrentOutfit } from './components/CurrentOutfit';
import { Profile } from './components/Profile';
import { ViewOutfits } from './components/ViewOutfits';
import { Auth } from './components/Auth';
import { Closet } from './components/Closet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ViewOutfit } from './components/ViewOutfit';
import useLocalStorageState from 'use-local-storage-state';
import { ProtectedRoutes } from './components/ProtectedRoutes';


function App() {
  const [currOutfit, setCurrOutfit] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [token, setToken] = useLocalStorageState('StyleHubToken', null )
  const [username, setUsername] =  useLocalStorageState('StyleHubUsername', '')

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)

  }

  useEffect(() => {
    axios
      .get('https://stylehub.herokuapp.com/myoutfits/',
      {
          headers: {
              Authorization: `Token ${token}`,
          },
      })
      .then((res) => {
        for (const outfit of res.data) {
          if (outfit.draft === true) {
            setCurrOutfit(outfit)
            break;
          }
        }
        setLoading(false)
        
      })
      .catch((err) => setError(err.response.data.error))
}, [])

const isLoggedIn = username && token

  return (
  
    <div className="App">
      {isLoggedIn && (
      <TopNavbar />
      )}
        <Routes>
          <Route index element={<Auth setAuth={setAuth} isLoggedIn={isLoggedIn} />} /> 
          <Route path="*" element={<Auth setAuth={setAuth} isLoggedIn={isLoggedIn} />} />
          <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
            <Route path="closet" element={<Closet  currOutfit={currOutfit} token={token} />} />
            <Route path="add-item" element={<AddClosetItem token={token} />} />
            <Route path="current-outfit" element={<CurrentOutfit currOutfit={currOutfit} setCurrOutfit={setCurrOutfit} loading={loading} setLoading={setLoading} token={token} />} />
            <Route path="user/1" element={<Profile />} />
            <Route path="outfits" element={<ViewOutfits token={token}/>} />
            <Route path="outfit/:id" element={<ViewOutfit token={token}/>} />
          </Route>
        </Routes>
      {isLoggedIn && (
      <BottomNavbar />
      )}
    </div>
  );
}

export default App;
