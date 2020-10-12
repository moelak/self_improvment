$(document).ready(() => {
	// Getting references to our form and input
	const signUpForm = $("form.signup");
	const emailInput = $("#email");
	const ageInput = $("#age-input");
	const userName = $("#userName");
	const passwordInput = $("#password-input");
	const secondPasssword = $("#secondPassword");
	const policy = $("#policyInput");

	// When the signup button is clicked, we validate the email and password are not blank
	signUpForm.on("submit", (event) => {
		event.preventDefault();
		const userData = {
			email: emailInput.val().trim(),
			ageInput: ageInput.val().trim(),
			userName: userName.val().trim(),
			password: passwordInput.val().trim(),
			secondPasssword: secondPasssword.val().trim(),
			policy: policy.val(),
		};

		console.log(
			userData.email,
			"",
			userData.ageInput,
			"",
			userData.userName,
			"",
			userData.passwordInput,
			"",
			userData.secondPasssword,
			"",
			userData.policy,
			""
		);
		if (!userData.email || !userData.password) {
			return;
		}
		// If we have an email and password, run the signUpUser function
		signUpUser(userData.email, userData.password);
		emailInput.val("");
		passwordInput.val("");
	});
	// dont post second password, needs all input feilds compleated

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser(email, password) {
		$.post("/api/signup", {
			email: email,
			password: password,
		})
			.then(() => {
				window.location.replace("/members");
				// If there's an error, handle it by throwing up a bootstrap alert
			})
			.catch(handleLoginErr);
	}

	function handleLoginErr(err) {
		$("#alert .msg").text(err.responseJSON);
		$("#alert").fadeIn(500);
	}
});
