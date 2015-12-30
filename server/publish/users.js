/**
 * Created by Jeff on 2015-12-11.
 */
Meteor.publish("allUsers", function () {
    if ( Roles.userIsInRole( this.userId, 'admin' ) ) {
        return Meteor.users.find({});
    } else {
        this.stop();
        return
    }

});