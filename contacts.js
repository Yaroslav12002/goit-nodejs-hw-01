const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = async (newContacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return result;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const result = { id: nanoid(), name, email, phone };
  allContacts.push(result);
  await updateContacts(allContacts);
  return result;
}

const contactsExport = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsExport;
