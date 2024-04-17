import { useState, useEffect } from "react";
import close from "../../images/close.svg";
import "./popUp.scss";

function PopUp({ setData, number, data, setOpen }) {
  const porches = [1, 2, 3, 4, 5, 6];
  const [apartments, setApartments] = useState([]);
  const [addedElements, setAddedElements] = useState({
    porch: null,
    aparts: [],
  });

  const [activeListIndex, setActiveListIndex] = useState(0);
  const [activeElementList, setActiveElementList] = useState(0);

  const handleKeyDown = (e) => {
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault(); // Предотвращаем стандартное поведение браузера при нажатии стрелок
    }

    if (e.key === "ArrowLeft") {
      // Перемещение к предыдущему списку
      setActiveListIndex((prevIndex) => (prevIndex === 0 ? 1 : prevIndex - 1));
    } else if (e.key === "ArrowRight") {
      // Перемещение к следующему списку
      setActiveListIndex((prevIndex) => (prevIndex === 1 ? 0 : prevIndex + 1));
    } else if (e.key === "ArrowUp") {
      // Перемещение фокуса вверх по текущему списку
      setActiveElementList((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "ArrowDown") {
      // Перемещение фокуса вниз по текущему списку
      setActiveElementList((prevIndex) => (prevIndex + 1) % 6);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleItemClick = (listIndex, itemIndex) => {
    setActiveListIndex(listIndex);
    setActiveElementList(itemIndex);
  };

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
    console.log(newData, "newData", number, "number");
    newData[number].porchAparts.push({
      porch: addedElements.porch,
      aparts: [...addedElements.aparts],
    });
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
            className={
              activeListIndex === 0 && activeElementList === idx
                ? "popUp__element_selected popUp__element"
                : "popUp__element"
            }
          >
            <button
              className="popUp__button"
              onClick={() => {
                addPorch(num);
                handleItemClick(0, num - 1);
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
              className={
                activeListIndex === 1 && activeElementList === idx
                  ? "popUp__element_selected popUp__element"
                  : "popUp__element"
              }
            >
              <button
                className="popUp__button"
                onClick={() => {
                  addApart(num);
                  handleItemClick(1, num - 1);
                }}
              >
                apartment {num}
              </button>
            </li>
          ))}
          <li>
            <button className="popUp__button" onClick={add}>
              Add
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default PopUp;
