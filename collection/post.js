/**
 * Created by Jeff on 2015-12-22.
 */
Posts = new Meteor.Collection("posts");

Posts.attachSchema(new SimpleSchema({
    title: {
        type: String,
        optional: false,
        label: 'Post Title'
    },
    body: {
        type: String,
        optional: false,
        label: 'Body',
    },

    submitted: {
        type: Date,
        optional: false,
        autoValue: function () { return new Date(); },
        autoform: {
            type: "hidden",
            label: false
        },
    },
    fileIds: {
        type: [String],
        optional: true,
        autoform: {
            afFieldInput: {
                type: "cfs-files",
                collection: "PostImages"
            }
        }
    },



}));


Posts.allow({
    insert: function(userId) { return Roles.userHasRole(id, "admin"); },
    update: function(userId) { return Roles.userHasRole(id, "admin"); },
    remove: function(userId) { return Roles.userHasRole(id, "admin"); },
});

