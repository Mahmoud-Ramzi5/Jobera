import React from 'react';

const SlicingArrayInput = ({ dataArray, first, last }) => {
  // Slice the first five elements from the dataArray
  const slicedArray = dataArray.slice(first, last);
  return (
    <div>
      {slicedArray.map((item, index) => (
        <div key={item.id}><p>{index + 1}- {item.name}&nbsp; &nbsp; &nbsp;</p></div>
      ))}
    </div>
  );
};

export default SlicingArrayInput;