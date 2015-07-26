function aceitarAmizade () {
	swal({   
		title: "Deseja mandar solicitação?",   
		text: "Confirme para mandar uma solicitação de amizade",   
		type: "success",   
		showCancelButton: false,
		timer: 5000,   
		confirmButtonText: "Sim, enviar solicitação",   
		closeOnConfirm: true }, 
		function(){   
			swal("Deleted!", "Solicitação de amizade foi enviada.", "success"); 
		}
	);
}

function excluirMensagem(el){
	swal({   
		title: "Deseja excluir essa Mensagem?",   
		text: "",   
		type: "warning",   
		showCancelButton: true, 
		confirmButtonText: "Excluir",   
		closeOnConfirm: true }, 
		function(){   
			swal("Excluida!", "Essa mensagem foi excluida!", "success"); 
			$(el).parent("form").submit();
		});
}

function abreMensagem(el){
	$("#mensagem_resposta_popup #mensagem_id_emissor").val($(el).children("input").val());
	$("#mensagem_resposta_popup").css("display","initial");
	console.log($(el).prev().prev("span"));
	$("#mensagem_resposta_popup #mensagem_resposta_destinatario").text($(el).prev().prev().text());
}

function fecharMensagem(el){
	$("#mensagem_resposta_popup").css("display","none");
}



function carregar_propaganda(){
	var url = base_url_js;
	$.ajax({
		url : url+'index.php/modelo/carregar_modelos_publicitarios',
        type:'POST',
	    success: function(data){
	        var result = JSON.parse(data);
	        console.log(result);
	        var id = 0;
	        var tamanho =  result.length;
	        console.log(tamanho);
	        while(id < tamanho){
		        $("#social_ads").append("<div onclick='cadastra_desejo(this)'class='social_modelo_publicidade' id='social_publicidade_"+id+"''></div>");
		    	$("#social_publicidade_"+id).append("<img src='"+result[id]['foto']+"'>");
		    	$("#social_publicidade_"+id).append("<span class='social_publicidade_span'>"+result[id]['nome_modelo']+"'</span>");
		    	$("#social_publicidade_"+id).append("<input class='data-id-modelo' type='hidden' value='"+result[id]['modelo_id']+"'/>");
		    	$("#social_publicidade_"+id).append("<input class='data-id-fornecedor' type='hidden' value='"+result[id]['fk_fornecedor']+"'/>");
		    	$("#social_publicidade_"+id).append("<input class='data-id-produto' type='hidden' value='"+result[id]['produto_id']+"'/>");
		    	$("#social_publicidade_"+id).append("<input class='data-id-categoria' type='hidden' value='"+result[id]['categoria_id']+"'/>");
	    		id++;
	    	}
	    },
	    error: function(){
	    	("#social_ads").append("<div><h1>Não Foi possivel carregar! Tente novamente mais tarde!</h1></div>");
	    }		
	 });
	return true;
}

$(document).ready(function(){
    carregar_propaganda() ;
});

function cadastra_desejo(component){
    var url = base_url_js;
    url = url+'index.php/desejo/cadastra_desejo_ajax';
    var temp = $(component);
    var div_desejo = $(component);
    var id_fornecedor = $(temp).find('.data-id-fornecedor').val();
    var id_categoria = $(temp).find('.data-id-categoria').val();
    var id_produto = $(temp).find('.data-id-produto').val();
    var id_modelo = $(temp).find('.data-id-modelo').val();
    swal({
            title: "Cadastrar Desejo",
            text: "Você tem certeza que deseja adicionar aos seus desejos?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim",
            closeOnConfirm: false
        },
        function(){
            $.ajax({
                url:url,
                type:'POST',
                data:{'id_fornecedor':id_fornecedor, 'id_categoria':id_categoria, 'id_produto':id_produto,
                    'id_modelo':id_modelo},
                'success':function(){
                    swal("Adicionado!", "O produto foi adicionado ao seus desejos!", "success");
                    div_desejo.remove();
                },
                'error':function(data){
                    swal("Ops...", "Operação não pôde ser completada. Tente novamente mais tarde", "error");
                }
            });
        });
}

