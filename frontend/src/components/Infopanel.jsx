import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useState } from "react";

const Infopanel = ({ title, sections, buttonText, buttonLink }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 bg-blue-500 h-full border-r-4 transition-all duration-400
      ${expanded ? "w-96 border-r-gray-500" : "w-0 border-r-0"}`}
    >
      <div className="flex items-center justify-between p-4">
        {expanded && <h2 className="text-white text-lg font-bold">{title}</h2>}
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="flex items-center justify-center w-8 h-8 bg-transparent"
        >
          {expanded ? (
            <ArrowLeftFromLine size={24} color="white" />
          ) : (
            <ArrowRightFromLine
              size={24}
              color="black"
              className="bg-white p-1 h-8 w-8 rounded-sm"
            />
          )}
        </button>
      </div>
      {expanded &&
        sections.map((section, index) => (
          <div
            key={index}
            className="p-4 text-black bg-white m-2 rounded font-semibold"
          >
            <h3 className="text-lg font-bold mb-2">{section.heading}</h3>
            {section.content.map((paragraph, idx) => (
              <p key={idx} className="mb-2">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      {expanded && (
        <Link to={buttonLink}>
          <button className="absolute bottom-4 left-4 border-4 bg-white text-black-500 border-gray-500 font-bold py-2 px-4 rounded">
            {buttonText}
          </button>
        </Link>
      )}
    </div>
  );
};
Infopanel.propTypes = {
  title: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
};

export default Infopanel;
