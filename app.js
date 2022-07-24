const express = require('express')
const app = express()
const port = 8000

// File Import
const { loadContact, findContact, addContact, cekDuplikat } = require('./utils/contacts')


// [Module View Engine] - Tell express that we use EJS
app.set('view engine', 'ejs')
const expressLayouts = require('express-ejs-layouts')

// Third-party Middleware
    // 1. EJS Layouts
    app.use(expressLayouts)

// Built-in Middleware
    // 1. Express Static [To allow static file appears]
    app.use(express.static('public'))

    // 2. Url Encoded (Parsing Body JSON)
    app.use(express.urlencoded({ extended: true }))

    // 3. Express Validation
    // explanatory: 
    // - body is used to fill temporary newly data
    // - validationResult is an array data that used to check whether newly data is approriate on validation or not
    const { body, validationResult, check } = require('express-validator')


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
        title: 'Form Tambah Data Contact',
    })
})


// // ADD CONTACT DATA
app.post('/contact', 
    // Request Body Form Validator Check (u can customize validator with check function, don't forget to import it first!)
    [
        // Validate Name (Check Duplicate Name)
        body('nama')
            .custom((value) => {
                // Cek Nama Function
                const duplikat = cekDuplikat(value)

                if (duplikat) {
                    throw new Error('Nama contact sudah digunakan!')
                }

                return true
            }),
        // Validate Email
        check('email')
            .isEmail()
            .withMessage('Email tidak valid!'),

        // Validate Mobile Phone
        check('noHP')
            .isMobilePhone('id-ID')
            .withMessage('Nomor Handphone tidak valid!'),
    ], 

    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(404).json({ errors: errors.array() })
            // Create Alert render to add-contact.ejs
            res.render('add-contact', {
                // View Setting
                layout: 'layouts/main-layout',
                title: 'Form Data Tambah Contact',

                // Data Sending
                errors: errors.array()
            })
        }

        // // addContact will process the incoming new data
        // addContact(req.body)
        // res.redirect('/contact')
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