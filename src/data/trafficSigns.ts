import type { TrafficSign } from './types'

export const trafficSigns: TrafficSign[] = [
	{
		urlKey: 'DE:237',
		signKey: 'DE:237',
		signValue: undefined,
		name: 'Zeichen 237',
		descriptiveName: 'Radweg',
		description: null,
		osmTags: {
			highway: 'cycleway',
			bicycle: 'designated'
		},
		impliedKey: 'access',
		tagsComment:
			'Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
		mostUsed: true,
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/9/91/Zeichen_237_-_Sonderweg_Radfahrer%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_237_-_Sonderweg_Radfahrer,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_237_-_Sonderweg_Radfahrer,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:238',
		signKey: 'DE:238',
		signValue: undefined,
		name: 'Zeichen 238',
		descriptiveName: 'Reitweg',
		description: null,
		key: 'highway',
		value: 'bridleway',
		impliedKey: 'access',
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/a/a6/Zeichen_238_-_Sonderweg_Reiter%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_238_-_Sonderweg_Reiter,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_238_-_Sonderweg_Reiter,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:239',
		signKey: 'DE:239',
		signValue: undefined,
		name: 'Zeichen 239',
		descriptiveName: 'Fußgäger',
		description: null,
		osmTags: {
			highway: 'footway',
			foot: 'designated'
		},
		impliedKey: 'access',
		mostUsed: true,
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/5/5a/Zeichen_239_-_Sonderweg_Fu%C3%9Fg%C3%A4nger%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_239_-_Sonderweg_Fußgänger,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_239_-_Sonderweg_Fu%C3%9Fg%C3%A4nger,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:240',
		signKey: 'DE:240',
		signValue: undefined,
		name: 'Zeichen 240',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/0/08/Zeichen_240_-_Gemeinsamer_Fu%C3%9F-_und_Radweg%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_240_-_Gemeinsamer_Fuß-_und_Radweg,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_240_-_Gemeinsamer_Fu%C3%9F-_und_Radweg,_StVO_1992.svg',
			licence: 'Public Domain'
		},
		descriptiveName: 'Gemeinsamer Fuß- und Radweg',
		description: null,
		impliedKey: 'access',
		osmTags: {
			highway: 'path',
			bicycle: 'designated',
			foot: 'designated',
			segregated: 'no'
		},
		tagsComment:
			'Manchmal wird auch [highway=cycleway] genutzt (siehe <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Entscheidungshilfe_zwischen_footway.2C_cycleway_und_path">Kontroversen</a>). Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
		mostUsed: true,
		category: 'traffic_sign'
	},
	{
		urlKey: 'DE:241-30',
		signKey: 'DE:241-30',
		signValue: undefined,
		name: 'Zeichen 241-30',
		descriptiveName: 'Getrennter Rad- und Gehweg',
		description: 'Radweg links',
		impliedKey: 'access',
		osmTags: {
			highway: ['path', 'cycleway'],
			bicycle: 'designated',
			foot: 'designated',
			segregated: 'yes'
		},
		tagsComment:
			'Manchmal wird auch [highway=cycleway] genutzt (siehe <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Entscheidungshilfe_zwischen_footway.2C_cycleway_und_path">Kontroversen</a>). Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
		mostUsed: true,
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/8/86/Zeichen_241-30_-_getrennter_Rad-_und_Fu%C3%9Fweg%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_241-30_-_getrennter_Rad-_und_Fußweg,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_241-30_-_getrennter_Rad-_und_Fu%C3%9Fweg,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:241-31',
		signKey: 'DE:241-31',
		signValue: undefined,
		name: 'Zeichen 241-31',
		descriptiveName: 'Getrennter Rad- und Gehweg',
		description: 'Radweg rechts',
		impliedKey: 'access',
		osmTags: {
			highway: ['path', 'cycleway'],
			bicycle: 'designated',
			foot: 'designated',
			segregated: 'yes'
		},
		tagsComment:
			'Manchmal wird auch [highway=cycleway] genutzt (siehe <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Entscheidungshilfe_zwischen_footway.2C_cycleway_und_path">Kontroversen</a>). Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
		mostUsed: true,
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/6/68/Zeichen_241-31_-_getrennter_Fu%C3%9F-_und_Radweg%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_241-31_-_getrennter_Fuß-_und_Radweg,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_241-31_-_getrennter_Fu%C3%9F-_und_Radweg,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:242.1',
		signKey: 'DE:242.1',
		signValue: undefined,
		name: 'Zeichen 242',
		descriptiveName: 'Fußgägerbereich',
		description: null,
		impliedKey: 'access',
		osmTags: {
			highway: 'pedestrian',
			foot: 'designated'
		},
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/8/8b/Zeichen_242.1_-_Beginn_einer_Fu%C3%9Fg%C3%A4ngerzone%2C_StVO_2009.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_242.1_-_Beginn_einer_Fußgängerzone,_StVO_2009.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_242.1_-_Beginn_einer_Fu%C3%9Fg%C3%A4ngerzone,_StVO_2009.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:244.1',
		signKey: 'DE:244.1',
		signValue: undefined,
		name: 'Zeichen 244.1',
		descriptiveName: 'Fahrradstraße',
		description: null,
		restrictionKeys: ['vehicle'],
		osmTags: {
			bicycle_road: 'yes',
			maxspeed: '30', // TODO Tagging: I remember to not tag `maxspeed` as a value but as a category
			'source:maxspeed': 'DE:bicycle_road'
		},
		tagsComment:
			'Je nach Art der Straße überlicherweise [highway=residential], <code>path</code> oder <code>service</code>.',
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/3/3c/Zeichen_244.1_-_Beginn_einer_Fahrradstra%C3%9Fe%2C_StVO_2013.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_244.1_-_Beginn_einer_Fahrradstraße,_StVO_2013.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_244.1_-_Beginn_einer_Fahrradstra%C3%9Fe,_StVO_2013.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:245',
		signKey: 'DE:245',
		signValue: undefined,
		name: 'Zeichen 245',
		descriptiveName: 'Busfahrstreifen',
		description: null,
		restrictionKeys: ['vehicle'],
		osmTags: {
			highway: 'service',
			bus: 'designated'
		},
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/0/05/Zeichen_245_-_Bussonderfahrstreifen%2C_StVO_2013.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_245_-_Bussonderfahrstreifen,_StVO_2013.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_245_-_Bussonderfahrstreifen,_StVO_2013.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:325',
		signKey: 'DE:325',
		signValue: undefined,
		name: 'Zeichen 325',
		descriptiveName: 'Verkehrsberuhigter Bereich',
		description: null,
		osmTags: {
			highway: 'living_street'
		},
		category: 'traffic_sign'
	},
	{
		urlKey: 'DE:250',
		signKey: 'DE:250',
		signValue: undefined,
		name: 'Zeichen 250',
		descriptiveName: 'Verbot für Fahrzeuge aller Art',
		description: null,
		restrictionKeys: ['vehicle'],
		mostUsed: true,
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/d/d2/Zeichen_250_-_Verbot_f%C3%BCr_Fahrzeuge_aller_Art%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_250_-_Verbot_für_Fahrzeuge_aller_Art,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_250_-_Verbot_f%C3%BCr_Fahrzeuge_aller_Art,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:260',
		signKey: 'DE:260',
		signValue: undefined,
		name: 'Zeichen 260',
		descriptiveName: null,
		description:
			'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas sowie für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
		restrictionKeys: ['motor_vehicle'],
		mostUsed: true,
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/b/bf/Zeichen_260_-_Verbot_f%C3%BCr_Kraftr%C3%A4der_und_Mofas_und_sonstige_mehrspurige_Kraftfahrzeuge%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_260_-_Verbot_für_Krafträder_und_Mofas_und_sonstige_mehrspurige_Kraftfahrzeuge,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_260_-_Verbot_f%C3%BCr_Kraftr%C3%A4der_und_Mofas_und_sonstige_mehrspurige_Kraftfahrzeuge,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:251',
		signKey: 'DE:251',
		signValue: undefined,
		name: 'Zeichen 251',
		descriptiveName: null,
		description: 'Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
		restrictionKeys: ['motorcar'],
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/6/6c/Zeichen_251_-_Verbot_f%C3%BCr_Kraftwagen_und_sonstige_mehrspurige_Kraftfahrzeuge%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_251_-_Verbot_für_Kraftwagen_und_sonstige_mehrspurige_Kraftfahrzeuge,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_251_-_Verbot_f%C3%BCr_Kraftwagen_und_sonstige_mehrspurige_Kraftfahrzeuge,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:253',
		signKey: 'DE:253',
		signValue: undefined,
		name: 'Zeichen 253',
		descriptiveName: null,
		description:
			'Verbot für Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger, und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse',
		restrictionKeys: ['hgv'],
		mostUsed: true,
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/9/9a/Zeichen_253_-_Verbot_f%C3%BCr_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_253_-_Verbot_für_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_253_-_Verbot_f%C3%BCr_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:254',
		signKey: 'DE:254',
		signValue: undefined,
		name: 'Zeichen 254',
		descriptiveName: 'Verbot für Radfahrer',
		description: null,
		restrictionKeys: ['bicycle'],
		mostUsed: true,
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/b/b0/Zeichen_254_-_Verbot_f%C3%BCr_Radfahrer%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_254_-_Verbot_für_Radfahrer,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_254_-_Verbot_f%C3%BCr_Radfahrer,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:255',
		signKey: 'DE:255',
		signValue: undefined,
		name: 'Zeichen 255',
		descriptiveName: null,
		description: 'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
		restrictionKeys: ['motorcycle', 'moped', 'mofa'],
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/a/ae/Zeichen_255_-_Verbot_f%C3%BCr_Kraftr%C3%A4der%2C_auch_mit_Beiwagen%2C_Kleinkraftr%C3%A4der_und_Mofas%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_255_-_Verbot_für_Krafträder,_auch_mit_Beiwagen,_Kleinkrafträder_und_Mofas,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_255_-_Verbot_f%C3%BCr_Kraftr%C3%A4der,_auch_mit_Beiwagen,_Kleinkraftr%C3%A4der_und_Mofas,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:257-50',
		signKey: 'DE:257-50',
		signValue: undefined,
		name: 'Zeichen 257-50',
		descriptiveName: 'Verbot für Mofas',
		description: null,
		restrictionKeys: ['mofa'],
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/3/3f/Zeichen_256_-_Verbot_f%C3%BCr_Mofas%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_256_-_Verbot_für_Mofas,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_256_-_Verbot_f%C3%BCr_Mofas,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:257-51',
		signKey: 'DE:257-51',
		signValue: undefined,
		name: 'Zeichen 257-51',
		descriptiveName: 'Verbot für Reiter',
		description: null,
		restrictionKeys: ['horse'],
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/e/ea/Zeichen_257-51_-_Verbot_f%C3%BCr_Reiter%2C_StVO_2017.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_257-51_-_Verbot_für_Reiter,_StVO_2017.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_257-51_-_Verbot_f%C3%BCr_Reiter,_StVO_2017.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:257-54',
		signKey: 'DE:257-54',
		signValue: undefined,
		name: 'Zeichen 257-54',
		descriptiveName: 'Verbot für Kraftomnibusse',
		description: null,
		restrictionKeys: ['bus', 'tourist_bus'],
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/f/fe/Zeichen_257-54_-_Verbot_f%C3%BCr_Kraftomnibusse%2C_StVO_2017.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_257-54_-_Verbot_für_Kraftomnibusse,_StVO_2017.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_257-54_-_Verbot_f%C3%BCr_Kraftomnibusse,_StVO_2017.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:259',
		signKey: 'DE:259',
		signValue: undefined,
		name: 'Zeichen 259',
		descriptiveName: 'Verbot für Fußgäger',
		description: null,
		restrictionKeys: ['foot'],
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/f/f6/Zeichen_259_-_Verbot_f%C3%BCr_Fu%C3%9Fg%C3%A4nger%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_259_-_Verbot_für_Fußgänger,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_259_-_Verbot_f%C3%BCr_Fu%C3%9Fg%C3%A4nger,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:261',
		signKey: 'DE:261',
		signValue: undefined,
		name: 'Zeichen 261',
		descriptiveName: null,
		description: 'Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern',
		restrictionKeys: ['hazmat'],
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/5/5d/Zeichen_261_-_Verbot_f%C3%BCr_kennzeichnungspflichtige_Kraftfahrzeuge_mit_gef%C3%A4hrlichen_G%C3%BCtern%2C_StVO_1988.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_261_-_Verbot_für_kennzeichnungspflichtige_Kraftfahrzeuge_mit_gefährlichen_Gütern,_StVO_1988.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_261_-_Verbot_f%C3%BCr_kennzeichnungspflichtige_Kraftfahrzeuge_mit_gef%C3%A4hrlichen_G%C3%BCtern,_StVO_1988.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:262[5.5]',
		signKey: 'DE:262',
		signValue: '5.5',
		name: 'Zeichen 262',
		descriptiveName: null,
		description: 'Verbot für Fahrzeuge über angegebenem tatsächlichen Gewicht',
		key: 'maxweight',
		osmTags: { 'source:maxweight': 'sign' },
		valuePrompt: {
			prompt: 'Gewicht in Tonnen ohne Einheit',
			defaultValue: '5.5',
			format: 'float'
		},
		impliedKey: 'conditional',
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/8/8e/Zeichen_262_-_Verbot_f%C3%BCr_Fahrzeuge_deren_tats%C3%A4chliches_Gewicht_eine_gewisse_Grenze_%C3%BCberschreitet_%28600x600%29%3B_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_262_-_Verbot_für_Fahrzeuge_deren_tatsächliches_Gewicht_eine_gewisse_Grenze_überschreitet_(600x600);_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_262_-_Verbot_f%C3%BCr_Fahrzeuge_deren_tats%C3%A4chliches_Gewicht_eine_gewisse_Grenze_%C3%BCberschreitet_(600x600);_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:263[8]',
		signKey: 'DE:263',
		signValue: '8',
		name: 'Zeichen 263',
		descriptiveName: null,
		description: 'Verbot für Fahrzeuge über angegebene tatsächliche Achslast',
		key: 'maxaxleload',
		osmTags: { 'source:maxaxleload': 'sign' },
		valuePrompt: {
			prompt: 'Achslast in Tonnen ohne Einheit',
			defaultValue: '8',
			format: 'float'
		},
		impliedKey: 'conditional',
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/a/ad/Zeichen_263_-_Verbot_f%C3%BCr_Fahrzeuge_%C3%BCber_angegebene_tats%C3%A4chliche_Achslast%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_263_-_Verbot_für_Fahrzeuge_über_angegebene_tatsächliche_Achslast,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_263_-_Verbot_f%C3%BCr_Fahrzeuge_%C3%BCber_angegebene_tats%C3%A4chliche_Achslast,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:264[2]',
		signKey: 'DE:264',
		signValue: '2',
		name: 'Zeichen 264',
		descriptiveName: null,
		description: 'Verbot für Fahrzeuge über die angegebene Breite einschließlich Ladung',
		key: 'maxwidth',
		osmTags: { 'source:maxwidth': 'sign' },
		valuePrompt: {
			prompt: 'Breite in Metern ohne Einheit',
			defaultValue: '2',
			format: 'float'
		},
		impliedKey: 'conditional',
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/b/b3/Zeichen_264_-_Verbot_f%C3%BCr_Fahrzeuge_%C3%BCber_angegebene_Breite_einschlie%C3%9Flich_Ladung%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_264_-_Verbot_für_Fahrzeuge_über_angegebene_Breite_einschließlich_Ladung,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_264_-_Verbot_f%C3%BCr_Fahrzeuge_%C3%BCber_angegebene_Breite_einschlie%C3%9Flich_Ladung,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:265[3.8]',
		signKey: 'DE:265',
		signValue: '3.8',
		name: 'Zeichen 265',
		descriptiveName: null,
		description: 'Verbot für Fahrzeuge über die angegebene Höhe einschließlich Ladung',
		key: 'maxheight',
		osmTags: { 'source:maxheight': 'sign' },
		valuePrompt: {
			prompt: 'Höhe in Metern ohne Einheit',
			defaultValue: '3.8',
			format: 'float'
		},
		impliedKey: 'conditional',
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/a/a7/Zeichen_265_-_Verbot_f%C3%BCr_Fahrzeuge%2C_deren_tats%C3%A4chliche_H%C3%B6he_einschlie%C3%9Flich_Ladung_eine_bestimmte_Grenze_%C3%BCberschreitet_%28600x600%29%3B_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_265_-_Verbot_für_Fahrzeuge,_deren_tatsächliche_Höhe_einschließlich_Ladung_eine_bestimmte_Grenze_überschreitet_(600x600);_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_265_-_Verbot_f%C3%BCr_Fahrzeuge,_deren_tats%C3%A4chliche_H%C3%B6he_einschlie%C3%9Flich_Ladung_eine_bestimmte_Grenze_%C3%BCberschreitet_(600x600);_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:266[10]',
		signKey: 'DE:266',
		signValue: '10',
		name: 'Zeichen 266',
		descriptiveName: null,
		description: 'Verbot für Fahrzeuge und Züge über angegebene Läge einschließlich Ladung',
		key: 'maxlength',
		osmTags: { 'source:maxlength': 'sign' },
		valuePrompt: {
			prompt: 'Läge in Metern ohne Einheit',
			defaultValue: '10',
			format: 'float'
		},
		impliedKey: 'conditional',
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/0/08/Zeichen_266_-_Verbot_f%C3%BCr_Fahrzeuge_und_Z%C3%BCge_%C3%BCber_angegebene_L%C3%A4nge_einschlie%C3%9Flich_Ladung%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_266_-_Verbot_für_Fahrzeuge_und_Züge_über_angegebene_Länge_einschließlich_Ladung,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_266_-_Verbot_f%C3%BCr_Fahrzeuge_und_Z%C3%BCge_%C3%BCber_angegebene_L%C3%A4nge_einschlie%C3%9Flich_Ladung,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:269',
		signKey: 'DE:269',
		signValue: undefined,
		name: 'Zeichen 269',
		descriptiveName: 'Verbot für Fahrzeuge mit wassergefährdender Ladung',
		description: null,
		restrictionKeys: ['hazmat:water'],
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/c/cc/Zeichen_269_-_Verbot_f%C3%BCr_Fahrzeuge_mit_wassergef%C3%A4hrdender_Ladung%2C_StVO_1988.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_269_-_Verbot_für_Fahrzeuge_mit_wassergefährdender_Ladung,_StVO_1988.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_269_-_Verbot_f%C3%BCr_Fahrzeuge_mit_wassergef%C3%A4hrdender_Ladung,_StVO_1988.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:274[60]',
		signKey: 'DE:274',
		signValue: '60',
		name: 'Zeichen 274',
		descriptiveName: 'Zulässige Höchstgeschwindigkeit',
		description: null,
		key: 'maxspeed',
		osmTags: { 'source:maxspeed': 'sign' },
		valuePrompt: {
			prompt: 'Geschwindigkeit in km/h ohne Einheit',
			defaultValue: '60',
			format: 'integer'
		},
		category: 'traffic_sign'
	},
	{
		urlKey: 'DE:275[30]',
		signKey: 'DE:275',
		signValue: '30',
		name: 'Zeichen 275',
		descriptiveName: 'Vorgeschriebene Mindestgeschwindigkeit',
		description: null,
		key: 'minspeed',
		osmTags: { 'source:minspeed': 'sign' },
		valuePrompt: {
			prompt: 'Geschwindigkeit in km/h ohne Einheit',
			defaultValue: '30',
			format: 'integer'
		},
		category: 'traffic_sign'
	},
	{
		urlKey: 'DE:276',
		signKey: 'DE:276',
		signValue: undefined,
		name: 'Zeichen 276',
		descriptiveName: 'Überholverbot für Kraftfahrzeuge aller Art',
		description: null,
		osmTags: {
			overtaking: 'no'
		},
		tagsComment:
			'Wenn Überholen in eine Richtung erlaubt: [overtaking=forward/backward] entsprechend der Wegrichtung.',
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/5/5e/Zeichen_276_-_%C3%9Cberholverbot_f%C3%BCr_Kraftfahrzeuge_aller_Art%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_276_-_Überholverbot_für_Kraftfahrzeuge_aller_Art,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_276_-_%C3%9Cberholverbot_f%C3%BCr_Kraftfahrzeuge_aller_Art,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:277',
		signKey: 'DE:277',
		signValue: undefined,
		name: 'Zeichen 277',
		descriptiveName: 'Überholverbot für Kraftfahrzeuge über 3,5 t',
		description: null,
		osmTags: {
			'overtaking:hgv': 'no'
		},
		tagsComment:
			'Wenn Überholen in eine Richtung erlaubt: [overtaking:hgv=forward/backward] entsprechend der Wegrichtung.',
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/a/ad/Zeichen_277_-_%C3%9Cberholverbot_f%C3%BCr_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht_%C3%BCber_2%2C8_t%2C_einschlie%C3%9Flich_ihrer_Anh%C3%A4nger%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zeichen_277_-_Überholverbot_für_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht_über_2,8_t,_einschließlich_ihrer_Anhänger,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_277_-_%C3%9Cberholverbot_f%C3%BCr_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht_%C3%BCber_2,8_t,_einschlie%C3%9Flich_ihrer_Anh%C3%A4nger,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:354',
		signKey: 'DE:354',
		signValue: undefined,
		name: 'Zeichen 354',
		descriptiveName: 'Wasserschutzgebiet',
		description: null,
		osmTags: {
			'hazmat:water': 'permissive'
		},
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/e/e3/Zeichen_354_-_Wasserschutzgebiet%2C_StVO_1988.svg',
			svgPath: '/trafficSignsSvgs/Zeichen_354_-_Wasserschutzgebiet,_StVO_1988.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zeichen_354_-_Wasserschutzgebiet,_StVO_1988.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1020-12',
		signKey: 'DE:1020-12',
		signValue: undefined,
		name: 'Zusatzzeichen 1020-12',
		descriptiveName: 'Radfahrer und Anlieger frei',
		description: 'Anlieger im Sinne von Bewohner',
		restrictionValue: 'destination',
		osmTags: {
			bicycle: 'yes'
		},
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/8/83/Zusatzzeichen_1020-12_-_Radfahrer_und_Anlieger_frei_%28450x600%29%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zusatzzeichen_1020-12_-_Radfahrer_und_Anlieger_frei_(450x600),_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-12_-_Radfahrer_und_Anlieger_frei_(450x600),_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1020-30',
		signKey: 'DE:1020-30',
		signValue: undefined,
		name: 'Zusatzzeichen 1020-30',
		descriptiveName: 'Anlieger frei (Anlieger im Sinne von Bewohner)',
		description: null,
		restrictionValue: 'destination',
		validations: {
			requiredKey: 'highway'
		},
		tagsComment:
			'Aufgrund von "Anlieger frei" eventuell als [highway=residential] oder <code>service</code> einzustufen.',
		mostUsed: true,
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/c/c1/Zusatzzeichen_1020-30_-_Anlieger_frei_%28600x330%29%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zusatzzeichen_1020-30_-_Anlieger_frei_(600x330),_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-30_-_Anlieger_frei_(600x330),_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1022-10',
		signKey: 'DE:1022-10',
		signValue: undefined,
		name: 'Zusatzzeichen 1022-10',
		descriptiveName: 'Radfahrer frei',
		description: null,
		osmTags: {
			bicycle: 'yes'
		},
		mostUsed: true,
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/0/04/Zusatzzeichen_1022-10_-_Radfahrer_frei%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zusatzzeichen_1022-10_-_Radfahrer_frei,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-10_-_Radfahrer_frei,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1022-11',
		signKey: 'DE:1022-11',
		signValue: undefined,
		name: 'Zusatzzeichen 1022-11',
		descriptiveName: 'Mofas frei',
		description: null,
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/5/55/Zusatzzeichen_1022-11_-_Mofas_frei_%28600x450%29%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zusatzzeichen_1022-11_-_Mofas_frei_(600x450),_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-11_-_Mofas_frei_(600x450),_StVO_1992.svg',
			licence: 'Public Domain'
		},
		osmTags: {
			mofa: 'yes'
		},
		category: 'modifier_sign'
	},
	{
		urlKey: 'DE:1022-12',
		signKey: 'DE:1022-12',
		signValue: undefined,
		name: 'Zusatzzeichen 1022-12',
		descriptiveName: 'Krafträder auch mit Beiwagen, Krafträder und Mofas frei',
		description: null,
		osmTags: {
			motorcycle: 'yes',
			mofa: 'yes',
			moped: 'yes'
		},
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/e/ec/Zusatzzeichen_1022-12_-_Kraftr%C3%A4der_auch_mit_Beiwagen%2C_Kleinkraftr%C3%A4der_und_Mofas_frei_%28600x450%29%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zusatzzeichen_1022-12_-_Krafträder_auch_mit_Beiwagen,_Kleinkrafträder_und_Mofas_frei_(600x450),_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-12_-_Kraftr%C3%A4der_auch_mit_Beiwagen,_Kleinkraftr%C3%A4der_und_Mofas_frei_(600x450),_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1024-10',
		signKey: 'DE:1024-10',
		signValue: undefined,
		name: 'Zusatzzeichen 1024-10',
		descriptiveName: 'Personenkraftwagen frei',
		description: null,
		osmTags: {
			motorcar: 'yes'
		},
		tagsComment:
			'Zeichen 1024-10 (PKW frei) stimmt eigentlich nicht mit [motorcar=yes] überein, was sonst für "Kraftwagen und sonstige mehrspurige Kraftfahrzeuge" (inkl. LKW, Bus) genutzt wird. Zur Zeit gibt es aber noch keine bessere Alternative.',
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/a/ae/Zusatzzeichen_1024-10_-_Personenkraftwagen_frei%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zusatzzeichen_1024-10_-_Personenkraftwagen_frei,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-10_-_Personenkraftwagen_frei,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1024-12',
		signKey: 'DE:1024-12',
		signValue: undefined,
		name: 'Zusatzzeichen 1024-12',
		descriptiveName: null,
		description:
			'Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse frei (zulässiges Gewicht, nicht das tatsächliche Gewicht)',
		key: 'hgv',
		value: 'yes',
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/0/03/Zusatzzeichen_1024-12_-_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht_%C3%BCber_3%2C5_t%2C_einschlie%C3%9Flich_ihrer_Anh%C3%A4nger_und_Zugmaschinen%2C_ausgenommen_Personenkraftwagen_und_Kraftomnibusse_frei%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zusatzzeichen_1024-12_-_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht_über_3,5_t,_einschließlich_ihrer_Anhänger_und_Zugmaschinen,_ausgenommen_Personenkraftwagen_und_Kraftomnibusse_frei,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-12_-_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht_%C3%BCber_3,5_t,_einschlie%C3%9Flich_ihrer_Anh%C3%A4nger_und_Zugmaschinen,_ausgenommen_Personenkraftwagen_und_Kraftomnibusse_frei,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1024-14',
		signKey: 'DE:1024-14',
		signValue: undefined,
		name: 'Zusatzzeichen 1024-14',
		descriptiveName: 'Kraftomnibus frei',
		description: null,
		osmTags: {
			bus: 'yes',
			tourist_bus: 'yes'
		},
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/9/96/Zusatzzeichen_1024-14_-_Kraftomnibusse_frei%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zusatzzeichen_1024-14_-_Kraftomnibusse_frei,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-14_-_Kraftomnibusse_frei,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1024-17',
		signKey: 'DE:1024-17',
		signValue: undefined,
		name: 'Zusatzzeichen 1024-17',
		descriptiveName: null,
		description:
			'Kraftfahrzeuge und Züge, die nicht schneller als 25 km/h fahren können oder dürfen frei (im Gegensatz zu "landwirtschaftlicher Verkehr" handelt es sich hier um eine Fahrzeugklasse)',
		osmTags: {
			agricultural: 'yes'
		},
		tagsComment: 'Aufgrund von Zusatzzeichen 1024-17 eventuell als [highway=track] einzustufen.',
		validations: {
			requiredKey: 'highway',
			shouldBeHighwayValue: 'track'
		},
		mostUsed: true,
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/1/12/Zusatzzeichen_1024-17_-_Kraftfahrzeuge_und_Z%C3%BCge%2C_die_nicht_schneller_als_25_km-h_fahren_k%C3%B6nnen_oder_d%C3%BCrfen%2C_frei%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zusatzzeichen_1024-17_-_Kraftfahrzeuge_und_Züge,_die_nicht_schneller_als_25_km-h_fahren_können_oder_dürfen,_frei,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-17_-_Kraftfahrzeuge_und_Z%C3%BCge,_die_nicht_schneller_als_25_km-h_fahren_k%C3%B6nnen_oder_d%C3%BCrfen,_frei,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1026-30',
		signKey: 'DE:1026-30',
		signValue: undefined,
		name: 'Zusatzzeichen 1026-30',
		descriptiveName: 'Taxi frei',
		description: null,
		osmTags: {
			taxi: 'yes'
		},
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/4/43/Zusatzzeichen_1026-30_-_Taxi_frei%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zusatzzeichen_1026-30_-_Taxi_frei,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-30_-_Taxi_frei,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1026-32',
		signKey: 'DE:1026-32',
		signValue: undefined,
		name: 'Zusatzzeichen 1026-32',
		descriptiveName: 'Linienverkehr frei',
		description: "'psv' steht für 'Public Service Vehicle', also 'öffentliches Verkehrsmittel'",
		osmTags: {
			bus: 'yes'
		},
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/1/14/Zusatzzeichen_1026-32_-_Linienverkehr_frei_%28450x600%29%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zusatzzeichen_1026-32_-_Linienverkehr_frei_(450x600),_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-32_-_Linienverkehr_frei_(450x600),_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1026-35',
		signKey: 'DE:1026-35',
		signValue: undefined,
		name: 'Zusatzzeichen 1026-35',
		descriptiveName: 'Lieferverkehr frei',
		description: null,
		restrictionValue: 'delivery',
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/e/e6/Zusatzzeichen_1026-35_-_Lieferverkehr_frei%2C_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zusatzzeichen_1026-35_-_Lieferverkehr_frei,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-35_-_Lieferverkehr_frei,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1026-36',
		signKey: 'DE:1026-36',
		signValue: undefined,
		name: 'Zusatzzeichen 1026-36',
		descriptiveName: 'Landwirtschaftlicher Verkehr frei',
		description: null,
		restrictionValue: 'agricultural',
		tagsComment:
			'Aufgrund von "Landwirtschaftlicher Verkehr frei" eventuell als [highway=track] einzustufen.',
		validations: {
			requiredKey: 'highway',
			shouldBeHighwayValue: 'track'
		},
		mostUsed: true,
		category: 'traffic_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/4/41/Zusatzzeichen_1026-36_-_Landwirtschaftlicher_Verkehr_frei_%28450x600%29%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zusatzzeichen_1026-36_-_Landwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-36_-_Landwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1020-13',
		signKey: 'DE:1020-13',
		signValue: undefined,
		name: 'Zusatzzeichen 1020-13',
		descriptiveName: 'Inline Skater frei',
		description: null,
		osmTags: {
			inline_skates: 'yes'
		},
		category: 'modifier_sign'
	},
	{
		urlKey: '1026-33',
		signKey: '1026-33',
		signValue: undefined,
		name: 'Zusatzzeichen 1026-33',
		descriptiveName: 'Einsatzfahrzeuge frei',
		description: null,
		osmTags: {
			emergency: 'yes'
		},
		category: 'modifier_sign'
	},
	{
		urlKey: 'DE:1026-37',
		signKey: 'DE:1026-37',
		signValue: undefined,
		name: 'Zusatzzeichen 1026-37',
		descriptiveName: 'Forstwirtschaftlicher Verkehr frei',
		description: null,
		restrictionValue: 'forestry',
		tagsComment:
			'Aufgrund von "Forstwirtschaftlicher Verkehr frei" eventuell als [highway=track] einzustufen.',
		validations: {
			requiredKey: 'highway',
			shouldBeHighwayValue: 'track'
		},
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/d/d6/Zusatzzeichen_1026-37_-_Forstwirtschaftlicher_Verkehr_frei%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zusatzzeichen_1026-37_-_Forstwirtschaftlicher_Verkehr_frei,_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-37_-_Forstwirtschaftlicher_Verkehr_frei,_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1026-38',
		signKey: 'DE:1026-38',
		signValue: undefined,
		name: 'Zusatzzeichen 1026-38',
		descriptiveName: 'Land- und forstwirtschaftlicher Verkehr frei',
		description: null,
		restrictionValue: 'agricultural;forestry',
		tagsComment:
			'Aufgrund von "Land- und forstwirtschaftlicher Verkehr frei" eventuell als [highway=track] einzustufen.',
		validations: {
			requiredKey: 'highway',
			shouldBeHighwayValue: 'track'
		},
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/6/6b/Zusatzzeichen_1026-38_-_Land-_und_forstwirtschaftlicher_Verkehr_frei_%28450x600%29%2C_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zusatzzeichen_1026-38_-_Land-_und_forstwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
			sourceUrl:
				'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-38_-_Land-_und_forstwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1040-30[16:00-18:00]',
		signKey: 'DE:1040-30',
		signValue: '16:00-18:00',
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
	{
		urlKey: 'DE:1040-31[08:00-11:00,16:00-18:00]',
		signKey: 'DE:1040-31',
		signValue: '08:00-11:00,16:00-18:00',
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
	{
		urlKey: 'DE:1042-30',
		signKey: 'DE:1042-30',
		signValue: undefined,
		name: 'Zusatzzeichen 1042-30',
		descriptiveName: 'Zeitliche Beschräkung: werktags',
		description: null,
		value: 'Mo-Sa;PH off',
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	{
		urlKey: 'DE:1042-31[Mo-Sa 18:00-19:00]',
		signKey: 'DE:1042-31',
		signValue: 'Mo-Sa 18:00-19:00',
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
	{
		urlKey: 'DE:1042-32[PH off;Mo-Sa 08:30-11:30,16:00-18:00]',
		signKey: 'DE:1042-32',
		signValue: 'PH off;Mo-Sa 08:30-11:30,16:00-18:00',
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
	{
		urlKey: 'DE:1042-33',
		signKey: 'DE:1042-33',
		signValue: undefined,
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
	{
		urlKey: 'DE:1042-34[Tu,Th,Fr 16:00-18:00]',
		signKey: 'DE:1042-34',
		signValue: 'Tu,Th,Fr 16:00-18:00',
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
	{
		urlKey: 'DE:1042-35[Su,PH 06:00-22:00]',
		signKey: 'DE:1042-35',
		signValue: 'Su,PH 06:00-22:00',
		name: 'Zusatzzeichen 1042-35',
		descriptiveName: 'Zeitliche Beschräkung: So- und Feiertage, von-bis',
		description: null,
		valuePrompt: {
			prompt: 'So- und Feiertage, Uhrzeit von-bis',
			defaultValue: 'Su,PH 06:00-22:00',
			format: 'opening_hours'
		},
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	{
		urlKey: 'DE:1042-38',
		signKey: 'DE:1042-38',
		signValue: undefined,
		name: 'Zusatzzeichen 1042-38',
		descriptiveName: 'Zeitliche Beschräkung: Werktags, außer Samstags',
		description: null,
		value: 'Mo-Fr;PH off',
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	{
		urlKey: 'DE:1042-51',
		signKey: 'DE:1042-51',
		signValue: undefined,
		name: 'Zusatzzeichen 1042-51',
		descriptiveName: 'Zeitliche Beschräkung: Sa und So',
		description: null,
		value: 'Sa,Su',
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	{
		urlKey: 'DE:1053-35',
		signKey: 'DE:1053-35',
		signValue: undefined,
		name: 'Zusatzzeichen 1053-35',
		descriptiveName: 'Beschräkung: bei Nässe',
		description: null,
		value: 'wet',
		conditional: true,
		category: 'modifier_sign_restriction'
	},
	{
		urlKey: 'DE:1012-31',
		signKey: 'DE:1012-31',
		signValue: undefined,
		name: 'Zusatzzeichen 1012-31',
		descriptiveName: 'Ende',
		description: null,
		value: undefined,
		category: 'modifier_sign',
		image: {
			svgSourceUrl:
				'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1012-31_-_Ende_(600x330),_StVO_1992.svg',
			svgPath: '/trafficSignsSvgs/Zusatzzeichen_1012-31_-_Ende_(600x330),_StVO_1992.svg',
			sourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/2/25/Zusatzzeichen_1012-31_-_Ende_%28600x330%29%2C_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1000-30',
		signKey: 'DE:1000-30',
		signValue: undefined,
		name: 'Zusatzzeichen 1000-30',
		descriptiveName: 'Ende',
		description: null,
		value: undefined,
		category: 'modifier_sign',
		osmTags: {
			highway: ['path', 'cycleway'],
			oneway: 'no'
		},
		image: {
			svgSourceUrl:
				'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1000-30_-_beide_Richtungen,_zwei_gegengerichtete_waagerechte_Pfeile,_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zusatzzeichen_1000-30_-_beide_Richtungen,_zwei_gegengerichtete_waagerechte_Pfeile,_StVO_1992.svg',
			sourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/c/c9/Zusatzzeichen_1000-30_-_beide_Richtungen%2C_zwei_gegengerichtete_waagerechte_Pfeile%2C_StVO_1992.svg',
			licence: 'Public Domain'
		}
	},
	{
		urlKey: 'DE:1000-31',
		signKey: 'DE:1000-31',
		signValue: undefined,
		name: 'Zusatzzeichen 1000-31',
		descriptiveName: 'beide Richtungen',
		description: 'zwei gegengerichtete senkrechte Pfeile',
		value: undefined,
		category: 'modifier_sign',
		osmTags: {
			highway: ['path', 'cycleway'],
			oneway: 'no'
		},
		image: {
			svgSourceUrl:
				'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1000-31_-_beide_Richtungen,_zwei_gegengerichtete_senkrechte_Pfeile,_StVO_1992.svg',
			svgPath:
				'/trafficSignsSvgs/Zusatzzeichen_1000-31_-_beide_Richtungen,_zwei_gegengerichtete_senkrechte_Pfeile,_StVO_1992.svg',
			sourceUrl:
				'https://upload.wikimedia.org/wikipedia/commons/5/5e/Zusatzzeichen_1000-31_-_beide_Richtungen%2C_zwei_gegengerichtete_senkrechte_Pfeile%2C_StVO_1992.svg',
			licence: 'Public Domain'
		}
	}
]
