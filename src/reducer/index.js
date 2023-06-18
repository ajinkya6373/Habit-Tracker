export const habitReducer = (state, action) => {
    switch (action.type) {
      case "ADD_HABIT": {
        return {
          ...state,
          habits: [...state.habits, action.payload],
        };
      }
    case "EDIT_HABIT":{
        return{
            ...state,
            habits: state.habits.map((h)=>h.id===action.payload.id? action.payload:h )
        }
    }
    case "DELETE_HABIT":{
        return{
            ...state,
            habits : state.habits.filter(h=>h.id!== action.payload.id)
        }
    }
      case "ARCHIVE_RETRIEVE" :{
        return {
            ...state,
            habits:state.habits.map((habit)=> habit.id === action.payload.id ? {...habit,archive:!habit.archive}: habit)
        }
      }
      default:
        return {
        habits: [],
        };
    }
  };
  