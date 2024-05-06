const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "contacts.json");
const crypto = require("node:crypto");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" });
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function getContacts(id) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === id);

  if (typeof contact === "undefined") {
    return null;
  }
  return contact;
}

async function createContact(contact) {
  const contacts = await readContacts();
  const newContact = { ...contact, id: crypto.randomUUID() };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

async function deleteContact(id) {
  const contacts = await readContacts();

  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  const removedContact = contacts[index];
  contacts.splice(index, 1);

  await writeContacts(contacts);

  return removedContact;
}

module.exports = {
  readContacts,
  writeContacts,
  getContacts,
  createContact,
  deleteContact,
};
