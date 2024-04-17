import { useState, useEffect, useRef } from "react";
import close from "../../images/close.svg";
import "./popUp.scss";

function PopUp({ setData, number, data, setOpen }) {
  const porches = [1, 2, 3, 4, 5, 6];
  const [apartments, setApartments] = useState([]);
  const [addedElements, setAddedElements] = useState({
    porch: null,
    aparts: [],
  });
  const [isDisableds, setIsDisableds] = useState([false, false, false, false, false, false]);

  const pointersMenu= [0,-1];
  
  const addButton = useRef(null);
  const listRefsLeft = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const listRefsRight = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  
  const handleKeyDown = (e) => {
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault(); // ѕредотвращаем стандартное поведение браузера при нажатии стрелок
    }

    if (e.key === "ArrowLeft") {
      // ѕеремещение к предыдущему списку
      listRefsLeft[0].current.focus();
      pointersMenu[0] = 0;
      pointersMenu[1] = -1;
    
    } else if (e.key === "ArrowRight") {
      // ѕеремещение к следующему списку

      listRefsRight[0].current.focus();
      pointersMenu[1] = 0;
      pointersMenu[0] = -1;

    } else if (e.key === "ArrowUp") {
        console.log(pointersMenu,'pointersMenu')
        if(pointersMenu[0] !== -1){//фокус на левом меню
            listRefsLeft[Math.max(pointersMenu[0] - 1, 0)].current.focus();
            pointersMenu[0] = Math.max(pointersMenu[0] - 1, 0);
        }
        else{// фокус на правом меню
            listRefsRight[Math.max(pointersMenu[1] - 1, 0)].current.focus();
            pointersMenu[1] = Math.max(pointersMenu[1] - 1, 0);
        }
        
      
    } else if (e.key === "ArrowDown") {

        if(pointersMenu[0] !== -1){//фокус на левом меню
            listRefsLeft[(pointersMenu[0] + 1) % 6].current.focus();
            pointersMenu[0] = (pointersMenu[0] + 1) % 6;
        }
        else{
            listRefsRight[(pointersMenu[1] + 1) % 6].current.focus();
            pointersMenu[1] = (pointersMenu[1] + 1) % 6;
        }
    }
    else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        //e.preventDefault();
       addButton.current?.click();
       
      }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    listRefsLeft[0].current.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  function addPorch(num) {
    const aparts = [];

    for (let i = 1; i < 7; i++) {
      aparts.push((num - 1) * 6 + i);
    }

    setAddedElements({
      porch: num,
      aparts: [],
    });

    setApartments(aparts);
  }

  function addApart(num) {
    const addedAparts = [...addedElements.aparts];
    addedAparts.push(num);

    setAddedElements((elements) => ({
      ...elements,
      aparts: addedAparts,
    }));
  }

  function add() {
    const newData = JSON.parse(JSON.stringify(data));

    // ѕолучаем текущее состо€ние addedElements
    const currentAddedElements = {
      porch: addedElements.porch,
      aparts: [...addedElements.aparts],
    };
  
    newData[number].porchAparts.push(currentAddedElements);
  
    setData(newData);
    setOpen({
      isOpen: false,
      number: null,
    });
  }

  return (
    <div className="popUp">
      <ul className="popUp__List">
        <li>
          <span>Number of porch</span>
          <button
            onClick={() =>
              setOpen({
                isOpen: false,
                number: null,
              })
            }
          >
            <img src={close}></img>
          </button>
        </li>
        {porches.map((num, idx) => (
          <li
            tabIndex={0}
            onKeyDown={(e)=>{if(e.key === 'Enter') {  addPorch(num);
            }}}
            ref={listRefsLeft[idx]}
            className={ "popUp__element"}
          >
            <button
              className="popUp__button"
              onClick={() => {
                addPorch(num);
              }}
            >
              porch {num}
            </button>
          </li>
        ))}
      </ul>
      {apartments.length !== 0 && (
        <ul className="popUp__List">
          <li>
            <span>Number of apartment</span>
            <button
              onClick={() =>
                setOpen({
                  isOpen: false,
                  number: null,
                })
              }
            >
              <img src={close}></img>
            </button>
          </li>
          {apartments.map((num, idx) => (
            <li
            tabIndex={0}
            onKeyDown={(e)=>{if((e.key === 'Enter') && !(e.ctrlKey || e.metaKey)) { 
                addApart(num);
                const isDisblds = [...isDisableds];
                isDisblds[idx] = true;
              setIsDisableds(isDisblds);
            }}}
            ref={listRefsRight[idx]}

              className={ isDisableds[idx] ? "popUp__element popUp__element_disabled": "popUp__element"  }

              
            >
              <button
                className="popUp__button"
                onClick={() => {
                  addApart(num);
                  const isDisblds = [...isDisableds];
                  isDisblds[idx] = true;
                setIsDisableds(isDisblds);
                }}
              >
                apartment {num}
              </button>
            </li>
          ))}
          <li>
            <button className="popUp__button" ref={addButton}onClick={() =>add()}>
              Add
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default PopUp;
