import { registerComponent } from 'mjml-core';
import { registerDependencies } from 'mjml-validator';
import MjTable from 'mjml-table';

export default class MjsvTable extends MjTable {
  static componentName = 'mjsv-table';
  static endingTag = false;

  getContent() {
    const { children } = this.props;
    return this.renderChildren(children, {
      renderer: (component) => component.render()
    });
  }
}

registerComponent(MjsvTable);

registerDependencies({
  'mj-hero': ['mjsv-table'],
  'mj-column': ['mjsv-table'],
  'mjsv-table': []
});
