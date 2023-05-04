import type { TrafficSigns } from './types'

export const trafficSigns: TrafficSigns = {
	'DE:237': {
		urlString: 'DE:237',
		name: 'Zeichen 237',
		descriptiveName: 'Radweg',
		description: null,
		osmTags: {
			highway: 'cycleway',
			bicycle: 'designated'
		},
		impliedKey: 'access', // TODO understand how this worked in the old app
		links: ['https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren'],
		tagsComment:
			'Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:238': {
		urlString: 'DE:238',
		name: 'Zeichen 238',
		descriptiveName: 'Reitweg',
		description: null,
		key: 'highway',
		value: 'bridleway',
		impliedKey: 'access', // TODO understand how this worked in the old app
		category: 'traffic_sign'
	},
	'DE:239': {
		urlString: 'DE:239',
		name: 'Zeichen 239',
		descriptiveName: 'Fußgäger',
		description: null,
		osmTags: {
			highway: 'footway',
			foot: 'designated'
		},
		impliedKey: 'access', // TODO understand how this worked in the old app
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:240': {
		urlString: 'DE:240',
		name: 'Zeichen 240',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/0/08/Zeichen_240_-_Gemeinsamer_Fu%C3%9F-_und_Radweg%2C_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_240_-_Gemeinsamer_Fu%C3%9F-_und_Radweg,_StVO_1992.svg',
			licence: 'Public Domain'
		},
		descriptiveName: 'Gemeinsamer Fuß- und Radweg',
		description: null,
		impliedKey: 'access', // TODO understand how this worked in the old app
		osmTags: {
			highway: 'path',
			bicycle: 'designated',
			foot: 'designated',
			segregated: 'no'
		},
		links: ['https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren'],
		tagsComment:
			'Manchmal wird auch [highway=cycleway] genutzt (siehe <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Entscheidungshilfe_zwischen_footway.2C_cycleway_und_path">Kontroversen</a>). Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:241-30': {
		urlString: 'DE:241-30',
		name: 'Zeichen 241-30',
		descriptiveName: 'Getrennter Rad- und Gehweg',
		description: 'Radweg links',
		impliedKey: 'access', // TODO understand how this worked in the old app
		osmTags: {
			highway: ['path', 'cycleway'],
			bicycle: 'designated',
			foot: 'designated',
			segregated: 'yes'
		},
		links: ['https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren'],
		tagsComment:
			'Manchmal wird auch [highway=cycleway] genutzt (siehe <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Entscheidungshilfe_zwischen_footway.2C_cycleway_und_path">Kontroversen</a>). Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:241-31': {
		urlString: 'DE:241-31',
		name: 'Zeichen 241-31',
		descriptiveName: 'Getrennter Rad- und Gehweg',
		description: 'Radweg rechts',
		impliedKey: 'access', // TODO understand how this worked in the old app
		osmTags: {
			highway: ['path', 'cycleway'],
			bicycle: 'designated',
			foot: 'designated',
			segregated: 'yes'
		},
		links: ['https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren'],
		tagsComment:
			'Manchmal wird auch [highway=cycleway] genutzt (siehe <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Entscheidungshilfe_zwischen_footway.2C_cycleway_und_path">Kontroversen</a>). Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:242': {
		urlString: 'DE:242.1',
		name: 'Zeichen 242',
		descriptiveName: 'Fußgägerbereich',
		description: null,
		impliedKey: 'access', // TODO understand how this worked in the old app
		osmTags: {
			highway: 'pedestrian',
			foot: 'designated'
		},
		category: 'traffic_sign'
	},
	'DE:244.1': {
		urlString: 'DE:244.1',
		name: 'Zeichen 244.1',
		descriptiveName: 'Fahrradstraße',
		description: null,
		restrictionKeys: ['vehicle'],
		osmTags: {
			bicycle_road: 'yes',
			maxspeed: '30',
			'source:maxspeed': 'DE:bicycle_road'
		},
		tagsComment:
			'Je nach Art der Straße überlicherweise [highway=residential], <code>path</code> oder <code>service</code>.',
		links: ['https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren'],
		category: 'traffic_sign'
	},
	'DE:245': {
		urlString: 'DE:245',
		name: 'Zeichen 245',
		descriptiveName: 'Busfahrstreifen',
		description: null,
		restrictionKeys: ['vehicle'],
		osmTags: {
			highway: 'service',
			bus: 'designated'
		},
		category: 'traffic_sign'
	},
	'DE:325': {
		urlString: 'DE:325',
		name: 'Zeichen 325',
		descriptiveName: 'Verkehrsberuhigter Bereich',
		description: null,
		osmTags: {
			highway: 'living_street'
		},
		category: 'traffic_sign'
	},
	'DE:250': {
		urlString: 'DE:250',
		name: 'Zeichen 250',
		descriptiveName: 'Verbot für Fahrzeuge aller Art',
		description: null,
		restrictionKeys: ['vehicle'],
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:260': {
		urlString: 'DE:260',
		name: 'Zeichen 260',
		descriptiveName: null,
		description:
			'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas sowie für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
		restrictionKeys: ['motor_vehicle'],
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:251': {
		urlString: 'DE:251',
		name: 'Zeichen 251',
		descriptiveName: null,
		description: 'Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
		restrictionKeys: ['motorcar'],
		category: 'traffic_sign'
	},
	'DE:253': {
		urlString: 'DE:253',
		name: 'Zeichen 253',
		descriptiveName: null,
		description:
			'Verbot für Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger, und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse',
		restrictionKeys: ['hgv'],
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:254': {
		urlString: 'DE:254',
		name: 'Zeichen 254',
		descriptiveName: 'Verbot für Radfahrer',
		description: null,
		restrictionKeys: ['bicycle'],
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:255': {
		urlString: 'DE:255',
		name: 'Zeichen 255',
		descriptiveName: null,
		description: 'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
		restrictionKeys: ['motorcycle', 'moped', 'mofa'],
		category: 'traffic_sign'
	},
	'DE:257-50': {
		urlString: 'DE:257-50',
		name: 'Zeichen 257-50',
		descriptiveName: 'Verbot für Mofas',
		description: null,
		restrictionKeys: ['mofa'],
		category: 'traffic_sign'
	},
	'DE:257-51': {
		urlString: 'DE:257-51',
		name: 'Zeichen 257-51',
		descriptiveName: 'Verbot für Reiter',
		description: null,
		restrictionKeys: ['horse'],
		category: 'traffic_sign'
	},
	'DE:257-54': {
		urlString: 'DE:257-54',
		name: 'Zeichen 257-54',
		descriptiveName: 'Verbot für Kraftomnibusse',
		description: null,
		restrictionKeys: ['bus', 'tourist_bus'],
		category: 'traffic_sign'
	},
	'DE:259': {
		urlString: 'DE:259',
		name: 'Zeichen 259',
		descriptiveName: 'Verbot für Fußgäger',
		description: null,
		restrictionKeys: ['foot'],
		category: 'traffic_sign'
	},
	'DE:261': {
		urlString: 'DE:261',
		name: 'Zeichen 261',
		descriptiveName: null,
		description: 'Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern',
		restrictionKeys: ['hazmat'],
		category: 'traffic_sign'
	},
	'DE:262[5.5]': {
		urlString: 'DE:262[5.5]',
		name: 'Zeichen 262',
		descriptiveName: null,
		description: 'Verbot für Fahrzeuge über angegebenem tatsächlichen Gewicht',
		key: 'maxweight',
		valuePrompt: {
			prompt: 'Gewicht in Tonnen ohne Einheit',
			defaultValue: '5.5',
			format: 'float'
		},
		impliedKey: 'conditional', // TODO understand how this worked in the old app
		category: 'traffic_sign'
	},
	'DE:263': {
		urlString: 'DE:263[8]',
		name: 'Zeichen 263',
		descriptiveName: null,
		description: 'Verbot für Fahrzeuge über angegebene tatsächliche Achslast',
		key: 'maxaxleload',
		valuePrompt: {
			prompt: 'Achslast in Tonnen ohne Einheit',
			defaultValue: '8',
			format: 'float'
		},
		impliedKey: 'conditional', // TODO understand how this worked in the old app
		category: 'traffic_sign'
	},
	'DE:264': {
		urlString: 'DE:264[2]',
		name: 'Zeichen 264',
		descriptiveName: null,
		description: 'Verbot für Fahrzeuge über die angegebene Breite einschließlich Ladung',
		key: 'maxwidth',
		valuePrompt: {
			prompt: 'Breite in Metern ohne Einheit',
			defaultValue: '2',
			format: 'float'
		},
		impliedKey: 'conditional', // TODO understand how this worked in the old app
		category: 'traffic_sign'
	},
	'DE:265': {
		urlString: 'DE:265[3.8]',
		name: 'Zeichen 265',
		descriptiveName: null,
		description: 'Verbot für Fahrzeuge über die angegebene Höhe einschließlich Ladung',
		key: 'maxheight',
		valuePrompt: {
			prompt: 'Höhe in Metern ohne Einheit',
			defaultValue: '3.8',
			format: 'float'
		},
		impliedKey: 'conditional', // TODO understand how this worked in the old app
		category: 'traffic_sign'
	},
	'DE:266': {
		urlString: 'DE:266[10]',
		name: 'Zeichen 266',
		descriptiveName: null,
		description: 'Verbot für Fahrzeuge und Züge über angegebene Läge einschließlich Ladung',
		key: 'maxlength',
		valuePrompt: {
			prompt: 'Läge in Metern ohne Einheit',
			defaultValue: '10',
			format: 'float'
		},
		impliedKey: 'conditional', // TODO understand how this worked in the old app
		category: 'traffic_sign'
	},
	'DE:269': {
		urlString: 'DE:269',
		name: 'Zeichen 269',
		descriptiveName: 'Verbot für Fahrzeuge mit wassergefährdender Ladung',
		description: null,
		restrictionKeys: ['hazmat:water'],
		category: 'traffic_sign'
	},
	'DE:274': {
		urlString: 'DE:274[60]',
		name: 'Zeichen 274',
		descriptiveName: 'Zulässige Höchstgeschwindigkeit',
		description: null,
		key: 'maxspeed',
		valuePrompt: {
			prompt: 'Geschwindigkeit in km/h ohne Einheit',
			defaultValue: '60',
			format: 'integer'
		},
		category: 'traffic_sign'
	},
	'DE:275': {
		urlString: 'DE:275[30]',
		name: 'Zeichen 275',
		descriptiveName: 'Vorgeschriebene Mindestgeschwindigkeit',
		description: null,
		key: 'minspeed',
		valuePrompt: {
			prompt: 'Geschwindigkeit in km/h ohne Einheit',
			defaultValue: '30',
			format: 'integer'
		},
		category: 'traffic_sign'
	},
	'DE:276': {
		urlString: 'DE:276',
		name: 'Zeichen 276',
		descriptiveName: 'Überholverbot für Kraftfahrzeuge aller Art',
		description: null,
		osmTags: {
			overtaking: 'no'
		},
		tagsComment:
			'Wenn Überholen in eine Richtung erlaubt: [overtaking=forward/backward] entsprechend der Wegrichtung.',
		category: 'traffic_sign'
	},
	'DE:277': {
		urlString: 'DE:277',
		name: 'Zeichen 277',
		descriptiveName: 'Überholverbot für Kraftfahrzeuge über 3,5 t',
		description: null,
		osmTags: {
			'overtaking:hgv': 'no'
		},
		tagsComment:
			'Wenn Überholen in eine Richtung erlaubt: [overtaking:hgv=forward/backward] entsprechend der Wegrichtung.',
		category: 'traffic_sign'
	},
	'DE:354': {
		urlString: 'DE:354',
		name: 'Zeichen 354',
		descriptiveName: 'Wasserschutzgebiet',
		description: null,
		osmTags: {
			'hazmat:water': 'permissive'
		},
		category: 'traffic_sign'
	},
	'DE:1020-12': {
		urlString: 'DE:1020-12',
		name: 'Zusatzzeichen 1020-12',
		descriptiveName: 'Radfahrer und Anlieger frei',
		description: 'Anlieger im Sinne von Bewohner',
		restrictionValue: 'destination',
		osmTags: {
			bicycle: 'yes'
		},
		category: 'modifier_sign'
	},
	'DE:1020-30': {
		urlString: 'DE:1020-30',
		name: 'Zusatzzeichen 1020-30',
		descriptiveName: 'Anlieger frei (Anlieger im Sinne von Bewohner)',
		description: null,
		restrictionValue: 'destination',
		validations: { requiredKey: 'highway' },
		tagsComment:
			'Aufgrund von "Anlieger frei" eventuell als [highway=residential] oder <code>service</code> einzustufen.',
		mostUsed: true,
		category: 'modifier_sign'
	},
	'DE:1022-10': {
		urlString: 'DE:1022-10',
		name: 'Zusatzzeichen 1022-10',
		descriptiveName: 'Radfahrer frei',
		description: null,
		osmTags: {
			bicycle: 'yes'
		},
		mostUsed: true,
		category: 'modifier_sign'
	},
	'DE:1022-11': {
		urlString: 'DE:1022-11',
		name: 'Zusatzzeichen 1022-11',
		descriptiveName: 'Mofas frei',
		description: null,
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/5/55/Zusatzzeichen_1022-11_-_Mofas_frei_%28600x450%29%2C_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-11_-_Mofas_frei_(600x450),_StVO_1992.svg',
			licence: 'Public Domain'
		},
		osmTags: {
			mofa: 'yes'
		},
		category: 'modifier_sign'
	},
	'DE:1022-12': {
		urlString: 'DE:1022-12',
		name: 'Zusatzzeichen 1022-12',
		descriptiveName: 'Krafträder auch mit Beiwagen, Krafträder und Mofas frei',
		description: null,
		osmTags: {
			motorcycle: 'yes',
			mofa: 'yes',
			moped: 'yes'
		},
		category: 'modifier_sign'
	},
	'DE:1024-10': {
		urlString: 'DE:1024-10',
		name: 'Zusatzzeichen 1024-10',
		descriptiveName: 'Personenkraftwagen frei',
		description: null,
		osmTags: {
			motorcar: 'yes'
		},
		tagsComment:
			'Zeichen 1024-10 (PKW frei) stimmt eigentlich nicht mit [motorcar=yes] überein, was sonst für "Kraftwagen und sonstige mehrspurige Kraftfahrzeuge" (inkl. LKW, Bus) genutzt wird. Zur Zeit gibt es aber noch keine bessere Alternative.',
		category: 'modifier_sign'
	},
	'DE:1024-12': {
		urlString: 'DE:1024-12',
		name: 'Zusatzzeichen 1024-12',
		descriptiveName: null,
		description:
			'Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse frei (zulässiges Gewicht, nicht das tatsächliche Gewicht)',
		key: 'hgv',
		value: 'yes',
		category: 'modifier_sign'
	},
	'DE:1024-14': {
		urlString: 'DE:1024-14',
		name: 'Zusatzzeichen 1024-14',
		descriptiveName: 'Kraftomnibus frei',
		description: null,
		osmTags: {
			bus: 'yes',
			tourist_bus: 'yes'
		},
		category: 'modifier_sign'
	},
	'DE:1024-17': {
		urlString: 'DE:1024-17',
		name: 'Zusatzzeichen 1024-17',
		descriptiveName: null,
		description:
			'Kraftfahrzeuge und Züge, die nicht schneller als 25 km/h fahren können oder dürfen frei (im Gegensatz zu "landwirtschaftlicher Verkehr" handelt es sich hier um eine Fahrzeugklasse)',
		osmTags: {
			agricultural: 'yes'
		},
		tagsComment: 'Aufgrund von Zusatzzeichen 1024-17 eventuell als [highway=track] einzustufen.',
		validations: { requiredKey: 'highway', shouldBeHighwayValue: 'track' },
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:1026-30': {
		urlString: 'DE:1026-30',
		name: 'Zusatzzeichen 1026-30',
		descriptiveName: 'Taxi frei',
		description: null,
		osmTags: {
			taxi: 'yes'
		},
		category: 'modifier_sign'
	},
	'DE:1026-32': {
		urlString: 'DE:1026-32',
		name: 'Zusatzzeichen 1026-32',
		descriptiveName: 'Linienverkehr frei',
		description: "'psv' steht für 'Public Service Vehicle', also 'öffentliches Verkehrsmittel'",
		osmTags: {
			bus: 'yes'
		},
		category: 'modifier_sign'
	},
	'DE:1026-35': {
		urlString: 'DE:1026-35',
		name: 'Zusatzzeichen 1026-35',
		descriptiveName: 'Lieferverkehr frei',
		description: null,
		restrictionValue: 'delivery',
		category: 'modifier_sign'
	},
	'DE:1026-36': {
		urlString: 'DE:1026-36',
		name: 'Zusatzzeichen 1026-36',
		descriptiveName: 'Landwirtschaftlicher Verkehr frei',
		description: null,
		restrictionValue: 'agricultural',
		tagsComment:
			'Aufgrund von "Landwirtschaftlicher Verkehr frei" eventuell als [highway=track] einzustufen.',
		validations: { requiredKey: 'highway', shouldBeHighwayValue: 'track' },
		mostUsed: true,
		category: 'traffic_sign'
	},
	'DE:1020-13': {
		urlString: 'DE:1020-13',
		name: 'Zusatzzeichen 1020-13',
		descriptiveName: 'Inline Skater frei',
		description: null,
		osmTags: {
			inline_skates: 'yes'
		},
		category: 'modifier_sign'
	},

	'1026-33': {
		urlString: '1026-33',
		name: 'Zusatzzeichen 1026-33',
		descriptiveName: 'Einsatzfahrzeuge frei',
		description: null,
		osmTags: {
			emergency: 'yes'
		},
		category: 'modifier_sign'
	},
	'DE:1026-37': {
		urlString: 'DE:1026-37',
		name: 'Zusatzzeichen 1026-37',
		descriptiveName: 'Forstwirtschaftlicher Verkehr frei',
		description: null,
		restrictionValue: 'forestry',
		tagsComment:
			'Aufgrund von "Forstwirtschaftlicher Verkehr frei" eventuell als [highway=track] einzustufen.',
		validations: { requiredKey: 'highway', shouldBeHighwayValue: 'track' },
		category: 'modifier_sign'
	},
	'DE:1026-38': {
		urlString: 'DE:1026-38',
		name: 'Zusatzzeichen 1026-38',
		descriptiveName: 'Land- und forstwirtschaftlicher Verkehr frei',
		description: null,
		restrictionValue: 'agricultural;forestry',
		tagsComment:
			'Aufgrund von "Land- und forstwirtschaftlicher Verkehr frei" eventuell als [highway=track] einzustufen.',
		validations: { requiredKey: 'highway', shouldBeHighwayValue: 'track' },
		category: 'modifier_sign'
	},
	'DE:1040-30': {
		urlString: 'DE:1040-30[16:00-18:00]',
		name: 'Zusatzzeichen 1040-30',
		descriptiveName: 'Zeitliche Beschräkung',
		description: null,
		valuePrompt: {
			prompt: 'Uhrzeit von-bis',
			defaultValue: '16:00-18:00',
			format: 'opening_hours'
		},
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	'DE:1040-31': {
		urlString: 'DE:1040-31[08:00-11:00,16:00-18:00]',
		name: 'Zusatzzeichen 1040-31',
		descriptiveName: 'Zeitliche Beschräkung',
		description: null,
		valuePrompt: {
			prompt: 'Uhrzeit von-bis, von-bis',
			defaultValue: '08:00-11:00,16:00-18:00',
			format: 'opening_hours'
		},
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	'DE:1042-30': {
		urlString: 'DE:1042-30',
		name: 'Zusatzzeichen 1042-30',
		descriptiveName: 'Zeitliche Beschräkung: werktags',
		description: null,
		value: 'Mo-Sa;PH off',
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	'DE:1042-31': {
		urlString: 'DE:1042-31[Mo-Sa 18:00-19:00]',
		name: 'Zusatzzeichen 1042-31',
		descriptiveName: 'Zeitliche Beschräkung: werktags, von-bis',
		description: null,
		valuePrompt: {
			prompt: 'Werktags, Uhrzeit von-bis',
			defaultValue: 'Mo-Sa 18:00-19:00',
			format: 'opening_hours'
		},
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	'DE:1042-32': {
		urlString: 'DE:1042-32[PH off;Mo-Sa 08:30-11:30,16:00-18:00]',
		name: 'Zusatzzeichen 1042-32',
		descriptiveName: 'Zeitliche Beschräkung: werktags, von-bis, von-bis',
		description: null,
		valuePrompt: {
			prompt: 'Werktags, Uhrzeit von-bis, von-bis',
			defaultValue: 'PH off;Mo-Sa 08:30-11:30,16:00-18:00',
			format: 'opening_hours'
		},
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	'DE:1042-33': {
		urlString: 'DE:1042-33',
		name: 'Zusatzzeichen 1042-33',
		descriptiveName: 'Zeitliche Beschräkung: Mo-Fr, von-bis',
		description: null,
		valuePrompt: {
			prompt: 'Mo-Fr, Uhrzeit von-bis',
			defaultValue: 'Mo-Fr 16:00-18:00',
			format: 'opening_hours'
		},
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	'DE:1042-34': {
		urlString: 'DE:1042-34[Tu,Th,Fr 16:00-18:00]',
		name: 'Zusatzzeichen 1042-34',
		descriptiveName: 'Zeitliche Beschräkung: Di,Do,Fr, von-bis',
		description: null,
		valuePrompt: {
			prompt: 'Tu,Th,Fr, Uhrzeit von-bis',
			defaultValue: 'Tu,Th,Fr 16:00-18:00',
			format: 'opening_hours'
		},
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	'DE:1042-35': {
		urlString: 'DE:1042-35[Su,PH 06:00-22:00]',
		name: 'Zusatzzeichen 1042-35',
		descriptiveName: 'Zeitliche Beschräkung: So- und Feiertage, von-bis',
		description: null,
		valuePrompt: {
			prompt: 'So- und Feiertage, Uhrzeit von-bis',
			defaultValue: 'Su,PH 06:00-22:00',
			format: 'opening_hours'
		},
		conditional: true, // TODO check if needed; may be specified with category already
		category: 'modifier_sign_restriction'
	},
	'DE:1042-38': {
		urlString: 'DE:1042-38',
		name: 'Zusatzzeichen 1042-38',
		descriptiveName: 'Zeitliche Beschräkung: Werktags, außer Samstags',
		description: null,
		value: 'Mo-Fr;PH off',
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	'DE:1042-51': {
		urlString: 'DE:1042-51',
		name: 'Zusatzzeichen 1042-51',
		descriptiveName: 'Zeitliche Beschräkung: Sa und So',
		description: null,
		value: 'Sa,Su',
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	'DE:1053-35': {
		urlString: 'DE:1053-35',
		name: 'Zusatzzeichen 1053-35',
		descriptiveName: 'Beschräkung: bei Nässe',
		description: null,
		value: 'wet',
		conditional: true,
		category: 'modifier_sign_restriction'
	}
}
