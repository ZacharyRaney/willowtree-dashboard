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
        case 'longleft5':
          this.layout = this.layouts.longleft5.layout;
          break;
        case 'longleft4':
          this.layout = this.layouts.longleft4.layout;
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
