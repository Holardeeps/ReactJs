import React from 'react'
import Button from './Button'

const Form = ({ reqType, setReqType }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* The e.preventDefault to handle page reloading on send */}
        <Button
        // Since button is a component we pass the values what would be different in each component as props down into the component to use in the component
            buttonText='users'
            reqType={reqType}
            setReqType={setReqType}
         />
        <Button
            buttonText='posts'
            reqType={reqType}
            setReqType={setReqType}
         />
        <Button
            buttonText='comments'
            reqType={reqType}
            setReqType={setReqType}
         />
    </form>
  )
}

export default Form
