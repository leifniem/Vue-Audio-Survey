# Vue Audio Survey Tool

A for now quick & a bit dirty tool that is intended to collect data for
Audio-only surveys.

Utilizes JWT based on Session-IDs as a rather basic security mechanism and prevents duplicate users.

## How to get started

1. Clone Repo
2. Navigate to folder in terminal and run `npm i` or `yarn` followed by `lerna bootstrap`
3. Run `npm run dev` or `yarn dev` to start the development server on both packages
4. Navigate to `http://localhost:1337/` in a browser to access the frontend
5. Start configuring by editing `config.js` for the frontend and given variables of `main.js` for the server

## API

Currently the server only has 2 routes `/meta` and `/audio`.

`/meta` accepts `PUT`-Requests with a `JSON` body with the default shape of
```
{
	firstName: String
	lastName: String
	dateOfBirth: String (yyyy-MM-dd, zero padded)
	nativeLanguage: String
	dateTime: String (yyyy-MM-dd_HH:mm, zero padded)
	sessionID: String (dateTime_firstName_lastName)
}
```

Shape of the formatted strings can be edited in `metaDataModule.js`.




Credits go to [Audio Recorder Polyfill] for the MediaRecorder Polyfill, [Vue
Audio Recorder] for the mixin inspiration and [vue-2-webpack-4-boilerplate] for
the boilerplate.

[audio recorder polyfill]: https://github.com/ai/audio-recorder-polyfill
[vue audio recorder]: https://github.com/grishkovelli/vue-audio-recorder
[vue-2-webpack-4-boilerplate]:https://github.com/samteb/vue-2-webpack-4-boilerplate
