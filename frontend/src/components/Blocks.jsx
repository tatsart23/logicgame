import PropTypes from 'prop-types';

const Blocks = ({handleBlockClick}) => {
  return (
    <>
      <div className="mt-2 p-3 grid grid-cols-3 bg-blue-500 gap-4">
        <div
          className="grid grid-cols-2 grid-rows-3 w-16"
          style={{ height: "95px" }}
          draggable="true"
          onClick={() => handleBlockClick ("red-block")}
        >
          <div className="red-block"></div>
          <div className="red-block "></div>
          <div className="red-block"></div>
          <div className="red-block"></div>
          <div className="red-block"></div>
        </div>
        <div
          className="grid grid-cols-2 grid-rows-3 w-16 "
          style={{ height: "95px" }}
          draggable="true"
          onClick={() => handleBlockClick ("yellow-block")}
        >
          <div className="yellow-block"></div>
          <div className="yellow-block"></div>
          <div className="yellow-block col-span-2"></div>
          <div className="yellow-block"></div>
          <div className="yellow-block"></div>
        </div>
        <div
          className="grid grid-cols-2 grid-rows-4 w-16"
          style={{ height: "124px" }}
          draggable="true"
          onClick={() => handleBlockClick ("green-block")}
        >
          <div className="green-block col-span-2"></div>
          <div className="green-block"></div>
          <div className="green-block"></div>
          <div className="green-block col-start-2"></div>
          <div className="green-block col-start-2"></div>
        </div>
        <div
          className="grid grid-cols-3 grid-rows-3 place-items-center"
          style={{ width: "95px" }}
          draggable="true"
          onClick={() => handleBlockClick ("gray-block")}
        >
          <div></div>
          <div className="gray-block"></div>
          <div></div>
          <div className="gray-block"></div>
          <div className="gray-block"></div>
          <div className="gray-block"></div>
          <div></div>
          <div className="gray-block"></div>
          <div></div>
        </div>
        <div
          className="grid grid-cols-4 grid-rows-2"
          style={{ height: "62px" }}
          draggable="true"
          onClick={() => handleBlockClick ("cyan-block")}
        >
          <div className="cyan-block col-start-1 col-span-1"></div>
          <div className="cyan-block col-start-1 row-start-2"></div>
          <div className="cyan-block col-start-2 row-start-2"></div>
          <div className="cyan-block col-start-3 row-start-2"></div>
          <div className="cyan-block col-start-4 row-start-2"></div>
        </div>
        <div
          className="grid grid-cols-3 grid-rows-3"
          style={{ width: "95px" }}
          draggable="true"
          onClick={() => handleBlockClick ("magenta-block")}
        >
          <div></div>
          <div className="magenta-block"></div>
          <div className="magenta-block"></div>
          <div className="magenta-block"></div>
          <div className="magenta-block"></div>
          <div></div>
          <div className="magenta-block"></div>
        </div>
        <div
          className="grid w-8"
          style={{ height: "120px" }}
          draggable="true"
          onClick={() => handleBlockClick ("purple-block")}
        >
          <div className="purple-block"></div>
          <div className="purple-block"></div>
          <div className="purple-block"></div>
          <div className="purple-block"></div>
        </div>
        <div
          className="grid grid-cols-4 grid-rows-2"
          style={{ height: "62px" }}
          draggable="true"
          onClick={() => handleBlockClick ("pink-block")}
        >
          <div className="pink-block col-start-1 col-span-1"></div>
          <div className="pink-block col-start-2 row-start-2"></div>
          <div className="pink-block"></div>
          <div className="pink-block"></div>
          <div className="pink-block"></div>
        </div>
        <div
          className="grid grid-cols-3 grid-rows-2"
          style={{ height: "62px", width: "95px" }}
          draggable="true"
          onClick={() => handleBlockClick ("orange-block")}
        >
          <div className="orange-block"></div>
          <div className="orange-block"></div>
          <div className="orange-block"></div>
          <div className="orange-block"></div>
        </div>
        <div
          className="grid grid-cols-2 grid-rows-2 w-16"
          style={{ height: "62px" }}
          draggable="true"
          onClick={() => handleBlockClick ("lime-block")}
        >
          <div className="lime-block"></div>
          <div className="lime-block"></div>
          <div className="lime-block"></div>
          <div className="lime-block"></div>
        </div>
        <div
          className="grid grid-cols-2 grid-rows-2 w-16"
          style={{ height: "62px" }}
          draggable="true"
          onClick={() => handleBlockClick ("white-block")}
        >
          <div className="white-block"></div>
          <div className="white-block"></div>
          <div className="white-block"></div>
        </div>
        <div
          className="grid grid-rows-3 grid-cols-3"
          style={{ width: "95px" }}
          draggable="true"
          onClick={() => handleBlockClick ("light-blue-block")}
        >
          <div className="light-blue-block"></div>
          <div className="light-blue-block"></div>
          <div className="light-blue-block"></div>
          <div className="light-blue-block"></div>
          <div className="light-blue-block col-start-1"></div>
        </div>
      </div>
    </>
  );
};
Blocks.propTypes = {
  handleBlockClick: PropTypes.func.isRequired,
};

export default Blocks;

