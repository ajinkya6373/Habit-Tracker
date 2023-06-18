import React, { useState } from 'react';
import styled from 'styled-components';
import { useHabits } from '../../context';
import { goals, repeatOptions, startDate, timeOfDayOptions } from '../../utils';

const HabitItem = ({ habit, setHabitDetails, closeModal }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedHabit, setEditedHabit] = useState(habit);
    const { habitDispatch } = useHabits()

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        habitDispatch({ type: "EDIT_HABIT", payload: editedHabit })
        setHabitDetails(editedHabit)
        setIsEditing(false);
        closeModal(false)
    };

    const handleDelete = () => {
        habitDispatch({ type: "DELETE_HABIT", payload: habit })
        closeModal(false)
    };

    const handleArchive = () => {
        habitDispatch({ type: "ARCHIVE_RETRIEVE", payload: habit })
        closeModal(false)


    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setEditedHabit((prevHabit) => ({
            ...prevHabit,
            [name]: value
        }));
    };

    return (
        <Container>
            <HabitDetails>
                <Name>{habit.name}</Name>
                <Details>
                    <div>
                        <strong>Repeat:</strong>{' '}
                        {isEditing ? (
                            <select
                                name="repeat"
                                value={editedHabit.repeat}
                                onChange={handleSelectChange}
                            >

                                {repeatOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            habit.repeat
                        )}
                    </div>
                    <div>
                        <strong>Goal:</strong>{' '}
                        {isEditing ? (
                            <select
                                name="goal"
                                value={editedHabit.goal}
                                onChange={handleSelectChange}
                            >
                                {goals.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            habit.goal
                        )}
                    </div>
                    <div>
                        <strong>Time of Day:</strong>{' '}
                        {isEditing ? (
                            <select
                                name="timeOfDay"
                                value={editedHabit.timeOfDay}
                                onChange={handleSelectChange}
                            >
                                {timeOfDayOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            habit.timeOfDay
                        )}
                    </div>
                    <div>
                        <strong>Start Date:</strong>{' '}
                        {isEditing ? (
                            <select
                                name="startDate"
                                value={editedHabit.startDate}
                                onChange={handleSelectChange}
                            >
                                {startDate.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            habit.startDate
                        )}
                    </div>
                </Details>
            </HabitDetails>

            <ButtonContainer>
                {isEditing ? (
                    <>
                        <SaveButton onClick={handleSave}>Save</SaveButton>
                        <CancelButton onClick={() => setIsEditing(false)}>Cancel</CancelButton>
                    </>
                ) : (
                    <>
                        <EditButton onClick={handleEdit}>Edit</EditButton>
                        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
                        <ArchiveButton onClick={handleArchive}>{habit.archive? "Retrieve":"Archive"}</ArchiveButton>
                    </>
                )}
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const HabitDetails = styled.div`
  flex-grow: 1;
`;

const Name = styled.div`
  font-weight: bold;
`;

const Details = styled.div`
  margin-top: 5px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const SaveButton = styled.button`
  padding: 5px 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ArchiveButton = styled.button`
  padding: 5px 10px;
  background-color: #ffc107;
  color: #000;
  border: none;
  cursor: pointer;
`;

export default HabitItem;
