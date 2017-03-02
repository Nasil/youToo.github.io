//With local storage, web applications can store data locally within the user's browser.
//Before HTML5, application data had to be stored in cookies, included in every server request.
//Local storage is more secure, and large amounts of data can be stored locally, without affecting website performance.
//Unlike cookies, the storage limit is far larger (at least 5MB) and information is never transferred to the server.
//Local storage is per origin (per domain and protocol). All pages, from one origin, can store and access the same data.
'use strict'

let store = require('store')

// Store current user
store.set('user', { name:'nasil', age:28, phone:'010-111-2222' })

// Get current user
console.log(store.get('user'))

// Loop over all stored values
store.each(function(value, key) {
    console.log(key, '==', value)
})

// Remove current user
store.remove('user')

// Clear all keys
store.clearAll()


