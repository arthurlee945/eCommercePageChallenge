import React,{ useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import profileImg from "../assets/image-avatar.png"
import cartIcon from "../assets/icon-cart.svg";
import menuIcon from "../assets/icon-menu.svg";
import thumbnail from "../assets/image-product-1-thumbnail.jpg";

const Navbar:React.FC<any> = (props:any) =>{
  const [itemAmts, setItemAmts] = useState<number>(0)
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  type ItemObject = {
    img: any;
    amount:number;
    price:number;
    itemName:string;
  }
  const [itemSelected, setItemSelected] = useState<ItemObject[]>([]);

  useEffect(()=>{
    if(props.addToCart){
      setItemAmts(itemSelected.length + 1);
      let item: ItemObject = {
        img:thumbnail,
        amount:props.itemCount,
        price:125.00,
        itemName:"Fall Limited Edition Sneakers"
      }
      setItemSelected([...itemSelected, item]);
    }
  },[props.addToCart])
 
  const handleDelete = (e:any) => {
    setItemAmts(itemSelected.length -1);
    if(itemSelected.length -1 === 0){
      setOpenCart(false);
    }
    let deleteId = (e.target as HTMLElement).getAttribute("id");
    setItemSelected(itemSelected.filter((item,i) =>{
      if(deleteId != item.itemName+i){
        return true;
      }else{
        return false;
      }
    }))
  }
  return(
    <div className="navbarContainer">
      {window.innerWidth>480?
      <div className="leftContainer">
        <img src = {logo} alt ="company logo"/>
        <a href="#">Collections</a>
        <a href="#">Men</a>
        <a href="#">Woman</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>:
      mobileMenu?
      <div className = "openMenu">
        <div className="menuSec">
          <div className="leftPart">
            <i onClick={()=>setMobileMenu(false)} className="fa-solid fa-xmark"></i>
            <a href="#">Collections</a>
            <a href="#">Men</a>
            <a href="#">Woman</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>:
      <div className = "closeMenu">
        <img id ="menuIcon" src={menuIcon} alt ="menuBtn" onClick={()=>setMobileMenu(true)}/>
        <img id ="logo" src = {logo} alt ="company logo"/>
      </div>}
      <div className="rightContainer">
        <div className="cart">
          {itemAmts > 0 ? <p>{itemAmts}</p>:""}
          <img src = {cartIcon} alt="cartIcon" onClick ={()=>setOpenCart(!openCart)}/>
        </div>
        <img id="profilePic" src ={profileImg} alt="profilePic"/>
      </div>
      {openCart&&
      <div className="cartBox">
        <p className ="cartTitle">Cart</p>
        <div className="cartContentBox">
          {itemSelected.length > 0 ?
            <div className="cartContent">
              {itemSelected.map((item,i) => {
                return(
                  <div key = {item.itemName+i} className="itemSection">
                    <img src={item.img} alt="ThumbNail" className="thumnailImg" />
                    <div className="desContainer">
                      <p className = "Title">{item.itemName}</p>
                      <p className="priceTag">${item.price}.00 x {item.amount} <b>${item.price * item.amount}</b></p>
                    </div>
                    <i id = {item.itemName+i} onClick = {handleDelete} className="fa-solid fa-trash-can"></i>
                  </div>
                )
              })}
              <button>Checkout</button>
            </div>:
            <p className = "empty">Your cart is empty</p>
          }
        </div>
      </div>
      }
    </div>
    )
}



export default Navbar;