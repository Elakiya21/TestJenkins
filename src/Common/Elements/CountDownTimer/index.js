import React from 'react'

const CountDownTimer = ({seconds}) => {
   
    const { sec = 60, redirectUrl } = seconds;
    const [[secs], setTime] = React.useState([sec]);
    

    const tick = () => {
   
        if (secs === 0) 
            reset()
        else {
            setTime([secs - 1]);
        }
    };


    const reset = () => {
       // console.log("Redirect url - " + redirectUrl)
        window.location.href = `${redirectUrl}`;
        setTime([parseInt(sec)]);
    };

    
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    
    return (
        <span>
            {`${secs.toString().padStart(2, '0')}`}
        </span>
    );
}

export default CountDownTimer;