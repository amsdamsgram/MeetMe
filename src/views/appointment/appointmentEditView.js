define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/appointment/appt-add-edit.html',
], function($, _, Backbone, appointmentTemplate){
    var AppointmentEditView = Backbone.View.extend({
        el: $('#appointment-container'),

        initialize: function(){
            this.model =  null;
        },
        events: {
            'click #save-btn': 'saveEdit',
            'click #cancel-btn': 'cancelEdit'
        },

        saveEdit: function(){
            var title = $('#title').val();
            var startDate = '10-10-1990';
            var end = '10-10-1990';
            var name = $('#name').val();
            var description = $('#description').val();
            this.model.set({
                            title: title,
                            startDate: startDate,
                            startTime: startTime,
                            endTime: endTime,
                            name: name,
                            description: desc})
            /*this.model.editAppt(title, start, end, name, description);*/
        },

        cancelEdit: function(){
            this.clear();
        },

        render: function(){
            var compiledTemplate = _.template(appointmentTemplate, {appt: this.model});
            $(this.el).html(compiledTemplate);
            return this;
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return AppointmentEditView;
});