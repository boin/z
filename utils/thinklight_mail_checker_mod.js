wmn_ui.prototype.onClick = function(aEvent) {

	if (aEvent && (aEvent.button == 0)){
		//mod by Boin turn off thinklight
		var _file = Components.classes["@mozilla.org/file/local;1"]
		                     .createInstance(Components.interfaces.nsILocalFile);
		_file.initWithPath("c:\\Windows\\ThinkLight.off.exe");
		var _process = Components.classes["@mozilla.org/process/util;1"]
		                        .createInstance(Components.interfaces.nsIProcess);
		_process.init(_file);
		_process.run(false, [], 0);
	//mod end;
	}

	--------------------- chrome/overlay.js



	//mod by Boin turn on thinklight
	var _file = Components.classes["@mozilla.org/file/local;1"]
	                     .createInstance(Components.interfaces.nsILocalFile);
	_file.initWithPath("c:\\Windows\\ThinkLight.on.exe");
	var _process = Components.classes["@mozilla.org/process/util;1"]
	                        .createInstance(Components.interfaces.nsIProcess2);
	_process.init(_file);
	_process.runAsync([],0);
	//mod end;
