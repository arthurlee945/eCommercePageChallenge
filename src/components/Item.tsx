import React,{ useState, useEffect } from "react";
import ProductImages from "./Product-Images";
import cartIcon from "../assets/icon-cart.svg";
import product from "../assets/image-product-1.jpg";
import product2 from "../assets/image-product-2.jpg";
import product3 from "../assets/image-product-3.jpg";
import product4 from "../assets/image-product-4.jpg";

const Item:React.FC<any> = (props:any) => {
  const[selected, setSelected] = useState<string>("");
  const[imgFile, setImgFile] = useState();
  const[detailed, setDetailed] = useState<boolean>(false);
  const[arrowInput, setArrowInput] = useState<number>(0);
  const imgs = [product, product2, product3, product4];

  useEffect(()=>{
    document.getElementById("1")?.classList.add("selected");
    setImgFile(imgs[0]);
    setSelected("product1");
  },[]);
  useEffect(()=>{
    setImgFile(imgs[arrowInput]);
    setSelected("productImg"+arrowInput);
  },[arrowInput])
  const handleClick = (e:any) => {
    let img = e.target as HTMLElement;
    let idNum = parseInt(img.getAttribute("id") as string);
    setSelected("product" + idNum);
    setImgFile(imgs[idNum-1]);
    Array.from((document.querySelector(".imgOptions") as HTMLElement).children).forEach((img)=>{
      img.classList.remove("selected");
    });
    img.classList.add("selected")
  };
  const handleArrowClick = (e:any) =>{
    console.log("hello")
    let direction = (e.target as HTMLElement).getAttribute("id");
    if(direction === "left"){
      let inputId = arrowInput === 0? 0 : arrowInput - 1;
      setArrowInput(inputId)
    }else{
      let inputId = arrowInput === 3? 3 : arrowInput + 1;
      setArrowInput(inputId)
    }
  }
  const handleCount = (e:any) => {
    let count = (e.target as HTMLElement).getAttribute("id");
    if(count === "minus"){
      let num = props.itemCount === 0? 0 : props.itemCount - 1;
      props.setItemCount(num);
    }else{
      props.setItemCount(props.itemCount+1);
    }
  }
  const handleAddToCart = () => {
    props.setAddToCart(true)
  }
  return(
    <div className="itemContainer">
      {window.innerWidth > 480?
        <div className="imgBox">
          <img className ="mainProductImg" src = {imgFile} alt ={selected} onClick={()=>setDetailed(true)} />
          <div className="imgOptions">
            <img id ="1" src = {imgs[0]} alt ="productTN" onClick = {handleClick}/>  
            <img id ="2" src = {imgs[1]} alt ="product2TN" onClick = {handleClick}/>
            <img id ="3" src = {imgs[2]} alt ="product3TN" onClick = {handleClick}/>
            <img id ="4" src = {imgs[3]} alt ="product4TN" onClick = {handleClick}/>
          </div>
        </div>:
        <div className="mobileImgBox">
          <i id ="left" className="fa-solid fa-chevron-left" onClick = {handleArrowClick}></i>
          <img className ="detailedImg" src = {imgFile} alt ={selected} draggable ="false"/>
          <i id = "right" className="fa-solid fa-chevron-right" onClick = {handleArrowClick}></i>
        </div>
      }
      <div className="descriptionBox">
        <div className="descriptions">
          <p className="logo">Sneaker Company</p>
          <h1 className="title">Fall Limited Edition Sneakers</h1>
          <p className="descripitionText">
            These low-profile sneakers are your perfect casual wear companion. Featuring a 
            durable rubber outer sole, they’ll withstand everything the weather can offer.
          </p>
          <div className="pricingInfo">
            <div className="priceBox">
              <h1 className="price">$125.00</h1>
              <p>50%</p>
            </div>
            <p className="originalPrice">$250.00</p>
          </div>
          <div className="purchaseBtns">
            <div className="counts">
              <i id = "minus" className="fa-solid fa-minus" onClick = {handleCount}></i>
              {props.itemCount}
              <i id = "plus" className="fa-solid fa-plus" onClick = {handleCount}></i>
            </div>
            <button onClick = {handleAddToCart}><img src ={cartIcon} alt="cartIcon" />Add to cart</button>
          </div>
        </div>
      </div>
      {detailed && window.innerWidth > 480 && <ProductImages detailed = {setDetailed} imgs ={imgs}/>}
    </div>
  )
}

export default Item;