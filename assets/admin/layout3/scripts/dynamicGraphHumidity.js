

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

			}
		});

		function updateHumidty() {

			plotHumidity.setData([getRandomHumidity()]);

			// Since the axes don't change, we don't need to call plot.setupGrid()

			plotHumidity.draw();
			setTimeout(updateHumidty, updateInterval);
		}

		updateHumidty();
