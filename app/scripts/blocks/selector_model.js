flt.Selector = Backbone.Model.extend({
	defaults: {
		campaign_collection: {},
		campaigns: [],
		selected: [],
		max_selected: 8
	},

	initialize: function (options) {
		this.view = new flt.SelectorView({
			model:this
		});

		var campaigns = this.get('campaign_collection')
			.toJSON()
				.sort(function(a, b){
					if(a.title < b.title) return -1;
					if(a.title > b.title) return 1;
					return 0;
				});

		campaigns = _.map(campaigns, function(campaign, i) {
			campaign.metrics = _.toJSONString(campaign.metrics);
			return campaign;
		})

		this.set({
			campaigns: campaigns
		})

		this.view.render();

		this.on('change:selected', function(model, val) {
			this.trigger('select', val);
		}, this)
	},

	selectCampaign: function(campaign_obj) {
		var selected_arr = this.get('selected')
		if(campaign_obj.id && selected_arr.length < this.get('max_selected')) {
			if(!_.where(selected_arr, {id: campaign_obj.id}).length) {
				selected_arr.push(campaign_obj);
				this.set('selected', selected_arr);
				this.trigger('change:selected', this, selected_arr);
			}
		}
	},

	deselectCampaign: function(campaign_obj) {
		var that = this;
		if(campaign_obj.id) {
			var selected_arr = this.get('selected');
			for (var i = selected_arr.length - 1; i >= 0; i--) {
				var selected_campaign = selected_arr[i]
				if(selected_campaign.id === campaign_obj.id) {
					if(selected_arr.length > 1){
						selected_arr.splice(i, 1);
						that.set('selected', selected_arr);
						that.trigger('change:selected', that, selected_arr);
					} else {
						that.set('selected', []);
					}
				}
			};
		}
	},

	clearSelected: function() {
		this.set('selected', []);
	}

});