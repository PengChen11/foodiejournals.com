import React from 'react';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';

// import from components
import Login from './Login';
import Signup from './Signup';
import Search_form from './Search_form';


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
    this.findUserId = this.findUserId.bind(this);
  }
  
  componentDidMount = () => {

    const user = sessionStorage.getItem('foodiejournals-user');
    const access = sessionStorage.getItem('foodiejournals-access-token');

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
    window.sessionStorage.clear();
  }


  async findUserId (user){
    // let url = require('../components/url_back');
    let searchUrl = `${url}api/users/?search=${user}`
    let response = await axios.get(searchUrl);
    sessionStorage.setItem('foodiejournals-user-id', response.data[0].id)
  }


  async accountToken(response){
    let accessToken = response.data.access;
    let refreshToken = response.data.refresh;
    sessionStorage.setItem("foodiejournals-access-token", accessToken);
    sessionStorage.setItem("foodiejournals-refresh-token", refreshToken);
    const user = sessionStorage.getItem('foodiejournals-user');
    this.findUserId(user);

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
      sessionStorage.setItem("foodiejournals-user", account.email);
      this.accountToken(response);
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
