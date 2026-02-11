import Register from "./pages/Register"
import Login from "./pages/Login"
import { createBrowserRouter, RouterProvider,Navigate, replace } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import { ToastContainer } from "react-toastify";
const DefaultRouter = () => {
  const data=JSON.parse(localStorage.getItem("blog_rdata"))
  if(data){
    <Navigate to="/login" replace/>
  }
  else{
   <Navigate to = "/register" replace/>
  }
}
function App() {
   const route = createBrowserRouter([
    {
      path: "/",
      element: <DefaultRouter/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/login",
      element: <Login/>
    },{
      path: "/dashboard",
      element: <Dashboard/>
    },
   ])

  return  (<>
  <RouterProvider router={route}/>
  <ToastContainer
    position= "top-right"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
  
  </>);
}

export default App
