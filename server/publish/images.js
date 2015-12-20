/**
 * Created by Jeff on 2015-12-10.
 */
Meteor.publish('images', function(limit, user_id) {
    check(limit, Number);

    var findQuery = {};
    if (user_id) {
        check(user_id, String);
        findQuery = { userId : user_id };
    }
    console.log(findQuery);
    return Images.find(findQuery, {
        limit: limit,
        sort: { uploadedAt: -1 }
    });
});