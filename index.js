import * as contactFunc from "./src/contacts.js";
import { program } from "commander";
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
      const listOfContacts = await contactFunc.listContacts();
      return console.log(listOfContacts);

    case "get":
      const contactById = await contactFunc.getContactById(id);
      return console.table(contactById);

    case "add":
      const addContact = await contactFunc.addContact(name, email, phone);
      return console.table(addContact);

    case "remove":
      const removeContactById = await contactFunc.removeContact(id);
      return console.table(removeContactById);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
