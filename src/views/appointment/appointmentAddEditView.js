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
        editType: 'Edit',
        addType: 'Add',

        events:{
            'focus .placeholder': 'placeholderTrigger'
        },

        initialize: function(){
            this.collection = null;
            this.model = null;
        },

        placeholderTrigger: function(ev){
            $(ev.target).hide();
        },

        addEditAppt: function(){
            var title = $(this.formId + ' #title').val();
            var startDate = $(this.formId + ' #start-date').val();
            var startTime = $(this.formId + ' #start-time').val();
            var endTime = $(this.formId + ' #end-time').val();
            var name = $(this.formId + ' #name').val();
            var desc = $(this.formId + ' #desc').val();

            var startDateFormat = moment(startDate).format('dddd, MMM D, YYYY');

            if(this.type == this.addType){
                this.collection.create({
                                        title: title,
                                        startDate: startDate,
                                        startDateFormat: startDateFormat,
                                        startTime: startTime,
                                        endTime: endTime,
                                        name: name,
                                        description: desc });
            }

            if(this.type == this.editType){
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

        render: function(){
            $(document).attr('title', 'Meet Me - ' + this.type);
            var compiledTemplate = _.template(appointmentTemplate, {appt: this.model});
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