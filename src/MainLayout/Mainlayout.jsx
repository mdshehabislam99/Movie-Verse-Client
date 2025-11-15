import React from 'react';
import Footer from '../Components/Footer/Footer';
import { Outlet} from 'react-router';
import Navbar from '../Components/Headers/Navbar';

const Mainlayout = () => {
     
     return (
       <div>
         <Navbar />
         <Outlet></Outlet>
         <Footer></Footer>
       </div>
     );
};

export default Mainlayout;