import React from "react";

import NotebookSheet from "../NotebookSheet/NotebookSheet";
import RowButton from "../RowButton/RowButton";
import EditButton from "../Buttons/EditButton";
import NextButton from "../Buttons/NextButton";
import PreviousButton from "../Buttons/PreviousButton";
import CategorySelector from "../ListScreen/ItemCategory/CategorySelector/CategorySelector";
import RowButtonInput from "../RowButtonInput/RowButtonInput";

const handleClick = () =>{
  alert("Select clicked");
}

function ModalViewItem() {
  return (
    <NotebookSheet
      title="Dries tomatoes"
      subtitle="Actions for this item:"
    >         
      
      <RowButtonInput placeholder="Dries tomatoes" button={<EditButton/>} >
        <CategorySelector text="Dry goods" onClick={handleClick} />
      </RowButtonInput >

      <RowButtonInput placeholder="Note for dries tomatoes" button={<EditButton/>} >        
      </RowButtonInput >

      <RowButton info="Send to another list">
        <NextButton />
      </RowButton>      
      <RowButton info="Back to list">
        <PreviousButton />
      </RowButton>      
        
    </NotebookSheet>
  );
}

export default ModalViewItem;
