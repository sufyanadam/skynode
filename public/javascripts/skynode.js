var Skynode = {
  commands: {
    'link nest': function() { this.linkNest(this.nestOauthUrl) }
  },

  nestOauthUrl: 'https://home.nest.com/login/oauth2?client_id=082ece14-4bba-48bc-8020-bcd00611d3f1&state=noxss',

  historyDiv: document.getElementById('history'),

  inputDiv: document.getElementById('input'),

  start: function() {
    this.processOauth()
    document.addEventListener('keypress', this.processInput.bind(this))
    document.addEventListener('keyup', function(e) { if (e.charCode == 8) e.preventDefault() })

    this.inputDiv.focus()
  },

  processOauth: function() {
    var queryParams = window.
      location.
      search.
      slice(1).
      split('&').
      reduce(
        function(reduced, keyValuePair, index, elements) {
          var [key, value] = keyValuePair.split('=')
          reduced[key] = value
          return reduced
        }, {}
      )

    if (queryParams.code) {
      this.archiveOutput('Successfully linked nest with oauth code: ' + queryParams.code)
    }
  },

  processInput: function(keyPressEvent) {
    if (keyPressEvent.charCode == 13) {
      var command = this.inputDiv.textContent

      this.processCommand(command)
      this.clearInput()
    }
  },

  processCommand: function(command) {
    if (command == '') { return }

    if (this.isSupported(command)) {
      this.commands[command].bind(this)()
    } else {
      this.archiveOutput(command + ': command not found')
    }
  },

  archiveOutput: function(output) {
    this.historyDiv.innerHTML += '<span>' + output + '</span>'
  },

  clearInput: function() {
    this.inputDiv.innerHTML = ''
  },

  isSupported: function(command) {
    return this.commands[command] != undefined
  },

  linkNest: function(oauthUrl) {
    window.location = oauthUrl
  }
}

Skynode.start()
