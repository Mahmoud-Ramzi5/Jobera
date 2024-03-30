import React from 'react';
import styles from './ZCard.module.css'

const SlicingAraayInput = ({ dataArray ,first,last}) => {
  // Slice the first five elements from the dataArray
    const slicedArray = dataArray.slice(first, last);
    return (
    <div>
        {slicedArray.map((item, index) => (
        <div key={index}><p>{index+1}-{item}</p></div>
        ))}
    </div>
    );
};

export default SlicingAraayInput;