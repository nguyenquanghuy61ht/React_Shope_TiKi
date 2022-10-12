import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Features/Home";
import ProductFeature from "Features/Product/index";
import DetailPage from "Features/Product/pages/DetailPage";
import CartFeature from "Features/Cart/index";
import Footer from "component/Footer/footer";
import { useState, createContext } from "react";

function App() {
  const UserContext = createContext();
 const setList=(data)=>{
console.log(data)
 }
  return (
    <div className="App">
      <header className="App-header">
        <Header  />
      </header>
      <Routes>
        <Route path="/*" element={<ProductFeature />} />
        <Route
          path="/products/*"
          element={
            <UserContext.Provider value={(setFilter) => setList(setFilter)}>
              <ProductFeature />
            </UserContext.Provider>
          }
        />
        <Route path="/product/:productId/*" element={<DetailPage />} />
        <Route path="/cart" element={<CartFeature />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
