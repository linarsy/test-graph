import React from 'react';
import { Table } from 'react-bootstrap';
import cn from 'classnames';

import connect from '../connect';
import { billingSelector } from '../selectors';
import myChart from '../../lib/my-chart';

const mapStateToProps = (state) => {
  const billing = billingSelector(state);
  return { billing };
};

@connect(mapStateToProps)
class Tablee extends React.Component {
  componentDidMount() {
    myChart();
  }

  render() {
    const {
      billing,
    } = this.props;

    const amount = billing.slice(0, 3);
    const amountToday = amount.reduce((acc, { today }) => acc + today, 0);
    const amountEsterday = amount.reduce((acc, { yesterday }) => acc + yesterday, 0);
    const amountDayOfWeek = amount.reduce((acc, { dayOfWeek }) => acc + dayOfWeek, 0);

    const calcPercentage = (a, b) => {
      const percentage = (a - b) / a * 100;
      return Math.round(percentage);
    };

    const percent = calcPercentage(amountToday, amountEsterday);
    const percentClass = cn({
      'text-right': true,
      'px-4': true,
      'bg-light-red': percent < -9,
      'bg-light-blue': percent > 9,
      'text-danger': percent < 0,
      'text-success': percent > 0,
    });

    const renderRow = (item) => {
      const percentage = calcPercentage(item.today, item.yesterday);
      const percentageClass = cn({
        'text-right': true,
        'px-4': true,
        'bg-light-red': percentage < -9,
        'bg-light-blue': percentage > 9,
        'text-danger': percentage < 0,
        'text-success': percentage > 0,
      });

      const yesterdayClass = cn({
        'text-right': true,
        'px-4': true,
        'bg-light-red': percentage < -9,
        'bg-light-blue': percentage > 9,
      });

      const dayOfWeekClass = cn({
        'text-right': true,
        'px-4': true,
        'bg-light-red': item.today - item.dayOfWeek < 0,
        'bg-light-blue': item.today - item.dayOfWeek > 0,
      });

      return (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td className="bg-light-green text-right px-4">{item.today}</td>
          <td className={yesterdayClass}>{item.yesterday}</td>
          <td className={percentageClass}>
            {percentage}
            %
          </td>
          <td className={dayOfWeekClass}>{item.dayOfWeek}</td>
        </tr>
      );
    };

    return (
      <>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th className="text-center">Показатель</th>
              <th className="bg-light-green text-center">Текущий день</th>
              <th colSpan="2" className="text-center">Вчера</th>
              <th className="text-center">Этот день неделю&nbsp;назад</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Выручка, руб</td>
              <td className="bg-light-green text-right px-4">{amountToday}</td>
              <td className="text-right px-4">{amountEsterday}</td>
              <td className={percentClass}>
                {percent}
                %
              </td>
              <td className="text-right px-4">{amountDayOfWeek}</td>
            </tr>
            <th colSpan="5" className="bg-white">
              <div id="container" />
            </th>
          </tbody>
          <tbody>
            {billing.map(renderRow)}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Tablee;
