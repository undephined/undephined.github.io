var undephined = {};


undephined.init=function(){
	for (sid in this) {
		var sub=this[sid];
		if (sub.init) {
			sub.init();
		}
	}
};

