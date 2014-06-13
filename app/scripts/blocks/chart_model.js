flt.Chart = Backbone.Model.extend({
	defaults: {
		campaigns: [],
		floors: [],
		metric_names: ['leads'],
		width: 100,
		height: 100,
		padding_top: 20
	},

	initialize: function (options) {
		this.view = new flt.ChartView({
			model:this
		});

	},

	setData: function(campaigns_arr) {
		if(_.isArray(campaigns_arr) && campaigns_arr.length > 1) {
			var floors = [],
				i = 0,
				l = campaigns_arr.length,
				j = 0,
				k = 0,
				metric_names = this.get('metric_names'),
				lj = metric_names.length,
				summ = 0,
				width = this.get('width'),
				height = this.get('height'),
				padding_top = this.get('padding_top'),
				campaigns = [];


			// calc floors
			for (; j < lj; j++) {
				summ = 0;
				for (i=0; i < l; i++) {
					summ += campaigns_arr[i].metrics[metric_names[j]];
				}
				floors.push({
					name:  metric_names[j],
					value: summ,
					point: {
						x: width,
						y: height * j / (metric_names.length-1)
					}
				});
			}


			// calc campaigns
			var metric_val = 0,
				metrics = {},
				metrics_arr = [];
			for (i=0; i < l; i++) {
				metrics = _.extend({}, campaigns_arr[i].metrics);
				metrics_arr = [];
				for (j=0; j < lj; j++) {
					metric_val = metrics[metric_names[j]];
					metrics_arr.push({
						point: {
							x: floors[j].value!==0 ? (width * metric_val/(floors[j].value)) : width,
							y: height * j / (metric_names.length-1)
						}
					});
				}
				campaigns.push({
					id: campaigns_arr[i].id,
					title: campaigns_arr[i].title,
					metrics: metrics_arr
				});
			}

			// fix x for such chart
			for (i=1; i < l; i++) {
				metrics = campaigns[i].metrics;
				for (j=0; j < lj; j++) {
					metrics[j].point.x = metrics[j].point.x + campaigns[i-1].metrics[j].point.x;
				}
			}

			// for right layering in svg reverse campaigns
			_(campaigns).reverse();

			this.set({
				campaigns: campaigns,
				floors: floors
			})
		} else {
			this.set({
				campaigns: [],
				floors: []
			})
		}
		this.view.render();
	},
});