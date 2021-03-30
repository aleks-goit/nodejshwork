const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;


const contactsPath = path.join(__dirname, "/db/contacts.json");

async function getData(pathToFile) {
    const data = await fsPromises.readFile(pathToFile, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData
}

async function setData(pathToFile, dataToWrite) {
    const data = JSON.stringify(dataToWrite);
    await fsPromises.writeFile(pathToFile, data);

    const newData = await fsPromises.readFile(pathToFile, "utf-8");
    const parsedData = JSON.parse(newData);
    return parsedData
}

async function listContacts() {
    const data = await getData(contactsPath);
    console.log(data)

}

async function getContactById(contactId) {
    const data = await getData(contactsPath);
    const foundData = data.find(el => contactId === el.id);
    console.log(foundData)
}

async function removeContact(contactId) {
    const data = await getData(contactsPath);
    const newData = data.filter(el => contactId !== el.id);
    const result = await setData(contactsPath, newData);
    console.log(result)
}

async function addContact(name, email, phone) {
    const data = await getData(contactsPath);
    const maxId = data[data.length - 1].id;

    const newContact = {
        id: maxId + 1,
        name,
        email,
        phone,
    };

    const newArray = [...data, newContact];

    const result = await setData(contactsPath, newArray);

    console.table(result);
}
module.exports = { listContacts, getContactById, removeContact, addContact }