import React, {useState, useEffect} from 'react';
import './App.scss';
import Navbar from "./components/Navbar";
import Item from "./components/Item"

const App = () => {
  const[itemCount, setItemCount] = useState<number>(0);
  const[addToCart, setAddToCart] = useState<boolean>(false);
  useEffect(()=>{
    if(addToCart){
      setItemCount(0);
      setAddToCart(false);
    }
  },[addToCart])
  return (
    <div className="container">
      <Navbar addToCart = {addToCart} itemCount = {itemCount} setAddToCart = {setAddToCart}/>
      <Item itemCount = {itemCount} setItemCount = {setItemCount} setAddToCart = {setAddToCart} addToCart = {addToCart}/>
    </div>
  );
}

export default App;
