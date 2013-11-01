define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/navigationBar.html'
], function($, _, Backbone, appointmentListTemplate){
    var NavigationBarView = Backbone.View.extend({
        el: $('#nav-bar'),

        // Type
        editType: 'edit',
        addType: 'add',

        // Navigation bar titles
        addViewTitle: 'New Appointment',
        editViewTitle: 'Edit Appointment',
        listViewTitle: 'My Appointments',

        // Class
        saveBtnClass: 'save',
        addBtnClass: 'add',
        editBtnClass: 'edit',
        saveEditBtnClass: 'save-edit',
        cancelBtnClass: 'cancel',
        doneBtnClass: 'done',
        deleteIconClass: 'delete-icon',
        arrowEditClass: 'arrow-edit',

        // Selector
        leftBtnSel: '.nav-btn.left',
        rightBtnSel: '.nav-btn.right',
        deleteBtnSel: '.delete-btn',

        initialize: function(){
        },

        events: {
            'click .nav-btn.save': 'saveAppt',
            'click .nav-btn.save-edit': 'editAppt',
            'click .nav-btn.edit': 'renderDeleteIcon',
            'click .nav-btn.done': 'doneEdit'
        },

        render: function(){
            this.renderListNavBar();
            var compiledTemplate = _.template(appointmentListTemplate);
            $(this.el).html(compiledTemplate);
            return this;
        },

        renderAddEditNavBar: function(type){
            if(type == this.addType){
                $('#nav-title').html(this.addViewTitle);
                $(this.rightBtnSel).removeClass(this.addBtnClass).addClass(this.saveBtnClass);
            }
            if(type == this.editType){
                $('#nav-title').html(this.editViewTitle);
                $(this.rightBtnSel).removeClass(this.addBtnClass).addClass(this.saveEditBtnClass);
            }
            $(this.leftBtnSel).removeClass(this.editBtnClass).removeClass(this.doneBtnClass).addClass(this.cancelBtnClass);
            $(this.leftBtnSel).attr('href', '/').html('Cancel');
            $(this.rightBtnSel).attr('href', '/').html('Save');
            $(this.rightBtnSel).show();
        },

        renderListNavBar: function(){
            $('#nav-title').html(this.listViewTitle);
            $(this.leftBtnSel).removeClass(this.cancelBtnClass).removeClass(this.doneBtnClass).addClass(this.editBtnClass);
            $(this.rightBtnSel).removeClass(this.saveBtnClass).removeClass(this.saveEditBtnClass).addClass(this.addBtnClass).show();
            $(this.leftBtnSel).attr('href', '#');
            $(this.rightBtnSel).attr('href', '/add');
            $(this.leftBtnSel).html('Edit');
            $(this.rightBtnSel).html('+').show();
        },

        renderDoneNavBar: function(){
            $(this.leftBtnSel).removeClass(this.editBtnClass).addClass(this.doneBtnClass);
            $(this.rightBtnSel).removeClass(this.addBtnClass).hide();
            $(this.leftBtnSel).html('Done');
            $(this.leftBtnSel).attr('href', '/');
        },

        saveAppt: function(){
            this.addView.addEditAppt();
        },

        editAppt: function(){
            this.editView.addEditAppt();
        },

        renderDeleteIcon: function(){
            this.renderDoneNavBar();

            var deleteIcon = $('<span>').addClass(this.deleteIconClass);
            var editArrow = $('<span>').addClass(this.arrowEditClass);
            $('.appt-time').before(editArrow);
            $('.appt-edit-container').before(deleteIcon);

            var rows = $('.appt-edit-container');
            _.each(rows, function(row){
               $(row).attr('href', '/appointment/'+$(row).closest('article').attr('id'));
            });
        },

        doneEdit: function(){
            this.renderListNavBar();

            $('.' + this.arrowEditClass).remove();
            $('.' + this.deleteIconClass).remove();
            $(this.deleteBtnSel).removeClass('active');
            $('.slide-container').removeClass('active');
            $(this.deleteBtnSel).bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
                $(this).remove();
            });
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return NavigationBarView;
});