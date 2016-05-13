import { Component } from 'panel';

import template from './index.jade';

document.registerElement('todo-app', class extends Component {
  get $template() {
    return template;
  }
});
