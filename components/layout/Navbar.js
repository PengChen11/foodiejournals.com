import Link from 'next/link';

import Login from './Login';
import Signup from './Signup';
import Search_form from './Search_form';
import React from 'react';
import axios from 'axios';
import Router from 'next/router';
const url = require("../url_back");
const register_url = url+'api/users/register/'
const login_url = url+'api/token/'
const refresh_url = url+'api/token/refresh/'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.accountCreateHandler = this.accountCreateHandler.bind(this);
    this.accountLoginHandler = this.accountLoginHandler.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.accountToken = this.accountToken.bind(this);
  }
  
  componentDidMount = () => {

    const user = localStorage.getItem('foodiejournals-user');
    const access = localStorage.getItem('foodiejournals-access-token');

    if (user && access) {
      $('#login-tab').addClass('d-none');
      $("#create-tab").addClass('d-none');
      $("#logout-tab").removeClass('d-none');
      $("#my-account").removeClass('d-none');
    } else {
      $('#login-tab').removeClass('d-none');
      $("#create-tab").removeClass('d-none');
      $("#my-account").addClass('d-none');
      $("#logout-tab").addClass('d-none');
    }

  };
  signOutHandler(e){
    window.localStorage.clear();
  }


  async accountToken(response){
    let accessToken = response.data.access;
    // console.log(accessToken)

    const refreshRes = await axios.post(refresh_url, {refresh:response.data.refresh});
    // console.log('refreshed token', refreshRes.data)
    accessToken = refreshRes.data.access;

    localStorage.setItem("foodiejournals-access-token", accessToken);

    Router.push('/account');
  }

  async accountCreateHandler(account){
    try {
      const register_res = await axios.post(register_url, account);
      const log_in = await this.accountLoginHandler(account);
      $('#modalRegisterForm').modal('hide');
    }
    catch{
      
      $('#signup-error').toggleClass('d-none');
    }

  }

  async accountLoginHandler(account){
    try {
      const response = await axios.post(login_url, account);
      $('#modalLoginForm').modal('hide');
      this.accountToken(response);
      localStorage.setItem("foodiejournals-user", account.email);
    }
    catch {
      $('#wrong-password').toggleClass('d-none');
    }
  }


  //Nav tab render based on login statuc



  render(){

    return(
      <nav className="container navbar navbar-expand-lg navbar-light mt-3 mb-3">
        <Link href="/">
          <a className="navbar-brand ml-3 d-none d-sm-inline-block">
            <img className="nav-img rounded-circle" src="assets/logo.png" alt="Logo" style={{width:"80px"}}/>
          </a>
        </Link>
        <Link href="/">
          <a className="navbar-brand d-inline-block mx-auto">
            <h1>Foodie Journals</h1>
          </a>

        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse w-50 flex-md-column " id="navbarCollapse">

          <Search_form/>
          <ul className="navbar-nav ml-auto large mb-2 mb-md-0">
            <li className="nav-item active">
              <a className="nav-link py-2 ml-3 mt-3" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link py-2 ml-3 mt-3" href="/recipes">Recipes</a>
            </li>
            <li className="nav-item" id="login-tab">
              <a className="nav-link py-2 ml-3 mt-3" href="#modalLoginForm" data-toggle="modal">Login</a>
            </li>
            <li className="nav-item d-none" id="my-account">
              <a className="nav-link py-2 ml-3 mt-3" href="/account">My Account</a>
            </li>
            <li className="nav-item" id="create-tab">
              <a className="nav-link py-2 ml-3 mt-3" href="#modalRegisterForm" data-toggle="modal">Create Account</a>
            </li>
            <li className="nav-item d-none" id="logout-tab">
              <a className="nav-link py-2 ml-3 mt-3" href="/" onClick={this.signOutHandler}>Log Out</a>
            </li>
          </ul>
        </div> {/* collapse navbar-collapse */}
        
        <Login onAccountLogin={this.accountLoginHandler}/>
        <Signup onAccountCreate={this.accountCreateHandler}/>


      </nav>
    )
  }
}

export default Navbar;
