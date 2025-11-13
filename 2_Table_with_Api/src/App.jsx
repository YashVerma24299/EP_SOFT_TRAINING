import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductDetail from "./ProductDetail";
import NotFound from './NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id/:blogid " element={<ProductDetail />} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}
