define([
    'jquery',
    'underscore',
    'backbone',
    'models/appointment',
    'localStorage',
    'moment'
], function($, _, Backbone, AppointmentModel, LocalStorage, moment){
    var AppointmentCollection = Backbone.Collection.extend({
        model: AppointmentModel,
        localStorage: new LocalStorage('appointmentsCollection'),

        defaultApptTitle: 'New Appointment',

        initialize: function(){
        },

        addEditAppt: function(apptModel){
            var titleVal = $('#title').val();
            var title = this.defaultApptTitle;
            if(titleVal != '')
                title = titleVal;
            var startDate = $('#start-date').val();
            var startTime = $('#start-time').val();
            var endTime = $('#end-time').val();
            var name = $('#name').val();
            var desc = $('#desc').val();

            // Only working with 24 hours format
            if(startTime > endTime){
                alert('Start time must be before end time');
                return;
            }

            var startDateFormat = moment(startDate).format('dddd, MMM D, YYYY').toUpperCase();
            var params = {title: title,
                startDate: startDate,
                startDateFormat: startDateFormat,
                startTime: startTime,
                endTime: endTime,
                name: name,
                description: desc};

            if(apptModel == null){
                 this.create(params,{
                     success: function(model, response, options){
                        Backbone.history.navigate('/', {trigger: true});
                     },
                     error: function(model, response, options){
                        console.log(response);
                     }
                 });
            } else {
                 apptModel.save(params, {
                     success: function(model, response, options){
                        Backbone.history.navigate('/', {trigger: true});
                     },
                     error: function(model, response, options){
                         console.log(response);
                     }
                 });
            }
        }
    });
    return AppointmentCollection;
});
