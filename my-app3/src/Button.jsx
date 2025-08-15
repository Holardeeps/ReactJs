import React from 'react'

const Button = ({ buttonText, reqType, setReqType }) => {
  return (
    <button
    // We can also pass JSX as html syntax for classes. here we check if the button has been selected and assign it a class of selected and null otherwise. then on click the reqType is changed through the setter (setReqType) to the button text to send to the fetch async function to pass in a new url to the API for a new set pf data since the dependency array has changed.
        className={buttonText === reqType ? "selected" : null}
        type='button'
        // Setting the reqType to the buttonText that was passed in as a PROPS
        onClick={() => setReqType(buttonText)}
    >
        {buttonText}
    </button>
  )
}

export default Button
