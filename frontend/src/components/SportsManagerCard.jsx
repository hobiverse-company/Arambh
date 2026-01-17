import "./SportsManagerCard.css";

const SportsManagerCard = ({ manager, sportName }) => {
  return (
    <div className="sm-card">
      <div className="sm-card-inner">
        {/* Image */}
        <div className="sm-image-wrapper">
          {manager.image ? (
            <img
              src={manager.image}
              alt={manager.name}
              className="sm-image"
              loading="lazy"
            />
          ) : (
            <div className="sm-image-placeholder">
              {manager.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Text */}
        <h3 className="sm-name">{manager.name}</h3>
        <p className="sm-sport">{sportName}</p>
        <p className="sm-branch">{manager.branch}</p>
        <p className="sm-phone">📞 {manager.phone}</p>
      </div>
    </div>
  );
};

export default SportsManagerCard;
