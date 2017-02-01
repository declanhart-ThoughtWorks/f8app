'use strict';

const createParseReducer = require('./createParseReducer');

export type Contact = {
  name: string;
};

function fromParseContacts(contact: Object): Contact {
  return {
    name: contact.get('Name'),
  };
}

module.exports = createParseReducer('LOADED_CONTACTS', fromParseContacts);
