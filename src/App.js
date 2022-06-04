
import './App.css';
import {
  Routes,
  Route,
  Navigate
 
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import RequireAuth from "./components/requireAuth";

import EditProfile from './components/EditProfile/EditProfile';
// import useAuth from "./components/useAuth/useAuth";
// import { UserInfoContext } from './components/context/userContext';
import Home from './components/Pages/Home';
import Landingpage from './components/Pages/Landingpage';
import ThreadView from './components/ThreadView/ThreadView';
import Register from './components/Register/Register';
import SuccessPage from './components/SuccessPage/SuccessPage';
import VisitorPage from './components/VisitorPage/VisitorPage';
import PageNotFound from "./components/404Page/PageNotFound";
import Refresh from "./components/Refresh/Refresh"

import PersistLogin from './components/PersistLogin/PersistLogin';

import Fileupload from './testcomponents/Fileupload';


function App() {

  return (
    <div className="App container">

      <Routes>

        <Route path="/refresh" element={<Refresh/>} />

        <Route path="/" element={<Landingpage />} />

        {/* <Route path="/register" element={<Register loadUser={loadUser} />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<SuccessPage/>} />


          <Route element={<PersistLogin/>}>
            {/* <Route element={<RequireAuth loadUser={loadUser} />} > */}
            <Route element={<RequireAuth />} >
    
                {/* <Route  path="/home/:id" element={<Home loadUser={loadUser}/>} /> */}
                <Route  path="/home/" element={<Home />} />
                {/* <Route path="/loading/user/:id" element={<LoadingUser loadUser={loadUser}/>} /> */}
                <Route path="/home/*" element={<Navigate replace to="/home/" />} />
                <Route path="/profile/edit/" element={<EditProfile />} />



            </Route>
      
                    
          
            <Route path="/thread/:comment_id" element={<ThreadView></ThreadView>}></Route>
            <Route path="/users/:id" element={
              <ErrorBoundary>

                <VisitorPage/>
              </ErrorBoundary>
              } />
            <Route path="/tags/:id" element={<VisitorPage/>} />
            <Route path="/tags/name/:id" element={<VisitorPage/>} />
            <Route path="/users/nickname/:id" element={<VisitorPage/>} />

            <Route path="/comment/thread/:id" element={<VisitorPage/>} />


            {/* <Route path="/test" element={<VisitorPage/>}/> */}
            <Route path="*" element={<PageNotFound />} />

        </Route> 

        <Route path="/test/file/upload/" element={<Fileupload/>}></Route>
      </ Routes>

    </div>
  );
}

export default App;
