if (typeof console == "undefined") {this.console = {log: function() {}, error: function() {}};}
window.flt = window.flt || {};
window.flt = _.extend(window.flt, {
	init: function() {
		flt.app = new flt.Application();
		// Init Backbone history
		Backbone.history.start({pushState: true});
	}
});

window.flt.Templates = window.flt.Templates || {};
	window.flt.Templates =  _.extend(
		window.flt.Templates,
		{
			templates: {},
			compiled: {},
			// ptemplates: {},
			add: function(name, template){
				this.templates[name] = template;
			},
			get: function(name){
				if(this.compiled[name]){
					return this.templates[name];
				} else if(this.templates[name]){
					this.templates[name] = Handlebars.compile(this.templates[name]);
					this.compiled[name] = true;
					return this.templates[name];
				} else {
					var $template = $('#'+name);
					if($template.length) {
						this.templates[name] = Handlebars.compile($template.html());
						this.compiled[name] = true;
						return this.templates[name];
					} else {
						console.error("Can't find template \"" + name + "\"");
						return function(){ return "" }
					}
				}
			}
		}
	);

$(document).ready(function(){
	_.extend(flt, Backbone.Events);
	flt.init();
});
