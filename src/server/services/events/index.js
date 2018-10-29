const db = require('../../database');
const Event = require('../../models/event');
const Registrant = require('../../models/registrant');
const eventbrite_api = require('../../utils/integration_apis').eventbrite_api;
class EventServices {
  async getEvents() {
    const eventBriteEvents = await eventbrite_api('/users/me/owned_events');
    const {events} = eventBriteEvents;
    try {
      let dbEvents = await Event.find({});
      // if no dbevents are found, then sync auto sync all from eventbrite integration
      if (dbEvents.length === 0) {
        await Event.insertMany(events.map(evt => ({name: evt.name.text, external_id: evt.id})));
        dbEvents = await Event.find({});
      }
      const unsyncedEvents = [];
      // loop through event brite events and find any unsynced events
      (events || []).forEach( async ({id, name}) => {
        const index = (dbEvents || []).findIndex(y => y.external_id === id)
        if (index === -1) {
          unsyncedEvents.push({id, name: name.text});
          // await Event.create({name, external_id: id});
        }
      });

      if (unsyncedEvents !== 0) {
        await Event.insertMany(unsyncedEvents.map(evt => ({name: evt.name.text, external_id: evt.id})));
        dbEvents = await Event.find({});
      }

      return (events || []).map(evt => {
        const index = (dbEvents || []).findIndex(y => y.external_id === evt.id)
        // use local ids so the ids aren't tied just to eventbrite in case other event management integrations are considered
        return ({
          ...evt,
          external_id: evt.id,
          id: dbEvents[index]._id
        });
      })
    }
    catch (err) {
      console.log('err', err);
    }
    return [];
  }

  async getEvent(id) {
    let ret;
    try {
      const dbEvent = await Event.findById(id);
      if (dbEvent == null) throw Error('invalid id');

      const eventBriteEvent = await eventbrite_api(`/events/${dbEvent.external_id}`);
      if (eventBriteEvent) {
        // reorganize ids
        ret = {...eventBriteEvent, id: dbEvent._id, external_id: eventBriteEvent.id}
      }
    }
    catch (err) {
      console.log('err', err);
    }
    return ret
  }

  async addRegistrant(id, registrant) {
    const obj = {
      name: {
        firstName: registrant.firstName,
        lastName: registrant.lastName
      },
      email: registrant.email
    }
    try {
      await Registrant.create(obj, async function (err, registrant) {
        await Event.updateOne({_id: id}, {
          $push: {registrants: {registrant, signedIn: true}}
        });
      });
    }
    catch (err) {

    }
  }

  async getEventRegistrants(id) {
    try {
      const {attendees = []} = await eventbrite_api(`/events/51942733113/attendees`)
      const {registrants = []} = await Event.findById(id).populate('registrants.registrant');
      const unsyncedAttendees = [];
      attendees.forEach(attendee => {
        const {profile = {}} = attendee;
        const {first_name, last_name, email} = profile;

        const index = registrants.findIndex(({registrant}) => {
          return email === registrant.email;
        });
        // if not found, set up to be saved
        if (index === -1) unsyncedAttendees.push({name: {firstName: first_name, lastName: last_name}, email});
      });
      // this is dumb. I shouldn't do this
      unsyncedAttendees.forEach(async unsyncedAttendee => {
        const {email} = unsyncedAttendee;
        const dbRegistrant = await Registrant.findOne({email});
        // if db registrant is found, then add
        if (dbRegistrant) {
          await Event.updateOne({_id: id}, {
            $push: {registrants: {registrant: dbRegistrant}}
          })
        }
        // else create registrant and sync
        else {
          await Registrant.create(unsyncedAttendee, async function (err, newDbAttendee) {
            await Event.updateOne({_id: id}, {
              $push: {registrants: {registrant: newDbAttendee}}
            });
          })
        }
      });
      return await Event.findById(id).populate('registrants.registrant');
    }
    catch (err) {console.log('err', err);}
  }
}

const dbMockEvents = {
  'abc-afddlkj': {
    id: 'abc-afddlkj',
    name: 'Monthly Myxer',
    description: 'Just a monthly myxer',
    imgUrl: 'https://www.gettyimages.com/gi-resources/images/Embed/new/embed2.jpg',
    organization: 'Pensacola Network of Black Professionals',
    date: new Date().toDateString('MM/dd/YYYY'),
    registrants: [{
      firstName: 'Emmanuel',
      lastName: 'Buckley',
      email: 'ebuckley2389@gmail.com'
    }, {
      firstName: 'Buckley',
      lastName: 'Emmanuel',
      name: 'Buckley Emmanuel',
      email: 'buckley.emmanuel@gmail.com'
    }, {
      firstName: 'Ebk',
      lastName: 'Buckley',
      name: 'Ebk Buckley',
      email: 'fakeEmail@gmail.com'
    }, {
      firstName: 'Mock',
      lastName: 'Child',
      email: 'mock.child@email.com'
    }, {
      firstName: 'Buckley',
      lastName: 'Emmanuel',
      name: 'Buckley Emmanuel',
      email: 'buckley.emmanuel@gmail.com'
    }, {
      firstName: 'Ebk',
      lastName: 'Buckley',
      name: 'Ebk Buckley',
      email: 'fakeEmail@gmail.com'
    }, {
      firstName: 'Mock',
      lastName: 'Child',
      email: 'mock.child@email.com'
    }]
  },
  'alfjaf': {
    id: 'alfjaf',
    name: 'Test Mixyer',
    description: 'jalfja;f',
    imgUrl: 'https://image.shutterstock.com/z/stock-photo-hands-holding-credit-card-and-using-laptop-online-shopping-289585190.jpg',
    organization: 'Pensacola Network of Black Professionals',
    date: new Date().toDateString('MM/dd/YYYY'),
    registrants: [{
      firstName: 'ABC',
      lastName: 'FAke',
      name: 'ABC FAke',
      email: 'fake@fake.com'
    }]
  }
}

module.exports = new EventServices();