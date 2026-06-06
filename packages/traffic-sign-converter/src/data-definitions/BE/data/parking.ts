import { sharedParkingRestrictionRecommendation } from '../../sharedRecommendationPresets.js'
import type { SignType } from '../../TrafficSignDataTypes.js'

export const _parking: SignType[] = [
  {
    osmValuePart: 'E1',
    signId: 'E1',
    name: 'Sign E1',
    descriptiveName:
      'No parking allowed. An extra sign can indicate when the prohibition is in force.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: sharedParkingRestrictionRecommendation('no_parking'),
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E1.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E3',
    signId: 'E3',
    name: 'Sign E3',
    descriptiveName:
      'No parking or standing still allowed. An extra sign can indicate when the prohibition is in force.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: sharedParkingRestrictionRecommendation('no_stopping'),
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E3.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E5',
    signId: 'E5',
    name: 'Sign E5',
    descriptiveName:
      'No parking allowed on this side of the road from 1st day of the month until the 15th',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          {
            key: 'parking:side:restriction:conditional',
            value:
              'no_parking @ (Jan 01-15,Feb 01-15,Mar 01-15,Apr 01-15,May 01-15,Jun 01-15,Jul 01-15,Aug 01-15,Sep 01-15,Oct 01-15,Nov 01-15,Dec 01-15)',
          },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E5.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E7',
    signId: 'E7',
    name: 'Sign E7',
    descriptiveName:
      'No parking allowed on this side of the road from the 16th day of the month until the last',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          {
            key: 'parking:side:restriction:conditional',
            value:
              'no_parking @ (Jan 16-31,Feb 16-29,Mar 16-31,Apr 16-30,May 16-31,Jun 16-30,Jul 16-31,Aug 16-31,Sep 16-30,Oct 16-31,Nov 16-30,Dec 16-31)',
          },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E7.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E9a',
    signId: 'E9a',
    name: 'Sign E9a',
    descriptiveName: 'Parking allowed',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'amenity', value: 'parking' },
          { key: 'parking:side', value: 'separate' },
          { key: 'parking:side', value: '*' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E9a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E9b',
    signId: 'E9b',
    name: 'Sign E9b',
    descriptiveName: 'Parking exclusively for motorcycles, motorcars and minibuses',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        accessTags: [
          { key: 'motorcycle', value: 'yes' },
          { key: 'motorcar', value: 'yes' },
        ],
        uniqueTags: [
          { key: 'amenity', value: 'parking' },
          { key: 'access', value: 'no' },
          { key: 'parking:side', value: 'separate' },
          { key: 'parking:side', value: '*' },
          { key: '1=parking:side:access', value: '3=no' },
          { key: 'parking:side:motorcycle', value: 'yes' },
          { key: 'parking:side:motorcar', value: 'yes' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E9b.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E9c',
    signId: 'E9c',
    name: 'Sign E9c',
    descriptiveName: 'Parking exclusively for lorries',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        accessTags: [
          { key: 'goods', value: 'yes' },
          { key: 'hgv', value: 'yes' },
        ],
        uniqueTags: [
          { key: 'amenity', value: 'parking' },
          { key: 'access', value: 'no' },
          { key: 'parking:side', value: 'separate' },
          { key: 'parking:side', value: '*' },
          { key: 'parking:side:access', value: 'no' },
          { key: 'parking:side:goods', value: 'yes' },
          { key: 'parking:side:hgv', value: 'yes' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E9c.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E9d',
    signId: 'E9d',
    name: 'Sign E9d',
    descriptiveName: 'Parking exclusively for coaches and tourist buses (NL: autocars)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        accessTags: [{ key: 'tourist_bus', value: 'yes' }],
        uniqueTags: [
          { key: 'amenity', value: 'parking' },
          { key: 'access', value: 'no' },
          { key: 'parking:side', value: 'separate' },
          { key: 'parking:side', value: '*' },
          { key: 'parking:side:access', value: 'no' },
          { key: 'parking:side:tourist_bus', value: 'yes' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E9d.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E9e',
    signId: 'E9e',
    name: 'Sign E9e',
    descriptiveName: 'Parking mandatory on pavement or verge',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'parking:side:orientation', value: 'parallel' },
          { key: 'parking:side', value: 'on_kerb' },
          { key: 'amenity', value: 'parking' },
          { key: 'parking', value: 'on_kerb' },
          { key: 'orientation', value: 'parallel' },
          { key: 'parking:side', value: 'separate' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E9e.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E9f',
    signId: 'E9f',
    name: 'Sign E9f',
    descriptiveName: 'Parking mandatory partly on pavement or verge',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'parking:side:orientation', value: 'parallel' },
          { key: 'parking:side', value: 'half_on_kerb' },
          { key: 'amenity', value: 'parking' },
          { key: 'parking', value: 'half_on_kerb' },
          { key: 'orientation', value: 'parallel' },
          { key: 'parking:side', value: 'separate' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E9f.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E9g',
    signId: 'E9g',
    name: 'Sign E9g',
    descriptiveName: 'Parking mandatory on the roadway',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'parking:side:orientation', value: 'parallel' },
          { key: 'parking:side', value: 'lane' },
          { key: 'amenity', value: 'parking' },
          { key: 'parking', value: 'lane' },
          { key: 'orientation', value: 'parallel' },
          { key: 'parking:side', value: 'separate' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E9g.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E9h',
    signId: 'E9h',
    name: 'Sign E9h',
    descriptiveName: 'Parking exclusively for motorhomes',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'parking:side', value: '*' },
          { key: 'parking:side:access', value: 'no' },
          { key: 'parking:side:motorhome', value: 'yes' },
          { key: 'amenity', value: 'parking' },
          { key: 'access', value: 'no' },
          { key: 'motorhome', value: 'yes' },
          { key: 'parking:side', value: 'separate' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E9h.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E9i',
    signId: 'E9i',
    name: 'Sign E9i',
    descriptiveName: 'Parking exclusively for motorcycles',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        accessTags: [{ key: 'motorcycle', value: 'yes' }],
        uniqueTags: [
          { key: 'parking:side', value: '*' },
          { key: 'parking:side:access', value: 'no' },
          { key: 'parking:side:motorcycle', value: 'yes' },
          { key: 'amenity', value: 'parking' },
          { key: 'access', value: 'no' },
          { key: 'parking:side', value: 'separate' },
          { key: 'amenity', value: 'motorcycle_parking' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E9i.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E9j',
    signId: 'E9j',
    name: 'Sign E9j',
    descriptiveName: 'parking alternates over time between different vehicle classes',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'parking:side', value: '*' },
          { key: 'parking:side:access', value: 'no' },
          { key: 'parking:side:*:conditional', value: 'designated @ (Mo-Su *)' },
          { key: 'parking:side:bicycle:conditional', value: 'designated @ (Mo-Su 08:00-17:30)' },
          { key: 'parking:side:motorcar:conditional', value: 'designated @ (Mo-Su 17:30-08:00)' },
          { key: 'amenity', value: 'parking' },
          { key: 'access', value: 'no' },
          { key: '*:conditional', value: 'designated @ (Mo-Su *)' },
          { key: 'bicycle:conditional', value: 'designated @ (Mo-Su 08:00-17:30)' },
          { key: 'motorcar:conditional', value: 'designated @ (Mo-Su 17:30-08:00)' },
          { key: 'parking:side', value: 'separate' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E9j.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E11',
    signId: 'E11',
    name: 'Sign E11',
    descriptiveName:
      'Is put above an F1* sign. Within the whole built-up area, parking only allowed on the side of the road with odd-numbered houses between days 1 and 15 of the month, even numbers otherwise.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [{ key: 'parking:side:restriction:reason', value: 'BE:E11' }],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_E11.svg',
      licence: 'Public Domain',
    },
  },
]
