import {postPlan, fetchPlans} from "../../api/plan";
import actionTypes from "./constants";

export const fetchAllPlans = (fetchedEvents) => ({
  type: actionTypes.FETCH_ALL_PLANS,
  payload: fetchedEvents
})

export const fetchEventAction = () => {
  return async (dispatch) => {
    const fetchedEvents = await fetchPlans()
    dispatch(fetchAllPlans(fetchedEvents));
  };
}

export const addPlan = (newEvent) => ({
  type: actionTypes.ADD_PLAN,
  payload: [newEvent],
});

export const addEventAction = (newEvent) => {
  return async (dispatch) => {
   const plan =  await postPlan(newEvent)
   console.log(plan,'here is the plan')
    dispatch(addPlan(newEvent));
    console.log('herre is the plan')
    return plan
  };
};
