

		// We use an inline data source in the example, usually data would
		// be fetched from a server

		var data = [],
		totalPoints = 300;
		console.log("hellllo")

		function getRandomData() {

			if (data.length > 0)
				data = data.slice(1);

			// Do a random walk

			while (data.length < totalPoints) {

				var prev = data.length > 0 ? data[data.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;

				if (y < 15) {
					y = 15;
				} else if (y > 45) {
					y = 45;
				}

				data.push(y);
			}

			// Zip the generated y values with the x values

			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]])
			}

			return res;
		}

		// Set up the control widget

		var updateInterval = 1000;
		$("#updateInterval").val(updateInterval).change(function () {
			var v = $(this).val();
			if (v && !isNaN(+v)) {
				updateInterval = +v;
				if (updateInterval < 1) {
					updateInterval = 1;
				} else if (updateInterval > 2000) {
					updateInterval = 2000;
				}
				$(this).val("" + updateInterval);
			}
		});

		var plot = $.plot("#temperatureGraph", [ getRandomData() ], {
			series: {
				shadowSize: 0	// Drawing is faster without shadows
			},
			yaxis: {
				min: -20,
				max: 80,
				ticks: 7,
				axisLabel: "Temperature (Celsius)",
				labelWidth: 30
			},
			xaxis: {
				show: true,
				min: 0,
				max: 24,
				ticks: 8,
				axisLabel: "Time (hrs)",
				labelHeight: 20

			},
			  grid: {
			  	hoverable: true,
			  	clickable: true,
			    markings: [
			      { color: 'red', lineWidth: 1, yaxis: { from: 5, to: 5 }, label: 'min' }
			      ,{ color: 'red', lineWidth: 1, yaxis: { from: 45, to: 45 } }
			    ]
			  }
		});
		$("<div id='tooltip'></div>").css({
			position: "absolute",
			display: "none",
			border: "1px solid #fdd",
			padding: "2px",
			"background-color": "#fee",
			opacity: 0.80
		}).appendTo(".modal-body");

		$("#temperatureGraph").bind("plothover", function (event, pos, item) {

			// if ($("#enablePosition:checked").length > 0) {
			// 	var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
			// 	$("#hoverdata").text(str);
			// }

			// if ($("#enableTooltip:checked").length > 0) {
				if (item) {
					var x = item.datapoint[0].toFixed(2),
						y = item.datapoint[1].toFixed(2);

						console.log(x)

					$("#tooltip").html("Temp: " + y + " Celsius")
						.css({top: item.pageY - 200, left: item.pageX - 200})
						.fadeIn(200);
				} else {
					$("#tooltip").hide();
				}
			
		});

		function update() {

			plot.setData([getRandomData()]);

			// Since the axes don't change, we don't need to call plot.setupGrid()

			plot.draw();
			setTimeout(update, updateInterval);
		}

		update();

		// Add the Flot version string to the footer

		$("#footer").prepend("Flot " + $.plot.version + " &ndash; ");