import React from "react";
import RowLabel from "../RowLabel/RowLabel";
import NotebookSheet from "../NotebookSheet/NotebookSheet";

import RowButton from "../RowButton/RowButton";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";
import RowButtonShow from "../RowButtonShow/RowButtonShow";

function MainScreen() {
  return (
    <NotebookSheet
      title="Cuadernito App"
      subtitle="Your daily friend !"
    >     
        <RowLabel text="Now you can:" />
        <RowLabel text="Create a new list:" />
        
        <RowLabel text="Open your lists:" />
        <RowButtonShow info="car repair checklist" details="06/12/2024" />
        <RowButtonShow info="Grocery List" details="07/12/2024" />
        <RowButtonShow info="Birthday cake" details="08/12/2024" />        
        
    </NotebookSheet>
  );
}

export default MainScreen;
