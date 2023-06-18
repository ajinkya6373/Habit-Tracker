import React, { useEffect, useState } from "react";
import { useHabits } from "../../context";
import styled from "styled-components";
import { HabitItem, Modal } from "../../components";
import { useNavigate } from "react-router-dom";

export default function ArchivePage() {
  const [archiveHabits, setArchiveHabits] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [habitDetails, setHabitDetails] = useState("");
  const { habitsData: { habits } } = useHabits();

  useEffect(() => {
    setArchiveHabits(habits.filter((h) => h.archive === true));
  }, [habits]);

  const cardClickHandler = (habit) => {
    setOpenModal(true);
    setHabitDetails(habit);
  };

  return (
    <Container>
      <Heading>Archive Page</Heading>
      <Button onClick={() => navigate("/")}>{"<- Home Page"}</Button>
      <CardContainer>
        {archiveHabits.length>0 
        ? archiveHabits.map((habit) => (
          <Card key={habit.id} onClick={() => cardClickHandler(habit)}>
            <CardTitle>{habit.name}</CardTitle>
          </Card>
        ))
      : <h5>"You don't have any archived habits at the moment."</h5>
      }
      </CardContainer>

      {openModal && (
        <Modal closeModal={setOpenModal}>
          <HabitItem habit={habitDetails} setHabitDetails={setHabitDetails} closeModal={setOpenModal}/>
        </Modal>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitle = styled.h3`
  margin: 0;
`;
