var myChart = echarts.init(document.getElementById('chartImg')); 
var option = {
    tooltip: {
        show: true
    },
    legend: {
        show: false,
        data:[]
    },
    xAxis : [
        {
            type : 'category',
            data : ["15m","20m","25m","30m","35m","40m","45m","50m","55m","60m"]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            "type":"line",
            "data":[5,20,400,10,10,20,20,50,60,10]
        }
    ],
    grid:{
      x:40,
      x2:10,
      y:10,
      y2:28
    }
};
myChart.setOption(option);