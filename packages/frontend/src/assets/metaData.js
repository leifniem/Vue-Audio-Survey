function validateName(x) {
	return /^[A-Z][a-z]{1,}(((\s|-)[A-Za-z-]+)+)?$/.test(x)
}

module.exports = [
	{
		id: 'firstName',
		name: 'First Name',
		type: 'text',
		required: true,
		validator: validateName,
		errorMessage: 'First Name does not match criteria.',
	},
	{
		id: 'lastName',
		name: 'Last Name',
		type: 'text',
		required: true,
		validator: validateName,
		errorMessage: 'Last Name does not match criteria.',
	},
	{
		id: 'age',
		name: 'Age',
		type: 'number',
		required: true,
		validator: (x) => x >= 18 && x <= 120,
		errorMessage: 'Age does not match criteria.',
	},
	{
		id: 'nativeLanguage',
		name: 'Native Language',
		type: 'text',
		required: true,
		validator: (x) => /[a-zA-Z]{2,}/.test(x),
		errorMessage: 'Native Language does not match criteria.',
	},
]