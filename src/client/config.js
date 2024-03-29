import $ from 'jquery';
import Layouts from '../shared/layouts';

class Config {
  constructor(id) {
    this.id = id;
    this.layouts = new Layouts();
    this.layout = null;
    this.modules = [];
  }

  /**
   * Gets JSON data from server based on
   * the id of the screen
   */
  load(callback) {
    $.getJSON(`/screen/${this.id}/data`, (data) => {
      switch (data.layout) {
        case 'default':
          this.layout = this.layouts.default.layout;
          break;
        default:
          this.layout = this.layouts.default.layout;
          break;
      }
      for (const mods of data.modules) {
        this.modules.push(mods);
      }
      callback();
    });
  }
}
export default Config;
