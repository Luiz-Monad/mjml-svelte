import { BodyComponent, registerComponent } from 'mjml-core';
import { dependencies, registerDependencies } from 'mjml-validator';

export default class MjsvTableColumn extends BodyComponent {
  static componentName = 'mjsv-table-column';
  static endingTag = false;

  static allowedAttributes = {
    'background-color': 'color',
    border: 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-radius': 'string',
    'border-right': 'string',
    'border-top': 'string',
    'css-class': 'string',
    height: 'unit(px,%)',
    padding: 'unit(px,%){1,4}',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'text-align': 'enum(left,center,right)',
    'vertical-align': 'enum(top,middle,bottom)',
    width: 'unit(px,%)'
  };

  static defaultAttributes = {
    'text-align': 'left',
    'vertical-align': 'top'
  };

  render() {
    const { children } = this.props;
    return `
      <td ${this.htmlAttributes({
      class: this.getAttribute('css-class'),
      style: {
        'background-color': this.getAttribute('background-color'),
        border: this.getAttribute('border'),
        'border-bottom': this.getAttribute('border-bottom'),
        'border-left': this.getAttribute('border-left'),
        'border-radius': this.getAttribute('border-radius'),
        'border-right': this.getAttribute('border-right'),
        'border-top': this.getAttribute('border-top'),
        height: this.getAttribute('height'),
        padding: this.getAttribute('padding'),
        'padding-bottom': this.getAttribute('padding-bottom'),
        'padding-left': this.getAttribute('padding-left'),
        'padding-right': this.getAttribute('padding-right'),
        'padding-top': this.getAttribute('padding-top'),
        'text-align': this.getAttribute('text-align'),
        'vertical-align': this.getAttribute('vertical-align'),
        width: this.getAttribute('width')
      }
    })}>
        ${this.renderChildren(children, {
      renderer: (component) => component.render()
    })}
      </td>
    `;
  }
}

registerComponent(MjsvTableColumn);

registerDependencies({
  'mjsv-table-row': ['mjsv-table-column'],
  'mjsv-table-column': dependencies['mj-column']
});
