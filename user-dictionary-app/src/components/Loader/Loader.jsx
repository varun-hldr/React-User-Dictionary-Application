import loader from "../img/loader.gif";
import "../css/Loader.css";

const Loader = () => {
  return (
    <div className="position-absolute top-25 start-50 translate-middle">
      <div className="loader">
        <img src={loader} alt="loader" />
      </div>
    </div>
  );
};

export default Loader;
