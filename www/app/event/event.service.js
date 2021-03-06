(function () {
  'use strict';

  angular
    .module('app.event')
    .factory('eventService', EventService);

  EventService.$inject = ['historyService', 'Event'];

  function EventService(historyService, Event) {

    return {
      getEvent: getEvent,
      getEventUsers: getEventUsers,
      getEventActivities: getEventActivities,
      saveEventActivity: saveEventActivity,
      deleteEventActivity: deleteEventActivity,
      saveEvent: saveEvent
    };

    //////////////

    function getEvent(id) {
      var event = Event.get({id: id});
      historyService.removeBackFor(["tab.eventEdit", "tab.eventAdd"]);
      return event;
    }

    function getEventUsers(id) {
      return Event.users({id: id});
    }

    function getEventActivities(id) {
      return Event.activities({id: id});
    }

    function saveEventActivity(id, note) {
      return Event.saveActivity({id: id, type: 1, note: note}).$promise;
    }

    function deleteEventActivity(id, activityId) {
      return Event.deleteActivity({id: id, activityId: activityId}).$promise;
    }

    function saveEvent(eventId, seasonId, name, hostUserId, eventDate) {
      var event = new Event({
        id: eventId,
        seasonId: seasonId,
        name: name,
        hostUserId: hostUserId,
        eventDate: moment(eventDate).format()
      });
      return event.$save();
    }

  }

})();
