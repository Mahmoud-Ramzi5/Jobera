import React from 'react';
import ReactSlider from 'react-slider';
import './slider.css';

const Slider = ({ values, handler }) => {

  return (
    <ReactSlider
      className='react_slider'
      thumbClassName='reactSlider_thumb'
      trackClassName='reactSlider_track'
      pearling
      min={0}
      max={100000}
      minDistance={1}

      value={values}
      onChange={(values, index) => {
        if (index === 0) {
          handler((prevState) => ({ ...prevState, minSalary: values[index] }));
        }
        else if (index === 1) {
          handler((prevState) => ({ ...prevState, maxSalary: values[index] }));
        }
        else { }
      }}

      ariaLabel={['Lower thumb', 'Upper thumb']}
      ariaValuetext={state => `Thumb value ${state.valueNow}`}
    />
  );
}

export default Slider;