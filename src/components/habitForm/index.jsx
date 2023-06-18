import React, { useState } from 'react';
import styled from 'styled-components';
import { useHabits } from '../../context';
import { goals, repeatOptions, startDate, timeOfDayOptions } from '../../utils';

const HabitForm = ({closeModal}) => {
  const {habitDispatch} = useHabits()
  const [habitData, setHabitData] = useState({
    id: '',
    name: '',
    repeat: 'Daily',
    goal: '1 times Daily',
    timeOfDay: 'Morning',
    startDate: 'Today',
    archive: false
  });

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setHabitData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setHabitData((prevState) => ({
      ...prevState,
      name: value
    }));
  };

  const handleSave = () => {
    const uniqueId = generateUniqueId(); 
    setHabitData((prevState) => ({
      ...prevState,
      id: uniqueId
    }));
    habitDispatch({type:"ADD_HABIT",payload:habitData})
    closeModal(false)

  };
  const generateUniqueId = () => {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000).toString();
    return timestamp + '-' + randomNum;
  };
  const  {name} = habitData;
  const isDisblaed = name===""
  return (
    <Container>
      <InputLabel>Name:</InputLabel>
      <NameInput type="text" name="name" value={habitData.name} onChange={handleNameChange} />

      <InputLabel>Repeat:</InputLabel>
      <Dropdown name="repeat" value={habitData.repeat} onChange={handleDropdownChange}>
        {repeatOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Dropdown>

      <InputLabel>Goal:</InputLabel>
      <Dropdown name="goal" value={habitData.goal} onChange={handleDropdownChange}>
      {goals.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Dropdown>

      <InputLabel>Time of Day:</InputLabel>
      <Dropdown name="timeOfDay" value={habitData.timeOfDay} onChange={handleDropdownChange}>
        {timeOfDayOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Dropdown>

      <InputLabel>Start Date:</InputLabel>
      <Dropdown name="startDate" value={habitData.startDate} onChange={handleDropdownChange}>
      {startDate.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Dropdown>

      <SaveButton onClick={handleSave} disabled={isDisblaed}>Save</SaveButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputLabel = styled.label`
  font-weight: bold;
`;

const NameInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
`;

const Dropdown = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
  }
`;


export default HabitForm;
