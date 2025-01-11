import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductList from './ProductList'
import ProductDetails from './ProductDetails'

function App() {
 

  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={<ProductList/>} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
