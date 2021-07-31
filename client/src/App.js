import { useContext } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import cookies, { set } from 'js-cookie';

//pages
import Home from './views/Home';
import StatusList from './views/StatusList';
import StatusView from './views/StatusView';

import Conversations from './views/Conversations';
import Chat from './views/Chat';


import Login from './views/Login'
import Logout from './views/Logout'

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
import PostView from './views/Post';
import NewPost from './views/NewPost';
import { FooterProvider } from './context/FooterContext';

import Listener from './components/Listener';

export default function App() {

  //global variable for genders
  window.genders = ['Male', 'Female'];

  //dark mode toogle
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  document.getElementById('root').classList.add("h-screen", "dark:bg-gray-900", "dark:text-white")


  const authenticated = (page) => {
    if (cookies.get('token')) {
      return page;

    } else {
      return <Redirect to='/login' />
    }
  }

  return (
    <FooterProvider>
      <Listener />
      <div className="h-full">
        <Switch>
          {/* UI pages */}
          <Route exact path='/'>
            {authenticated(<div>
              <Navbar />

              <Home />

              <Footer />
            </div>)}
          </Route>

          <Route exact path='/chat'>
            {authenticated(<div className="h-full">

              <Conversations />
              <Footer />
            </div>)}
          </Route>

          <Route exact path='/chat/:userId'>
            {authenticated(<div className="h-full">
              <Chat />
            </div>)}
          </Route>

          <Route exact path='/status'>
            {authenticated(<div className="h-full">
              {/* <Navbar /> */}

              <StatusList />

              <Footer />
            </div>)}
          </Route>

          <Route exact path='/status/:index'>
            {authenticated(<div className="h-full">
              {/* <Navbar /> */}

              <StatusView />

              <Footer />
            </div>)}
          </Route>

          {/* Post */}
          <Route exact path='/posts/create'>
            {authenticated(<div className="h-full">
              <NewPost />
            </div>)}
          </Route>

          <Route exact path='/posts/:id'>
            <div className="h-full">
              <PostView />
              <Footer />
            </div>
          </Route>

          {/* setting tab */}
          <Route exact path='/settings'>
            {authenticated(<div className="h-full">
              <Navbar />

              <Settings />

              <Footer />
            </div>)}
          </Route>

          <Route exact path='/settings/edit'>
            {authenticated(<div className="h-full">

              <EditSettings />

              <Footer />
            </div>)}
          </Route>

          {/* Login */}
          <Route exact path='/login'>
            <Login />
          </Route>

          {/* Logout */}
          <Route exact path='/logout'>
            <Logout />
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
      </div>
    </FooterProvider>
  );
}
