const { filterEcommEvents, isEcommEvent } = require('../');

describe('Util: Filter Ecommerce Events', () => {
  const [name, id, revenue] = ['fooname', 'fooid', 523.55];
  const baseEvent = {
    hitType: 'addTransaction',
    customTrackerId: 'myTracker',
    id,
    name,
    revenue,
  };

  it('should return an object with hitType and trackerId stripped out', () => {
    const result = filterEcommEvents(baseEvent);
    const expected = {
      id,
      name,
      revenue,
    };
    expect(result).toEqual(expected);
  });

  describe('isEcommEvent', () => {
    let events;

    events = [
      { hitType: 'addTransaction', id: 'myid' },
      { hitType: 'addItem', id: 'myitemid', name: 'my item' },
      { hitType: 'ecommClear' },
      { hitType: 'ecommSend' },
    ];
    events.forEach((event) => {
      test(`${JSON.stringify(event)} => true,`, () => {
        expect(isEcommEvent(event)).toBeTruthy();
      });
    });

    it('should return false if event hitType is not related to ecommerce', () => {
      events = [
        { hitType: 'pageview' },
        { hitType: 'screenview' },
        { hitType: 'event' },
        { hitType: 'social' },
      ];
      events.forEach(evt => expect(isEcommEvent(evt)).toBeFalsy());
    });
  });
});
