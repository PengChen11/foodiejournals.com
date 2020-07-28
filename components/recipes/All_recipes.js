
const All_recipes = (props) => {
  
  let url = '/details/';
  let cards = [];
  for (let i = 0; i<props.data.length; i++){
    cards.push(
      <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3" key={props.data[i].id}>
        <div className="meal-card card mx-auto">
          <img className="meal-img card-img-top d-block mx-auto" src={props.data[i].img_src_1 } alt="breakfast"/>
          <div className="card-body">
            <h5 className="card-title">{props.data[i].title}</h5>
            <a href={url+props.data[i].id.toString()} className="btn btn-primary stretched-link">Learn to cook it</a>
          </div>
        </div>
      </div>

    )
  }


  return (
    <div className="container mb-3" id="all-meals">
      <div className="row justify-content-start">
        {cards}
      </div>
    </div>
)}

export default All_recipes;
