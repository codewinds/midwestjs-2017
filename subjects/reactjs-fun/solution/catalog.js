import React from 'react';
import PropTypes from 'prop-types';

function Catalog({ items, datetime, renderCount, onRefresh }) {
  return (
    <div>
      <div>Refreshed { datetime.toLocaleString() }</div>
      <div>Render count: <span id='renderCount'>{ renderCount }</span></div>
      <button onClick={onRefresh}>Refresh</button>
      <table>
        <tbody>
        { items.map((item, idx) => (
          <tr key={ item.id } className={ (idx % 2) ? 'even' : 'odd' }>
            <td>{ idx + 1 }</td>
            <td>{ item.name }</td>
          </tr> )) }
        </tbody>
      </table>
    </div>
  );
}

Catalog.propTypes = {
  items: PropTypes.array.isRequired,
  datetime: PropTypes.object.isRequired,
  renderCount: PropTypes.number.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default Catalog;
