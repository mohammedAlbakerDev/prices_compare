import React from 'react';
import { Layout } from 'antd';
import SideBar from './components/sideBar';
import LocalStorageProvider from './context/localStorageContext';
import './App.css'
const App = () => (
  <LocalStorageProvider>

      <Layout style={{ minHeight: '100vh'}}>
        <SideBar />

      </Layout>

  </LocalStorageProvider>
);

export default App;
