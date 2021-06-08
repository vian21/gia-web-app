import { Switch, Redirect, Route } from 'react-router-dom';
import cookies from 'js-cookie';

//pages
import Login from './views/Login'
import SignUp from './views/signup/index'

import Settings from './views/settings/';
import EditSettings from './views/settings/EditSettings'

import Navbar from './components/NavBar';
import Footer from './components/Footer';

//Sign up process
import Verify from './views/signup/Verify';          //collect name and id namber
import Code from './views/signup/Code';              //enter code sent via email
import SetPassword from './views/signup/SetPassword';

//UI
import Post from './views/Post';

export default function App() {

  //global variable for genders
  window.genders = ['Male', 'Female'];

  const authenticated = (page) => {
    if (cookies.get('token')) {
      return page;

    } else {
      return <Redirect to='/login' />
    }
  }

  return (
    <Switch>
      {/* UI pages */}
      <Route exact path='/'>
        {authenticated(<div>
          <Navbar />
          <Footer />
        </div>)}
      </Route>

      {/* Post */}
      <Route exact path='/posts/:id'>
        {authenticated(<div>
          <Post />
          <Footer />
        </div>)}
      </Route>

      {/* setting tab */}
      <Route exact path='/settings'>
        {authenticated(<div>
          <Navbar />

          <Settings />

          <Footer />
        </div>)}
      </Route>

      <Route exact path='/settings/edit'>
        {authenticated(<div>

          <EditSettings />

          <Footer />
        </div>)}
      </Route>

      {/* Login */}
      <Route exact path='/login'>
        <Login />
      </Route>

      {/* Signup process */}
      {/* step 1: check if user exists in database */}
      <Route exact path='/signup'>
        <SignUp />
      </Route>

      {/* step 2: collect user email and send email verfication */}
      <Route exact path='/signup/verify/:id'>
        <Verify />
      </Route>

      {/* step 3: require and check the code via to email or text*/}
      <Route exact path='/signup/code/:id'>
        <Code />
      </Route>

      {/* step 4: set password and login user */}
      <Route exact path='/signup/set-password/:id/:code'>
        <SetPassword />
      </Route>

    </Switch>
  );
}
