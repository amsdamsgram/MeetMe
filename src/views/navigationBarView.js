define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/navigationBar.html'
], function($, _, Backbone, appointmentListTemplate){
    var NavigationBarView = Backbone.View.extend({
        el: $('#nav-bar'),
        editType: 'edit',
        addType: 'add',

        initialize: function(){
        },

        events: {
            'click .nav-btn.save': 'saveAppt'
        },

        render: function(){
            this.renderList();
            var compiledTemplate = _.template(appointmentListTemplate);
            $(this.el).html(compiledTemplate);
            _.bindAll(this, 'render');
            return this;
        },

        renderAddEdit: function(type){
            var leftBtn = $('.nav-btn.left');
            var rightBtn = $('.nav-btn.right');

            if(type == this.addType){
                $('#nav-title').html('New Appointment');
                leftBtn.removeClass('edit').addClass('cancel');
                rightBtn.removeClass('add').addClass('save');
                leftBtn.html('Cancel');
                rightBtn.html('Save');
            }
            if(type == this.editType){
                $('#nav-title').html('Edit Appointment');
                leftBtn.removeClass('edit').addClass('done');
                rightBtn.removeClass('add').hide();
                leftBtn.html('Done');
            }

            leftBtn.attr('href', '/');
            rightBtn.attr('href', '/');
        },

        renderList: function(){
            var leftBtn = $('.nav-btn.left');
            var rightBtn = $('.nav-btn.right');

            $('#nav-title').html('My Appointments');
            leftBtn.removeClass('cancel').addClass('edit');
            rightBtn.removeClass('save').addClass('add').show();
            leftBtn.attr('href', '/edit');
            rightBtn.attr('href', '/add');
            leftBtn.html('Edit');
            rightBtn.html('+').show();
        },

        saveAppt: function(){
            this.addView.addEditAppt();
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return NavigationBarView;
});