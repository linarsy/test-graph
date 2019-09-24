import Highcharts from 'highcharts';

const myChart = (data, title) => Highcharts.chart('container', {
  title: {
    text: '',
  },

  xAxis: {
    categories: ['today', 'yesterday', 'dayOfWeek'],
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 0,
    },
  },

  series: [{
    name: title,
    data,
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500,
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
        },
      },
    }],
  },
});

export default myChart;
