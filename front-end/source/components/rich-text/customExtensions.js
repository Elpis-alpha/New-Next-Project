import { Extension } from '@tiptap/react';


export const FontSize = Extension.create({

  name: 'fontSize',

  addOptions() {

    return {

      types: ['textStyle'],

    };

  },

  addGlobalAttributes() {

    return [

      {

        types: this.options.types,

        attributes: {

          fontSize: {

            default: null,

            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),

            renderHTML: attributes => {

              if (!attributes.fontSize) {

                return {};

              }

              return {

                style: `font-size: ${attributes.fontSize}`,

              };

            },

          },

        },

      },

    ];

  },

  addCommands() {

    return {

      setFontSize: fontSize => ({ chain }) => {

        return chain()

          .setMark('textStyle', { fontSize })

          .run();

      },

      unsetFontSize: () => ({ chain }) => {

        return chain()

          .setMark('textStyle', { fontSize: null })

          .removeEmptyTextStyle()

          .run();

      },

    };

  },

});

export const LineHeight = Extension.create({

  name: 'lineHeight',

  addOptions() {

    return {

      types: ['textStyle'],

    };

  },

  addGlobalAttributes() {

    return [

      {

        types: this.options.types,

        attributes: {

          lineHeight: {

            default: null,

            parseHTML: element => element.style.lineHeight.replace(/['"]+/g, ''),

            renderHTML: attributes => {

              if (!attributes.lineHeight) {

                return {};

              }

              return {

                style: `line-height: ${attributes.lineHeight}`,

              };

            },

          },

        },

      },

    ];

  },

  addCommands() {

    return {

      setLineHeight: lineHeight => ({ chain }) => {

        return chain()

          .setMark('textStyle', { lineHeight })

          .run();

      },

      unsetlineHeight: () => ({ chain }) => {

        return chain()

          .setMark('textStyle', { lineHeight: null })

          .removeEmptyTextStyle()

          .run();

      },

    };

  },

});

export const TextColor = Extension.create({

  name: 'textColor',

  addOptions() {

    return {

      types: ['textStyle'],

    };

  },

  addGlobalAttributes() {

    return [

      {

        types: this.options.types,

        attributes: {

          textColor: {

            default: null,

            parseHTML: element => element.style.color.replace(/['"]+/g, ''),

            renderHTML: attributes => {

              if (!attributes.textColor) {

                return {};

              }

              return {

                style: `color: ${attributes.textColor}`,

              };

            },

          },

        },

      },

    ];

  },

  addCommands() {

    return {

      setTextColor: textColor => ({ chain }) => {

        return chain()

          .setMark('textStyle', { textColor })

          .run();

      },

      unsetTextColor: () => ({ chain }) => {

        return chain()

          .setMark('textStyle', { textColor: null })

          .removeEmptyTextStyle()

          .run();

      },

    };

  },

});

export const WorkClass = Extension.create({

  name: 'workClass',

  addOptions() {

    return {

      types: ['textStyle'],

    };

  },

  addGlobalAttributes() {

    return [

      {

        types: this.options.types,

        attributes: {

          className: {

            default: null,

            parseHTML: element => element.className.replace(/['"]+/g, ''),

            renderHTML: attributes => {

              if (!attributes.className || attributes.className.trim() === "") {

                return {};

              }

              return {

                class: `${attributes.className}`

              };

            },

          },

        },

      },

    ];

  },

  addCommands() {

    return {

      toggleClass: className => ({ chain }) => {

        const initString = this.editor.getAttributes('textStyle').className

        const receivedList = typeof className === 'string' ? className.split(' ') : []

        let classList = typeof initString === 'string' ? initString.split(' ') : []

        classList = classList.filter(x => x !== "") // Check for empty strings

        receivedList.forEach(item => {

          if (classList.includes(item)) { classList = classList.filter(x => x !== item) }

          else { classList.push(item) }

        })

        const finalString = classList.join(' ')

        return chain()

          .setMark('textStyle', { className: finalString })

          .run();

      },

      addClass: className => ({ chain }) => {

        const initString = this.editor.getAttributes('textStyle').className

        const receivedList = typeof className === 'string' ? className.split(' ') : []

        let classList = typeof initString === 'string' ? initString.split(' ') : []

        classList = classList.filter(x => x !== "") // Check for empty strings

        receivedList.forEach(item => {

          if (!classList.includes(item)) { classList.push(item) }

        })

        const finalString = classList.join(' ')

        return chain()

          .setMark('textStyle', { className: finalString })

          .run();

      },

      removeClass: className => ({ chain }) => {

        const initString = this.editor.getAttributes('textStyle').className

        const receivedList = typeof className === 'string' ? className.split(' ') : []

        let classList = typeof initString === 'string' ? initString.split(' ') : []

        classList = classList.filter(x => x !== "") // Check for empty strings

        receivedList.forEach(item => {

          if (classList.includes(item)) { classList = classList.filter(x => x !== item) }

        })

        const finalString = classList.join(' ')

        return chain()

          .setMark('textStyle', { className: finalString })

          .run();

      },

      setClass: className => ({ chain }) => {

        return chain()

          .setMark('textStyle', { className: className })

          .run();

      },

      unsetClass: () => ({ chain }) => {

        return chain()

          .setMark('textStyle', { className: null })

          .removeEmptyTextStyle()

          .run();

      },

    };

  },

});

export const FontFamily = Extension.create({

  name: 'fontFamily',

  addOptions() {

    return {

      types: ['textStyle'],

    };

  },

  addGlobalAttributes() {

    return [

      {

        types: this.options.types,

        attributes: {

          fontFamily: {

            default: null,

            parseHTML: element => element.style.fontFamily.replace(/['"]+/g, ''),

            renderHTML: attributes => {

              if (!attributes.fontFamily) {

                return {};

              }

              return {

                style: `font-family: ${attributes.fontFamily}`,

              };

            },

          },

        },

      },

    ];

  },

  addCommands() {

    return {

      setFontFamily: fontFamily => ({ chain }) => {

        return chain()

          .setMark('textStyle', { fontFamily })

          .run();

      },

      unsetFontFamily: () => ({ chain }) => {

        return chain()

          .setMark('textStyle', { fontFamily: null })

          .removeEmptyTextStyle()

          .run();

      },

    };

  },

});

export const BgColor = Extension.create({

  name: 'bgColor',

  addOptions() {

    return {

      types: ['textStyle'],

    };

  },

  addGlobalAttributes() {

    return [

      {

        types: this.options.types,

        attributes: {

          bgColor: {

            default: null,

            parseHTML: element => element.style.backgroundColor.replace(/['"]+/g, ''),

            renderHTML: attributes => {

              if (!attributes.bgColor) {

                return {};

              }

              return {

                style: `background-color: ${attributes.bgColor}`,

              };

            },

          },

        },

      },

    ];

  },

  addCommands() {

    return {

      setBgColor: bgColor => ({ chain }) => {

        return chain()

          .setMark('textStyle', { bgColor })

          .run();

      },

      unsetBgColor: () => ({ chain }) => {

        return chain()

          .setMark('textStyle', { bgColor: null })

          .removeEmptyTextStyle()

          .run();

      },

    };

  },

});

export const Underline = Extension.create({

  name: 'underline',

  addOptions() {

    return {

      types: ['textStyle'],

    };

  },

  addKeyboardShortcuts() {

    return {

      'Mod-u': () => this.editor.commands.toggleUnderline(),

      'Mod-U': () => this.editor.commands.toggleUnderline(),

    }

  },

  addGlobalAttributes() {

    return [

      {

        types: this.options.types,

        attributes: {

          underline: {

            default: null,

            parseHTML: element => element.style.textDecoration.replace(/['"]+/g, ''),

            renderHTML: attributes => {

              if (!attributes.underline) {

                return {};

              }

              return {

                style: `text-decoration: ${attributes.underline}`,

              };

            },

          },

        },

      },

    ];

  },

  addCommands() {

    return {

      toggleUnderline: () => ({ chain }) => {

        const status = this.editor.getAttributes('textStyle').underline

        if (status === 'underline') {

          return chain()

            .setMark('textStyle', { underline: null })

            .removeEmptyTextStyle()

            .run();

        } else {

          return chain()

            .setMark('textStyle', { underline: 'underline' })

            .run();

        }

      },

      setUnderline: () => ({ chain }) => {

        return chain()

          .setMark('textStyle', { underline: 'underline' })

          .run();

      },

      unsetUnderline: () => ({ chain }) => {

        return chain()

          .setMark('textStyle', { underline: null })

          .removeEmptyTextStyle()

          .run();

      },

    };

  },

});
