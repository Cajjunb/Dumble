

(function($){
    $(window).load(function(){
        $(".box-3_table").mCustomScrollbar({
    		theme: "dark"
		});
    });
})(jQuery);

$(document).ready(function(){$('.box-3_input_data').mask('00-00-0000');});
	$(document).ready(function(){
	 	$('.box-3_input_data').focusout(
	 		function(){
	 			$(this).val( valida_data( $(this) ) );
	 		}
		);
});


function excluir_desejo( id_desejo){
	swal({   
		title: "Deseja excluir esse modelo?",
	   	type: "warning",
	   	showCancelButton: true,   
	   	confirmButtonText: "Excluir Desejo",   
	   	closeOnConfirm: false
	   }, 
	   	function(){
		   	var control = 'desejo/';
	        var met = 'destruir_desejo/';
	        var url = base_url_js;
	        url = url+'index.php/'+control+met+id_desejo;
	        $.ajax({
	        	url:url,
            	type:'POST',
            	success:function(data){
                	var result = JSON.parse(data);
            		if(result.status=='TRUE'){
	                    swal({
	                        title: "Excluído!",
	                        text: "O Desejo foi excluído.",
	                        type: "success",
	                        showCancelButton: false,
	                        confirmButtonColor: "#AEDEF4",
	                        confirmButtonText: "OK",
	                        closeOnConfirm: true
	                    },
	                    function(){
	                        location.reload();
	                    });
	                } else {
	                    swal("Ops...", "Esse Desejo não pode ser excluído.", "error");
	                }
	            },'error':function(){
	                swal("Ops...", "Sua operação não pode ser realizada. Tente novamente mais tarde.", "error");
	            }

	        });
	   		swal("Desejo Excluido!","", "success"); 
	   		$('#box-3_thumbnail_'+id_desejo).remove();
		}
	);
}


	function box3_filter(){
	    $( "#box-3_searchbar" ).keyup(function(){
	        var data = this.value;
	        var rows = $(".box-3_img_box ");
	        if (this.value == "") {
	            rows.show();
	            rows.css("position:absolute");
	            return;
	        }
	        rows.hide();
	        console.log(rows.html());
	        rows.filter(function (i, v) {
	            var $t = $(this);
	            var stringsFromRowNodes = $t.children("span")
	                .text().toLowerCase();
	            var searchText = data.toLowerCase();
	            //console.log(stringsFromRowNodes);
	            if(stringsFromRowNodes.indexOf(searchText) == -1){
	                $t.css("position:absolute");
	                return false;
	            }
	            $t.css("position:initial");
	            return true;
	        })
	            .show();
	            
	    });
	}


	// Função de criar o popup para configurar
	function box3_popup(id_desejo){
		$('#box-3_popup'+id_desejo).toggle();
	}

	function box3_popdown(id_desejo){
		this.parent().parent().parent().find(".box-3_config_popup_background").toggle();
		alert($(this).parent().parent().parent().find(".box-3_config_popup_background"));
	}


	function box3_popdown_remove(){
		$('.box-3_config_popup_background').remove();
	}

	function box3_atende_desejo(id_desejo){

		box3_configurando_form_ajax(id_desejo);
		$("#box-3_notifica_form"+id_desejo).submit();
		
	}

	function box3_configurando_form_ajax(id_desejo){
		$("#box-3_notifica_form"+id_desejo).submit(function(e){
			var control = 'desejo/';
	        var met = 'notificando_desejo/';
	        var url = base_url_js;
	        url = url+'index.php/'+control+met;
			var postData = $(this).serializeArray();
	        swal({   
					title: "Tem certeza que dará esse modelo de presente?",
					text: "O seu amigo terá registro de sua intenção no dia informado ! Ps: Promessa é divida =)",
				   	type: "warning",
				   	showCancelButton: true,   
				   	confirmButtonColor: "#DD6B55",   
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
				            	swal("Entrega de Desejo Cadastrado!","","success");
    							$('#box-3_popup'+id_desejo).toggle();
    							location.reload();
				            },
				            'error': function(){
				            	swal("Não foi possível fazer a operação! Tente novamente mais tarde!","error");
				            }
						});

					}
			);
    		e.preventDefault(); //Para ação default
    		$("#box-3_notifica_form"+id_desejo).off();
		});
	}


	function box3_carrega_desejos(){
		var control = 'usuario/';
        var met = 'carregando_desejos_usuario_ajax/';
        var id_desejo = 5 ;
        var url = base_url_js;
        url = url+'index.php/'+control+met+id_desejo;
		var postData = $(this).serializeArray();
		$.ajax({
			url: url,
			'success':function(dados_json){
				console.log(dados_json);
			},
		});


	}


	function box3_reeinderiza_desejo(dados_desejo){
		var base_url = base_url_js;
		var url = base_url +'/index.php/desejo/notificando_desejo/'+dados_desejo; 
	}



(function($){
    $(window).load(function(){
        $(".box3_janela_desejos").mCustomScrollbar();
    });
})(jQuery);

	/*
		domElem2.prepend($(document.createElement('form')));
		domElem2.find('form').prepend($(document.createElement('label')
	*/