flt.Application = Backbone.Model.extend({
	url: '/data/data.json',

	defaults: {

	},

	initialize: function (){
		this.campaign_collection = new flt.CampaignCollection();
		this.campaign_collection.on('load:success', this.init, this);

		this.campaign_collection.fetch();
	},

	init: function() {
		this.chart = new flt.Chart({
			metric_names: ['offers','shares','landings','leads','purchases','friends'],
			width: 350,
			height: 300,
			gap: 20
		});
		this.selector = new flt.Selector({
			max_selected: 8,
			campaign_collection: this.campaign_collection
		});

		this.selector.on('select', this.chartUpdate, this);
	},

	chartUpdate: function(campaign_arr) {
		this.chart.setData(campaign_arr);
	},

});
