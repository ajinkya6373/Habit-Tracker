import { useEffect, useState } from "react";
import { HabitForm, HabitItem, Modal } from "../../components";
import { useHabits } from "../../context";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [habitDetails, setHabitDetails] = useState("");
  const [addHabitModal, setAddHabit] = useState(false);
  const [habitsData, setHabitesData] = useState([]);
  const navigate = useNavigate();
  const {
    habitsData: { habits },
  } = useHabits();


  const cardClickHandler = (habit) => {
    setOpenModal(true);
    setHabitDetails(habit);
  };

  const addHabit = () => {
    setAddHabit(true);
  };

  useEffect(() => {
    setHabitesData(habits.filter((h) => h.archive === false));
  }, [habits]);

  return (
    <Container>
      <Button onClick={addHabit}>+</Button>
      <Button onClick={() => navigate("/archive")}>Archive →</Button>
      {habitsData.length>0 ?
      habitsData?.map((habit) => {
        const { name, id } = habit;
        return (
          <Card key={id} onClick={() => cardClickHandler(habit)}>
            <CardTitle>{name}</CardTitle>
          </Card>
        );
      })
    
    : <CardTitle>"You don't have any habits at the moment."</CardTitle>
    
    }
      {openModal && (
        <Modal closeModal={setOpenModal}>
          <HabitItem habit={habitDetails} setHabitDetails={setHabitDetails} closeModal={setOpenModal}/>
        </Modal>
      )}

      {addHabitModal && (
        <Modal closeModal={setAddHabit}>
          <HabitForm closeModal={setAddHabit}/>
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 20px;
`;

const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
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

export default HomePage;
