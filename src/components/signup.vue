<template>
	<div class="flex justify-center my-12">
		<form
			v-if="!state.formCompleted"
			ref="form"
			@submit.prevent="sendEmail"
			class="w-full"
		>
			<div class="flex flex-col space-y-4">
				<h2 class="text-xl font-medium text-tournament-900">Signup</h2>
				<div class="flex flex-col space-y-2">
					<label for="team" class="text-sm">First Name</label>
					<input
						v-model="state.firstName"
						type="text"
						name="first_name"
						class="appearance-none bg-white py-2 px-3 rounded"
						required
					/>
				</div>
				<div class="flex flex-col space-y-2">
					<label for="team" class="text-sm">Last Name</label>
					<input
						v-model="state.lastName"
						type="text"
						name="last_name"
						class="appearance-none bg-white py-2 px-3 rounded"
						required
					/>
				</div>
				<h2 class="text-xl font-medium text-tournament-900 pt-8">
					Create your team
				</h2>
				<div class="flex flex-col space-y-2">
					<label for="team" class="text-sm"
						>Winning Score Prediction
					</label>
					<input
						type="text"
						name="winning_score"
						class="appearance-none bg-white py-2 px-3 rounded"
						required
					/>
				</div>
				<div
					v-for="(group, i) in useLeaderboardStore().tierGroups"
					:key="i"
					class="flex flex-col space-y-2"
				>
					<label class="text-sm">Tier {{ i + 1 }} Player</label>
					<div class="select-wrapper">
						<select
							class="appearance-none bg-white py-2 pl-3 pr-10 rounded w-full"
							:name="`tier_${i + 1}_player`"
							required
						>
							<option></option>
							<option
								v-for="(player, j) in useLeaderboardStore()
									.tierGroups[i]"
								:key="j"
								:value="player.name"
							>
								{{ player.name }}
							</option>
						</select>
					</div>
				</div>
			</div>

			<div class="flex mt-12">
				<button
					type="submit"
					class="px-4 py-2 w-full bg-tournament-300 text-white rounded cursor-pointer hover:bg-tournament-300 hover:opacity-80 transition-all ease-in-out duration-300"
				>
					Register Team
				</button>
			</div>
		</form>
		<div v-if="state.formSuccess" class="text-tournament-100">
			{{ state.firstName }} {{ state.lastName }} your team has been
			submitted. Teams won't be viewable till the tournament start date.
			If you have not already please Venmo $20 to complete entry. Good
			luck!
		</div>
		<div v-if="state.formError" class="text-tournament-300">
			Error submitting your team. Please refresh the page and try again
		</div>
	</div>

	<div class="flex align-center space-x-2 w-full justify-center">
		<a
			href="https://venmo.com/u/BlakeBlomberg"
			class="bg-[#0074DE] px-4 py-4 rounded-2xl border-[#0074DE] text-white font-semibold hover:text-white hover:opacity-80 min-w-[250px] text-center"
			>Venmo Me</a
		>
	</div>
</template>

<script setup>
import { useLeaderboardStore } from "@/stores/leaderboard";
import { useCookieStore } from "@/stores/cookies";
import emailjs from "@emailjs/browser";
import { onMounted, ref, reactive } from "vue";

const cookieStore = useCookieStore();
const form = ref(null);
const state = reactive({
	formSuccess: false,
	formError: false,
	formCompleted: false,
	firstName: "",
	lastName: "",
});

const sendEmail = () => {
	if (!form.value) {
		console.error("Form reference is not available");
		return;
	}

	// Create a FormData object from the form element
	const formData = new FormData(form.value);

	// Convert FormData to a JSON object
	const formObject = {};
	formData.forEach((value, key) => {
		formObject[key] = value;
	});

	// Log the JSON object
	console.log("Form Data JSON:", JSON.stringify(formObject, null, 2));

	// Proceed with sending the form via emailjs
	emailjs
		.sendForm("service_afijg3f", "template_vdnkpcn", form.value, {
			publicKey: "qNC0k_g9B47P_1MKd",
		})
		.then(
			() => {
				state.formCompleted = true;
				state.formSuccess = true;
				cookieStore.setCookie("firstName", state.firstName, {
					expires: new Date("10"),
				});
				cookieStore.setCookie("lastName", state.lastName, {
					expires: new Date("10"),
				});
			},
			(error) => {
				state.formCompleted = true;
				state.formError = true;
			}
		);
};

const checkForRegisteredTeam = () => {
	const firstName = cookieStore.getCookie("firstName");
	const lastName = cookieStore.getCookie("lastName");
	if (firstName && lastName) {
		state.firstName = firstName;
		state.lastName = lastName;
		state.formCompleted = true;
		state.formSuccess = true;
	}
};

onMounted(() => {
	checkForRegisteredTeam();
});
</script>

<style lang="scss" scoped>
.select-wrapper {
	position: relative;
}
.select-wrapper:after {
	content: "";
	display: block;
	height: 24px;
	width: 24px;
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	background-image: url(@/assets/chevron-down.svg);
	background-size: 24px 24px;
	background-position: center center;
	background-repeat: no-repeat;
}
</style>
