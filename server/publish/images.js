/**
 * Created by Jeff on 2015-12-10.
 */
Meteor.publish('images', function ( user_id) {

    //check(limit, Number);

    var findQuery = {};
    if (user_id) {
        // In profile page and user is log in
        check(user_id, String);
        findQuery = {userId: user_id};
    } else if (!Roles.userIsInRole(this.userId, 'admin')) {
        findQuery = {status: "approved"};
    }
    console.log(findQuery);
    console.log(Images.find(findQuery).count());
    return Images.find(findQuery, {
        //limit: limit,
        sort: {uploadedAt: -1}
    });

});