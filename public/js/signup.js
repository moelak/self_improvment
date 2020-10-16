$(document).ready(() => {
	// Getting references to our form and input
	const signUpForm = $("form.signup");
	const emailInput = $("#email");
	const ageInput = $("#age-input");
	const userName = $("#userName");
	const passwordInput = $("#passwordInput");
	const secondPasssword = $("#secondPassword");
	const policy = $("#policyInput");

	// When the signup button is clicked, we validate the email and password are not blank
	signUpForm.on("submit", (event) => {
		$("div").remove(".msg");
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

		signUpUser(
			userData.email,
			userData.password,
			userData.secondPasssword,
			userData.userName,
			userData.ageInput,
			userData.policy
		);
		// emailInput.val("");
		passwordInput.val("");
		secondPasssword.val("");
		// userName.val("");
		// ageInput.val("");
		// policy.val("");
	});
	// dont post second password, needs all input feilds compleated

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser(
		email,
		password,
		secondPasssword,
		userName,
		ageInput,
		policyVal
	) {
		if (password !== secondPasssword) {
			$('<div class="msg test">')
				.appendTo("#alert")
				.html("<p>Those passwords didn't match. Try again.</p>");
			$("#alert").fadeIn(500);
			console.log("bowwwwww");
		} else {
			$.post("/api/signup", {
				email: email,
				password: password,
				age: parseInt(ageInput),
				anonymousName: userName,
				policy: policyVal,
			})
				.then(() => {
					$("div").remove("#alert");
					window.location.replace("/verify");
					// If there's an error, handle it by throwing up a bootstrap alert
				})
				.catch(handleLoginErr);
		}
	}

	function handleLoginErr(err) {
		console.log(err);
		const errString = err.responseText;
		const errArray = errString.split(",");

		jQuery.each(errArray, function(i, val) {
			$('<div class="msg">')
				.appendTo("#alert")
				.append(val);
		});
		$("#alert").fadeIn(500);
	}
});
