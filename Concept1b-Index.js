$(document).ready(function ($) {

    window.usertypecost=0;
    window.salaryrangecost=0; ///May Not be necessary
    window.agerangecost=0;
    window.doctorsusecost=0;
    window.medicalconditionscost=0;
    window.rxusecost=0;
    window.rxconditioncost=0;
    window.totalannualcost=0;
    window.worsttotalannualcost=0;

///////NUMBER SEEKING//////////

function total(){
  window.totalannualcost=usertypecost+salaryrangecost+agerangecost+doctorsusecost+medicalconditionscost+rxusecost+rxconditioncost;
  window.worsttotalannualcost=Math.round((usertypecost+salaryrangecost+agerangecost+doctorsusecost+medicalconditionscost+rxusecost+rxconditioncost)*2.175);
  console.log($('#annualCost')[0].innerHTML);
  console.log(totalannualcost);  
  console.log(worsttotalannualcost);  
  var present=parseInt($('#annualCost')[0].innerHTML);
  var presentWorse=parseInt($('#worstCost')[0].innerHTML);

  seekAnnual(present,totalannualcost);
  seekWorst(presentWorse,worsttotalannualcost);
}

function seekAnnual(currentValue, targetValue){
  console.log(currentValue);
  $({someValue: currentValue}).animate({someValue: targetValue}, {
      duration: 500,
      easing:'swing', // can be anything
      step: function() { // called on every step
          // Update the element's text with rounded-up value:
          $('#annualCost').text(commaSeparateNumber(Math.round(this.someValue)));
      }
  });

  function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return val;
  }

}

function seekWorst(currentValue, targetValue){
  console.log(currentValue);
  $({someValue: currentValue}).animate({someValue: targetValue}, {
      duration: 500,
      easing:'swing', // can be anything
      step: function() { // called on every step
          // Update the element's text with rounded-up value:
          $('#worstCost').text(commaSeparateNumber(Math.round(this.someValue)));
      }
  });

  function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return val;
  }
}
////////////////HIGHCHARTS////////////////
function updateGaugeChart(chart, value) {
    var point = chart.series[0].points[0];
    var newVal = value;
    point.update(newVal);
}

$(function () {

    Highcharts.setOptions({
     colors: ['#000000', '#4A4A4A', '#D8D8D8', '#979797', '#BBBBBB', '#6F6F6F', '#F2F2F2', '#ffffff']
    });


    var chartObj = {
        chart: {
            renderTo: 'container',
            type: 'pie',
            plotBackgroundColor: '#D3D3D3',
        },
        title: {
            text: 'Benefits<br>Coverage',
            align: 'center',
            color: 'black',
            verticalAlign: 'middle',
            y: 0,
            style: {
            color: 'black'
            }
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    distance: -65,
                    style: {
                        color: 'grey'
                    }
                },
                showInLegend: false,
            }
        },
        pane: {
            startAngle: 0,
            endAngle: 0
        },
        credits: {
        enabled: false,
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        events: {
            load: function () {
                var chart = this;
                $(chart.series).each(function (i, series) {
                    $('<li style="color: ' + serie.color + '">' + series.name + '</li>').click(function () {
                        series.visible ? series.hide() : series.show();
                    }).appendTo('#legend');
                });
            }
        },
        series: [{
            type: 'pie',
            name: 'Progress',
            innerSize: '45%',
            data: [{
                name: 'Preventative',
                y: 32.8,
                visible: false
            }, {
                name: 'InPatient Care',
                y: 20.8,
                visible: false
            }, {
                name: 'OutPatient Care',
                y: 26.8,
                visible: false
            }, {
                name: 'Weight Reduction Coverage',
                y: 36.8,
                visible: false
            }, {
                name: 'Emergency Care',
                y: 46.8,
                visible: false
            }, {
                name: 'Specialty Pharmacy',
                y: 16.8,
                visible: false
            }]
        }]
    };

    var gaugeChartObj = new Highcharts.Chart(chartObj, function (chart) {
        var lastVal = 0;
        $("#slider").slider({
            value: 0,
            range: "min",
            min: 0,
            max: 20,
            step: 1,
            animate: true,
            slide: function (event, ui) {
                $("#slider-val").text(ui.value);

                switch (ui.value) {
                    case 3:
                        chart.series[0].data[0].setVisible();
                        break;
                    case 6:
                        chart.series[0].data[1].setVisible();
                        break;
                    case 10:
                        chart.series[0].data[2].setVisible();
                        break;
                    case 13:
                        chart.series[0].data[3].setVisible();
                        break;
                    case 16:
                        chart.series[0].data[4].setVisible();
                        break;
                    case 18:
                        chart.series[0].data[5].setVisible();
                        break;
                }

                if (Math.abs(ui.value - lastVal) > 0) {
                    updateGaugeChart(gaugeChartObj, ui.value);
                    lastVal = ui.value;
                }
            },
            change: function( event, ui ) {
                  $("#slider-val").text(ui.value);

                switch (ui.value) {
                    case 3:
                        chart.series[0].data[0].setVisible();
                        break;
                    case 6:
                        chart.series[0].data[1].setVisible();
                        break;
                    case 10:
                        chart.series[0].data[2].setVisible();
                        break;
                    case 13:
                        chart.series[0].data[3].setVisible();
                        break;
                    case 16:
                        chart.series[0].data[4].setVisible();
                        break;
                    case 18:
                        chart.series[0].data[5].setVisible();
                        break;
                }

                if (Math.abs(ui.value - lastVal) > 0) {
                    updateGaugeChart(gaugeChartObj, ui.value);
                    lastVal = ui.value;
                }

            },

        });

    });


});



