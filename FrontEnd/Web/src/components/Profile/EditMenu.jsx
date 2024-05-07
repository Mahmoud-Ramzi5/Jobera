import React from 'react';
import { useState } from 'react';
import {
    PersonFill, EnvelopeFill, TelephoneFill, Globe, GeoAltFill,
    Calendar3, ChevronRight, PersonStanding, PersonStandingDress
  } from 'react-bootstrap-icons';
const EditMenu = ({ data, onChange, onSave, onCancel }) => {
    const [gender, setGender] = useState('');
    const genders = [
      { value: 'male', label: 'Male', icon: <PersonStanding /> },
      { value: 'female', label: 'Female', icon: <PersonStandingDress /> },
    ];
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="edit-menu">
      <input
        type="text"
        name="full_name"
        value={data.full_name}
        onChange={handleInputChange}
        placeholder="Full Name"
      />
      <input
        type="tel"
        name="phone_number"
        value={data.phone_number}
        onChange={handleInputChange}
        placeholder="Phone Number"
      />
      <input
        type="text"
        name="country"
        value={data.country}
        onChange={handleInputChange}
        placeholder="Country"
      />
      <input
        type="text"
        name="city"
        value={data.state}
        onChange={handleInputChange}
        placeholder="City"
      />
      <input
        type="date"
        name="birthDate"
        value={data.birth_date}
        onChange={handleInputChange}
        placeholder="Birth Date"
      />
       <div >
          {genders.map((G) => (
            <div  key={G.value}>
              <input
                type="radio"
                value={G.value}
                checked={gender === G.value}
                onChange={(event) => setGender(event.target.value)}
              />
              <i>{G.icon}</i>
              <label>{G.label}</label>
            </div>
          ))}
        </div>
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditMenu;