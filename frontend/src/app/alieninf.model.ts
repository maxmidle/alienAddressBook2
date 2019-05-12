export interface AlienContact {
	name: String;
	age: Number;
	family: String;
	kind: String;
    planet: String;
    dad: String;
}

export interface AlienInf {
    userId: String;
	userPw: String;
	name: String;
	age: Number;
	family: String;
	kind: String;
	planet: String;
    contacts: Array<AlienContact>;
}