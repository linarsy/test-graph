import React from 'react';
import { Table } from 'react-bootstrap';
import cn from 'classnames';

import connect from '../connect';
import {
  billingSelector,
  billingSelectorToday,
  billingSelectorYesterday,
  billingSelectorDayOfWeek,
} from '../selectors';
import renderChart from '../../lib/my-chart';

const mapStateToProps = (state) => {
  const billing = billingSelector(state);
  const amount = {
    today: billingSelectorToday(state),
    yesterday: billingSelectorYesterday(state),
    dayOfWeek: billingSelectorDayOfWeek(state),
    title: 'Выручка, руб',
  };
  return { billing, amount };
};

@connect(mapStateToProps)
class Spreadsheet extends React.Component {
  componentDidMount() {
    const { amount } = this.props;
    const {
      today,
      yesterday,
      dayOfWeek,
      title,
    } = amount;
    renderChart([today, yesterday, dayOfWeek], title);
  }

  handleOnClick = item => () => {
    const {
      today,
      yesterday,
      dayOfWeek,
      title,
    } = item;
    renderChart([today, yesterday, dayOfWeek], title);
  }

  render() {
    const { billing, amount } = this.props;

    const calcPercentage = (a, b) => {
      const percentage = (a - b) / a * 100;
      return Math.round(percentage);
    };

    const percent = calcPercentage(amount.today, amount.yesterday);
    const percentClass = cn({
      'text-right': true,
      'px-4': true,
      'bg-light-red': percent < -9,
      'bg-light-blue': percent > 9,
      'text-danger': percent < 0,
      'text-success': percent > 0,
    });

    const renderRow = (item) => {
      if (!item.visible) return null;

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
        <tr key={item.id} onClick={this.handleOnClick(item)}>
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
          <tr onClick={this.handleOnClick(amount)}>
            <td>{amount.title}</td>
            <td className="bg-light-green text-right px-4">{amount.today}</td>
            <td className="text-right px-4">{amount.today}</td>
            <td className={percentClass}>
              {percent}
              %
            </td>
            <td className="text-right px-4">{amount.dayOfWeek}</td>
          </tr>
          <tr>
            <th colSpan="5" className="bg-white">
              <div id="container" />
            </th>
          </tr>
        </tbody>
        <tbody>
          {billing.map(renderRow)}
        </tbody>
      </Table>
    );
  }
}

export default Spreadsheet;
