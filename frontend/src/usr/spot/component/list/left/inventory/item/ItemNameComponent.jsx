const ItemNameComponent = ({ id, name, setSpotSelected }) => {
  return (
    <p
      className="w-full h-6 
        text-base text-gray-600
        font-medium font-mono 
        cursor-pointer
        hover:text-black"
      onClick={() => setSpotSelected({ id, name })}
    >
      {name}
    </p>
  );
};

export default ItemNameComponent;
