import {Outlet} from 'react-router-dom'
import CustomNavbar from '../components/Navbar/navbar';
import CustomFooter from '../components/Footer/footer';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { SearchProvider } from '../context/searchContext';

const PublicLayout = () => {
  const {user} = useContext(AuthContext)

  return (
    <SearchProvider>
      <CustomNavbar user={user}/>
        <main style={{minHeight: '69vh'}}>
          <Outlet/>
        </main>
      <CustomFooter/>
    </SearchProvider>
  );
};
  
export default PublicLayout;