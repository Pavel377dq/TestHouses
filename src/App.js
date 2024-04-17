import HouseList from "./components/HouseList/HouseList";
import PopUp from "./components/popUp/popUp";

import "./App.css";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState({ isOpen: false, number: null });
  const [data, setData] = useState([
    { porchAparts: [] },
    { porchAparts: [] },
    { porchAparts: [] },
    { porchAparts: [] },
  ]);
  return (
    <div className="App">
      <HouseList number={0} setOpen={setOpen} data={data} setData={setData} />
      <HouseList number={1} setOpen={setOpen} data={data} setData={setData} />
      <HouseList number={2} setOpen={setOpen} data={data} setData={setData} />
      <HouseList number={3} setOpen={setOpen} data={data} setData={setData} />
      {open.isOpen && (
        <PopUp
          setData={setData}
          number={open.number}
          data={data}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default App;
