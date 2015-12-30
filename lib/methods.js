/**
 * Created by Jeff on 2015-12-28.
 */
Meteor.methods({
    updatePost: function (modifier, objID) {
        Posts.update(objID,modifier);

    }
});