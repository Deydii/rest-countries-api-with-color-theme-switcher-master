import FadeLoader from "react-spinners/FadeLoader";
import './style.scss';

const Spinner = () => {
  return (
    <div className="spinner">
      <FadeLoader
        speedMultiplier={2}
        color={"#98A6A2"}
        height={15}
      />
      <p className="spinner__text">Loading...</p>
    </div>
  )
};

export default Spinner;
