flt.SelectorView = Backbone.View.extend({
	template: 'flt__selector_template',
	template_selected: 'flt__selector-selected_template',
	el: '.selector',

	events: {
		'change .selector__dropdown': 'selectCampaign',
		'click a.selector__campaign-itm-a': 'deselectCampaign',
	},


	initialize: function(){
		this.template = flt.Templates.get(this.template);
		this.template_selected = flt.Templates.get(this.template_selected);
		this.model.on('change:selected', this.renderCampaigns, this);
	},

	render: function(){
		var template = this.template( this.model.toJSON() );
		this.$el.html(template);

		this.$dropdown = this.$el.find('.selector__dropdown');

		this.$campaigns =  this.$el.find('.selector__campaigns');
		this.renderCampaigns();

		this.delegateEvents();
	},
	
	renderCampaigns: function(model, value) {
		this.$campaigns.html(this.template_selected({
			selected: this.model.get('selected')
		}));
		this.delegateEvents();
	},

	selectCampaign: function(e) {
		this.model.selectCampaign(this.$dropdown.find('option:selected').data());
	},

	deselectCampaign: function(e) {
		if(e && e.preventDefault) {
			e.preventDefault();
			e.stopPropagation();
		}
		var $this = $(e.currentTarget);
		this.model.deselectCampaign($this.data());
		return false;
	},
});

