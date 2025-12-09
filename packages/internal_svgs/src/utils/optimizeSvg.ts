import { optimize, type XastElement } from 'svgo'

type Props = { svgString: string; signId: string; signTitle: string }

export const optimizeSvg = ({ svgString, signId, signTitle }: Props) => {
  return optimize(svgString, {
    js2svg: {
      indent: 2,
      pretty: true,
    },
    // Taken from https://github.com/tailwindlabs/heroicons/blob/master/svgo.24.solid.mjs
    plugins: [
      'preset-default',
      'removeDimensions',
      'sortAttrs',
      'cleanupListOfValues',
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            {
              role: 'img',
              'aria-labelledby': 'title',
            },
          ],
        },
      },
      {
        name: 'addTitleElement',
        fn: () => {
          return {
            element: {
              enter: (node, parentNode) => {
                if (node.name === 'svg' && parentNode.type === 'root') {
                  const titleElement = {
                    type: 'element',
                    name: 'title',
                    attributes: { id: 'title' },
                    children: [
                      {
                        type: 'text',
                        value: `Verkehrszeichen ${signId} - ${signTitle}`,
                      },
                    ],
                  } satisfies XastElement
                  node.children.unshift(titleElement)
                }
              },
            },
          }
        },
      },
    ],
  }).data
}
