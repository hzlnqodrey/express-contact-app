const express = require('express')
const app = express()
const port = 8000

// File Import
const { loadContact, findContact } = require('./utils/contacts')


// [Module View Engine] - Tell express that we use EJS
app.set('view engine', 'ejs')
const expressLayouts = require('express-ejs-layouts')

// Third-party Middleware
    // 1. EJS Layouts
    app.use(expressLayouts)

// Built-in Middleware
    // 1. Express Static [To allow static file appears]
    app.use(express.static('public'))

// Application Level Middleware


// Routing

// GET INDEX
app.get('/', (req, res) => {
    const Identitas = [
        {
            Nama: 'Hazlan Muhammad Qodri',
            Umur: 22,
            KTP: 12312491201293,
            Kota: 'Payakumbuh',
            Provinsi: 'Sumatera Barat'
        },
        {
            Nama: 'Gilang Martadinata',
            Umur: 23,
            KTP: 1232421491201293,
            Kota: 'Bandar Lampung',
            Provinsi: 'Lampung'
        },
    ]

    const date_now = new Date().toISOString()

    // Send data to index's page
    res.render('index', {
        // Views Setting
        layout: 'layouts/main-layout',

        // Data Sending
        ID_Document: '324124124123123',
        Published_Date: date_now,
        Identitas,
        title: 'Halaman Utama'
    })
})

// GET ABOUT
app.get('/about', (req, res) => {
    res.render('about', {
        // Views Setting
        layout: 'layouts/main-layout',

        // Data Sending
        title: 'Halaman About',
    })
})

// GET ALL LIST CONTACTS
app.get('/contact', (req, res) => {
    // [Step #1] - Get Data Contacts
    const contacts = loadContact()

    res.render('contact', {
        // Views Setting
        layout: 'layouts/main-layout',

        // Data Sending
        title: 'Halaman Contact',
        contacts,
    })
})

// GET FORM ADD CONTACT PAGE
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        // View Setting
        layout: 'layouts/main-layout',

        // Data Sending
        title: 'Form Tambah Data Contact',
    })
})


// ADD CONTACT DATA
app.post('/contact/add', (req, res) => {

})


// GET DETAILED CONTACT
app.get('/contact/:nama', (req, res) => {
    // [Step #1] - Get Data Contacts
    const contact = findContact(req.params.nama)

    res.render('detail', {
        // Views Setting
        layout: 'layouts/main-layout',

        // Data Sending
        title: 'Halaman Detail Contact',
        contact,
    })
})


// Membatasi User jika routing ngasal, diarahkan ke halaman 404
app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
    console.log('Server is listening on port 8000....');
})