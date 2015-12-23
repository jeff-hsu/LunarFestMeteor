/**
 * Created by Jeff on 2015-12-22.
 */
Posts = new Meteor.Collection("posts");

if(Posts.find().count()==0){
    Posts.insert({
        title: "First Post",
        body: "first body",
        imageID: "hCoT7TivKgkEZjrZF",
        submitted: new Date()
    });
}
