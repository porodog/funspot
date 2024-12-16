const MenuBarComponent = ({ menu, activeMenu, handleMenuTabClickEvent }) => {
  const { id, name } = menu;

  //const { id, name, sub } = menu;
  // const handleSubMenuTabClickEvent = (id) => {
  //   const subMenuId = id === "comment" ? "comment/feed" : `comment/${id}`;
  //   handleMenuTabClickEvent(subMenuId);
  // };

  return (
    <>
      <div
        className={`
          px-6 py-3 rounded-full cursor-pointer
          text-base font-medium text-gray-600 
          hover:text-white hover:bg-emerald-500 transition duration-100 ease-in-out 
        ${activeMenu === id ? "bg-emerald-400 text-white" : ""}`}
        onClick={() => handleMenuTabClickEvent(id)}
      >
        {name}
      </div>
      {/* {id === "comment" ? (
        <div className="relative group">
          <div
            className={`tab text-lg font-semibold text-gray-800 hover:text-blue-500 cursor-pointer 
        px-4 py-2 rounded-lg transition duration-300 ease-in-out transform 
        ${
          activeMenu === id
            ? "bg-blue-100 scale-105"
            : "hover:bg-blue-100 hover:scale-105"
        }`}
            onClick={() => handleSubMenuTabClickEvent(id)}
          >
            {name}
          </div>

          <div className="w-28 dropdown-menu absolute opacity-0 group-hover:opacity-100 hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-opacity duration-500 delay-1000">
            {sub.map((item, index) => (
              <div
                key={item.id}
                className="dropdown-item px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSubMenuTabClickEvent(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`tab text-lg font-semibold text-gray-800 hover:text-blue-500 cursor-pointer 
        px-4 py-2 rounded-lg transition duration-300 ease-in-out transform 
        ${
          activeMenu === id
            ? "bg-blue-100 scale-105"
            : "hover:bg-blue-100 hover:scale-105"
        }`}
          onClick={() => handleMenuTabClickEvent(id)}
        >
          {name}
        </div>
      )} */}
    </>
  );
};

export default MenuBarComponent;
