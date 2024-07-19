import React from 'react';

export const SlicedArray = ({ dataArray, first, last }) => {
  // Slice the first five elements from the dataArray
  const slicedArray = dataArray.slice(first, last);
  return (
    <>
      {slicedArray.map((item, index) => (
        <div key={item.id}>
          <p>{index + 1}- {item.name}</p>
        </div>
      ))}
    </>
  );
};

export const SlicedCheckBox = ({ dataArray, first, last, handleChange }) => {
  // Slice the first five elements from the dataArray
  const slicedCheckBox = dataArray.slice(first, last);
  return (
    <>
      {slicedCheckBox.map((item, index) => (
        <div key={item.id}>
          <input
            type="checkbox"
            value={item.name}
            onChange={handleChange}
          />
          <label>- {item.name}</label>
        </div>
      ))}
    </>
  );
};