$(document).ready(function() {
  	$("#solicitarAmizade").submit(function(e) {
		swal({
            title: "Solicitação de amizade",
            text: "Deseja enviar um pedido de amizade?",
            type: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sim",
        	closeOnConfirm: true,
        	closeOnCancel: true,
        },
 		function(){
 			var control = 'usuario/';
	   		var met = 'requisitar_amizade/';
	    	var url = base_url_js;
	    	url = url+"index.php/"+control+met;
            $.ajax({
				// console.log(postData);
                url:url,
                type:'POST',
                'success':function(){
                    swal("Enviado!", "solicitação de amizade enviada!", "success");
                    location.reload();
                    
                },
                'error':function(data){
                    swal("Ops...", "Operação não pôde ser completada. Tente novamente mais tarde", "error");
                }
            });
        });
        e.preventDefault(); //STOP default action
	});

	$("#aceitarConvite").submit(function(e) {
		swal({
            title: "Solicitação de amizade",
            text: "Deseja aceitar o convite?",
            type: "info",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim",
        	closeOnConfirm: true,
        	closeOnCancel: true,
        },
 		function(){
 			var control = 'usuario/'; 		//usuario/aceitar_amizade/'.$id_visitado.'/profile'
	   		var met = 'aceitar_amizade/';
	    	var url = base_url_js;
	    	var id = document.getElementById("id_visitado").value; 
	    	var pag = '/profile';
	    	url = url+"index.php/"+control+met+id+pag;
            $.ajax({
				// console.log(postData);
                url:url,
                type:'POST',
                'success':function(){
                    swal("Aceito!", "Vocês agora são amigos", "success");
                    location.reload();
                    
                },
                'error':function(data){
                    swal("Ops...", "Operação não pôde ser completada. Tente novamente mais tarde", "error");
                }
            });
        });
        e.preventDefault(); //STOP default action
	});
	$("#desfazerConvite").submit(function(e) {
		swal({
            title: "Cancelar solicitação",
            text: "Deseja desfazer a solicitação?",
            type: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sim",
        	closeOnConfirm: true,
        	closeOnCancel: true,
        },
 		function(){
 			var control = 'usuario/'; //usuario/negar_amizade/'.$id_visitado.'/profile' ?>
	   		var met = 'negar_amizade/';
	    	var url = base_url_js;
	    	var id = document.getElementById('id_visitado').value;
	    	var pag = '/profile';
	    	url = url+"index.php/"+control+met+id+pag;
            $.ajax({
				// console.log(postData);
                url:url,
                type:'POST',
                'success':function(){
                    swal("", "Convite de amizade cancelado", "success");
                    location.reload();
                    
                },
                'error':function(data){
                    swal("Ops...", "Operação não pôde ser completada. Tente novamente mais tarde", "error");
                }
            });
        });
        e.preventDefault(); //STOP default action
	});
	$("#desfazerAmizade").submit(function(e) {
		swal({
            title: "Desfazer amizade",
            text: "Deseja desfazer amizade?",
            type: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sim",
        	closeOnConfirm: true,
        	closeOnCancel: true,
        },
 		function(){
 			var control = 'usuario/';
	   		var met = 'negar_amizade/';
	    	var url = base_url_js;
	    	var id = document.getElementById('id_visitado').value;
	    	var pag = '/profile';
	    	url = url+"index.php/"+control+met+id+pag;
            $.ajax({
				// console.log(postData);
                url:url,
                type:'POST',
                'success':function(){
                    swal("Amizade desfeita", "Vocês agora não são amigos", "success");
                    location.reload();
                    
                },
                'error':function(data){
                    swal("Ops...", "Operação não pôde ser completada. Tente novamente mais tarde", "error");
                }
            });
        });
        e.preventDefault(); //STOP default action
	});
});
