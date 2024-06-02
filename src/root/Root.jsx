import { Outlet } from 'react-router-dom';
import MenuBar from '../components/MenuBar';

const Root = () => {
  return (
    <div>
      <div className='fixed w-full bg-white px-2 navbar'>
        <MenuBar></MenuBar>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;