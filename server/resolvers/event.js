const Event = require("../models/event");

module.exports = {
  events: () => {
    return Event.find()
      .then(res => {
        return res.map(event => {
          return { ...event._doc };
        });
      })
      .catch(err => {
        throw err;
      });
  },
  createEvent: args => {
    const event = new Event({
      name: args.eventInput.name,
      date: new Date(args.eventInput.date)
    });
    return event
      .save()
      .then(res => {
        console.log(res);
        return { ...res._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};
