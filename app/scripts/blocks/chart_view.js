flt.ChartView = Backbone.View.extend({
	template: 'flt__chart_template',
	el: '.chart',

	// events: {
	// },


	initialize: function(){
		this.template = flt.Templates.get(this.template);
	},

	render: function(){
		var template = this.template( this.model.toJSON() );
		this.$el.html(template);
		// this.delegateEvents();
	}
});