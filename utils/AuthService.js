export default class AuthService {
    constructor() {
      this.fetch = this.fetch.bind(this)
      this.login = this.login.bind(this)
      this.getProfile = this.getProfile.bind(this)
    }
  
    login(username, password) {
      // Get a token
      return this.fetch('/token', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        })
      }).then(res => {
        this.setToken(res.id_token)
        return this.fetch('/user', {
          method: 'GET'
        })
      }).then(res => {
        this.setProfile(res)
        return Promise.resolve(res)
      })
    }
  
    loggedIn(){
      // Checks if there is a saved token and it's still valid
      const token = this.getToken()
      return !!token // handwaiving here
    }
  
    setProfile(profile){
      // Saves profile data to localStorage
      localStorage.setItem('profile', JSON.stringify(profile))
    }
  
    getProfile(){
      // Retrieves the profile data from localStorage
      const profile = localStorage.getItem('profile')
      return profile ? JSON.parse(localStorage.profile) : {}
    }
  
    setToken(idToken){
      // Saves user token to localStorage
      localStorage.setItem('id_token', idToken)
    }
  
    getToken(){
      // Retrieves the user token from localStorage
      return localStorage.getItem('id_token')
    }
  
    logout(e){
      // Clear user token and profile data from localStorage
      e.preventDefault();
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
    }
  
    _checkStatus(response) {
      // raises an error in case response status is not a success
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }
  
    fetch(url, options){
      // performs api calls sending the required authentication headers
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  
      if (this.loggedIn()){
        headers['Authorization'] = 'Bearer ' + this.getToken()
      }
  
      return fetch(url, {
        headers,
        ...options
      })
      .then(this._checkStatus)
      .then(response => response.json())
    }
  }