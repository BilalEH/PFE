import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {AuthProvider} from "./api/auth.jsx";
// import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AdminSlice } from './api/adminsStore/adminStore.js';


const store=configureStore({
  reducer:{
    'admins':AdminSlice.reducer,
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)
