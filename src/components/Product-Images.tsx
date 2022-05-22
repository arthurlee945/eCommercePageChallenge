import React,{ useState, useEffect } from "react";

const ProductImages:React.FC<any> = (props:any) => {
  const[selected, setSelected] = useState<string>("");
  const[imgFile, setImgFile] = useState();
  const[userInput, setUserInput] = useState<number>(0);
  useEffect(()=>{
    setImgFile(props.imgs[userInput]);
    setSelected("productImg"+userInput);
    Array.from((document.querySelector(".optionsBox") as HTMLElement).children).forEach((child,i)=>{
      if(i === userInput){
        child.classList.add("selected")
      }else{
        child.classList.remove("selected");
      }
    })
  },[userInput])
  const handleClick = (e:any) => {
    let selectedId = parseInt((e.target as HTMLElement).getAttribute("id") as string);
    setUserInput(selectedId-1);
  }
  const handleArrowClick = (e:any) =>{
    let direction = (e.target as HTMLElement).getAttribute("id");
    if(direction === "left"){
      let inputId = userInput === 0? 0 : userInput - 1;
      setUserInput(inputId)
    }else{
      let inputId = userInput === 3? 3 : userInput + 1;
      setUserInput(inputId)
    }
  }
  return(
    <div className="productImgsBox">
      <div className="contentBox">
        <i className="fa-solid fa-xmark" onClick = {()=>{props.detailed(false)}}></i>
        <div className="mainImgContainer">
          <i id ="left" className="fa-solid fa-chevron-left" onClick = {handleArrowClick}></i>
          <img className ="detailedImg" src = {imgFile} alt ={selected} draggable ="false"/>
          <i id = "right" className="fa-solid fa-chevron-right" onClick = {handleArrowClick}></i>
        </div>
        <div className="optionsBox">
          <img id ="1" src = {props.imgs[0]} alt ="productTN" onClick = {handleClick} draggable ="false"/>  
          <img id ="2" src = {props.imgs[1]} alt ="product2TN" onClick = {handleClick} draggable ="false"/>
          <img id ="3" src = {props.imgs[2]} alt ="product3TN" onClick = {handleClick} draggable ="false"/>
          <img id ="4" src = {props.imgs[3]} alt ="product4TN" onClick = {handleClick} draggable ="false"/>
        </div>
      </div>
    </div>
  )
}

export default ProductImages;