import './common_styles.css';
import Header from './header';
import Footer from './footer';
import Home from '../Home';
import Details from '../Details';
import Favorites from '../Favorites';
import { useLocation } from 'react-router-dom';

function Parent() {

    const location = useLocation();
    let pageName = location.pathname.includes('Favorites') ? 'Favorites' : 'Home';

    return (
        <div className='Parent'>
            <Header pageName={pageName.toLowerCase()} />
            { location.pathname.includes('Favorites') ? <Favorites /> : ( location.pathname.includes('Details') ? <Details /> : <Home />) }
            <Footer />
        </div>
    );
}

export default Parent;