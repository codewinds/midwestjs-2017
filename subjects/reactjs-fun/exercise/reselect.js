import expect from 'expect';
import {createSelector} from 'reselect';
import {compose, find, set, unset} from 'lodash/fp';

describe('reactjs-fun/reselect', () => {

  /*
     TODO 9. create simple selector functions that take the full state and
     return the widgets, styles, and brands
   */

  /*
     TODO 10. create memoized reselect selector that merges together
     data from three selectors. It should only recompute the merge
     if any of the sources changes.
   */

  const state = {
    widgets: [
      { widgetId: 1, name: 'Foo', styleId: 20, brandId: 100 },
      { widgetId: 2, name: 'Bar', styleId: 10, brandId: 100 },
      { widgetId: 3, name: 'Cat', styleId: 20, brandId: 200 }
    ],

    styles: [
      { styleId: 10, name: 'Red Sport' },
      { styleId: 20, name: 'Black Classic' }
    ],

    brands: [
      { brandId: 100, name: 'Acme' },
      { brandId: 200, name: 'New World' }
    ]
  };

  const widgetSelector = state => undefined; // TODO implement
  const styleSelector = state => undefined; // TODO implement
  const brandSelector = state => undefined; // TODO implement

  // TODO implement an efficient memoized selector using reselect
  const mergedWidgetSelector = undefined; // TODO implement


  it('should have widget, style, and brand selectors', () => {
    expect(widgetSelector(state)).toExist('widgetSelector(state) should return a value');
    expect(styleSelector(state)).toExist('styleSelector(state) should return a value');
    expect(brandSelector(state)).toExist('brandSelector(state) should return a value');

    expect(widgetSelector(state)).toEqual(state.widgets);
    expect(styleSelector(state)).toEqual(state.styles);
    expect(brandSelector(state)).toEqual(state.brands);
  });

  it('should have mergedWidgetSelector', () => {
    expect(mergedWidgetSelector).toBeA(Function, 'mergedWidgetSelector should be a selector function');

    const expected = [
      {
        widgetId: 1,
        name: 'Foo',
        brand: {
          brandId: 100,
          name: 'Acme'
        },
        style: {
          styleId: 20,
          name: 'Black Classic'
        }
      },
      {
        widgetId: 2,
        name: 'Bar',
        brand: {
          brandId: 100,
          name: 'Acme'
        },
        style: {
          styleId: 10,
          name: 'Red Sport'
        }
      },
      {
        widgetId: 3,
        name: 'Cat',
        brand: {
          brandId: 200,
          name: 'New World'
        },
        style: {
          styleId: 20,
          name: 'Black Classic'
        }
      }
    ];
    expect(mergedWidgetSelector(state)).toEqual(expected);
  });

  it('should return the same object if state has not changed', () => {
    const result1 = mergedWidgetSelector(state);
    const result2 = mergedWidgetSelector(state);
    expect(result1).toBe(result2);

    // new state with same underlying objects
    const state2 = {
      widgets: state.widgets,
      styles: state.styles,
      brands: state.brands,
    };

    const result3 = mergedWidgetSelector(state2);
    expect(result1).toBe(result3);
  });

  it('should return a different object if state is changed', () => {
    const result1 = mergedWidgetSelector(state);
    const updatedWidgets = set('0.name', 'Baz')(state.widgets);
    const state3 = {
      widgets: updatedWidgets,
      styles: state.styles,
      brands: state.brands
    };
    const result2 = mergedWidgetSelector(state3);
    expect(result2).toNotBe(result1);

    const expected = [
      {
        widgetId: 1,
        name: 'Baz',
        brand: {
          brandId: 100,
          name: 'Acme'
        },
        style: {
          styleId: 20,
          name: 'Black Classic'
        }
      },
      {
        widgetId: 2,
        name: 'Bar',
        brand: {
          brandId: 100,
          name: 'Acme'
        },
        style: {
          styleId: 10,
          name: 'Red Sport'
        }
      },
      {
        widgetId: 3,
        name: 'Cat',
        brand: {
          brandId: 200,
          name: 'New World'
        },
        style: {
          styleId: 20,
          name: 'Black Classic'
        }
      }
    ];
    expect(result2).toEqual(expected);
  });

});
