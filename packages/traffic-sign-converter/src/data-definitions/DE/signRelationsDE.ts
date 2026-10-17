import type { SignRelation } from '../signRelationTypes.js'

const maxspeedValues = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]
const minspeedValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]

export const signRelationsDE: SignRelation[] = [
  // Zones
  { kind: 'zone', topic: 'maxspeed', start: '274.1', end: '274.2' },
  { kind: 'zone', topic: 'maxspeed', start: '274.1[47]', end: '274.2' },
  { kind: 'zone', topic: 'maxspeed', start: '274.1-20', end: '274.2-20' },
  { kind: 'zone', topic: 'parking_restriction', start: '290.1', end: '290.2' },
  { kind: 'zone', topic: 'parking_fee', start: '314.1', end: '314.2' },
  { kind: 'zone', topic: 'living_street', start: '325.1', end: '325.2' },
  { kind: 'zone', topic: 'pedestrian', start: '242.1', end: '242.2' },
  { kind: 'zone', topic: 'bicycle_road', start: '244.1', end: '244.2' },
  { kind: 'zone', topic: 'bicycle_zone', start: '244.3', end: '244.4' },

  // Sections along the road
  ...maxspeedValues.map((speed): SignRelation => ({
    kind: 'section',
    topic: 'maxspeed',
    start: `274-${speed}`,
    end: `278-${speed}`,
  })),
  { kind: 'section', topic: 'maxspeed', start: '274[47]', end: '278[47]' },
  ...minspeedValues.map((speed): SignRelation => ({
    kind: 'section',
    topic: 'minspeed',
    start: `275-${speed}`,
    end: `279-${speed}`,
  })),
  { kind: 'section', topic: 'minspeed', start: '275[47]', end: '279[47]' },
  { kind: 'section', topic: 'motorway', start: '330.1', end: '330.2' },
  { kind: 'section', topic: 'motorroad', start: '331.1', end: '331.2' },
  { kind: 'section', topic: 'cycle_highway', start: '350.1', end: '350.2' },

  // Places
  { kind: 'place', topic: 'city_limit', start: '310', end: '311' },

  // Inclines
  { kind: 'incline', topic: 'incline', downhill: '108[10]', uphill: '110[10]' },
  { kind: 'incline', topic: 'incline', downhill: '108-10', uphill: '110-10' },
  { kind: 'incline', topic: 'incline', downhill: '108-15', uphill: '110-15' },
]
