/*
	Each child of module.exports represents an input in the Metadata form as a line.
	The properties are used as follows:
		- id: Key in JSON requests as well as id in html
		- name: Context of the accompanying label for input
		- type: Attribute for the <inuput> element in the code
		- required: Makes the input error if field is empty
		- validator: A validation function that is called on the inputs value
		- errorMessage: Text displayed below field if validation fails
*/

function validateName(x) {
	return /^[A-Z][a-z]{1,}(((\s|-)[A-Za-z-]+)+)?$/.test(x)
}

module.exports = [
	{
		id: 'firstName',
		name: 'First Name',
		description: 'Required so your cat can talk to you on a friendly basis',
		type: 'text',
		required: true,
		validator: validateName,
		errorMessage: 'First Name does not match criteria.',
	},
	{
		id: 'lastName',
		name: 'Last Name',
		description: 'Required for serious food discussions',
		type: 'text',
		required: true,
		validator: validateName,
		errorMessage: 'Last Name does not match criteria.',
	},
	{
		id: 'catPerson',
		name: 'Are you a cat person',
		description: 'Required for basic measures.',
		type: 'radio',
		required: true,
		options: [
			'Yes',
			'Wrong'
		],
		errorMessage: 'Last Name does not match criteria.',
	},
	{
		id: 'dateOfBirth',
		name: 'Date of birth',
		type: 'date',
		required: true,
		validator: (x) => {
			let value = new Date(x)
			let now = new Date()
			return now - value >= 5.676e11 && now - value <= 3.154e12
		},
		errorMessage: 'Age does not match criteria.',
	},
	{
		id: 'nativeLanguage',
		name: 'Native Language',
		type: 'select',
		options: [
			'Afrikaans',
			'Albanian',
			'Arabic',
			'Armenian',
			'Basque',
			'Bengali',
			'Bulgarian',
			'Catalan',
			'Cambodian',
			'Chinese',
			'Croatian',
			'Czech',
			'Danish',
			'Dutch',
			'English',
			'Estonian',
			'Fiji',
			'Finnish',
			'French',
			'Georgian',
			'German',
			'Greek',
			'Gujarati',
			'Hebrew',
			'Hindi',
			'Hungarian',
			'Icelandic',
			'Indonesian',
			'Irish',
			'Italian',
			'Japanese',
			'Javanese',
			'Korean',
			'Latin',
			'Latvian',
			'Lithuanian',
			'Macedonian',
			'Malay',
			'Malayalam',
			'Maltese',
			'Maori',
			'Marathi',
			'Mongolian',
			'Nepali',
			'Norwegian',
			'Persian',
			'Polish',
			'Portuguese',
			'Punjabi',
			'Quechua',
			'Romanian',
			'Russian',
			'Samoan',
			'Serbian',
			'Slovak',
			'Slovenian',
			'Spanish',
			'Swahili',
			'Swedish',
			'Tamil',
			'Tatar',
			'Telugu',
			'Thai',
			'Tibetan',
			'Tonga',
			'Turkish',
			'Ukrainian',
			'Urdu',
			'Uzbek',
			'Vietnamese',
			'Welsh',
			'Xhosa',
		],
		required: true,
		errorMessage: 'Native Language does not match criteria.',
	},
]
