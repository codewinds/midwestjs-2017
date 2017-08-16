import expect, { createSpy } from 'expect';
import deepFreeze from 'deep-freeze';
import { merge, mergeIn, set, setIn, update, updateIn } from 'timm';

/*
   Using Timm immutable helper lib
 */

describe('immutable/timm', () => {
  const struct1 = {
    profile: {
      firstName: 'Jordan',
      lastName: 'Bell',
      emails: [
        'jordan@foo.com',
        'jbellfoo@gmail.com'
      ]
    },
    favorites: [
      'http://news.com/item/foo',
      'http://codewinds.com/'
    ]
  };
  // performing deep-freeze to help ensure you are not mutating struct
  // For performance you would not likely do this in production mode
  // this is optional but useful for catching mutation attempts
  deepFreeze(struct1);

  let struct2 = null; // defined later
  let struct3 = null; // defined later
  let history = null; // defined later

  /*
     TODO 4a. Use Timm immutability helper lib to create struct2 as
     a clone of struct1 and updating firstName to Jessica.
   */
  beforeEach('clone struct2 from struct1, updating profile.firstName to Jessica', () => {
    // TODO clone struct2 from struct1, set profile.firstName to Jessica
    struct2 = setIn(struct1, ['profile', 'firstName'], 'Jessica');
  });

  it('struct2 should be clone with profile.firstName = Jessica', () => {
    expect(struct2).toNotBe(struct1);
    expect(struct1).toEqual({
      profile: {
        firstName: 'Jordan',
        lastName: 'Bell',
        emails: [
          'jordan@foo.com',
          'jbellfoo@gmail.com'
        ]
      },
      favorites: [
        'http://news.com/item/foo',
        'http://codewinds.com/'
      ]
    });
    expect(struct2).toEqual({
      profile: {
        firstName: 'Jessica',
        lastName: 'Bell',
        emails: [
          'jordan@foo.com',
          'jbellfoo@gmail.com'
        ]
      },
      favorites: [
        'http://news.com/item/foo',
        'http://codewinds.com/'
      ]
    });
  });

  /*
     TODO 4b. Create struct3 cloning struct2 appending new email
     `jb@foo.com`
   */
  beforeEach('clone struct3 from struct2, append email jb@foo.com', () => {
    if (!struct2) { return; } // nothing to clone until struct2 is ready

    // TODO clone struct3 from struct2, appending new email jb@foo.com
    struct3 = updateIn(struct2, ['profile', 'emails'],
                       x => x.concat('jb@foo.com'));
  });

  it('struct3 should still have profile.firstName = Jessica', () => {
    // TODO 4c access firstName from struct3
    const firstName = struct3.profile.firstName;

    expect(firstName).toBe('Jessica');
  });

  it('struct3 is clone of struct2 with additional profile.email', () => {
    expect(struct3).toNotBe(struct2);
    expect(struct3).toNotBe(struct1);
    expect(struct3).toEqual({
      profile: {
        firstName: 'Jessica',
        lastName: 'Bell',
        emails: [
          'jordan@foo.com',
          'jbellfoo@gmail.com',
          'jb@foo.com'
        ]
      },
      favorites: [
        'http://news.com/item/foo',
        'http://codewinds.com/'
      ]
    });
  });

  /*
     TODO 4d. Iterate on the emails and console.log each with `.forEach`
   */
  it('iterate over emails with .forEach()', () => {
    const save = createSpy();

    // TODO iterate over emails with arr.forEach calling save with email
    struct3.profile.emails.forEach(save);

    expect(save.calls.length).toBe(3);
    const callArgs = save.calls.map(c => c.arguments[0]);
    expect(callArgs).toEqual([
      'jordan@foo.com',
      'jbellfoo@gmail.com',
      'jb@foo.com'
    ]);
  });

  /*
     TODO 4e. Create an array of states called `history` which
     contains each of the previous states with last being the
     current struct3
   */
  beforeEach('create history array of struct states', () => {
    // TODO create array of states, last being current struct3
    history = [
      struct1,
      struct2,
      struct3
    ];
  });

  it('find previous struct state from history', () => {
    // zero based array, so latest is history[history.length - 1]
    expect(history[history.length - 2]).toBe(struct2);
    expect(history[history.length - 2]).toEqual({
      profile: {
        firstName: 'Jessica',
        lastName: 'Bell',
        emails: [
          'jordan@foo.com',
          'jbellfoo@gmail.com'
        ]
      },
      favorites: [
        'http://news.com/item/foo',
        'http://codewinds.com/'
      ]
    });
  });

});
