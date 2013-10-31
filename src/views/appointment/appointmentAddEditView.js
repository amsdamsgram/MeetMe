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
        currentDate: moment().format('YYYY-MM-DD'),
        defaultStartTime: '01:00PM',
        defaultEndTime: '02:00PM',

        events:{
            'focus .placeholder': 'placeholderTrigger',
            'blur #start-time': 'setMinEndTime'
        },

        initialize: function(){
            this.apptCollection = null;
            this.apptModel = null;
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
                this.apptCollection.create({
                                        title: title,
                                        startDate: startDate,
                                        startDateFormat: startDateFormat,
                                        startTime: startTime,
                                        endTime: endTime,
                                        name: name,
                                        description: desc });
            }

            if(this.type == this.editType){
                this.apptModel.save({
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
            this.checkInputTimeFormat();
            var compiledTemplate = _.template(appointmentTemplate, {appt: this.apptModel,
                                                                    currentDate: this.currentDate,
                                                                    defaultStartTime: this.defaultStartTime,
                                                                    defaultEndTime: this.defaultEndTime});
            $(this.el).html(compiledTemplate);
            _.bindAll(this, 'render');
            return this;
        },

        setMinEndTime: function(){
            var startTime = $(this.formId + ' #start-time').val();
            $(this.formId + ' #end-time').val(startTime);

        },

        checkInputTimeFormat: function(){
            // Not sure about input [type=time] format 12 or 24
            $(this.formId + '#start-time').val(this.defaultStartTime);
            if(!$(this.formId + '#start-time').val()){
                this.defaultStartTime = this.time12Hoursto24Hours(this.defaultStartTime);
                this.defaultEndTime = this.time12Hoursto24Hours(this.defaultEndTime);
            }
        },

        // Format hh:mmPM
        time12Hoursto24Hours: function(fullTime){
            var period = fullTime.slice(-2);
            var time = fullTime.substr(0, fullTime.length - 2);
            var timeArray = time.split(':');

            if(period == 'PM'){
                return parseInt(timeArray[0])+12+':'+timeArray[1];
            } else {
                return time;
            }
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return AppointmentAddView;
});