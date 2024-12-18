import React from "react";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import ItemCategory from "./ItemCategory/ItemCategory";
import ListItem from "./ListItem/ListItem";
import CategorySelector from "./ItemCategory/CategorySelector/CategorySelector";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";
/*
import RowLabel from "../RowLabel/RowLabel";
import RowButtonAdd from "../RowButtonAdd/RowButtonAdd";
import RowButtonShow from "../RowButtonShow/RowButtonShow";
*/

import RowButton from "../RowButton/RowButton";
import HideButton from "../Buttons/HideButton";
import EditButton from "../Buttons/EditButton";
import NextButton from "../Buttons/NextButton";
import PreviousButton from "../Buttons/PreviousButton";

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
        <ListItem text='Dried Tomatoes' />
        <ListItem text='Dries Shiitake Mushrooms' />
        <ItemCategory text="Produce" />
        <ListItem text='Strawberries' />        

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