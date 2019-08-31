'use babel';

import { CompositeDisposable } from 'atom';
import config from './config-schema.json';

// Global Variables
const fs = require("fs");
var path = atom.packages.getPackageDirPaths('multiple-find-replace').toString() + '/multiple-find-replace/multiple-find-replace-template.txt';
var finishWithError = false;


export default {

  config,
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.config = config;

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
      'multiple-find-replace:replace': () => this.replace()
    }))

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
      'multiple-find-replace:find': () => this.find()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  find(editor) {
    finishWithError = false
    // Define defaultText variable after package settings declaration
    var defaultText = 'Find and replace me' + atom.config.get('multiple-find-replace.general.splitSintax') + 'Replaced!';
    fileExists = fs.existsSync(path)
    if (fileExists) {
      atom.workspace.open(path)
      if (atom.config.get('multiple-find-replace.general.displayNotifications')) {
        atom.notifications.addSuccess('Multiple Find and Replace', {detail: 'Your last template has been opened'})
      }
    } else {
      // Asynchronous read
      fs.readFile(path, function (err, data) {
        if (err) {
          fs.writeFile(path, defaultText, function (err) {
            if (err) {
              if (atom.config.get('multiple-find-replace.general.displayNotifications')) {
                atom.notifications.addError('Multiple Find and Replace', {detail: 'The template could not been created'})
              }
            }
            atom.workspace.open(path)
            finishWithError = true
            if (finishWithError = true && atom.config.get('multiple-find-replace.general.displayNotifications')) {
              atom.notifications.addSuccess('Multiple Find and Replace', {detail: 'A new template has been created and opened'})
            }
          });
        }
      });
    }
  },

  replace(editor) {
    finishWithError = false
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      if (selection != '') {
        text = editor.getSelectedText();
        editor.insertText(this.doreplacement(text));
        if (finishWithError != true && atom.config.get('multiple-find-replace.general.displayNotifications')) {
          atom.notifications.addSuccess('Multiple Find and Replace', {detail: 'Done it only in your selection'})
        }
      } else {
        text = editor.getText();
    		editor.setText(this.doreplacement(text));
        if (finishWithError != true && atom.config.get('multiple-find-replace.general.displayNotifications')) {
          atom.notifications.addSuccess('Multiple Find and Replace', {detail: 'Done it in the whole document'})
        }
      }
    } else {
      if (atom.config.get('multiple-find-replace.general.displayNotifications')) {
        atom.notifications.addError('Multiple Find and Replace', {detail: 'You are out of the editor!'})
      }
    }
    console.log("Multiple Find and Replace: program ended");
  },

  doreplacement(text) {
    finishWithError = false
    // Define defaultText variable after package settings declaration
    var defaultText = 'Find and replace me' + atom.config.get('multiple-find-replace.general.splitSintax') + 'Replaced!';
    // Asynchronous read
    fs.readFile(path, function (err, data) {
      if (err) {
        fs.writeFile(path, defaultText, function (err) {
          if (err) {
            if (atom.config.get('multiple-find-replace.general.displayNotifications')) {
              atom.notifications.addError('Multiple Find and Replace', {detail: 'The template could not been created'})
            }
          }
          atom.workspace.open(path)
          finishWithError = true
          if (finishWithError = true && atom.config.get('multiple-find-replace.general.displayNotifications')) {
            atom.notifications.addWarning('Multiple Find and Replace', {detail: 'A new template has been created and opened'})
          }
        });
      }
    });

    fileExists = fs.existsSync(path)
    if (fileExists) {
      // Synchronous read
      var data = fs.readFileSync(path);
      const fullText = data.toString();
      var lines = ''
      lines = fullText.split('\n')
      linesQuantity = lines.length - 1
      for (var i = 0; i < linesQuantity; i++) {
        if (lines[i].includes(atom.config.get('multiple-find-replace.general.splitSintax'))) {
          line = lines[i].split(atom.config.get('multiple-find-replace.general.splitSintax'))
          line[0]
          line[1]
          if (atom.config.get('multiple-find-replace.general.matchCase')) {
            var findRegExp = new RegExp(line[0], 'g');
          } else {
            var findRegExp = new RegExp(line[0], 'gi');
          }
          text = text.replace(findRegExp, line[1].toString());
          l = i+1
        } else {
          atom.notifications.addError('Multiple Find and Replace', {detail: 'The template has a line without the correct FIND and REPLACE splitter sintax, please check it out.'})
          atom.workspace.open(path)
          finishWithError = true
          break;
        }
      }

    } else {
      finishWithError = true
    }

    return text
  }
};
