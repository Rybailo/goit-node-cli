const { program } = require("commander");
const Contacts = require("./contacts.js");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.readContacts();
      console.table(contacts);
      break;

    case "get":
      const getContact = await Contacts.getContacts(id);
      console.log(getContact);
      break;

    case "add":
      const addContact = await Contacts.createContact({ name, email, phone });
      console.table(addContact);
      break;

    case "remove":
      const removeContact = await Contacts.deleteContact(id);
      console.log(removeContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
