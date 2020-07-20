import {tokenLocalStorageName} from '@/config.js'

export function getToken() {
		return localStorage.getItem(tokenLocalStorageName)
	}
export function setToken(val) {
		localStorage.setItem(tokenLocalStorageName, val)
	}