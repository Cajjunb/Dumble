$(document).ready(function(){    
    var url = base_url_js;
    var controller = 'email';
    var metodo = '/enviando_email';
    var postData = $(this).serializeArray();
    url = base_url_js+'index.php/'+controller+metodo;
    // base_url_js
    $("#contato_popup_form").submit(function(e){
        document.getElementById('contato_popup_Enviar').style.color='#CECECE';
        $('#contato_popup_Enviar').val("Enviando...")  ;
        var postData = $(this).serializeArray();
        $.ajax({
            url:url,
            type: 'POST',
            data:postData,
            dataType: 'text',
            'success': function(data){
                $('#contato_popup_Enviar').val("Enviado")  ;
                $('#contato_popup_Enviar').attr("disabled", "disabled");;
            },
            'error': function(){
                    // pop-up/sweet-alert avisando que deu erro
                    swal("Algo deu errado, tente novamene mais tarde.","","warning");
            }
        });
        e.preventDefault(); //Para ação default
    });
});

 

function changeEnviar(){
    $("#contato_popup_form").submit();
}

function fechar(){
    $('#contato_popup_popup').css('display','none');
}

function abrir(){
    $('#contato_popup_popup').css("display","block");
}  