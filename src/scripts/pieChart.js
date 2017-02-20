function calculateTotalValue(array, key) {
    var sum = 0;
    
    for (var i = 0; i < array.length; i++) {
        sum += parseInt(array[i][key]);
    }
    
    return sum;
}

function numberWithDots(x, separator) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

function calculatePercentValue(value, total) {
    var percentage = (parseInt(value) / parseInt(total)) * 100;
    return String(Math.round(percentage * 100) / 100) + ' %';
}

function isEven(n) {
    return n % 2 == 0;
}

function calculateExtraHeight(data, extra) {

    var extra_height = 0;
    var levels = Math.ceil(data.length / 2);

    if (levels > 1) {
        extra_height = (levels * extra) - extra;
    } 

    return extra_height;
}

function createPieChart(values, dataStyle, divId, index) {

    var currency = '';

    if (values.type === "currency") {
        currency = values.currencySign;
    }

    var width                   = dataStyle.width;
    var height                  = dataStyle.height;
    var r                       = dataStyle.radius;
    var radiusSub               = dataStyle.radiusSub;
    var extra_line              = 0;
    var extra_y_ofsset_adition  = 45;

    //extra y offset to place the bottom bar
    var extra_height = calculateExtraHeight(values.data, extra_y_ofsset_adition);

    var totalValue = calculateTotalValue(values.data, 'val');

    var canvas = d3.select("#" + divId).append("svg")
        .attr("width", width)
        .attr("height", height + (extra_height))
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 + dataStyle.legendOffset) + ")");

    //chart title 
    var pieTitle = canvas.append("text")
        .style("text-anchor", "middle")

    pieTitle.append("tspan")
        .attr("x", "0")
        .attr("dy", "-7")
        .attr("font-size", "15")
        .attr("fill", "#bdbdbd")
        .text(function(d) {
          return values.title
        })

    pieTitle.append("tspan")
        .attr("x", "0")
        .attr("dy", "23")
        .attr("font-size", "20")
        .text(function(d) {
          return numberWithDots(totalValue, dataStyle.separator) + currency;
        })

    //listed elements
    for (var i = 0; i < values.data.length; i++) {

        var extra_line = parseInt(i/2) * extra_y_ofsset_adition;

        if (isEven(i+1)) {
            var legend = canvas.append("text")
            .attr("transform", "translate(" + (width/2) + " ," + ((height/2 + dataStyle.legendOffset) + extra_line) + ")")
            .style("text-anchor", "end")
        
        } else {

            var legend = canvas.append("text")
            .attr("transform", "translate(" + (-(width/2)) + " ," + ((height/2 + dataStyle.legendOffset) + extra_line ) + ")")
            .style("text-anchor", "start")
        }

        legend.append("tspan")
            .attr("x", "0")
            .attr("fill", function(d) {
                return dataStyle.colorStyles[index][i];
            })
            .attr("font-size", "12")
            .attr("font-weight", "bold")
            .text(function(d) {
                return values.data[i].name
            });

        legend.append("tspan")
            .attr("x", "0")
            .attr("dy", "20")
            .attr("font-size", "12")
            .text(function(d) {
                return calculatePercentValue(values.data[i].val, totalValue);
            });

        legend.append("tspan")
            .attr("dx", "1em")
            .attr("font-size", "12")
            .attr("fill", "#bdbdbd")
            .text(function(d) {
                return numberWithDots(values.data[i].val, dataStyle.separator) + currency;
            });
    }

    //bottom line
    canvas.append("line")
        .style("text-anchor", "start")
        .attr("x1", (-width/2))
        .attr("y1", ((height/2)) + extra_line)
        .attr("x2", (width/2))
        .attr("y2", ((height/2)) + extra_line)
        .style("stroke", "#bdbdbd")
        .style("stroke-width", "2")

        var arc = d3.svg.arc()
            .innerRadius(r + radiusSub)
            .outerRadius(r);

        var pie = d3.layout.pie().value(function(d) {
            return d.val;
        }).sort(null);

        var arcs = canvas.selectAll(".arc")
            .data(pie(values.data))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", function(d, i) {
                return dataStyle.colorStyles[index][i];
            });
}