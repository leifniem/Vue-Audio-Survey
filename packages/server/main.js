const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const multer = require('multer')
const compression = require('compression')
const helmet = require('helmet')

// Server constants
const portNumber = 9000

// File upload constants
const userFilePath = './registeredUsers.json'
const uploadPath = 'uploads/'

// JWT constants
const secretKey = 'm1uqfiDG.!KcgS%;E+QSrY%2+:m+6V'
const algorithm = 'HS256'
const expirationTime = '4h'

// Read the file that holds users as array of Objects
function getUsersArray() {
	if (!fs.existsSync(userFilePath)) return []
	return JSON.parse(fs.readFileSync(userFilePath, 'utf8'))
}

// Verify the provided Metadata against the registered users
function checkMeta(data) {
	const users = getUsersArray()

	// Prevent users with identical names and birth dates
	const found = users.some(
		(user) =>
			user.firstName === data.firstName &&
			user.lastName === data.lastName &&
			user.dateOfBirth === data.dateOfBirth &&
			user.sessionID === data.sessionID
	)
	if (!found) {
		users.push(data)
		fs.writeFile(userFilePath, JSON.stringify(users), (err) => {
			if (err) throw new Error('User could not be registered')
		})
	}
	return !found
}

// Decode the JWT into a payload
function decodeToken(text) {
	return jwt.verify(text.slice(7), secretKey, {
		algorithms: [algorithm],
	})
}

// Verify that the provided token matches an user that is registered
function checkRequest(header) {
	const users = getUsersArray()
	const payload = decodeToken(header)
	if (payload.exp < new Date().getTime() / 1000) return false
	return users.some(
		(user) =>
			user.firstName === payload.firstName &&
			user.lastName === payload.lastName &&
			user.dateOfBirth === payload.dateOfBirth &&
			user.sessionID === payload.sessionID
	)
}

/*
	Initialize the multer diskStorage to save into folders named after the
	sessionID and create them if necessary.

	The filename function only is used to append the proper file extension.
*/
const storage = multer.diskStorage({
	destination(req, file, cb) {
		const folderName = uploadPath + req.body.foldername
		if (!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName)
		}
		cb(null, folderName)
	},
	filename(req, file, cb) {
		cb(null, req.body.filename + '.wav')
	},
})

// Configure a multer Object that uses the storage configuration above.
const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		// Assert that the necessary options for saving are present
		if (!req.body.filename || !req.body.foldername) cb(null, false)
		// Uncomment to prevent overwriting of files / retakes
		// if(fs.existsSync(uploadPath + req.body.foldername + '/' + req.body.filename)) cb(null, false)
	}
})

// A multer function that processes the file given in the requests 'audio' field
const audioUpload = upload.single('audio')

// Initialize server and add parsers / cors module / gzip compression / logging
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(compression())
app.use(helmet())

/*
	The meta route listens for Metadata requests, verifies them and generates a
	JWT if the user is indeed a new one
*/
app.put('/meta', (req, res) => {
	if (checkMeta(req.body)) {
		const token = jwt.sign(req.body, secretKey, {
			expiresIn: expirationTime,
			algorithm,
		})
		res.status(200).json({
			token,
		})
	} else {
		res.statusMessage = 'Metadata incomplete or already existent'
		res.status(409).send()
	}
})

/*
	The audio route accepts multipart form requests with audio files and
	information send by the frontend
*/
app.post('/audio', (req, res) => {
	try {
		if (!checkRequest(req.headers['authorization'])) {
			// Respond with an Unauthorized status if token invalid
			res.statusMessage = 'Authentication invalid'
			res.status(401).send()
			return
		}
		audioUpload(req, res, (err) => {
			if (err) throw new Error(err.msg)
		})
		res.status(200).send()
	} catch (e) {
		// Send an internal server error message on errors
		res.status(500).send()
	}
})

app.listen(portNumber, () => {
	console.log(`Server listening on port ${portNumber}`)
})
