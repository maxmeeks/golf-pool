import { defineStore } from "pinia";

export const usePlayersListStore = defineStore("playersListStore", {
	state: () => ({
		teams: [],
		tournamentPlayers: [
			{ name: "Scottie Scheffler" },
			{ name: "Rory McIlroy" },
			{ name: "Jon Rahm" },
			{ name: "Collin Morikawa" },
			{ name: "Ludvig Aberg" },
			{ name: "Xander Schauffele" },
			{ name: "Bryson DeChambeau" },
			{ name: "Justin Thomas" },
			{ name: "Joaquin Niemann" },
			{ name: "Hideki Matsuyama" },
			{ name: "Brooks Koepka" },
			{ name: "Tommy Fleetwood" },
			{ name: "Jordan Spieth" },
			{ name: "Viktor Hovland" },
			{ name: "Shane Lowry" },
			{ name: "Patrick Cantlay" },
			{ name: "Tyrrell Hatton" },
			{ name: "Will Zalatoris" },
			{ name: "Russell Henley" },
			{ name: "Min Woo Lee" },
			{ name: "Robert MacIntyre" },
			{ name: "Cameron Smith" },
			{ name: "Akshay Bhatia" },
			{ name: "Corey Conners" },
			{ name: "Tony Finau" },
			{ name: "Sepp Straka" },
			{ name: "Jason Day" },
			{ name: "Wyndham Clark" },
			{ name: "Sergio Garcia" },
			{ name: "Sahith Theegala" },
			{ name: "Patrick Reed" },
			{ name: "Dustin Johnson" },
			{ name: "Tom Kim" },
			{ name: "Brian Harman" },
			{ name: "Daniel Berger" },
			{ name: "Sungjae Im" },
			{ name: "Sam Burns" },
			{ name: "Keegan Bradley" },
			{ name: "Justin Rose" },
			{ name: "Davis Thompson" },
			{ name: "Aaron Rai" },
			{ name: "Adam Scott" },
			{ name: "Taylor Pendrith" },
			{ name: "Billy Horschel" },
			{ name: "Byeong Hun An" },
			{ name: "Maverick McNealy" },
			{ name: "J.J. Spaun" },
			{ name: "Michael Kim" },
			{ name: "Matt Fitzpatrick" },
			{ name: "Thomas Detry" },
			{ name: "Phil Mickelson" },
			{ name: "Lucas Glover" },
			{ name: "Denny McCarthy" },
			{ name: "Laurie Canter" },
			{ name: "Nicolai Hojgaard" },
			{ name: "Rasmus Hojgaard" },
			{ name: "Harris English" },
			{ name: "Cameron Young" },
			{ name: "Max Greyserman" },
			{ name: "J.T. Poston" },
			{ name: "Stephan Jaeger" },
			{ name: "Nick Taylor" },
			{ name: "Chris Kirk" },
			{ name: "Cam Davis" },
			{ name: "Joe Highsmith" },
			{ name: "Christiaan Bezuidenhout" },
			{ name: "Max Homa" },
			{ name: "Austin Eckroat" },
			{ name: "Tom Hoge" },
			{ name: "Nico Echavarria" },
			{ name: "Kevin Yu" },
			{ name: "Nick Dunlap" },
			{ name: "Matt McCarty" },
			{ name: "Jhonattan Vegas" },
			{ name: "Matthieu Pavon" },
			{ name: "Charl Schwartzel" },
			{ name: "Bubba Watson" },
			{ name: "Danny Willett" },
			{ name: "Adam Schenk" },
			{ name: "Thriston Lawrence" },
			{ name: "Davis Riley" },
			{ name: "Justin Hastings" },
			{ name: "Brian Campbell" },
			{ name: "Zach Johnson" },
			{ name: "Jose Luis Ballester" },
			{ name: "Patton Kizzire" },
			{ name: "Noah Kent" },
			{ name: "Rafael Campos" },
			{ name: "Evan Beck" },
			{ name: "Hiroshi Tai" },
			{ name: "Bernhard Langer" },
			{ name: "Angel Cabrera" },
			{ name: "Vijay Singh" },
			{ name: "Mike Weir" },
			{ name: "Jose Maria Olazabal" },
			{ name: "Fred Couples" },
		],
	}),
	actions: {
		async fetchTeams() {
			try {
				const response = await fetch("/teams-data.json");
				const data = await response.json();
				this.teams = data.teams;
			} catch (error) {
				console.error("Error fetching teams data:", error);
			}
		},
	},
});
