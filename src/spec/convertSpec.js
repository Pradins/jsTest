describe( "Chart functions library", function () {

	describe("total value calculator", function() {
		it("calculates the total value of a chart based on a key value", function() {

			var data = [
		        {
		            "val" : 1200000,
		            "name"  : "Smarthphone"
		        },
		        {
		            "val" : 2200000,
		            "name"  : "Tablet"
		        },
		        {
		            "val" : 15000000,
		            "name"  : "PC"
		        },
		        {
		            "val" : 600000,
		            "name"  : "SmartTv"
		        }
		    ];

		    var key = 'val';
			

			expect(calculateTotalValue(data, key)).toEqual(19000000);
		})
	});

	describe("number parser with separator", function() {

		it("parses a number adding a separator on the thousands values", function() {

			var number = 19000000;
			var separator = '.'

			expect(numberWithDots(number, separator)).toEqual("19.000.000");
		})
	});

	describe("percentage calculator", function() {

		it("calculates the representing percentage of a value about the total", function() {

			var total = 19000000;
			var value = 2200000;

			expect(calculatePercentValue(value, total)).toEqual("11.58 %");
		})
	});

	describe("even calculator", function() {

		it("returns true if number is even or false if its not", function() {

			var number = 13;

			expect(isEven(number)).toEqual(false);
		})
	});

	describe("extra height calculator", function() {

		it("calculates the extra height that a chart will need to show all the inputs passed to it", function() {

			var extra = 45;
			var data = [
		        {
		            "val" : 12000000,
		            "name"  : "Smarthphone"
		        },
		        {
		            "val" : 48000000,
		            "name"  : "Tablet"
		        },
		        {
		            "val" : 55000000,
		            "name"  : "PC"
		        },
		        {
		            "val" : 3000000,
		            "name"  : "SmartTv"
		        },
		        {
		            "val" : 30000,
		            "name"  : "SmartWatch"
		        }
		    ];



			expect(calculateExtraHeight(data, extra)).toEqual(90);

		})
	});
});