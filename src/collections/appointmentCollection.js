define([
    'jquery',
    'underscore',
    'backbone',
    'models/appointment',
    'localStorage'
], function($, _, Backbone, AppointmentModel, LocalStorage){
    var AppointmentCollection = Backbone.Collection.extend({
        model: AppointmentModel,
        localStorage: new LocalStorage('appointmentsCollection'),

        initialize: function(){
            console.log("Creation of a new Collection");
        }
    });
    return AppointmentCollection;
});
