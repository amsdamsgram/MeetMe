define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var Appointment = Backbone.Model.extend({
        defaults: {
            title: "No Title",
            startDate: "",
            startDateFormat: "",
            startTime: "",
            endTime: "",
            name: "",
            description: ""
        },

        initialize: function(){
            console.log("Creation of a new article");
        }
    });
    return Appointment;
});