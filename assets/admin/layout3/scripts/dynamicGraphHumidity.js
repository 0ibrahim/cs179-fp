

		// We use an inline dataHumidity source in the example, usually dataHumidity would
		// be fetched from a server

		var dataHumidity = [],
		totalPoints = 300;

		function getRandomHumidity() {

			if (dataHumidity.length > 0)
				dataHumidity = dataHumidity.slice(1);

			// Do a random walk

			while (dataHumidity.length < totalPoints) {

				var prev = dataHumidity.length > 0 ? dataHumidity[dataHumidity.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;

				if (y < 30) {
					y = 30;
				} else if (y > 65) {
					y = 65;
				}

				dataHumidity.push(y);
			}

			// Zip the generated y values with the x values

			var res = [];
			for (var i = 0; i < dataHumidity.length; ++i) {
				res.push([i, dataHumidity[i]])
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

		var plotHumidity = $.plot("#humidityGraph", [ getRandomHumidity() ], {
			series: {
				shadowSize: 0,	// Drawing is faster without shadows
				color: 3

			},
			yaxis: {
				min: 0,
				max: 100,
				ticks: 10,
				axisLabel: "Humidity (Percent)",
				labelWidth: 30
			},
			xaxis: {
				show: false

			},
			  grid: {
			  	hoverable: true,
			  	clickable: true,
			    markings: [
			      { color: 'red', lineWidth: 1, yaxis: { from: 25, to: 25 } }
			      ,{ color: 'red', lineWidth: 1, yaxis: { from: 65, to: 65 } }
			    ]
			  }
		});

		$("<div id='tooltipHumidity'></div>").css({
			position: "absolute",
			display: "none",
			border: "1px solid #fdd",
			padding: "2px",
			"background-color": "#fee",
			opacity: 0.80
		}).appendTo(".modal-body");

		$("#humidityGraph").bind("plothover", function (event, pos, item) {

			// if ($("#enablePosition:checked").length > 0) {
			// 	var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
			// 	$("#hoverdata").text(str);
			// }

			// if ($("#enableTooltip:checked").length > 0) {
				if (item) {
					var x = item.datapoint[0].toFixed(2),
						y = item.datapoint[1].toFixed(2);

					$("#tooltipHumidity").html("Humidity: " + y + " Percent")
						.css({top: item.pageY - 200, left: item.pageX - 200})
						.fadeIn(200);
				} else {
					$("#tooltipHumidity").hide();
				}
			
		});

		function updateHumidty() {

			plotHumidity.setData([getRandomHumidity()]);

			// Since the axes don't change, we don't need to call plot.setupGrid()

			plotHumidity.draw();
			setTimeout(updateHumidty, updateInterval);
		}

		updateHumidty();
