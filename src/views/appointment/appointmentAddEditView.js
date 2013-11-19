define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'text!templates/appointment/appt-add-edit.html',
], function($, _, Backbone, moment, appointmentTemplate){
    var AppointmentAddView = Backbone.View.extend({
        el: $('#appointment-add-container'),

        // Default Parameters
        currentDate: moment().format('YYYY-MM-DD'),
        defaultStartTime: '13:00',
        defaultEndTime: '14:00',

        events:{
            'focus .placeholder': 'hidePlaceholder',
            'blur #start-time': 'setMinEndTime'
        },

        initialize: function(collection, navBarView){
            this.apptCollection = collection;
            this.apptModel = null;
            this.navBarView = navBarView;
        },

        hidePlaceholder: function(ev){
            $(ev.target).hide();
        },

        renderAddEditNavBar: function(){
            var view = this;
            if(this.apptModel == null){
                $(document).attr('title', $.t('titles:add.window'));
                this.navBarView.title = $.t('titles:add.nav');
            }
            else{
                $(document).attr('title', $.t('titles:edit.window'));
                this.navBarView.title = $.t('titles:edit.nav');
            }
            this.navBarView.leftBtn = {
                'label' : $.t('buttons:nav.cancel'),
                'action' : '/',
                'class': '',
                'callback': function() {

                }
            };
            this.navBarView.rightBtn = {
                'label' : $.t('buttons:nav.save'),
                'action' : '#',
                'class': '',
                'callback' : function() {
                    view.apptCollection.addEditAppt(view.apptModel);
                }
            };
            this.navBarView.render();
        },

        render: function(){
            this.renderAddEditNavBar();
            var compiledTemplate = _.template(appointmentTemplate, {appt: this.apptModel,
                                                                    currentDate: this.currentDate,
                                                                    defaultStartTime: this.defaultStartTime,
                                                                    defaultEndTime: this.defaultEndTime});
            $(this.el).html(compiledTemplate);
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