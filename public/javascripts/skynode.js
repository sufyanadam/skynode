var Skynode = {
  commands: {
    'link nest': function() { this.linkNest(); }
  },

  historyDiv: document.getElementById('history'),

  inputDiv: document.getElementById('input'),

  start: function() {
    document.addEventListener('keypress', this.processInput.bind(this));
    document.addEventListener('keyup', function(e) { if (e.charCode == 8) e.preventDefault(); });

    this.inputDiv.focus();
  },

  processInput: function(keyPressEvent) {
    if (keyPressEvent.charCode == 13) {
      var command = this.inputDiv.textContent;

      this.processCommand(command);
      this.clearInput();
    }
  },

  processCommand: function(command) {
    if (command == '') { return; }

    if (this.isSupported(command)) {
      this.commands[command].bind(this)();
    } else {
      this.archiveOutput(command + ': command not found');
    }
  },

  archiveOutput: function(output) {
    this.historyDiv.innerHTML += '<span>' + output + '</span>';
  },

  clearInput: function() {
    this.inputDiv.innerHTML = '';
  },

  isSupported: function(command) {
    return this.commands[command] != undefined;
  },

  linkNest: function() {
    document.getElementById('nest_oauth').submit();
  }
}

Skynode.start();
