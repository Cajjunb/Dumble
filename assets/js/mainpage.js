
$(document).ready(function() {
	$("#botao1").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#botao1").offset().top
	    }, 2000);
	});
	$("#botao2").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#botao2").offset().top
	    }, 2000);
	});
	$("#botao3").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#botao3").offset().top
	    }, 2000);
	});
	$("#mainpage_Cadastra-se").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#botao3").offset().top
	    }, 2000);
	});
	$("#mainpage_botao_voltar").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#mainpage_Cadastra-se").offset().top
	    }, 2000);
	});
	
	$("#mainpage_captcha").realperson({regenerate: 'Tente Outro'});

});


$(document).ready(function(){
				$(".button2,#arrow_button2").click(function(){
					var login_form = $(".mainpage_login_form");
					var seta_form = $("#arrow_button2");
					// Verifica se o box do login está escondido.
					if(login_form.css('opacity')=='0'){			
						login_form.animate({
							opacity: '1',
							complete: function(){
								login_form.css('display', 'block');
							}
						});
					}else{
						login_form.animate({
							opacity: '0',
							complete: function(){
								login_form.css('display', 'none');
							}
						});
					}
		});
});

$(document).ready(function(){
	$("#mainpage_captcha").keyup(function(){
		$("#mainpage_captcha_hash").val($("#mainpage_captcha").realperson('getHash'));
	});
});


$(document).ready(function() {
  $("#cadastro").submit(function(e) {
		var control = 'usuario/';
	    var met = 'cadastrando_usuario/';
	    var url = base_url_js;
	    url = url+"index.php/"+control+met;;
		var postData = $(this).serializeArray();
		console.log(postData);
		$.ajax({		
			url : url,
	        type : 'POST',
	        data: postData,
  			dataType: 'text',
	        success : function(data, textStatus, jqXHR){
	        	var result = data;
	        	console.log(data);
	        	if(data == false)
	            	swal({
	       				title: "Usuario Cadastrado com Sucesso!",   
	       				text: "Logue e veja os presentes que você pode ganhar",
	       				type: "success"
	       			},function(){
	       				location.reload();
	       			});
	       		else{
	       			if( data == 'ERROR.DADOS')
	       				swal("Usuario Não pode ser Cadastradado","Os Dados não são Válidos!","error");
	       			if( data == 'ERROR.SENHA')
	       				swal("Usuario Não pode ser Cadastradado","A senha não pode ser menor que 6 caracteres!","error");
	       			if( data == 'ERROR.EMAIL')
						swal("Usuario Não pode ser Cadastradado","Esse Usuário já existe!","error");	       	
					if(data =='ERROR.CAPTCHA')
	       				swal("CAPTCHA ERRADO","Digite novamente !","error");	       	
					
	       		}
	       	},
	       	error : function(data, jqXHR, textStatus, errorThrown){
	       		swal("Não foi possivel cadastrar nesse momento, Tente mais tarde",textStatus,"error");
	       	}
		});
		e.preventDefault(); //STOP default action
	});

});



// $(document).ready(function() {
//   $("#login").submit(function(e) {
// 		var control = 'login/';
// 	    var met = 'logando_sistema/';
// 	    var url = base_url_js;
// 	    url = url+"index.php/"+control+met;
// 		var postData = $(this).serializeArray();
// 		$.ajax({		
// 			url : url,
// 	        type : 'POST',
// 	        data: postData,
//   			dataType: 'text',
// 	         success : function(data, textStatus, jqXHR){
// 	             swal("Usuario logado com Sucesso!","","success");
// 	       	 },
// 	       	error : function(data, jqXHR, textStatus, errorThrown){
// 	       		swal("Ops, login incorreto. Tente novamente",textStatus,"error");
// 	       	}
// 		});
// 		e.preventDefault(); //STOP default action
// 	});
// });