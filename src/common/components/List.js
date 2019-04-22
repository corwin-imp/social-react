import { Link } from 'react-router-dom'
import React from 'react'
import FontAwesome from 'react-fontawesome'
import Button from './Button'
const List = ({ items, title, playing,ondelete, classValue, onChoose, limit }) => {
  if (limit) {
    items = items.slice(0, limit)
  }

  return (
    <ul className={classValue}>
      {items.map((value, index) => (
        <li  key={index}>
          <div onClick={() => onChoose(index)} className="playIt">
            <Button
              text={
                playing === index ? (
                  <FontAwesome
                    className="super-crazy-colors"
                    name="pause"
                    size="lg"
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                  />
                ) : (
                  <FontAwesome
                    className="super-crazy-colors"
                    name="play"
                    size="lg"
                  />
                )
              }
            />
              <span>{value.name}</span>
          </div>
            {ondelete && <div onClick={() => ondelete(value.name,index)} className="deleteBtn">
                x
            </div>}

        </li>
      ))}
    </ul>
  )
}

export default List

/*

 if(limit){
 items = items.slice(0, limit);
 }
 return (

 <ul className={classValue}>
 {items.map(
 (value, index) =>

 <li key={index}>
 <span onClick={() => onChoose(value.href, value.name)}  >{value.name}</span>
 </li>

 )}
 </ul>
 );}
 */
