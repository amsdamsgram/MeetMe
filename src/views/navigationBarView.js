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
            'click .nav-btn.save': 'saveAppt',
            'click .nav-btn.save-edit': 'editAppt',
            'click .nav-btn.edit': 'renderDeleteIcon',
            'click .nav-btn.done': 'doneEdit'
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
                rightBtn.removeClass('add').addClass('save');
            }
            if(type == this.editType){
                $('#nav-title').html('Edit Appointment');
                rightBtn.removeClass('add').addClass('save-edit');
            }
            leftBtn.removeClass('edit').removeClass('done').addClass('cancel');
            leftBtn.attr('href', '/').html('Cancel');
            rightBtn.attr('href', '/').html('Save');
            rightBtn.show();
        },

        renderList: function(){
            var leftBtn = $('.nav-btn.left');
            var rightBtn = $('.nav-btn.right');

            $('#nav-title').html('My Appointments');
            leftBtn.removeClass('cancel').removeClass('done').addClass('edit');
            rightBtn.removeClass('save').removeClass('save-edit').addClass('add').show();
            leftBtn.attr('href', '#');
            rightBtn.attr('href', '/add');
            leftBtn.html('Edit');
            rightBtn.html('+').show();
        },

        saveAppt: function(){
            this.addView.addEditAppt();
        },

        editAppt: function(){
            this.editView.addEditAppt();
        },

        renderDeleteIcon: function(){
            var leftBtn = $('.nav-btn.left');
            var rightBtn = $('.nav-btn.right');

            leftBtn.removeClass('edit').addClass('done');
            rightBtn.removeClass('add').hide();
            leftBtn.html('Done');
            leftBtn.attr('href', '/');

            var icon = $('<a>').attr('href', '#').addClass('delete-icon');
            var edit = $('<span>').addClass('arrow-edit').html('>');
            $('.appt-time').before(edit);
            $('.appt-row').before(icon);

            var rows = $('.appt-row');
            _.each(rows, function(row){
               $(row).attr('href', '/appointment/'+$(row).closest('article').attr('id'));
            });
        },

        doneEdit: function(){
            this.renderList();
            $('.delete-icon').remove();
            $('.arrow-edit').remove();
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return NavigationBarView;
});