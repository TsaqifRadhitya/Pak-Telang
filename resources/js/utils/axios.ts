import axios from "axios";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Inject CSRF Token
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
}

export default axios
