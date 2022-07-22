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
    const fileBuffer = fs.readFileSync('./data/data-contacts/contacts.json', 'utf-8')
    const contacts = JSON.parse(fileBuffer)
    return contacts
}

const findContact = (nama) => {
    const contacts = loadContact()
    const foundContact = contacts.find((contact) => contact.nama === nama)
    return foundContact
}

module.exports = { loadContact, findContact }