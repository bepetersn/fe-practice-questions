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
        data-testid="accordion-title"
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


function getToggledValuesClassicAccordion(index, length) {
  // Only the clicked index is open, all others are closed
  return Array.from({ length }, (_, i) => i === index);
}

export const Accordion = () => {
  let toggleValuesInitial = questions.map((_, index) => {
    return index == 0;
  })
  const [openValues, setOpenValues] = useState(toggleValuesInitial)

  const handleToggle = (index) => {
    setOpenValues((prev) => {
      if (prev[index]) {
        // If already open, close all
        return prev.map(() => false);
      } else {
        // Open only the clicked one
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
