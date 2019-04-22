import React from 'react'

const Button = ({ onClick, text, onCl = '' }) => (
  <button className={onCl} type="button" onClick={onClick}>
    {text}
  </button>
)

export default Button
