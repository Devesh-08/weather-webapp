import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Favorites from "./pages/Favorites"
import History from "./pages/History"
import Register from "./pages/Register"
import ProtectedRoute from "./component/ProtectedRoute"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/favorites" element={
          <Favorites/>
        }/>
      <Route path="/history" element={
          <History/>
      }
        />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
