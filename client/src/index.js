import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './component/Home';
import Schedule from './component/Schedule';
import Profile from './component/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'))
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
])

root.render(
  <Provider store={store()}>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </Provider>
)

reportWebVitals();
