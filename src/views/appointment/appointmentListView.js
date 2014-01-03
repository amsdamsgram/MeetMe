define([
    'jquery',
    'handlebars',
    'backbone',
    'text!templates/appointment/appt-list.html',
    'helpers',
], function($, Handlebars, Backbone, appointmentListTemplate){
    var AppointmentListView = Backbone.View.extend({
        el: $('#appointments-list-container'),

        // Class
        deleteBtnClass: 'delete-btn',
        deleteIconClass: 'delete-icon',
        arrowEditClass: 'arrow-edit',

        initialize: function(collection, navBarView, footerView){
            this.apptCollection = collection;
            this.navBarView = navBarView;
            this.footerView = footerView;
            this.editState = false;
            this.apptCollection.bind('remove', this.render, this);
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
                'label': $.t('buttons:nav.edit'),
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
                'label' : $.t('buttons:nav.done'),
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
            this.navBarView.title = $.t('common:title.list.nav');
            $(document).attr('title', $.t('common:title.list.window'));
            var compiledTemplate = Handlebars.compile(appointmentListTemplate);
            $(this.el).html(compiledTemplate({sortArray: this.orderByDate()}));
            this.footerView.render();
            if(this.editState){
                this.renderDeleteIcon();
                this.renderDoneNavBar();
            } else {
                this.renderListNavBar();
            }
            $(this.el).show();
            return this;
        },

        orderByDate: function(){
            var sortData = _(this.apptCollection.toJSON()).chain().sortBy('startTime')
                .sortBy('startDate').groupBy('startDateFormat').value();
            return sortData;
        },

        renderDeleteButton: function(ev){
            this.removeDeleteButton();
            var btn = $('<span>').addClass(this.deleteBtnClass).html($.t('buttons:action.delete'));
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
            $(this.el).hide();
            this.footerView.clear();
        }
    });
    return AppointmentListView;
});