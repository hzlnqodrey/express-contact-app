const fs = require('fs')

// Cek folder & Buat Folder
const dirPath = './data/data-contacts'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

// Buat file
const dataPath = './data/data-contacts/contacts.json'
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

// Baca file contacts.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(fileBuffer)
    return contacts
}

const findContact = (nama) => {
    const contacts = loadContact()
    const foundContact = contacts.find((contact) => contact.nama === nama)
    return foundContact
}

// menimpa data contacts.json dengan data yang baru
const saveContacts = (contacts) => {
    fs.writeFileSync(dataPath, JSON.stringify(contacts), 'utf-8')
}

// menambahkan data contact baru
const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContacts(contacts)
}

// Cek nama yang duplikat
const checkDuplikat = (nama) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.nama === nama)
}

// hapus contact
const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContactsWithoutDeletedContact = contacts.filter((contact) => contact.nama !== nama) 
    saveContacts(newContactsWithoutDeletedContact)
}

module.exports = { loadContact, findContact, addContact, checkDuplikat, deleteContact }