/**
 * Created by Jeff on 2015-12-22.
 */
//Posts = new Meteor.Collection("posts");

Posts = new orion.collection('posts', {
    singularName: 'post', // The name of one of these items
    pluralName: 'posts', // The name of more than one of these items
    link: {
        title: 'Posts'
    },
    tabular: {
        columns: [
            {
                data: "title",
                title: "Title"
            },{
                data: "body",
                title: "Body"
            },{
                data: "submitted",
                title: "Submitted"
            },
        ]
    }
});

Posts.attachSchema(new SimpleSchema({
    title: {
        type: String,
        optional: false,
        label: 'Post Title'
    },
    body: {
        type: String,
        optional: false,
        label: 'body',
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
    image: orion.attribute('image', {
        optional: true,
        label: 'Post Image'
    }),

}));


Posts.allow({
    insert: function(userId) { return Roles.userHasRole(id, "admin"); },
    update: function(userId) { return Roles.userHasRole(id, "admin"); },
    remove: function(userId) { return Roles.userHasRole(id, "admin"); },
});

