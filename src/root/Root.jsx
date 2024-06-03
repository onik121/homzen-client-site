import { Outlet } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import Footer from '../components/FooterBottom';

const Root = () => {
  return (
    <div>
      <div className='fixed w-full bg-white px-2 navbar z-50'>
        <MenuBar></MenuBar>
      </div>
      <Outlet></Outlet>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Root;