var toolbarOptions = [
	["bold", "italic", "underline", "strike"],
	["blockquote"],
	[{ list: "ordered" }, { list: "bullet" }],
	[{ indent: "-1" }, { indent: "+1" }],
	[{ color: [] }, { background: [] }],
];

var quill = new Quill("#editor", {
	modules: {
		toolbar: toolbarOptions,
	},

	theme: "snow",
});
//------------------------------------------------------------------------------------
// When the signup button is clicked, we validate the email and password are not blank

$.get("/api/user_data").then((data) => {
	$(".member-name").text(data.anonymousName);
	$(".member-age").text(data.age);

	var userUuid = data.UserUuid;
	displayStory(userUuid);

	$("#savetext").click((event) => {
		var content = document.querySelector(".ql-editor").innerHTML;

		event.preventDefault();
		const storyData = {
			story: content,
		};

		submitStory(storyData.story, userUuid, data.anonymousName);
	});
});

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
function submitStory(story, userUuid, anonymousName) {
	console.log(
		"ready to post------------------>",
		userUuid,
		story,
		anonymousName
	);
	// debugger;

	$.post(`/api/writeStory`, {
		story: story,
		userUuid: userUuid,
		anonymousName: anonymousName,
	})
		.then((display) => {
			// debugger;
			window.location.replace("/writeStory");

			// location.reload();
			//  document.querySelector('.ql-editor').innerHTML = ""
		})
		.catch(handleLoginErr);
}

function displayStory(userUuid) {
	$.get(`/api/writeStory/${userUuid}`).then((data) => {
		$.each(data, function(key, value) {
			var editBtn = $(
				`<button class="btn-default btn-lg myBtn edit" data-edit='${value.id}'>Edit</button>`
			);
			var delBtn = $(
				`<button class="btn-default btn-lg myBtn delete" data-delete='${value.id}'>Delete</button>`
			);
			var pubBtn = $(
				`<button class="btn-default btn-lg myBtn publish" data-publish='${value.id}'>Publish</button>`
			);

			// turn into jumbotron
			// $( '<div class="storyList" style="border: 3px solid; padding: 20px; width: 50%; margin-top: 20px;">' )
			//   .appendTo( "#displayStory" ).append(value.story).append(editBtn).append(delBtn).append(pubBtn);

			var container = $('<div class="container">');
			var jumbo = $('<div class="jumbotron">');
			var title = $('<h1 id="story2" class="display-4">').text("My Title");
			var text = $('<p class="lead">').text(value.story);
			var br = $("<br>");
			var hr = $('<hr class="my-4" />');
			var col = $('<div class="col text-center">');

			col.append(editBtn, delBtn, pubBtn);
			jumbo.append(title, hr, br, value.story, col);
			container.append(jumbo);
            $("#displayStory").append(container);
            $('#addStory').prepend(container);
		});
	});
}

$(document).on("click", ".delete", function(e) {
	e.preventDefault();

	var id = $(this).data("delete");

	// Send the DELETE request.
	$.ajax("/api/writeStory/delete/" + id, {
		type: "DELETE",
	}).then(function() {
		// Reload the page to get the updated list
		location.reload();
	});
});

$(document).on("click", ".edit", function(e) {
	e.preventDefault();
	var id = $(this).data("edit");
	console.log(id);
	var htmldata;
	$.get(`/api/writeStory/show/` + id).then((data) => {
		htmldata = data[0].story;

		// console.log(typeof htmldata);

		document.querySelector(".ql-editor").innerHTML = htmldata;

		editing(id);
	});
});

function editing(id) {
	$(document).on("click", "#updateText", function(e) {
		e.preventDefault();

		var content2 = document.querySelector(".ql-editor").innerHTML;

		$.post(`/api/writeStory/show/${id}`, {
			story: content2,
		}).then((display) => {
			// debugger;
			window.location.replace("/writeStory");
		});
	});
}

function handleLoginErr(err) {
	console.log("Error......");
}
