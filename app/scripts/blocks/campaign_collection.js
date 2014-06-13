flt.CampaignCollection = Backbone.Collection.extend({
	url: "/data/data.json",
	model: flt.Campaign,

	// // 
	// // we need only the list of items
	// // ______________________________
	// parse: function(resp, options) {
	// 	resp = _.toJSON(resp);
	// 	if(!!resp.result && !!resp.result.items) {

	// 		this.total = parseInt(resp.result.totalmore);
	// 		this.more = resp.result.more;

	// 		if(!!resp.result.items) {
	// 			return resp.result.items;
	// 		} else {
	// 			return false;
	// 		}
	// 	}

	// },

	// 
	// it has to add only
	// ______________________________
	fetch: function (options) {
		options = options || {};
		options.type = "get";
		options.update = true;
		options.remove = false;
		options.data = {};

		options.success  	= _.bind(this.success, this);
		options.error  		= _.bind(this.error, this);

		this.trigger("load:start");
		
		return Backbone.Collection.prototype.fetch.call(this, options);
	},

	success: function (collection, response, options) {
		response = _.toJSON(response);
		if(!response.error) {
			this.trigger("load:success");
		} else {
			this.trigger("load:error");
		}
	},

	error: function (collection, xhr, options) {
		this.trigger("load:error")
	}
});