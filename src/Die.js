import React from 'react'

export const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className='h-[50px] w-[50px] shadow-gray-200 bg-white flex justify-center items-center rounded-xl' style={styles}
            onClick={props.holdDice}
        >
            <h1 className='text-[35px] text-bold'>{props.value}</h1>
        </div>
    )
}
