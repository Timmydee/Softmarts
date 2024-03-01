import CartPage from './Components/CartPage';
import Navbar from './Components/Navbar'
import Products from './Components/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </Router>
  )
}


export default App;
