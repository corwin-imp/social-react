import React from 'react'

const Input =function ({ onChange,placeholder,onKeyPress, value, type = 'text' }) {
  const handleKeyPress = (event) =>{
    console.log('ent',event.key);
    if (event.key == 'Enter') {

      onKeyPress();
    }
  }
  return (

      <input
          className="form-control"
          type={type}
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          onChange={onChange}
          value={value}
      />
  )
}

export default Input
