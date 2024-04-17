import "./HouseList.scss";
import addImg from "../../images/add.svg";
import trashImg from "../../images/trash.svg";

function HouseList({ number, setOpen, data, setData }) {
  const lis = [];

  for (let i = 0; i < 5; i++) {
    lis.push(
      <tr>
        <td className="houseList__element houseList__element_left">
          {data[number]?.porchAparts[i]?.porch}
        </td>
        <td className="houseList__element houseList__element_right">
          {data[number]?.porchAparts[i]?.aparts.join(",")}
        </td>
      </tr>
    );
  }

  function trash() {
    const newData = JSON.parse(JSON.stringify(data));
    newData[number].porchAparts = [];
    setData(newData);
  }

  return (
    <div className="houseList">
      <header>
        <div>House {number + 1}</div>
        <div>
          <button onClick={trash}>
            <img src={trashImg}></img>
          </button>
          <button onClick={() => setOpen({ isOpen: true, number: number })}>
            <img src={addImg}></img>
          </button>
        </div>
      </header>
      <table>
        <tr>
          <th className="houseList__table-header houseList__table-header_left">
            Number of porch
          </th>
          <th className="houseList__table-header houseList__table-header_right">
            apartment numbers
          </th>
        </tr>
        {lis}
      </table>
    </div>
  );
}

export default HouseList;
