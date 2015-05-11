$(document).ready(function(){


		$('#login-form').validate({
	    rules: {
			name: {
				required: true,
				minlength: 3
			},
		  
			username: {
				minlength: 6,
				required: true
			},
		  
			password: {
				required: true,
				minlength: 6
			},
			
			confirm_password: {
				required: true,
				minlength: 6,
				equalTo: "#password"
			},
		  
			email: {
				required: true,
				email: true
			},
		  
	     
			address: {
				minlength: 10,
				required: true
			},
		  
			agree: "required"
		  
	    },
		highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function(element) {
				element
				.addClass('valid')
				.closest('.form-group').removeClass('has-error').addClass('has-success');
		},
		messages: {
            email: {
                required: "Spécifiez une adresse mail",
                email: "Adresse mail incorrecte"
            },
            password: {
                required: "Spécifiez un mot de passe",
                minlength: "Le mot de passe doit contenir au moins 6 caractères"
            }
        }
	  });

}); // end document.ready