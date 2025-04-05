import type { SignType } from '../../TrafficSignDataTypes.js'

export const _conditions__time: SignType[] = [
  {
    osmValuePart: '1040-30[16:00-18:00]',
    signId: '1040-30',
    name: 'Zusatzzeichen 1040-30',
    descriptiveName: 'Zeitliche Beschräkung',
    description: null,
    kind: 'condition_modifier',
    signValue: '16:00-18:00',
    valuePrompt: {
      prompt: 'Uhrzeit von-bis',
      defaultValue: '16:00-18:00',
      format: 'time_restriction',
    },
    tagRecommendations: {
      modifierValueFromValuePrompt: true,
    },
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1040-30_-_Zeitliche_Beschr%C3%A4nkung_(16_-_18_h),_330x600,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1040-31[08:00-11:00,16:00-18:00]',
    signId: '1040-31',
    name: 'Zusatzzeichen 1040-31',
    descriptiveName: 'Zeitliche Beschräkung',
    description: null,
    kind: 'condition_modifier',
    signValue: '08:00-11:00,16:00-18:00',
    valuePrompt: {
      prompt: 'Uhrzeit von-bis, von-bis',
      defaultValue: '08:00-11:00,16:00-18:00',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      modifierValueFromValuePrompt: true,
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1040-31_-_Zeitliche_Beschr%C3%A4nkung_(8_-_11_h,_16_-_18_h),_330x600,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1042-30',
    signId: '1042-30',
    name: 'Zusatzzeichen 1042-30',
    descriptiveName: 'Zeitliche Beschräkung: werktags',
    description: null,
    kind: 'condition_modifier',
    tagRecommendations: {
      modifierValue: 'Mo-Sa;PH off',
    },
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-30_-_werktags_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1042-31[Mo-Sa 18:00-19:00]',
    signId: '1042-31',
    name: 'Zusatzzeichen 1042-31',
    descriptiveName: 'Zeitliche Beschräkung: werktags, von-bis',
    description: null,
    kind: 'condition_modifier',
    signValue: 'Mo-Sa 18:00-19:00',
    valuePrompt: {
      prompt: 'Werktags, Uhrzeit von-bis',
      defaultValue: 'Mo-Sa 18:00-19:00',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      modifierValueFromValuePrompt: true,
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-31_-_werktags_18_-_19_h_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1042-32[PH off;Mo-Sa 8:30-11:30,16:00-18:00]',
    signId: '1042-32',
    name: 'Zusatzzeichen 1042-32',
    descriptiveName: 'Zeitliche Beschräkung: werktags, von-bis, von-bis',
    description: null,
    kind: 'condition_modifier',
    signValue: 'PH off;Mo-Sa 8:30-11:30,16:00-18:00',
    valuePrompt: {
      prompt: 'Werktags, Uhrzeit von-bis, von-bis',
      defaultValue: 'PH off;Mo-Sa 8:30-11:30,16:00-18:00',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      modifierValueFromValuePrompt: true,
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-32_-_werktags_8.30_-_11.30,_16_-_18_h_(600x450),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1042-33[Mo-Fr 16:00-18:00]',
    signId: '1042-33',
    name: 'Zusatzzeichen 1042-33',
    descriptiveName: 'Zeitliche Beschräkung: Mo-Fr, von-bis',
    description: null,
    kind: 'condition_modifier',
    signValue: 'Mo-Fr 16:00-18:00',
    valuePrompt: {
      prompt: 'Mo-Fr, Uhrzeit von-bis',
      defaultValue: 'Mo-Fr 16:00-18:00',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      modifierValueFromValuePrompt: true,
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-33_-_Mo_-_Fr,_16_-_18_h_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1042-34[Tu,Th,Fr 16:00-18:00]',
    signId: '1042-34',
    name: 'Zusatzzeichen 1042-34',
    descriptiveName: 'Zeitliche Beschräkung: Di,Do,Fr, von-bis',
    description: null,
    kind: 'condition_modifier',
    signValue: 'Tu,Th,Fr 16:00-18:00',
    valuePrompt: {
      prompt: 'Tu,Th,Fr, Uhrzeit von-bis',
      defaultValue: 'Tu,Th,Fr 16:00-18:00',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      modifierValueFromValuePrompt: true,
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-34_-_Di,_Do,_Fr,_16_-_18_h_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1042-35[Su,PH 6:00-22:00]',
    signId: '1042-35',
    name: 'Zusatzzeichen 1042-35',
    descriptiveName: 'Zeitliche Beschräkung: So- und Feiertage, von-bis',
    description: null,
    kind: 'condition_modifier',
    signValue: 'Su,PH 6:00-22:00',
    valuePrompt: {
      prompt: 'So- und Feiertage, Uhrzeit von-bis',
      defaultValue: 'Su,PH 6:00-22:00',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      modifierValueFromValuePrompt: true,
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-35_-_6_-_22_h_an_Sonn-und_Feiertagen_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1042-38',
    signId: '1042-38',
    name: 'Zusatzzeichen 1042-38',
    descriptiveName: 'Zeitliche Beschräkung: Werktags, außer Samstags',
    description: null,
    kind: 'condition_modifier',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      modifierValue: 'Mo-Fr;PH off',
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-38_-_werktags_au%C3%9Fer_samstags_(600x330),_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1042-51',
    signId: '1042-51',
    name: 'Zusatzzeichen 1042-51',
    descriptiveName: 'Zeitliche Beschräkung: Sa und So',
    description: null,
    kind: 'condition_modifier',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      modifierValue: 'Sa,Su',
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-51_-_Sa_und_So_(600x330),_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
]
