'use strict'

let store = require('store')

// Store current user
store.set('user', { name:'nasil', age:28, phone:'010-111-2222' })

// Get current user
store.get('user')

// Loop over all stored values
store.each(function(value, key) {
    console.log(key, '==', value)
})

// Remove current user
store.remove('user')

// Clear all keys
store.clearAll()
