import React from "react";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import ItemCategory from "./ItemCategory/ItemCategory";
import ListItem from "./ListItem/ListItem";
import CategorySelector from "./ItemCategory/CategorySelector/CategorySelector";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";

import RowButton from "../RowButton/RowButton";
import HideButton from "../Buttons/HideButton";


function ListScreen() {

  const handleClick = () =>{
    alert("Select clicked");
  }
  
  return (
    <NotebookSheet
      title="Grocery list"
      subtitle="07/12/2024"
    >     
        <ItemCategory text="Dry goods" />
        <ListItem text='Dried Tomatoes' url={'/modal'}/>
        <ListItem text='Dries Shiitake Mushrooms'  url={'/modal'}/>
        <ItemCategory text="Produce" />
        <ListItem text='Strawberries' url={'/modal'} />        

        <RowButtonInput placeholder="New item name" button={<AddButton/>} >
          <CategorySelector text="Click to select Category" onClick={handleClick} />
        </RowButtonInput >

        <RowButton info="Hide list">
          <HideButton/>
        </RowButton>
        
    </NotebookSheet>
  );
}

export default ListScreen;