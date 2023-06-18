
import { createContext,useContext,useReducer} from "react";
import {Habits} from "../dummyData"
import { habitReducer } from "../reducer";
const HabitContext = createContext();
export const HabitProvider =({children}) =>{
    const habits = Habits || []
    const [habitsData,habitDispatch] = useReducer(habitReducer,
        {  
            habits,
        })
    return (
        <HabitContext.Provider value={{
            habitsData,
            habitDispatch
        }}>
            {children}
        </HabitContext.Provider>
    );
};

export const useHabits =()=>useContext(HabitContext)
