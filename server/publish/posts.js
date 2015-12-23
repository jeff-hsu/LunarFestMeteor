/**
 * Created by Jeff on 2015-12-22.
 */
Meteor.publish("allPosts", function () {
    return Posts.find();
});

Meteor.publish("allPostImages", function () {
    return PostImages.find();
});