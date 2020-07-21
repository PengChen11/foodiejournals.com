import Layout from '../../components/layout/Layout';
import React from 'react';
import axios from 'axios';
import Router from 'next/router';




class Recipe_info extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      access: null,
    }
    this.deleteHandler = this.deleteHandler.bind(this);
    this.url = require("../../components/url_back");
    this.delete_url = `${this.url}api/recipes/${this.props.data.id}`
  }
  componentDidMount = () => {
    const user = localStorage.getItem('foodiejournals-user');
    const access = localStorage.getItem('foodiejournals-access-token');
    if (user && access) {
      this.setState({
          user,
          access,
      });
    }

  }


  async deleteHandler(e){
    let accessToken= this.state.access;
    
    const config = {
      headers: { "Authorization": "Bearer " + accessToken }
    }
    try {
      await axios.delete(this.delete_url, config);
      Router.push('/account')
    }
    catch {
      alert("you don't own this post")
    }
  }


  render (){
    return (
      <Layout>
        <div  className="container mb-3 p-0" >
          <div className="col-12 mb-3">
            <div key={this.props.data.id} className="meal-details card mx-auto m-0">
              <img className=" meal-details-img d-block mx-auto m-4" src={this.props.data.img_src_1 } alt="breakfast"/>
              <div className="card-body" style={{ whiteSpace: "pre-wrap"}}>
                <h4 className="card-title">{this.props.data.title}</h4>
                <h6 className="card-subtitle">
                  {this.props.data.description}
                </h6>
                <h5 className="card-subtitle mr-3 mt-3 mb-3">Meal Type</h5>
                <p className="card-text">
                  {this.props.data.meal_type}
                </p>
                <h5 className="card-subtitle mr-3 mt-3 mb-3">Ingredients</h5>
                <p className="card-text">
                  {this.props.data.ingredients}
                </p>
                <h5 className="card-subtitle mr-3 mt-3 mb-3">Steps</h5>
                <p className="card-text">
                  {this.props.data.steps}
                </p>
                <button className="btn-primary justify-self-center d-block" onClick={this.deleteHandler}>Delete this recipe</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Recipe_info;

export async function getServerSideProps(context){
  const id = context.query.id;
  const url = require("../../components/url_back");

  const response = await fetch(`${url}api/recipes/${id}`);

  const data = await response.json();

  return {
    props: {
      data:data
    }
  }
}