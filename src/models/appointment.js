define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var Appointment = Backbone.Model.extend({

        initialize: function(){
            console.log("Creation of a new article");
        }
    });
    return Appointment;
});