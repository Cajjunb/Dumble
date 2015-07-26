//CONFIGURACAO DO SUBMIT VIA AJAX
$(document).ready(function() {
	$("#mensagem_emmassa_form").submit(function(e){
			var control = 'mensagem/';
	        var met = 'postar_mensagem_emmassa/';
	        var url = base_url_js;
	        url = url+'index.php/'+control+met;
			var postData = $(this).serializeArray();
	        swal({   
					title: "Tem certeza que publicará essa mensagem para todos os seus amigos?",
					text: "Todos os seus amigos!",
				   	type: "warning",
				   	showCancelButton: true,   
				   	confirmButtonColor: "#f5852e",   
				   	confirmButtonText: "Sim, Tenho Certeza!",   
				   	closeOnConfirm: false
				   }, 
				   function(){
						$.ajax({
							url:url,
				            type:'POST',
				            data:postData,
				            dataType:"text",
				            'success':function(data){
				            	swal("Mensagem Publicada!","","success");
	                        	location.reload();
				            },
				            'error': function(){
				            	swal("Não foi possível fazer a operação! Tente novamente mais tarde!","error");
				            }
						});

					}
			);
    		e.preventDefault(); //Para ação default
		});
});

function abreMensagememMassa(el){
	$("#mensagem_emmassa_popup").css("display","initial");
	}

function fecharMensagememMassa(el){
	$("#mensagem_emmassa_popup").css("display","none");
}

function publicaMensagememMassa(){
	$("#mensagem_emmassa_form").submit();
}