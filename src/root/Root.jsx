import { Outlet } from 'react-router-dom';
import MenuBar from '../components/MenuBar';

const Root = () => {
    return (
        <div>
          <MenuBar></MenuBar>
          <Outlet></Outlet>  
        </div>
    );
};

export default Root;