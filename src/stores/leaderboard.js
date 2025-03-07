import { defineStore } from "pinia";
import { usePlayersListStore } from "@/stores/players-list";
import { useCookieStore } from "@/stores/cookies";

export const useLeaderboardStore = defineStore("leaderboard", {
  state: () => ({
    eventKey: "401580351",
    tierPlayersPerGroup: 16,
    tierGroupAmount: 10,
    date: "",
    leaderboard: [],
    players: [],
    tierGroups: [],
    createdTeams: [],
    eligibleTeams: [],
    cutTeams: [],
    tournament: null,
    status: null,
  }),
  actions: {
    resetState() {
      this.leaderboard = [];
      this.players = [];
      this.tierGroups = [];
      this.createdTeams = [];
      this.eligibleTeams = [];
      this.cutTeams = [];
      this.tournament = null;
      this.status = null;
    },
    resetPinned(index) {
      this.createdTeams.forEach((team, j) => {
        if (index !== j) {
          team.isPinned = false;
        }
      });
    },
    updatePinnedTeam(index, name) {
      const pinnedTeam = useCookieStore().getCookie("pinnedTeam");

      if (pinnedTeam === name) {
        useCookieStore().setCookie("pinnedTeam", "", {
          expires: new Date("10"),
        });
      } else {
        useCookieStore().setCookie("pinnedTeam", name, {
          expires: new Date("10"),
        });
      }

      this.createdTeams[index].isPinned = !this.createdTeams[index].isPinned;
      this.resetPinned(index);

      if (this.createdTeams[0].teamName !== this.createdTeams[index].teamName) {
        this.createdTeams.unshift(this.createdTeams.splice(index, 1)[0]);
      }
    },
    async fetchLeaderboard() {
      try {
        const response = await fetch(
          `https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard?event=${this.eventKey}`
        );
        const data = await response.json();
        this.resetState();
        this.date = data.events[0].date;
        this.players = data.events[0].competitions[0].competitors;
        this.tournament = data.events[0].tournament;
        this.status = data.events[0].status;
        this.createTeams();
        this.createLeaderboard();
      } catch (error) {
        console.log(error);
      }
    },
    createTiers() {
      const tierPlayers = usePlayersListStore().tournamentPlayers;

      while (tierPlayers.length > 0) {
        this.tierGroups.push(tierPlayers.splice(0, this.tierPlayersPerGroup));
      }

      if (this.tierGroups[this.tierGroupAmount]) {
        this.tierGroups[this.tierGroupAmount - 1] = [
          ...this.tierGroups[this.tierGroupAmount - 1],
          ...this.tierGroups[this.tierGroupAmount],
        ];
        this.tierGroups.splice(this.tierGroupAmount, 1);
      }
    },
    createLeaderboard() {
      let leaderboard = [];
      leaderboard = this.eligibleTeams.sort((a, b) =>
        a.totalScore > b.totalScore ? 1 : -1
      );
      leaderboard = [...leaderboard, ...this.cutTeams];

      this.leaderboard = leaderboard;
    },
    createTeams() {
      const teams = usePlayersListStore().teams;
      const pinnedTeam = useCookieStore().getCookie("pinnedTeam");

      teams.forEach((team) => {
        let newTeam = {};
        newTeam.isPinned = team.teamName === pinnedTeam ? true : false;
        newTeam.teamName = team.teamName;
        newTeam.players = this.getPlayersList(team.players);
        newTeam.totalScore = this.getTeamScore(team.players);

        if (newTeam.totalScore === "CUT") {
          this.cutTeams = [...this.cutTeams, newTeam];
        } else {
          this.eligibleTeams = [...this.eligibleTeams, newTeam];
        }

        if (newTeam.isPinned) {
          this.createdTeams.unshift(newTeam);
        } else {
          this.createdTeams = [...this.createdTeams, newTeam];
        }
      });
    },
    getTeamScore(list) {
      let totalScore = 0;
      let count = 0;
      const playerList = this.getPlayersList(list);

      playerList.forEach((player, i) => {
        if (i < 4) {
          if (
            player &&
            player?.status?.displayValue !== "WD" &&
            player?.status?.displayValue !== "CUT"
          ) {
            totalScore += player?.statistics[0]?.value;
            count++;
          }
        }
      });

      if (count !== 4) {
        totalScore = "CUT";
      }

      return totalScore;
    },
    getPlayersList(list) {
      const players = this.players;
      let playerList = [];
      let cutPlayers = [];

      list.forEach((item) => {
        const filterPlayer = players.find(
          (player) => player.athlete?.id === item?.id
        );

        if (
          filterPlayer?.status?.displayValue === "WD" ||
          filterPlayer?.status?.displayValue === "CUT"
        ) {
          cutPlayers = [...cutPlayers, filterPlayer];
        } else {
          playerList = [...playerList, filterPlayer];
        }
      });

      playerList.sort((a, b) =>
        a.statistics[0].value > b.statistics[0].value ? 1 : -1
      );

      playerList = [...playerList, ...cutPlayers];

      return playerList;
    },
  },
});
