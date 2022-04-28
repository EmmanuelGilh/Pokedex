import React from 'react'
import './Slider.css'
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';




const Slider = ({ imageSrc, title, subtitle, flipped }) => {


    const { ref, inView } = useInView({
        threshold: 0.4,
    });



    const renderContent = () => {

        if (!flipped) {
            return <>
                <img src={imageSrc} alt='imagen' className='imgSlider' />
                <h1 className='sliderTitle'> {title} </h1>
            </>;
        }
        else {
            return <>
                <h1 className='sliderTitle2'> {title} </h1>
                <img src={imageSrc} alt='imagen' class="text-center img-responsive" className='imgSlider2' />
            </>
        }
    }


    return (
        <div className={inView ? 'slider sliderZoom' : 'slider'} ref={ref}>
            {renderContent()}

        </div>
    )
}

export default Slider;