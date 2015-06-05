$(document).ready(function(){

	console.log('ready');
	
	var path = window.location.pathname;
	console.log(path);
	$('ul.nav.navbar-nav li a[href="'+path+'"]').parents('li').addClass('active');
	
	$('form').validate({
	    rules: {
			name: {
				required: true,
				minlength: 3
			},		  
			username: {
				minlength: 3,
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
			category: {
				minlength: 3,
				required: true
			},
			agree: "required"		  
	    },		
		errorElement: "span",
		errorClass: "help-block",
		errorPlacement: function (error, element) {
			if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		},
		highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
				$(element).closest('.form-group').find('i').removeClass('fa fa-pencil').addClass('fa fa-warning');
		},
		success: function(element) {
				element
				.addClass('valid')
				.closest('.form-group').removeClass('has-error').addClass('has-success');
				$(element).closest('.form-group').find('i').removeClass('fa fa-pencil').removeClass('fa fa-warning').addClass('fa fa-check');
		},
		messages: {
            email: {
                required: "Enter a valid email",
                email: "Enter a valid email"
            },
            password: {
                required: "Enter your password",
                minlength: "Password min length is 6"
            },
			username: {
				required: "Enter a username",
				minlength: "username min length is 3"
			},
			confirm_password: {
				required: "Confirm your password",
				minlength: "Password min length is 6",
				equalTo: "Incorrect confirm password"
			},
			category: {
                required: "Enter the category name",
                minlength: "category min length is 3"
            }
        }
	});
		
	$('.modal').on('shown.bs.modal', function () {
		lastfocus = $(this);		
		$(this).find('input:text:visible:first').focus();
	});
	
	$('#category-form').on('submit', function(e){
		e.preventDefault();
		$.ajax({
			url : '/category/new', 
			type: 'POST',
			data : $('#category-form').serialize(),
			success: function(data) {
				$('#category').modal('hide');				
				$('.categories').html(data);
			}
         });		 
    });	

}); // end document.ready