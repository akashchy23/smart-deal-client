import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './components/layout/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllProducts from './components/Allproducts/AllProducts.jsx';
import Authprovider from './context/Authprovider.jsx';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import PrivateRouter from './context/PrivateRouter.jsx';
import ProductsDetails from './components/ProductDetails/ProductsDetails.jsx';
import Mybids from './components/MyBids/Mybids.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'products',
        element: <PrivateRouter>
          <AllProducts></AllProducts>
        </PrivateRouter>
      },{
        path:'/productdetails/:id',
        loader: ({params})=>fetch(`http://localhost:3000/products/${params.id}`),
        element:<ProductsDetails></ProductsDetails>
      },{
        path:'/mybids',
        element:<Mybids></Mybids>
      }
    ]
  },
  {
    path: '/signup',
    Component: Signup
  },
  {
    path: '/login',
    Component: Login
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router}></RouterProvider>
    </Authprovider>
  </StrictMode>,
)
