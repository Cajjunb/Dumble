$(document).ready(function(){
	$("#menu_foto").css('visibility', 'hidden');
    $('.modelo_div_imagem').mouseenter(mouseenter_model);
    $('.modelo_div_imagem').mouseleave(mouseleave_model);
});

function mouseenter_model(){
    $(this).find(':nth-child(1)').css('visibility', 'visible');
}

function mouseleave_model(){
    $(this).find(':nth-child(1)').css('visibility', 'hidden');
}

function delete_model(id){
    swal({
        title: "Excluir registro",
        text: "Você tem certeza que deseja excluir o registro deste modelo?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
        closeOnConfirm: false
    },
    function(){
        var control = 'modelo/';
        var met = 'deletar_modelo/';
        var url = base_url_js;
        url = url+'/index.php/'+control+met+id;
        $.ajax({
            url:url,
            type:'GET',
            success:function(data){
                var result = JSON.parse(data);
                if(result.status=='TRUE'){
                    swal({
                        title: "Excluído!",
                        text: "O modelo foi excluído.",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnConfirm: false
                    },
                    function(){
                        location.reload();
                    });
                } else {
                    swal("Ops...", "Esse modelo não pode ser excluído.", "error");
                }},
                'error':function(){
                    swal("Ops...", "Sua operação não pode ser realizada. Tente novamente mais tarde.", "error");
                }
            });
    });
}

function enterprofile_modelo(componente){
    // Apenas pegando informações
    $modelo_div = $(componente).parent().parent().parent();
    var nome_produto = $modelo_div.children(':nth-child(3)').children(':nth-child(1)').attr('data-nome');
    var cor_produto = $modelo_div.children(':nth-child(3)').children(':nth-child(1)').attr('data-cor');
    var URL_loja = $modelo_div.children(':nth-child(3)').children(':nth-child(1)').attr('data-venda');
    var foto_produto = $modelo_div.children(':nth-child(3)').children(':nth-child(3)').attr('data-foto');
    var descricao = $modelo_div.children(':nth-child(3)').children(':nth-child(3)').attr('data-desc');
    var id_modelo = $modelo_div.children(':nth-child(3)').children(':nth-child(5)').attr('data-id-modelo');
    // Setando informações
    $("input[name*='nome_edit']").attr('value', nome_produto);
    $("select option[value="+cor_produto+"]").attr('selected','select');
    $("input[name*='URL_loja_edit']").attr('value', URL_loja);
    $("input[name*='foto_edit']").attr('value', foto_produto);
    $("textarea[name*='descricao_edit']").val(descricao);
    $("input[name*='id_model']").val(id_modelo);
    if($(".novo_modelo_div2").is(":hidden")){
        $(".novo_modelo_div").slideUp("slow", function(){
            $(".novo_modelo_div2").slideDown();
        });
        $("#modelonew_link_drop").text("Editar Modelo");
    }else{
        $(".novo_modelo_div2").slideUp("slow", function(){
            $("#modelonew_link_drop").text("Novo Modelo");
        });     
    }
}

function check_file_csv(){
    var name_file = $("#file_user_send").val();
    name_file = name_file.split(".");
    var extension = name_file.pop();
    switch(extension){
        case 'csv':
        case 'txt':
            document.getElementById("modelos_import").submit();
            break;
        default:
            swal("Extensão Incorreta!", "O arquivo só pode conter a extesão: .csv ou .txt!", "error");
    }
}