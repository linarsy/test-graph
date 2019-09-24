import Highcharts from 'highcharts';

const myChart = () => Highcharts.chart('container', {
  title: {
    text: '',
  },

  yAxis: {
    title: {
      text: '',
    },
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 1,
    },
  },

  series: [{
    name: 'receipts',
    data: [43934, 52503, 57177],
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
