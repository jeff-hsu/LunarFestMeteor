/**
 * Created by Jeff on 2015-12-09.
 */
if (Meteor.isServer) {

    var imageStore = new FS.Store.S3("images", {
        /* REQUIRED */
        accessKeyId: Meteor.settings.private.AWSAccessKeyId,
        secretAccessKey: Meteor.settings.private.AWSSecretAccessKey,
        bucket: Meteor.settings.private.AWSBucket,

    });

    Images = new FS.Collection("Images", {
        stores: [imageStore],
        filter: {
            allow: {
                contentTypes: ['image/*']
            }
        }
    });

    //PostImages = new FS.Collection("PostImages", {
    //    stores: [imageStore],
    //    filter: {
    //        allow: {
    //            contentTypes: ['image/*']
    //        }
    //    }
    //});

}


//Images = new FS.Collection("images", {
//    stores: [new FS.Store.FileSystem("thumbs", { path: "~/thumbs",
//        transformWrite: function(fileObj, readStream, writeStream) {
//            gm(readStream, fileObj.name()).autoOrient().resize('96', '96' + '^').gravity('Center').extent('96', '96').stream().pipe(writeStream);
//        }
//    }),
//        new FS.Store.FileSystem("images", {path: "~/uploads"})],
//    filter: {
//        allow: {
//            contentTypes: ['image/*'] //allow only images in this FS.Collection
//        }
//    }
//});


if (Meteor.isClient) {
    var imageStore = new FS.Store.S3("images");
    Images = new FS.Collection("Images", {
        stores: [imageStore],
        filter: {
            allow: {
                contentTypes: ['image/*']
            },
            onInvalid: function (message) {
                toastr.error(message);
            }
        }
    });

    //PostImages = new FS.Collection("PostImages", {
    //    stores: [imageStore],
    //    filter: {
    //        allow: {
    //            contentTypes: ['image/*']
    //        },
    //        onInvalid: function (message) {
    //            toastr.error(message);
    //        }
    //    }
    //});
}
Images.allow({
    'insert': function (userId) {
        return userId != null;
    },
    'update': function(userId) { return userId === image.userId; },
    'download': function(){return true;},
    remove: function(userId, image) { return userId === image.userId; }
});


//PostImages.allow({
//    'insert': function () {
//        return true;
//    },
//    'update': function() { return true; },
//    'download': function(){return true;},
//    remove: function() { return true;}
//});