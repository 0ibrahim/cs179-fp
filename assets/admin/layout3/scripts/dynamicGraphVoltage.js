

		// We use an inline dataVoltage source in the example, usually dataVoltage would
		// be fetched from a server

		var dataVoltage = [],
		totalPoints = 300;

		function getRandomVoltage() {

			if (dataVoltage.length > 0)
				dataVoltage = dataVoltage.slice(1);

			// Do a random walk

			while (dataVoltage.length < totalPoints) {

				var prev = dataVoltage.length > 0 ? dataVoltage[dataVoltage.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;

				if (y < 90) {
					y = 90;
				} else if (y > 110) {
					y = 110;
				}

				dataVoltage.push(y);
			}

			// Zip the generated y values with the x values

			var res = [];
			for (var i = 0; i < dataVoltage.length; ++i) {
				res.push([i, dataVoltage[i]])
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

		var plotVoltage = $.plot("#voltageGraph", [ getRandomVoltage() ], {
			series: {
				shadowSize: 0, 
				color: 2,
				clickable: true,
				hoverable: true// Drawing is faster without shadows

			},
			yaxis: {
				min: 0,
				max: 150,
				ticks: 10,
				axisLabel: "Voltage (Volts)",
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
			      { color: 'red', lineWidth: 1, yaxis: { from: 91, to: 91 } }
			      ,{ color: 'red', lineWidth: 1, yaxis: { from: 115, to: 115 } }
			    ]
			  }
		});

		$("<div id='tooltipVoltage'></div>").css({
			position: "absolute",
			display: "none",
			border: "1px solid #fdd",
			padding: "2px",
			"background-color": "#fee",
			opacity: 0.80
		}).appendTo(".modal-body");

		$("#voltageGraph").bind("plothover", function (event, pos, item) {

			// if ($("#enablePosition:checked").length > 0) {
			// 	var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
			// 	$("#hoverdata").text(str);
			// }

			// if ($("#enableTooltip:checked").length > 0) {
				if (item) {
					var x = item.datapoint[0].toFixed(2),
						y = item.datapoint[1].toFixed(2);

						console.log(x)

					$("#tooltipVoltage").html("Voltage: " + y + " Volts")
						.css({top: item.pageY - 200, left: item.pageX - 200})
						.fadeIn(200);
				} else {
					$("#tooltipVoltage").hide();
				}
			
		});

		function updateVoltage() {

			plotVoltage.setData([getRandomVoltage()]);

			// Since the axes don't change, we don't need to call plot.setupGrid()

			plotVoltage.draw();
			setTimeout(updateVoltage, updateInterval);
		}

		updateVoltage();
