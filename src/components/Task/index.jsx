
import { useState } from 'react';
import style from './style.module.scss';


export default function Task({ data,handleCompleted,handleRemove}) {

  

    return (
        <div className={style.container}>
            <div>
                {data.completed
                    ? <span onClick={handleCompleted} className="material-symbols-outlined">check_circle</span>
                   
                    :  <span onClick={handleCompleted} className="material-symbols-outlined">radio_button_unchecked</span>
                }
            </div>
            <div><p>{data.text}</p></div>
            <div onClick={handleRemove}>
                <span className="material-symbols-outlined">delete</span>
            </div>
        </div>
    )
}