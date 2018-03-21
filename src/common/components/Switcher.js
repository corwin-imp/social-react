import React from 'react'
import Button from './Button'

const Switcher = ({
  feature,
  isSwitch,
  onChangeLeft,
  onChangeRight,
  leftButtonText,
  rightButtontext,
}) => {
  if (feature) {
    var classOn = 'on'
    var classOff = ''
  } else {
    var classOn = ''
    var classOff = 'off'
  }
  if (isSwitch != 'power') {
    var label = <div className="btnLabel">{feature}</div>
    var classOn = ''
    var classOff = ''
  } else {
    var label = ''
  }

  return (
    <div className={'switcher ' + isSwitch}>
      {label}

      <Button onCl={classOn} onClick={onChangeLeft} text={leftButtonText} />
      <Button onCl={classOff} onClick={onChangeRight} text={rightButtontext} />
    </div>
  )
}

export default Switcher
