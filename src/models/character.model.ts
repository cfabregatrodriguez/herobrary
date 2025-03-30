export interface CharacterModel {
	isSelected?: boolean;
	id: number;
	name: string;
	slug: string;
	powerstats: {
		intelligence: number;
		strength: number;
		speed: number;
		durability: number;
		power: number;
		combat: number;
	};
	appearance: {
		gender: string;
		race: string | null;
		height: [string, string]; // ["6'8", "203 cm"]
		weight: [string, string]; // ["980 lb", "441 kg"]
		eyeColor: string;
		hairColor: string;
	};
	biography: {
		fullName: string | null;
		alterEgos: string;
		aliases: string[];
		placeOfBirth: string;
		firstAppearance: string;
		publisher: string;
		alignment: string;
	};
	work: {
		occupation: string;
		base: string;
	};
	connections: {
		groupAffiliation: string;
		relatives: string;
	};
	images: {
		xs: string;
		sm: string;
		md: string;
		lg: string;
	};
}
