$(document).ready(() => {
	// Getting references to our form and input
	const signUpForm = $("form.signup");
	const emailInput = $("#email");
	const ageInput = $("#age-input");
	const userName = $("#userName");
	const passwordInput = $("#passwordInput");
	const secondPasssword = $("#secondPassword");
	const policy = $("#policyInput");
<<<<<<< HEAD
	console.log(signUpForm);
	// When the signup button is clicked, we validate the email and password are not blank
	$(document).on("submit","form.signup", (event) => {
		event.preventDefault();
		console.log("testing");
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
			userData.password,
			"",
			userData.secondPasssword,
			"",
			userData.policy,
			""
		);
		if (
			!userData.email ||
			!userData.ageInput ||
			!userData.userName ||
			!userData.passwordInput ||
			!userData.secondPasssword ||
			!userData.policy
		) {
			return;
		}
		// If we have an email and password, run the signUpUser function
		signUpUser(
			userData.email,
			userData.password,
			userData.ageInput,
			userData.userName,
			userData.passwordInput,
			userData.secondPasssword,
			userData.policy
		);
		emailInput.val("");
    passwordInput.val("");
    secondPasssword.val("");
    userName.val("");
    ageInput.val("");
    policy.val("");
	});
	// dont post second password, needs all input feilds compleated

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser(email, password) {
		$.post("/api/signup", {
			email: email,
      password: password,
      secondPasssword: secondPasssword,
      ageInput: ageInput,
      userName: userName,
		})
			.then(() => {
				window.location.replace("/members");
=======

	// When the signup button is clicked, we validate the email and password are not blank
	signUpForm.on("submit", (event) => {
		event.preventDefault();
		console.log("testing");
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
			userData.password,
			"",
			userData.secondPasssword,
			"",
			userData.policy,
			""
		);
		// if (
		// 	!userData.email ||
		// 	!userData.ageInput ||
		// 	!userData.userName ||
		// 	!userData.passwordInput ||
		// 	!userData.secondPasssword ||
		// 	!userData.policy
		// ) {
		// 	return;
		// }
		// If we have an email and password, run the signUpUser function
		signUpUser(
			userData.email,
			userData.password,
		  userData.userName,
		);
		emailInput.val("");
    passwordInput.val("");
    secondPasssword.val("");
    userName.val("");
    ageInput.val("");
    policy.val("");
	});
	// dont post second password, needs all input feilds compleated

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser(email, password,userName) {
    console.log("...........");
		$.post("/api/signup", {
			email: email,
      password: password,
      age: 30,
      anonymousName: userName,
      policy: true
		})
			.then(() => {
        console.log("...........");
				// window.location.replace("/members");
>>>>>>> 429c74aa9019eae3d68803a1fa3dc7f688c506a1
				// If there's an error, handle it by throwing up a bootstrap alert
			})
			.catch(handleLoginErr);
	}

	function handleLoginErr(err) {
		$("#alert .msg").text(err.responseJSON);
		$("#alert").fadeIn(500);
	}
<<<<<<< HEAD
});
=======
});
>>>>>>> 429c74aa9019eae3d68803a1fa3dc7f688c506a1
