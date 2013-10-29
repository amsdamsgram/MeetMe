define([
    'backbone',
    'views/navigationBarView',
    'views/appointment/appointmentListView',
    'views/appointment/appointmentAddEditView',
    'collections/appointmentCollection',
    'models/appointment'
], function(Backbone, NavigationBarView, AppointmentListView, AppointmentAddEditView, AppointmentCollection, AppointmentModel){
    var AppointmentRouter = Backbone.Router.extend({
       routes: {
           '': 'index',
           'add': 'addAppt',
           'appointment/:id': 'editAppt',
           '*path': 'defaultRoute'
       },

        initialize: function(){
            this.collection = new AppointmentCollection();
            this.navBarView = new NavigationBarView();
            this.listView = new AppointmentListView();
            this.editView = new AppointmentAddEditView();
            this.addView = new AppointmentAddEditView();

            this.navBarView.addView = this.addView;
            this.navBarView.editView = this.editView;
            this.navBarView.render();

            Backbone.history.start({ pushState: true});
        },

        'index': function(){
            console.log('index page');
            this.addView.clear();
            this.collection.fetch();
            this.listView.collection = this.collection;
            this.listView.render();
        },

        'editAppt': function(id){
            this.listView.clear();
            this.editView.type = this.editView.editType;
            this.editView.collection = this.collection;
            this.editView.model = this.collection.get(id);
            this.editView.render();
        },

        'addAppt': function(){
            this.listView.clear();
            this.addView.type = this.addView.addType;
            this.addView.collection = this.collection;
            this.addView.render();
        },

        'defaultRoute': function(path){
          console.log(path);
        }
    });
    return AppointmentRouter;
});