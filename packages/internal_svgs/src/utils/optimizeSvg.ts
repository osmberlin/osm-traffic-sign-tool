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
      {
        // Inkscape writes <svg:svg>; svgo plugins match the root by name 'svg', so unprefix first
        name: 'unprefixSvgElements',
        fn: () => {
          return {
            element: {
              enter: (node, parentNode) => {
                if (!node.name.startsWith('svg:')) return
                node.name = node.name.slice('svg:'.length)
                if (node.name === 'svg' && parentNode.type === 'root') {
                  node.attributes.xmlns = 'http://www.w3.org/2000/svg'
                }
              },
            },
          }
        },
      },
      {
        // svgo 4 convertShapeToPath moves shapes inside Inkscape clip-path groups (BE_F111, BE_F113)
        name: 'preset-default',
        params: { overrides: { convertShapeToPath: false } },
      },
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
      {
        // Fail loudly instead of writing an SVG the converter cannot size
        name: 'requireRootViewBox',
        fn: () => {
          return {
            root: {
              exit: (root) => {
                const svg = root.children.find(
                  (child): child is XastElement => child.type === 'element' && child.name === 'svg',
                )
                if (svg == null) throw new Error(`Optimized SVG ${signId} has no svg root`)
                if (
                  svg.attributes.viewBox == null ||
                  svg.attributes.width != null ||
                  svg.attributes.height != null
                ) {
                  throw new Error(
                    `Optimized SVG ${signId} root needs a viewBox and no width or height`,
                  )
                }
              },
            },
          }
        },
      },
    ],
  }).data
}