///////SLIDER VALUES and STYLING//////////
    $("#user")
        .change(function () {
            $('#benefitscoveragemask').fadeOut();
            $('#chart_div').fadeIn();
            var userType = $('#user').find(":selected").text();
            console.log(userType);
            
            if(userType=='Me'){            
            usertypecost=2000;
            console.log(usertypecost);
            total();
            }

            if(userType=='Me+1'){
            usertypecost=6000;
            console.log(usertypecost);
            total();
            }

            if(userType=='Me & My Family'){        
            usertypecost=10000;
            console.log(usertypecost);
            total();
            }
        });


          $("#salary_slider").slider({
        min: 50000,
        max: 100000,
        values: [50000, 100000],
        step: 1000,
        range: true,
        slide: function (event, ui) {
            console.log(ui.values)
            $("#salary_range_label").html('$ ' + ui.values[0] + ' - ' + '$ ' + ui.values[1]);

        }
        });

    $("#age_slider").slider({
        min: 0,
        max: 60,
        values: [0, 60],
        step: 1,
        range: true,
        slide: function (event, ui) {
            $("#age_range_label").html(ui.values[0] + ' - ' + ui.values[1] + ' years old');          
            if(ui.values[1]<35){
            agerangecost=0;
              total();
            }

            //Post 35 Increase
            if(ui.values[1]>35 && ui.values[1]<40){
              agerangecost=555;
              total();
            };

            //Going Downhill
            if(ui.values[1]>40 && ui.values[1]<50){
              agerangecost=2500;
              total();
            };

            //Heading into Retirement
            if(ui.values[1]>50 && ui.values[1]<60){
              agerangecost=5000;
              total();
            };

            //Large Span of Ages            
            if(Math.abs(ui.values[1]-ui.values[0])>50){
              agerangecost=5000;
              total();
            };


        }
    });

    $("#coverage_slider").slider({
        min: 0,
        max: 3,
        value: 0,
        range: "min",
        step: 1,
        slide: function (event, ui) {
            console.log(ui.value)
            if (ui.value == 0) {
                $(circle2).fadeOut();
            }
            if (ui.value == 1) {
                $(circle2).fadeIn();
                $(circle3).fadeOut();
                $(circle4).fadeOut();
            }
            if (ui.value == 2) {
                $(circle3).fadeIn();
                $(circle4).fadeOut();
            }
            if (ui.value == 3) {
                $(circle4).fadeIn();
            }
        }
    });  




    $("input:radio[name=doctorchoice]").click(function () {
        console.log($(this).val());
         if($(this).val()==1){
          // valueRangeSlider.setState({'lowValue': 0, 'highValue': 4});
          // valueRangeSlider.draw();
          doctorsusecost=0;
          total();

        $(circle2).fadeOut();
        $(circle3).fadeOut();
        $(circle4).fadeOut();

        }
        if($(this).val()==2){
          testValue1=9;
          // valueRangeSlider.setState({'lowValue': 0, 'highValue': 6});
          // valueRangeSlider.draw();
          doctorsusecost=300;
          total();

        $('#alerttext')[0].innerHTML="Better safe than sorry.  Our emergency care coverage and preferred network allow you to get the care you want when you need it."
        $('#alerttext').fadeIn();
        
        $(circle2).fadeIn();
        $(circle3).fadeOut();
        $(circle4).fadeOut();

        $("#alerttext").delay(7000).fadeOut();

          

        }

        if($(this).val()==3){
          // valueRangeSlider.setState({'lowValue': 0, 'highValue': 6});
          // valueRangeSlider.draw();
          doctorsusecost=700;
          total();
        }

    $("#medicalconditions")
    .change(function () {
        var medicalconditions = $('#medicalconditions').find(":selected").text();
        console.log(medicalconditions)

        if (medicalconditions == "DIABETES") {
          medicalconditionscost=2000;
          total();
          $(circle2).fadeIn();
          $(circle3).fadeIn();
          $(circle4).fadeOut();

          $('#alerttext')[0].innerHTML="For individuals with diabetes, our extended doctor network allows you see the doctors want to get the care that you need."
          $('#alerttext').fadeIn();
          $("#alerttext").delay(7000).fadeOut();

        }

        if (medicalconditions == "ANGINA") {
          // valueRangeSlider.setState({'lowValue': 0, 'highValue': 8});
          // valueRangeSlider.draw();
          medicalconditionscost=1000;
          total();
          $('#alerttext')[0].innerHTML="Who couldnt stand to lose a little weight? Our weight reduction coverage has proven to improve the health of consumers with Angina by 50%."
          $('#alerttext').fadeIn();
          $("#alerttext").delay(7000).fadeOut();
        }

    })

      

    });

    $("input:radio[name=prescriptionchoice]").click(function () {
        console.log($(this).val());
        if($(this).val()==1){
          $('#alerttext')[0].innerHTML="Great! We're glad you're in good health."
          $('#alerttext').fadeIn();
          $("#alerttext").delay(7000).fadeOut();
        }

        if($(this).val()==2){
        // valueRangeSlider.setState({'lowValue': 0, 'highValue': 7});
        // valueRangeSlider.draw();
        $('#alerttext')[0].innerHTML="For individuals with who use prescriptions regularly we recommend adding our specialty pharmacy coverage which can save you thousands over traditional coverage."  
        $('#alerttext').fadeIn();
        $("#alerttext").delay(7000).fadeOut();
        rxusecost=700;
        total();
        }
        
        if($(this).val()==3){
        // valueRangeSlider.setState({'lowValue': 0, 'highValue': 7});
        // valueRangeSlider.draw();
        rxusecost=1500;
        total();

        }
    });       
});