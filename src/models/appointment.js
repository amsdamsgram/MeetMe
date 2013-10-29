define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var Appointment = Backbone.Model.extend({
        defaults: {
            title: "",
            startDate: "",
            startTime: "",
            endTime: "",
            name: "",
            description: ""
        },

        initialize: function(){
            console.log("Creation of a new article");
        },

        createAppt: function(title, startDate, startTime, endTime, name, description){
          var newAppt = new Appointment({title: title,
                                        startDate: startDate,
                                        startTime: startTime,
                                        endTime: endTime,
                                        name: name,
                                        description: description});
          newAppt.save();
          return newAppt;
        },

        editAppt: function(title, startDate, startTime, endTime, name, description){
            this.save({title: title,
                    startDate: startDate,
                    startTime: startTime,
                    endTime: endTime,
                    name: name,
                    description: description });
    }
    });
    return Appointment;
});