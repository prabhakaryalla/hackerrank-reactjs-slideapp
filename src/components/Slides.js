import React, {useEffect, useState} from 'react';

function Slides({slides}) {

    const [currentSlide, setCurrentSlide] = useState(null);
    const [currentLimit, setCurrentLimit] = useState(0);
    const [restartDisabled, setRestartDisabled] = useState(true);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(false);

    const slidesUpperLimit = slides.length  - 1;


    useEffect(() => {
        setCurrentSlide(slides[currentLimit]);
        if(currentLimit === 0)
        {
            setPrevDisabled(true);
            setRestartDisabled(true);
        }
        else 
        {
            setPrevDisabled(false);
            setRestartDisabled(false);
        }
        if(currentLimit === slidesUpperLimit)
        {
            setNextDisabled(true);
        }
        else
        {
            setNextDisabled(false);

        }
    }, [currentLimit]);


    function onNextClick() {
        setCurrentLimit((limit) => {
            var nextCount = (limit + 1 > slidesUpperLimit ? slidesUpperLimit : limit + 1);
            return nextCount;
        })
      }

    function onRestartClick() {
        setCurrentLimit((limit) => 0)
        setPrevDisabled(true);
        setNextDisabled(false);
        setRestartDisabled(true);
    }

    function onPreviousClick() {
        setCurrentLimit((limit) => {
            var prevCount = (limit - 1 < 0 ? 0 : limit - 1);
            return prevCount;
        })
      }

    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart" disabled={restartDisabled} className="small outlined" onClick={() => onRestartClick()}>Restart</button>
                <button data-testid="button-prev" disabled={prevDisabled} className="small" onClick={() => onPreviousClick()}>Prev</button>
                <button data-testid="button-next" disabled={nextDisabled} className="small" onClick={() => onNextClick()}>Next</button>
            </div>
            {
                currentSlide !== null &&
                (
                    <div id="slide" className="card text-center">
                        <h1 data-testid="title">{currentSlide.title}</h1>
                        <p data-testid="text">{currentSlide.text}</p>
                    </div>
                )

            }
            
        </div>
    );

}

export default Slides;
