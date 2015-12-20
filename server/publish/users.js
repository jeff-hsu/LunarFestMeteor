/**
 * Created by Jeff on 2015-12-11.
 */
Meteor.publish("allUsers", function () {
    return Meteor.users.find({},{sort: {"profile.country":1}});
});