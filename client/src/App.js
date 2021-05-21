import { Switch, Redirect, Route } from 'react-router-dom';
import cookies from 'js-cookie';

//pages
import Login from './views/Login'
import SignUp from './views/SignUp'

import Settings from './views/Settings'

import Navbar from './components/NavBar';
import Footer from './components/Footer';

//Sign up process
import Verify from './views/signup/Verify';          //collect name and id namber
import Code from './views/signup/Code';              //enter code sent via email
import SetPassword from './views/signup/SetPassword';

export default function App() {

  const authenticated = (page) => {
    if (cookies.get('token')) {
      return page;

    } else {
      return <Redirect to='/login' />
    }
  }

  return (
    <Switch>
      <Route exact path='/'>
        {authenticated(<div>
          <Navbar />
          <Footer />
        </div>)}
      </Route>

      <Route exact path='/settings'>
        {authenticated(<div>
          <Navbar />

          <Settings />

          <Footer />
        </div>)}
      </Route>

      <Route exact path='/login'>
        <Login />
      </Route>

      {/* check if user exists in database */}
      <Route exact path='/signup'>
        <SignUp />
      </Route>

      {/* collect user email and send email verfication */}
      <Route exact path='/signup/verify/:id'>
        <Verify />
      </Route>

      {/* require and check the code via to email or text*/}
      <Route exact path='/signup/code/:id'>
        <Code />
      </Route>

      {/* set password and login user */}
      <Route exact path='/signup/set-password/:id/:code'>
        <SetPassword />
      </Route>

    </Switch>
  );
}
