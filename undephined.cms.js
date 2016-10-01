undephined.cms = {};


undephined.content={};

undephined.content.demo={};
undephined.content.demo.name="Demo";
undephined.content.demo.contentURL="demo/demo.html";

undephined.content.cxx={};
undephined.content.cxx.name="C++";
undephined.content.cxx.contentURL="cxx.html";

undephined.content.bio={};
undephined.content.bio.name="Bio";
undephined.content.bio.contentURL="bio.html";

undephined.content.contact={};
undephined.content.contact.name="Contact";
undephined.content.contact.contentURL="contact.html";

undephined.cms.navigation={};
undephined.cms.navigation.items=[
	undephined.content.demo,
	undephined.content.cxx,
	undephined.content.bio,
	undephined.content.contact,
];

undephined.cms.navigation.defaultItem=undephined.content.demo;

undephined.cms.activeLoadRequest=undefined;



undephined.cms.init=function(){
	console.log("INIT CMS");

	undephined.cms.divHead=document.getElementById("head");
	undephined.cms.divNav=document.getElementById("nav");
	undephined.cms.divContent=document.getElementById("content");

	undephined.cms.divHead.setAttribute("class","visible");

	undephined.cms.activeItem=undefined;

	for (var i=0;i<undephined.cms.navigation.items.length;++i) {
		var navItem=undephined.cms.navigation.items[i];

		var div=document.createElement("div");
		div.setAttribute("class","item inactive");
		div.appendChild(document.createTextNode(navItem.name));
		div.onclick=undephined.cms.navigateCallback(navItem);
		
		navItem.div=div;

		undephined.cms.divNav.appendChild(div);
	}

	undephined.cms.navigate(undephined.cms.navigation.defaultItem);
};

undephined.cms.load=function(url){
	if (undephined.cms.activeLoadRequest) {
		undephined.cms.activeLoadRequest.abort();
		undephined.cms.activeLoadRequest=undefined;
	}

	undephined.cms.divContent.setAttribute("class","loading");

	var rq=new XMLHttpRequest();
	rq.onreadystatechange=function(e){
		console.log("READY STATE "+this.readyState+" / "+this.status);
		if (this.readyState == 4 && (this.status == 200 || this.status==0)) {
			var content=this.responseText;
			undephined.cms.activeLoadRequest=undefined;
			setTimeout(function(){
				undephined.cms.divContent.innerHTML = content;
				undephined.cms.divContent.setAttribute("class","");
			},500);
		}
	};
	rq.open("GET",url,true);
	rq.send();
	
	undephined.cms.activeLoadRequest=rq;
};

undephined.cms.navigate=function(item){
	if (undephined.cms.activeItem) {
		undephined.cms.activeItem.div.setAttribute("class","item inactive");
	}

	undephined.cms.activeItem=item;

	if (!item) return;

	undephined.cms.activeItem.div.setAttribute("class","item active");

	undephined.cms.load(item.contentURL);
};

undephined.cms.navigateCallback=function(item){
	return function(){
		undephined.cms.navigate(item);
	};
};

