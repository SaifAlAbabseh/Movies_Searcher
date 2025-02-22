import './common_styles.css';
import { Link } from 'react-router-dom';

function Header({ pageName }) {
  return (
    <header className='topNavBar'>
      <div className='topNavBarElements'>
        <Link to='/Home' className={`topNavBarElement ${pageName === 'home' ? 'selected' : ''}`}>
          Home
        </Link>
        <Link to='/Favorites' className={`topNavBarElement ${pageName === 'favorites' ? 'selected' : ''}`}>
          Favorites
        </Link>
      </div>
    </header>
  );
}

export default Header;