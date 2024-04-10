import React from 'react';
import styles from './cards.module.css'

const SlicingArrayInput = ({ dataArray, first, last }) => {
  // Slice the first five elements from the dataArray
    const slicedArray = dataArray.slice(first, last);
    return (
    <div>
        {slicedArray.map((item, index) => (
        <div className={styles.skillsdisplay} key={index}><p>{index+1}-{item}  &nbsp; &nbsp; &nbsp;    </p></div>
        ))}
    </div>
    );
};

export default SlicingArrayInput;