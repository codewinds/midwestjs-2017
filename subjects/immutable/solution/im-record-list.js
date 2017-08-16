import expect, { createSpy } from 'expect';
import deepFreeze from 'deep-freeze';
import Imm from 'immutable';

/*
ImmutableJS Records and Lists

3a. Create immutablejs structure 'struct2' similar to struct1 but using Records and Lists then update firstName

3a2. Create struct2a also as a clone of struct1 but use Imm.fromJS with a reviver to use Records rather than Maps.

3b. Append new email

3c. Access the value of firstName

3d. Iterate on the emails with `.forEach`

3e. Create an array of states called `history` which contains each
of the previous states. Access the state just prior to the current.
 */

describe('immutable/im-record-list', () => {

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
  let struct2a = null; // defined later
  let struct3 = null; // defined later
  let history = null; // defined later

  /*
     TODO 3a. Using immutablejs records and lists to create a structure
     similar to struct1. Also update firstName to 'Jessica' leaving
     the original struct1 unchanged.
   */
  beforeEach('create struct2 similar to struct, updating profile.firstName to Jessica', () => {
    // TODO create struct2 like struct1, set profile.firstName to Jessica
    const profileRecord = Imm.Record({
      firstName: '',
      lastName: '',
      emails: Imm.List()
    });
    const structRecord = Imm.Record({
      profile: profileRecord(),
      favorites: Imm.List()
    });
    struct2 = structRecord({
      profile: profileRecord({
        firstName: 'Jordan',
        lastName: 'Bell',
        emails: Imm.List([
          'jordan@foo.com',
          'jbellfoo@gmail.com'
        ])
      }),
      favorites: Imm.List([
        'http://news.com/item/foo',
        'http://codewinds.com/'
      ])
    }).setIn(['profile', 'firstName'], 'Jessica');
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
    expect(struct2).toBeA(Imm.Record);
    expect(struct2.get('profile')).toBeA(Imm.Record);
    expect(struct2.toJS()).toEqual({
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
     TODO 3a2. Using immutablejs.fromJS with a reviver clone struct1
     into an immutablejs structure with records and lists. Also update
     firstName to 'Jessica' leaving the original struct1 unchanged.
   */
  beforeEach('clone struct2a from struct1, updating profile.firstName to Jessica', () => {
    // TODO clone struct2 from struct1 using fromJS and a reviver
    // so we use records and maps. Set profile.firstName to Jessica
    const profileRecord = Imm.Record({
      firstName: '',
      lastName: '',
      emails: Imm.List()
    });
    const structRecord = Imm.Record({
      profile: profileRecord(),
      favorites: Imm.List()
    });
    const recordMap = {
      '': structRecord, // root key
      profile: profileRecord
    };
    struct2a = Imm.fromJS(
      struct1,
      function reviver(k, val) { // eslint-disable-line prefer-arrow-callback
        const record = recordMap[k];
        if (!record) { // not matching any record keys
          const isIndexed = Imm.Iterable.isIndexed(val);
          return isIndexed ? val.toList() : val.toMap();
        }
        // use a record
        return record(val);
      }
    ).setIn(['profile', 'firstName'], 'Jessica');
  });

  it('struct2a should be clone with profile.firstName = Jessica', () => {
    expect(struct2a).toNotBe(struct1);
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
    expect(struct2a).toBeA(Imm.Record);
    expect(struct2a.get('profile')).toBeA(Imm.Record);
    expect(struct2a.toJS()).toEqual({
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
     TODO 3b. In an immutable fashion create a new struct `struct3`
     based on struct2 which appends a new email `jb@foo.com`
     w/o ImmutableJS or any helper libs.
   */
  beforeEach('clone struct3 from struct2, append email jb@foo.com', () => {
    if (!struct2) { return; } // nothing to clone until struct2 is ready

    // TODO clone struct3 from struct2, appending new email jb@foo.com
    struct3 = struct2.updateIn(['profile', 'emails'],
                               x => x.push('jb@foo.com'));
  });

  it('struct3 should still have profile.firstName = Jessica', () => {
    // TODO 3c access firstName from struct3
    // Hint: you can do this without .get() or .getIn()
    const firstName = struct3.profile.firstName;

    expect(firstName).toBe('Jessica');
  });

  it('struct3 is clone of struct2 with additional profile.email', () => {
    expect(struct3).toNotBe(struct2);
    expect(struct3).toNotBe(struct1);
    expect(struct3.toJS()).toEqual({
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
     TODO 3d. Iterate on the emails and console.log each with `.forEach`
   */
  it('iterate over emails with .forEach()', () => {
    const save = createSpy();

    // TODO iterate over emails with arr.forEach calling save with email
    // Hint: you should not need to use .get() or .getIn()
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
     TODO 3e. Create an array of states called `history` which
     contains each of the previous states with last being the
     current struct3. When adding struct1, convert it to
     immutablejs maps and lists so it will be like the others.
   */
  beforeEach('create history array of struct states', () => {
    // TODO create array of states, last being current struct3
    history = [
      Imm.fromJS(struct1),
      struct2,
      struct3
    ];
  });

  it('find previous struct state from history', () => {
    // zero based array, so latest is history[history.length - 1]
    expect(history[history.length - 2]).toBe(struct2);
    expect(history[history.length - 2].toJS()).toEqual({
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
