
const Carousel = (props) => {
  let url = '/details/'
  let slides = [];
  let active_tracker = -1;
  for (let i=0; i< props.data.all.length; i++){
      if (active_tracker===-1){
        if (props.data.all[i].img_src_2 !== ''){
          slides.push(
            <div key={props.data.all[i].id} className="carousel-item active ">
              <a href={url+props.data.all[i].id.toString()}>
                <img className="carousel-img d-block m-5 mx-auto" src={props.data.all[i].img_src_2} alt=" slide"/>
              </a>
            </div>
          )
          active_tracker = i;
        }
      }
      else {
        slides.push(
          <div key={props.data.all[i].id} className="carousel-item ">
            <a href={url+props.data.all[i].id.toString()}>
                <img className="carousel-img d-block  m-5 mx-auto" src={props.data.all[i].img_src_2} alt=" slide"/>
              </a>
          </div>
        )
      }

  }

  
  return (
    <div className="container p-0">
        <div id="carouselControls" className="carousel slide " data-ride="carousel">
            <div className="carousel-inner ">
                <div className="carousel-container">
                  {slides}  
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    </div>

)}

export default Carousel;
