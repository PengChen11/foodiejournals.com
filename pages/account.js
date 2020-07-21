import RecipeForm from '../components/account/Form';
import axios from 'axios';
import React from 'react';
import Layout from '../components/layout/Layout'
import Router from 'next/router';
import { search } from '../components/url_back';
const url = require("../components/url_back");
const post_url = url+'api/recipes/create/'

export default class Account extends React.Component {
  constructor(props) {
      super(props);
      this.recipeCreateHandler = this.recipeCreateHandler.bind(this);
      this.findUserId = this.findUserId.bind(this);
      
  }
  componentDidMount = () => {

    const user = sessionStorage.getItem('foodiejournals-user');
    const access = sessionStorage.getItem('foodiejournals-access-token');

    if (!user || !access) {
      Router.push('/');
    } else{
      this.findUserId(user);
    }
  };

  async findUserId (user){
    let url = require('../components/url_back');
    let searchUrl = `${url}api/users/?search=${user}`
    let response = await axios.get(searchUrl);
    sessionStorage.setItem('foodiejournals-user-id', response.data[0].id)
  }

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
        const refreshRes = await axios.post(refresh_url, refreshToken);
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
