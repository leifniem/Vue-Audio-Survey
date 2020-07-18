const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const expirationTime = '4h'

const secretKey = 'm1uqfiDG.!KcgS%;E+QSrY%2+:m+6V'
const algorithm = 'HS256'

function checkMeta(data) {
	console.log(data)
	return true
}

function checkRequest(request) {
	jwt.verify(req)
}

const app = express()
app.use(express.json())

app.use(cors())
app.put('/meta', (req, res, next) => {
	if (checkMeta(req.body)) {
		const token = jwt.sign(req.body, secretKey, {
			expiresIn: expirationTime,
			algorithm,
		})
		console.log(token)
		res.status(200).json({
			token,
		})
	} else {
		res.status(403).send()
	}
})

app.put('/audio', (req, res, next) => {
	try {
		console.log(req.header('Authorization').slice(7))
		const payload = jwt.verify(
			req.header('Authorization').slice(7),
			secretKey,
			{ algorithms: [algorithm] }
		)
		console.log(payload)
		res.status(200).send()
	} catch (e) {
		res.status(403).send()
	}
})

app.listen(9000, () => {
	console.log('Server listening on port 9000')
})
