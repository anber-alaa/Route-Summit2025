import Layout from "./components/Layout/Layout"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Products from "./pages/Products/Products"
import Cart from "./pages/Cart/Cart"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import CartContextProvider from "./Context/CartContext"

const routes = createBrowserRouter([
  {path:'/',element: <Layout/>, children:[
    {path:'/products' , element:<Products/>},
    {path:'/productDetails/:id' , element:<ProductDetails/>},
    {path:'/cart' , element:<Cart/>},
  ]}
])

function App() {
  
  return (
    <>
    <CartContextProvider>
      <RouterProvider router={routes}/>
    </CartContextProvider>
    </>
  )
}

export default App
