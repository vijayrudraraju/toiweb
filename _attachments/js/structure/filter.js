var activeFilter = "";
var latestQuery = [];
var filterMatches = [[],[],[]]; // outputs,inputs,mappings

function updateActiveFilter() {
	signalPagePointer = 0;
	mappingPagePointer = 0;

	activeFilter = $('#filterInput').val();
	activeFilter = activeFilter+'';
	activeFilter = activeFilter.replace(/^\s*(.*?)\s*$/,"$1").toLowerCase();

	/*
	    namespace matching
	*/
    latestQuery = activeFilter.match(/\S+/ig);
	if (latestQuery != null) {
	} else {
        latestQuery = [""];
	}
}

function updateSignalMatches() {
	filterMatches = [[],[],[]];

    var keys = gSourceBank.keys();
    for (var i=0;i<keys.length;i++) {
		o: for (var j=0;j<latestQuery.length;j++) {
               //namespace matching
               if (keys[i].match(new RegExp(latestQuery[j],"ig")) == null) {
                   continue o;
               }

               filterMatches[0].push([gSourceBank.get(keys[i]).device_name,gSourceBank.get(keys[i]).name]);
               break;
        }
    }

    var keys = gSinkBank.keys();
    for (var i=0;i<keys.length;i++) {
		o: for (var j=0;j<latestQuery.length;j++) {
            //namespace matching
            if (keys[i].match(new RegExp(latestQuery[j],"ig")) == null) {
                continue o;
            }

            filterMatches[1].push([gSinkBank.get(keys[i]).device_name,gSinkBank.get(keys[i]).name]);
            break;
        }
    }
}
