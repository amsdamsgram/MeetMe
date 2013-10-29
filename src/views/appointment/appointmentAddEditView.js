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
        pageTitle: 'Meet Me - ' + this.type,
        navTitle: "New Appointment",

        initialize: function(){
            this.collection = null;
            this.model = null;
        },
        events: {
            'click .nav-btn.save': 'addEditAppt',
            'click .nav-btn.cancel': 'cancelAppt'
        },

        addEditAppt: function(){
            var title = $(this.formId + ' #title').val();
            var startDate = $(this.formId + ' #start-date').val();
            var startTime = $(this.formId + ' #start-time').val();
            var endTime = $(this.formId + ' #end-time').val();
            var name = $(this.formId + ' #name').val();
            var desc = $(this.formId + ' #desc').val();

            console.log(title);

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

        cancelAppt: function(){
            console.log('cancel');
        },

        render: function(){
            this.renderNavBar();
            var compiledTemplate = _.template(appointmentTemplate, {appt: this.model});
            $(this.el).html(compiledTemplate);
            _.bindAll(this, 'render');
            return this;
        },

        renderNavBar: function(){
            $(document).attr('title', this.pageTitle);
            if(this.type == this.editType){

            }
            if(this.type == this.addType){
                this.renderAdd();
            }
        },

        renderAdd: function(){
            var leftBtn = $('.nav-btn.left');
            var rightBtn = $('.nav-btn.right');

            $('#header-title').html(this.navTitle);
            leftBtn.removeClass('edit').addClass('cancel');
            rightBtn.removeClass('add').addClass('save');
            leftBtn.attr('href', '/');
            rightBtn.attr('href', '/');
            leftBtn.html('Cancel');
            rightBtn.html('Save');
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return AppointmentAddView;
});