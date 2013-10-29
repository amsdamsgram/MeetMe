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
        },

        editAppt: function(id, title){
            var apptModel = this.get(id);
            apptModel.set('title', title);

            /*apptModel.set('name', name);
            apptModel.set('description', description);*/

            apptModel.save();
        }
    });
    return AppointmentCollection;
});
