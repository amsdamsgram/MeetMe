define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'text!templates/appointment/appt-add-edit.html',
], function($, _, Backbone, moment, appointmentTemplate){
    var AppointmentAddView = Backbone.View.extend({
        el: $('#appointment-add-container'),
        editType: 'Edit',
        addType: 'Add',
        currentDate: moment().format('YYYY-MM-DD'),
        defaultStartTime: '13:00',
        defaultEndTime: '14:00',

        events:{
            'focus .placeholder': 'hidePlaceholder',
            'blur #start-time': 'setMinEndTime'
        },

        initialize: function(collection){
            this.apptCollection = collection;
            this.apptModel = null;
        },

        hidePlaceholder: function(ev){
            $(ev.target).hide();
        },

        addEditAppt: function(){
            var titleVal = $('#title').val();
            var title = 'New Appointment';
            if(titleVal != '')
                title = titleVal;
            var startDate = $('#start-date').val();
            var startTime = $('#start-time').val();
            var endTime = $('#end-time').val();
            var name = $('#name').val();
            var desc = $('#desc').val();

            var startDateFormat = moment(startDate).format('dddd, MMM D, YYYY').toUpperCase();
            var model = {title: title,
                         startDate: startDate,
                         startDateFormat: startDateFormat,
                         startTime: startTime,
                         endTime: endTime,
                         name: name,
                         description: desc};

            if(this.type == this.addType){
                this.apptCollection.create(model);
            }

            if(this.type == this.editType){
                this.apptModel.save(model);
            }
        },

        render: function(){
            $(document).attr('title', 'Meet Me - ' + this.type);
            var compiledTemplate = _.template(appointmentTemplate, {appt: this.apptModel,
                                                                    currentDate: this.currentDate,
                                                                    defaultStartTime: this.defaultStartTime,
                                                                    defaultEndTime: this.defaultEndTime});
            $(this.el).html(compiledTemplate);
            _.bindAll(this, 'render');
            return this;
        },

        setMinEndTime: function(){
            var startTime = $('#start-time').val();
            $('#end-time').val(startTime);

        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return AppointmentAddView;
});