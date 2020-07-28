import RecipeForm from '../components/account/Form';
import axios from 'axios';
import React from 'react';
import Layout from '../components/layout/Layout'
import Router from 'next/router';


const url = require("../components/url_back");
const post_url = url+'api/recipes/create/';
const refresh_url = url+'api/token/refresh/';

export default class Account extends React.Component {
  constructor(props) {
      super(props);
      this.recipeCreateHandler = this.recipeCreateHandler.bind(this);
      
  }
  componentDidMount = () => {

    const user = sessionStorage.getItem('foodiejournals-user');
    const access = sessionStorage.getItem('foodiejournals-access-token');

    if (!user || !access) {
      Router.push('/');
    } 
  };


  async recipeCreateHandler(recipe) {
    // console.log(recipe);
    recipe.author = sessionStorage.getItem('foodiejournals-user-id');
    let accessToken= sessionStorage.getItem("foodiejournals-access-token")

    const config = {
      headers: { "Authorization": "Bearer " + accessToken }
    }
    try {
      await axios.post(post_url, recipe, config);
      Router.push('/recipes')
    }
    catch {
      let refreshToken= sessionStorage.getItem("foodiejournals-refresh-token")
      try {
        const refreshRes = await axios.post(refresh_url, {refresh: refreshToken});
        accessToken = refreshRes.data.access;
        sessionStorage.setItem("foodiejournals-access-token", accessToken);
        await axios.post(post_url, recipe, config);
        Router.push('/recipes')
      }
      catch {
        alert("can't get refresh token")
      }
      
    }
  }

  

  render() {
      return (
        <Layout>
          <RecipeForm onRecipeCreate={this.recipeCreateHandler} />
        </Layout>
      )
    }
}

// export async function getServerSideProps (context){

//   const url = require("../components/url_back");
//   const UserID = window.sessionStorage.getItem('foodiejournals-user-id')

//   const response = await axios.get(`${url}api/recipes/user-list/?search:=${UserID}/`);
//   const data = await response.json();

//   return {
//     props: {
//       data : data,
//     },
//   }
// }
