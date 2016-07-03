function MusicPage() {
	//Can't use frameworks or JS libraries for this test so use object
}
MusicPage.prototype.removeClass = function(element, cls) {
    var old = element.className, reg = new RegExp(cls, 'ig'), newCls = old.replace(reg, "");
    element.className = newCls.trim();
}
MusicPage.prototype.addClass = function(element, cls) {
	this.removeClass(element, cls);
    var old = element.className;
    element.className = (old + " " + cls).trim();
}
MusicPage.prototype.hasClass = function(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
MusicPage.prototype.handleNav = function(e,el) {
	var passKeyUp = true;
	if(typeof e.keyCode !== "undefined") {
		if(e.keyCode === 0) {}
		else if(e.keyCode !== 13)
			passKeyUp = false;
	}
	if(passKeyUp) {
		var nav = e.currentTarget;
		var clickedEl = e.target;
		if(this.hasClass(clickedEl, "iconButton")) {
			if(typeof clickedEl.dataset !== "undefined") {
				var action = clickedEl.dataset.action;
			}
			else {
				var action = clickedEl.getAttribute('data-action');
			}
				
			if(action === "search") {
				
			}
			else if(action === "hamburger") {
				this.addClass(nav, "openMobile");
			}
			else if(action === "close") {
				this.removeClass(nav, "openMobile");
			}
		}
	}
}