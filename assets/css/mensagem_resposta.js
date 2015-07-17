
function excluirMensagem(el){
	swal({   
		title: "Deseja excluir essa Mensagem?",   
		text: "",   
		type: "warning",   
		showCancelButton: true, 
		confirmButtonColor: "#f5852e",   
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