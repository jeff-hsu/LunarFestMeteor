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
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor', // optional
                settings: {
                    toolbar: [
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough', 'superscript', 'subscript']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['height', ['height']]
                    ],
                    height: 300,
                    disableDragAndDrop: true
                }
            }
        },
        autoValue: function(){
            if (Meteor.isServer && this.isSet){
                return sanitizeHtml( this.value,{
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'span' ]),
                    allowedAttributes: {
                        '*': [ 'style' ]
                    }
                } );
            }else{
                return this.value;
            }
        }
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
        //autoform: {
        //    afFieldInput: {
        //        type: "cfs-files",
        //        collection: "PostImages"
        //    }
        //}
    },
    "fileIds.$":{
        autoform:{
            afFieldInput:{
                type: "fileUpload",
                collection: "PostImages"
            }
        }

    }



}));


Posts.allow({
    insert: function(userId) { return Roles.userHasRole(id, "admin"); },
    update: function(userId) { return Roles.userHasRole(id, "admin"); },
    remove: function(userId) { return Roles.userHasRole(id, "admin"); },
});

