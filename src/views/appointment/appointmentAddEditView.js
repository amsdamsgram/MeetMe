define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'text!templates/appointment/appt-add-edit.html',
], function($, _, Backbone, moment, appointmentTemplate){
    var AppointmentAddView = Backbone.View.extend({
        el: $('#appointment-add-container'),
        formId: '#appt-form',
        title: 'Meet Me - Add',


        initialize: function(){
            this.collection = null;
            this.model = null;
        },
        events: {
            'click #save-btn': 'addEditAppt',
            'click #cancel-btn': 'cancelAppt'
        },

        addEditAppt: function(){
            var title = $(this.formId + ' #title').val();
            var startDate = $(this.formId + ' #start-date').val();
            var startTime = $(this.formId + ' #start-time').val();
            var endTime = $(this.formId + ' #end-time').val();
            var name = $(this.formId + ' #name').val();
            var desc = $(this.formId + ' #desc').val();

            var startDateFormat = moment(startDate).format('dddd, MMM D, YYYY');

            if(this.type == 'add'){
                this.collection.create({
                                        title: title,
                                        startDate: startDate,
                                        startDateFormat: startDateFormat,
                                        startTime: startTime,
                                        endTime: endTime,
                                        name: name,
                                        description: desc });
            }

            if(this.type == 'edit'){
                this.model.save({
                                  title: title,
                                  startDate: startDate,
                                  startDateFormat: startDateFormat,
                                  startTime: startTime,
                                  endTime: endTime,
                                  name: name,
                                  description: desc });
            }
        },

        cancelAppt: function(){
        },

        render: function(){
            $(document).attr('title', this.title);
            $('#edit-appt').html('Done');
            $('#add-appt').html('');
            var compiledTemplate = _.template(appointmentTemplate, {appt: this.model, title: this.title});
            $(this.el).html(compiledTemplate);
            _.bindAll(this, 'render');
            return this;
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return AppointmentAddView;
});