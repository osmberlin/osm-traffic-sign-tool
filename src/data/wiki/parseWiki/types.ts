export type TrafficSignsWikiMap = [string, TrafficSignWiki]

export type TrafficSignsWiki = {
	[key: string]: TrafficSignWiki
}

export type TrafficSignWiki = {
	sign: string
	imageSvg: string
	imageUrl: string
	name: string
	osmTags: string
	comments: string
}
