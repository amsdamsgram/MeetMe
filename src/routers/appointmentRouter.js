define([
    'backbone',
    'views/navigationBarView',
    'views/appointment/appointmentListView',
    'views/appointment/appointmentAddEditView',
    'collections/appointmentCollection'
], function(Backbone, NavigationBarView, AppointmentListView, AppointmentAddEditView, AppointmentCollection){
    var AppointmentRouter = Backbone.Router.extend({
       routes: {
           '': 'index',
           'add': 'add',
           'appointment/:id': 'edit',
           '*path': 'defaultRoute'
       },

        initialize: function(){
            this.collection = new AppointmentCollection();
            this.collection.fetch();

            this.navBarView = new NavigationBarView();
            this.listView = new AppointmentListView(this.collection, this.navBarView);
            this.editView = new AppointmentAddEditView(this.collection, this.navBarView);
            this.addView = new AppointmentAddEditView(this.collection, this.navBarView);
        },

        'index': function(){
            this.addView.clear();
            this.listView.render();
        },

        'edit': function(id){
            this.listView.clear();
            this.editView.apptModel = this.collection.get(id);
            this.editView.render();
        },

        'add': function(){
            this.listView.clear();
            this.addView.render();
        },

        'defaultRoute': function(path){
            console.log(path);
        }
    });
    return AppointmentRouter;
});