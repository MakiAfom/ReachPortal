import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import News from '../components/home/News';
import PublicationList from '../components/home/Publications';
import Subscribe from '../components/home/Subscribe';



const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '1px', padding: '5px' }}> {/* Adjust the margin top to accommodate the height of the Navbar */}
        <News />
        <PublicationList />
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
};

export default App;
