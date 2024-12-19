import React from "react";
import RowLabel from "../RowLabel/RowLabel";
import NotebookSheet from "../NotebookSheet/NotebookSheet";

import RowButton from "../RowButton/RowButton";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";
import ShowButton from "../Buttons/ShowButton";

function MainScreen() {
  return (
    <NotebookSheet
      title="Cuadernito App"
      subtitle="Your daily friend !"
    >     
        <RowLabel text="Now you can:" />
        <RowLabel text="Create a new list:" />
        <RowButtonInput placeholder="New item name" button={<AddButton/>} />                  
        <RowLabel text="Open your lists:" />
        <RowButton info="car repair checklist" details="06/12/2024" >
          <ShowButton/>
        </RowButton>
        <RowButton info="car repair checklist" details="06/12/2024" >
          <ShowButton/>
        </RowButton>
        <RowButton info="Birthday cake" details="08/12/2024"  >
          <ShowButton/>
        </RowButton>
    </NotebookSheet>
  );
}

export default MainScreen;
