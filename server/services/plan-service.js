const plansData = "./services/dummy-data.json";
const { Event } = require("../db/models");
const { Item } = require("../db/models");

// async function getAllEventsState() {
//     const events = await getAllPlans();
//     events.forEach(event => {
//         event.evenItems = await Item.findAll({where:{eventId:event.eventId}})
//     })
//     return events;

// }

async function getAllPlans() {
  let events = await Event.findAll();
  return events;
}


async function addPlan(plan) {
  const { headline, date, type, location } = plan;
  await Event.create({ headline, date, type, location });
  const event = await Event.findAll({
    limit: 1,
    order: [["id", "DESC"]],
    raw: true,
  });
  event.eventItems = [];
  event.eventsUsers = [];
  return event;
}

async function deletePlan(id) {
  const removedPlan = await Event.findOne({ where: { id } });
  await removedPlan.destroy();
  return removedPlan;
}

async function editPlan(id, plan) {
  const editedPlan = await Event.findOne({ where: { id } });
  await editedPlan.update({ ...plan });
  return editedPlan;
}

const getEventPageById = async (id) => {
  const event = await Event.findOne({ where: { id } });
  return event;
};

const itemAdding = async (newItem) => {
  const { itemName, bringName, quantity, status, eventId } = newItem;
  await Item.create({ itemName, bringName, quantity, status, eventId });
  const item = await Item.findAll({
    limit: 1,
    order: [["id", "DESC"]],
    raw: true,
  });
  
  return item;
};

module.exports = {
  getAllPlans,
  addPlan,
  deletePlan,
  editPlan,
  getEventPageById,
  itemAdding,
};
