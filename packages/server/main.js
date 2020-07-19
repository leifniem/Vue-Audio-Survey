const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const multer = require('multer');

const storage = multer.diskStorage({
	destination: 'uploads',
	filename (req, file, cb) {
		console.log(req.body['filename'])
		cb(null, req.body.filename + '.wav')
	}
})
const upload = multer({
	storage
	// fileFilter:
})

const expirationTime = '4h'

const userFilePath = './registeredUsers.json'

const secretKey = 'm1uqfiDG.!KcgS%;E+QSrY%2+:m+6V'
const algorithm = 'HS256'

function getUsersArray() {
	return JSON.parse(fs.readFileSync(userFilePath, 'utf8'))
}

function checkMeta(data) {
	const users = getUsersArray()
	const found = users.some(
		(user) =>
			user.firstName === data.firstName &&
			user.lastName === data.lastName &&
			user.dateOfBirth === data.dateOfBirth &&
			user.sessionID === data.sessionID
	)
	if (!found) {
		users.push(data)
		fs.writeFile(userFilePath, JSON.stringify(users), (err) =>
			// TODO error handling
			{
				if (err) console.error(err)
			}
		)
	}
	return !found
}

function checkRequest(header) {
	const users = getUsersArray()
	const payload = jwt.verify(header.slice(7), secretKey, {
		algorithms: [algorithm],
	})
	if (payload.exp < new Date().getTime() / 1000) return false
	return users.some(
		(user) =>
			user.firstName === payload.firstName &&
			user.lastName === payload.lastName &&
			user.dateOfBirth === payload.dateOfBirth &&
			user.sessionID === payload.sessionID
	)
}

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())
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

app.post('/audio', upload.single('audio'), (req, res) => {
	// TODO make sure null prototype object gets parsed correctly and file gets uploaded
	try {
		if (!checkRequest(req.headers['authorization'])) {
			throw new Error('Authentication invalid')
		}
		console.log(req.body)
		res.status(200).send()
	} catch (e) {
		res.statusMessage = e.msg
		res.status(401).send()
	}
})

app.listen(9000, () => {
	console.log('Server listening on port 9000')
})
