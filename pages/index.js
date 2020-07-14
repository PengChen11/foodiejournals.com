import Layout from '../components/layout/Layout';
import Carousel from '../components/home/Carousel';
import Daily_meal from '../components/home/Daily_meal';


const Home = () => (
    <Layout>
        <Carousel/>
        <Daily_meal/>
    </Layout>

)

// export async function getServerSideProps (context){

//     const url = '';
//     const response = await fetch(url);
//     const data = await response.json();

//     return {
//         props: {
//             data : data,
//         },
//     }
// }

export default Home;