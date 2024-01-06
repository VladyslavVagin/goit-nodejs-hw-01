const { nanoid } = require('nanoid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', "contacts.json");

const listContacts = async () => {
    const allContacts = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(allContacts);
  }
  
const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
  }
  
const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if(index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }
  
  const addContact = async (newData) => {
    const contacts = await listContacts();
    const newContact = {
                  id: nanoid(),
                  ...newData,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

module.exports = {listContacts, getContactById, removeContact, addContact};