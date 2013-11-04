define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/appointment/appt-list.html'
], function($, _, Backbone, appointmentListTemplate){
    var AppointmentListView = Backbone.View.extend({
        el: $('#appointments-list-container'),

        // Title
        viewTitle: 'Meet Me',
        barTitle: 'My Appointments',

        // Class
        deleteBtnClass: 'delete-btn',
        deleteIconClass: 'delete-icon',
        arrowEditClass: 'arrow-edit',

        initialize: function(collection, navBarView){
            this.apptCollection = collection;
            this.navBarView = navBarView;
            this.editState = false;
        },

        events: {
            'click .delete-btn': 'deleteAppt',
            'click .delete-icon': 'renderDeleteButton',
            'click .appt-edit-container': 'removeDeleteButton'
        },

        renderEditState: function() {
            this.editState = true;
            this.render();
        },

        renderListNavBar: function(){
            var view = this;
            this.navBarView.leftBtn = {
                'label': 'Edit',
                'action': '#',
                'class': '',
                'callback': function() {
                    view.renderEditState();
                }
            };
            this.navBarView.rightBtn = {
                'label': '+',
                'action': '/add',
                'class': 'add',
                'callback' : function() {
                }
            };
            this.navBarView.render();
        },

        renderDoneNavBar: function(){
            var view = this;
            view.navBarView.leftBtn = {
                'label' : 'Done',
                'action' : '#',
                'class': '',
                'callback' : function() {
                    view.editState = false;
                    view.render();
                }
            };
            view.navBarView.rightBtn = {
                'label' : '',
                'action' : '#',
                'class': '',
                'callback' : function() {
                }
            };
            this.navBarView.render();
        },

        render: function(){
            this.navBarView.title = this.barTitle;
            $(document).attr('title', this.viewTitle);
            var compiledTemplate = _.template(appointmentListTemplate, {sortArray: this.orderByDate()});
            $(this.el).html(compiledTemplate);
            if(this.editState){
                this.renderDeleteIcon();
                this.renderDoneNavBar();
            } else {
                this.renderListNavBar();
            }
            _.bindAll(this, 'render');
            this.apptCollection.bind('remove', this.render);
            return this;
        },

        orderByDate: function(){
            var sortData = _(this.apptCollection.toJSON()).chain().sortBy('startTime')
                .sortBy('startDate').groupBy('startDateFormat').value();
            return sortData;
        },

        renderDeleteButton: function(ev){
            this.removeDeleteButton();
            var btn = $('<span>').addClass(this.deleteBtnClass).html('Delete');
            $(ev.target).closest('article').append(btn);

            // Focus to make the transition works
            btn.focus();
            btn.css('right', 0);
            $(ev.target).closest('div.slide-container').css('right', '26%');

            this.toggleHrefEditContainer();
        },

        removeDeleteButton: function(){
            $('.' + this.deleteBtnClass).css('right', "-22%");
            $('.slide-container').css('right', 0);
            var view = this;
            $('.' + this.deleteBtnClass).bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
                view.toggleHrefEditContainer();
                $(this).remove();
            });
        },

        toggleHrefEditContainer: function(){
            var container = $('.appt-edit-container');
            var href = container.attr('href');

            if(href == '#'){
                container.attr('href', container.attr('id'));
                container.removeAttr('id');
            } else {
                container.attr('href', '#');
                container.attr('id', href);
            }
        },

        renderDeleteIcon: function(){
            var deleteIcon = $('<span>').addClass(this.deleteIconClass);
            var editArrow = $('<span>').addClass(this.arrowEditClass);
            $('.appt-time').before(editArrow);
            $('.appt-edit-container').before(deleteIcon);

            this.transitionDeleteIcon();

            var rows = $('.appt-edit-container');
            _.each(rows, function(row){
                $(row).attr('href', '/appointment/'+$(row).closest('article').attr('id'));
            });
        },

        transitionDeleteIcon: function(){
            var icons = $('.'+this.deleteIconClass);
            _.each(icons, function(icon){
                $(icon).focus();
                $(icon).css('left', 0);

                var arrow = $(icon).closest('div.slide-container').find('.arrow-edit');
                $(arrow).focus();
                $(arrow).css('right', 0);
            });
        },


        deleteAppt: function(e){
            var id = $(e.target).closest('article').attr('id');
            this.apptCollection.get(id).destroy();
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return AppointmentListView;
});