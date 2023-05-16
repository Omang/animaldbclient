
import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Layout from './components/Layout'
import ResetPage from './pages/ResetPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import { useEffect } from 'react'
import AccountPage from './pages/AccountPage'
import AllanimalsPage from './pages/AllanimalsPage'
import OrglistPage from './pages/orglistPage'
import OrgsPage from './pages/OrgsPage'
import OrgformPage from './pages/OrgformPage'
import OrgmainPage from './pages/OrgmainPage'
import UserformPage from './pages/UserformPage'
import OwnersPage from './pages/OwnersPage'
import OrganimalPage from './pages/OrganimalPage'
import OwnerformPage from './pages/OwnerformPage'
import OwnermainPage from './pages/OwnermainPage'
import AnimalformPage from './pages/AnimalformPage'
import AnimalPage from './pages/AnimalPage'
import AnimaleditPage from './pages/AnimaleditPage'
import AnimalownerPage from './pages/AnimalownerPage'
import Notification from './utils/Notification'


axios.defaults.baseURL = 'http://127.0.0.1:5000/api';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>

      <Route index element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/passwordreset' element={<ResetPage />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='/account/org' element={<OrgsPage />} />
      <Route path='/account/animals' element={<AllanimalsPage />} />
      <Route path='/account/org/new' element={<OrgformPage />} />
      <Route path='/account/org/:id' element={<OrgmainPage />} />
      <Route path='/account/org/editorg/:id' element={<OrgformPage />} />
      <Route path='/account/org/adduser/:id' element={<UserformPage />} /> 
      <Route path='/account/owners' element={<OwnersPage />} />
      <Route path='/account/owners/owner/:id' element={<OwnermainPage />} />
      <Route path='/account/owners/addanimal/:id' element={<AnimalformPage />} />
      <Route path='/account/owners/getanimal/:animalid/:ownerid' element={<AnimalPage />} />
      <Route path='/account/owners/updateanimal/:animalid/:ownerid' element={<AnimaleditPage />} />
      <Route path='/account/owners/updateowner/:id' element={<OwnerformPage />} />
      <Route path='/account/owners/new' element={<OwnerformPage />} />
      <Route path='/account/organimals' element={<OrganimalPage />} />   
      <Route path='/account/getanimalowner/:id' element={<AnimalownerPage />} />  
     
      </Route>
      
    </Routes>
    <Notification />
    </UserContextProvider> 
      
  )
}

export default App
