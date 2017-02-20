define(['pieChart', 'ds3'], function(pie, d3) {

	var num_charts_per_row = 3;

	var data_style = {
        "borderColor" : "#bdbdbd",
        "fontColor" : "#bdbdbd",
        "width" : 250,
        "height" : 250,
        "radius" : 70,
        "radiusSub" : 7,
        "separator": ".",
        "legendOffset": -35,
        "colorStyles": [
          ["#354f16","#8ec83e"],
          ["#23394a","#7cb7d8"],
          ["#903c1a","#dbb12d"],
          ["#354f16","#8ec83e","#3b8a8b","#12dede","#1ed599","#aad34f"],
          ["#23394a","#7cb7d8","#7642aa","#1212dd","#19875a","#122121"],
          ["#CC6600","#FF9900","#C13100","#CC9752"]
        ]
    }
	
	function init() {

		loadJSON(function(response) {
			var actual_JSON = JSON.parse(response);

			var element_inidicator;
			var new_row;
			var new_div;

			for (var i = 0; i < actual_JSON.length; i++) {

				element_inidicator = i % num_charts_per_row;

				new_div = document.createElement('div');
				new_div.id = "pie" + (i+1);

				if (element_inidicator == 0) { //create new row and element with left class
					new_row = document.createElement('div');
					new_row.className = "wrap";
					new_div.className = 'left';
				} else if (element_inidicator < (num_charts_per_row - 1 )) { //element of the right
					new_div.className = 'center';
				} else { //centered element
					new_div.className = 'right';
				}

				new_row.appendChild(new_div);
				var container = document.getElementById("container");
				container.appendChild(new_row);

				createPieChart(actual_JSON[i], data_style, new_div.id, i);
			}
		});
	}

	function loadJSON(callback) {

	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    xobj.open('GET', './data/data.json', true);

	    xobj.onreadystatechange = function () {
	          if (xobj.readyState == 4 && xobj.status == "200") {
	            callback(xobj.responseText);
	          }
	    };
	    xobj.send(null);
	}

	init();

});