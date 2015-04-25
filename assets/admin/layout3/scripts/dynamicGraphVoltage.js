

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
				color: 2// Drawing is faster without shadows

			},
			yaxis: {
				min: 0,
				max: 150,
				ticks: 15,
				axisLabel: "Voltage (Volts)",
				labelWidth: 30
			},
			xaxis: {
				show: false

			}
		});

		function updateVoltage() {

			plotVoltage.setData([getRandomVoltage()]);

			// Since the axes don't change, we don't need to call plot.setupGrid()

			plotVoltage.draw();
			setTimeout(updateVoltage, updateInterval);
		}

		updateVoltage();
