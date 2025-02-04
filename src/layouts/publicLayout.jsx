import {Outlet} from 'react-router-dom'
import CustomNavbar from '../components/Navbar/navbar';
import CustomFooter from '../components/Footer/footer';

const PublicLayout = () => {
    return (
      <>
        <CustomNavbar/>
        <main>
          <Outlet />
        </main>
        <CustomFooter/>
      </>
    );
  };
  
  export default PublicLayout;