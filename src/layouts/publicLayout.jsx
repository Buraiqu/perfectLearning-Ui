import {Outlet} from 'react-router-dom'
import CustomNavbar from '../components/Navbar/navbar';
import CustomFooter from '../components/Footer/footer';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const PublicLayout = () => {
  const {user} = useContext(AuthContext)

  return (
    <>
      <CustomNavbar user={user}/>
        <main>
          <Outlet/>
        </main>
      <CustomFooter/>
    </>
  );
};
  
export default PublicLayout;