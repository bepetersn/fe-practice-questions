import questions from './data';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';


const AccordionItem = ({ question, openValue, handleToggleClick }) => {
  const toggleValue = openValue ? "-" : "+";
  return (
    <>
      <button
        className="accordion-title"
        data-testid="toogle-button"
        onClick={handleToggleClick}
        style={{ cursor: "pointer", userSelect: "none", background: "none", border: "none", width: "100%", textAlign: "left", padding: 0 }}
        aria-expanded={openValue}
        type="button"
      >
        {question.title}
        <span className="accordion-icon">{toggleValue}</span>
      </button>
      <div className={`accordion-content${openValue ? " open" : ""}`}>
        <p className="accordion-info" data-testid="accordion-info">
          {question.info}
        </p>
      </div>
    </>
  )
}

AccordionItem.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
  openValue: PropTypes.bool.isRequired,
  handleToggleClick: PropTypes.func.isRequired,
};

export const Accordion = () => {
  let toggleValuesInitial = questions.map((_, index) => {
    return index == 0;
  })
  const [openValues, setOpenValues] = useState(toggleValuesInitial)

  // import PropTypes from 'prop-types';

  // AccordionItem.propTypes = {
  //   question: PropTypes.shape({
  //     title: PropTypes.string.isRequired,
  //     info: PropTypes.string.isRequired,
  //   }).isRequired,
  //   openValue: PropTypes.bool.isRequired,
  //   handleToggleClick: PropTypes.func.isRequired,
  // };

  const handleToggle = (index) => {
    setOpenValues((prev) => {
      // If the clicked item is already open, close it (all closed)
      if (prev[index]) {
        return prev.map(() => false);
      } else {
        // Open the clicked one, close all others simultaneously
        return prev.map((_, i) => i === index);
      }
    });
  };

  return (
    <div className="accordion" data-testid="accordion">
      {questions.map((question, index) => (
        <AccordionItem
          key={question.id}
          question={question}
          openValue={openValues[index]}
          handleToggleClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Accordion</h1>
      <Accordion />
    </div>
  );
}
