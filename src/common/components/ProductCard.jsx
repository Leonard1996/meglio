export default function ProductCard({
  isActive,
  title,
  onSelect,
  imageWhite,
  iamgeDark,
}) {
  const _renderStyle = () => {
    return {
      backgroundColor: isActive ? "#FAD02C" : "",
      boxShadow: isActive ? " 0px 10px 20px 2px rgba(0, 0, 0, 0.25)" : "",
      border: isActive ? "4px solid white" : "",
    };
  };
  return (
    <div className="col-6 col-md-3">
      <div className="product" onClick={onSelect} style={_renderStyle()}>
        <div>
          <img
            className="svg"
            src={isActive ? imageWhite : iamgeDark}
            alt="product"
          />
        </div>
        <label className="h5" style={{ color: isActive ? "white" : "black" }}>
          {title}
        </label>
      </div>
    </div>
  );
}
