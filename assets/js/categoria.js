    if(!('contains' in String.prototype)) {

        String.prototype.contains = function(str, startIndex) {

            return -1 !== String.prototype.indexOf.call(this, str, startIndex);

        };

    }



    $( '#administrador_input_pesquisar_categoria' ).keyup(function(){

        var data = this.value;

        var rows = $('.administrador_table_categoriabox').find('tr');

        if (this.value == '') {

            rows.show();

            return;

        }

        rows.hide();

        rows.filter(function (i, v) {

            var $t = $(this);

            var stringsFromRowNodes = $t.children('.administrador_lista_categorias')

                .text().toLowerCase();

            var searchText = data.toLowerCase();

            if(stringsFromRowNodes.indexOf(searchText) > -1){

                return true;

            }

            return false;

        })

            .show();

    });



    $( '#administrador_input_pesquisar_produto' ).keyup(function(){

        var data = this.value;

        var rows = $('.administrador_table_produtobox').find('tr');

        if (this.value == '') {

            rows.show();

            return;

        }

        rows.hide();

        rows.filter(function (i, v) {

            var $t = $(this);

            var stringsFromRowNodes = $t.children('.administrador_lista_produtos')

                .text().toLowerCase();

            var searchText = data.toLowerCase();

            if(stringsFromRowNodes.contains(searchText)){

                return true;

            }

            return false;

        })

            .show();

    });



    $( '#administrador_input_pesquisar_modelo' ).keyup(function(){

        var data = this.value;

        var rows = $('.administrador_table_modelobox').find('tr');

        if (this.value == '') {

            rows.show();

            return;

        }

        rows.hide();

        rows.filter(function (i, v) {

            var $t = $(this);

            var stringsFromRowNodes = $t.children('.administrador_lista_modelos')

                .text().toLowerCase();

            var searchText = data.toLowerCase();

            if(stringsFromRowNodes.contains(searchText)){

                return true;

            }

            return false;

        })

            .show();

    });


    var id_cat = "";

  $( document ).ready(function() {

        $('.productsClass').click(function(){

            $('#modelos').css('display','none');

            $('#produtos').css('display','inline');

            id_cat = $($(this).get(0).lastElementChild).attr('id');

            $.ajax({

                'url' : '<?php echo base_url();?>index.php/produto/listar_produto/'+id_cat,

                'type' : 'GET',

                'success' : function(dados){
                    
                    var result = JSON.parse( dados );
                    console.log(result);
                    $('#table_produtos').html('');

                    if(result.produto.length != 0) {
                           
                        for (var i = 0; i < result.produto.length; i++) {

                            var stringNewProduto =

                                "<tr class='administrador_row_upposboxlist modelsClass' onclick='ajax_call_models("+result.produto[i].id+")'>" +

                                "<td class='tds'>" +

                                "<img onclick='administrador_produto_excluir("+result.produto[i].id+")' src='<?php echo base_url();?>assets/img/excluir_icon.png' class='administrador_icon_edit_contato delete_icon'>" +

                                "</td>" +

                                "<td class='tds'>" +

                                "<img src='<?php echo base_url();?>assets/img/contato_icon.png' class='administrador_icon_edit_contato'>"+

                                "</td>" +

                                "<td value='"+result.produto[i].nome_produto+"' onclick='show_hide_cadastrar_produto_box(1,1,"+result.produto[i].id+","+id_cat+")' id='"+ result.produto[i].id +"' class='administrador_lista_produtos produto_"+result.produto[i].id+"'>" +

                                "</td>" +

                                "</tr>";

                            



                            var stringProdutosTable = $('#table_produtos').html();



                            $('#table_produtos').html(stringProdutosTable + stringNewProduto);

                            $('.produto_' + result.produto[i].id).html(result.produto[i].nome_produto);

                        }
                    }

                    
                    else{
                        var semProdutos =
                            "<tr class='administrador_row_upposboxlist '>" +
                            "<td style='padding-left:10px; padding-top:2px' class='administrador_lista_produtos produtos_none'> " +
                                "<span>Sem produtos cadastrados</span>" +
                            "</td>" +
                            "</tr>";
                            $('#table_produtos').html(stringProdutosTable + semProdutos);
                        }

                    $('#id_produto_cadastro').val(id_cat);

                    $('#produtos').css('display','inline');
                }

            });

        });

    });

    function ajax_call_models(id) {
            jQuery.ajax({
                'url': "<?php echo base_url();?>index.php/modelo/visualizar_modelos/" +id,
                'type': 'GET',
                'success': function(data){
                    var resultado = jQuery.parseJSON(data);
                    $('#table_modelos').html('');
                    if(resultado.modelo.length != 0) {
                        for (var i = 0; i < resultado.modelo.length; i++) {
                            var stringNewModelo =
                                "<tr class='administrador_row_upposboxlist '>" +
                                "<td id='" + resultado.modelo[i].id + "' class='administrador_lista_modelos modelo_" + i + "'> " +
                                "</td>" +
                                "</tr>";
                            $("#modelos").css('display', 'inline');

                            var stringModelosTable = $('#table_modelos').html();

                            $('#table_modelos').html(stringModelosTable + stringNewModelo);

                            $('.modelo_' + i).html(resultado.modelo[i].nome_modelo);
                        }
                    }
                    else{
                        var semModelos =
                            "<tr class='administrador_row_upposboxlist '>" +
                            "<td class='administrador_lista_modelos modelo_none'> " +
                                "<span>Sem modelos cadastrados</span>" +
                            "</td>" +
                            "</tr>";
                            $('#table_modelos').html(stringModelosTable + semModelos);
                    }
                 $("#modelos").css('display', 'inline');
                 }
            });
        }


    function show_hide_cadastrar_categoria_box(num,modo,catId,url){



        // Se num = 0, então ele esconde a caixa, caso contrário, faz aparecer

        // Se modo = 0, ele altera o form da caixa para atender a função de cadastro, caso contrário, a de edição

        // catId representa a id da categoria, necessária para a função de cadastro. Caso seja chamado o modo 0, catId recebe

        // o valor de -1



        

        if (num == 1) 

        {

            $('#form_registry_edit_categoria').css('display', 'inline-block');

        }

        else

        {

            $('#form_registry_edit_categoria').css('display', 'none');

        }


        if(modo == 1)

        {   $('#novoEditarCategoria').html('Editar Categoria');

            var nome_cat = $("#" + catId).attr("value");

           $('#form_categoria_container').html("<form action='"+base_url_js+url+"' method='post'>"

           + "<span style='color:#f5852e; padding-top:8px; margin: 8px;'>Nome da categoria:</span>"

           + "<br>"

           + "<input style='margin-left: 8px; width: 240px; position: relative; top: 2px;' id='cadastrar_categoria' value='"+nome_cat+"' type='text' name='categoria'><br>"

           + "<input style='position: 5px; border:none; background: #f5852e; color:white; margin-left: 4%; margin-top: 20px; width: 100px; height:30px' type='submit' value='Ok!'>"

           + "<input type='hidden' name='id' value='"+catId+"'>"

           + "<a href='#' style='text-decoration:none; color:#f5852e; margin-left: 40px;' onclick='show_hide_cadastrar_categoria_box(0,0,-1)'>Cancelar</a>"

           + "<?php echo form_close() ?>");

        }

        else

        {

            $('#novoEditarCategoria').html('Nova Categoria');

            $('#form_categoria_container').html("<form action='"+base_url_js+url+"' method='post'>"

           + "<span style='color:#f5852e; padding-top:8px; margin: 8px;'>Nome da categoria:</span>"

           + "<br>"

           + "<input style='margin-left: 8px; width: 240px; position: relative; top: 2px;' id='cadastrar_categoria' placeholder='Escreva aqui...' type='text' name='categoria'><br>"

           + "<input style='position: 5px; border:none; background: #f5852e; color:white; margin-left: 4%; margin-top: 20px; width: 100px; height:30px' type='submit' value='Ok!'>"

           + "<a href='#' style='text-decoration:none; color:#f5852e; margin-left: 40px;' onclick='show_hide_cadastrar_categoria_box(0,0,-1)'>Cancelar</a>"

           + "<?php echo form_close() ?>");

        }

    }

    function show_hide_cadastrar_produto_box(num,modo,prodId){

        // Se num = 0, então ele esconde a caixa, caso contrário, faz aparecer

        // Se modo = 0, ele altera o form da caixa para atender a função de cadastro, caso contrário, a de edição

        // prodId representa a id do produto, necessária para a função de cadastro. Caso seja chamado o modo 0, prodId recebe

        // o valor de -1
        var url = "";

        if (num == 1) 

        {

            $('#form_registry_edit_produto').css('display', 'inline-block');

        }

        else

        {

            $('#form_registry_edit_produto').css('display', 'none');

        }



        if(modo == 1)

        {

            $('#novoEditarProduto').html('Editar Produto');
            var nome_prod = $(".produto_" + prodId).attr("value");

            url = "index.php/produto/atualizando_produto";
           
           $('#form_produto_container').html("<form action='"+base_url_js+url+"' method='post'>"

           + "<span style='color:#f5852e; padding-top:8px; margin: 8px;'>Nome do produto:</span>"

           + "<br>"

           + "<input style='margin-left: 8px; width: 240px; position: relative; top: 2px;' id='cadastrar_produto' value='"+nome_prod+"' type='text' name='produto'><br>"

           + "<input style='position: 5px; border:none; background: #f5852e; color:white; margin-left: 4%; margin-top: 20px; width: 100px; height:30px' type='submit' value='Ok!'>"

           + "<input type='hidden' name='id' value='"+prodId+"'>"

           + "<a href='#' style='text-decoration:none; color:#f5852e; margin-left: 40px;' onclick='show_hide_cadastrar_produto_box(0,0,-1)'>Cancelar</a>"

           + "<?php echo form_close() ?>");

        }

        else

        {


            $('#novoEditarProduto').html('Novo Produto');

            url = "index.php/produto/cadastrando_produto";

            $('#form_produto_container').html("<form action='"+base_url_js+url+"' method='post'>"

           + "<span style='color:#f5852e; padding-top:8px; margin: 8px;'>Nome do produto:</span>"

           + "<br>"

           + "<input type='hidden' id='id_produto_cadastro' name='id_produto_cadastro' value='"+id_cat+"'>"

           + "<input style='margin-left: 8px; width: 240px; position: relative; top: 2px;' id='cadastrar_produto' placeholder='Escreva aqui...' type='text' name='produto'><br>"

           + "<input style='position: 5px; border:none; background: #f5852e; color:white; margin-left: 4%; margin-top: 20px; width: 100px; height:30px' type='submit' value='Ok!'>"

           + "<a href='#' style='text-decoration:none; color:#f5852e; margin-left: 40px;' onclick='show_hide_cadastrar_produto_box(0,0,-1)'>Cancelar</a>"

           + "<?php echo form_close() ?>");

        }

    }

    function administrador_categoria_excluir(id_categoria){

        var url = base_url_js;

        var controller = 'categoria/';

        var method = 'deletar_categoria/';

        url = url+'index.php/'+controller+method+id_categoria;

        swal({

                title: 'Você tem certeza?',

                text: 'Você está prestes a desativar os produtos e modelos que são desse tipo dessa categoria também!',

                type: 'warning',

                showCancelButton: true,

                confirmButtonColor: '#f37525',   

                confirmButtonText: 'Desativarei essa  Categoria!', 

                closeOnConfirm: false 

            }, function(){

                $.ajax({

                    url:url,

                    type:'GET',

                    success:function(data){

                        var result = data;

                        if(result){

                            swal({

                                title: 'Desativada!',

                                text: 'A Categoria foi Desativada.',

                                type: 'success',

                                showCancelButton: false,

                                confirmButtonColor: '#f37525',

                                confirmButtonText: 'OK',

                                closeOnConfirm: true

                            });

                            location.reload();

                        } else {

                            swal('Ops...', 'Esse Categoria  não pode ser desativada.', 'error');

                        }

                    },'error':function(){

                        swal('Ops...', 'Sua operação não pode ser realizada. Tente novamente mais tarde.', 'error');

                    }



                });

            }

        );

    }



    function administrador_produto_excluir(id_produto){

        var url = base_url_js;

        var controller = 'produto/';

        var method = 'deletando_produto_ajax/';

        url = url+'index.php/'+controller+method+id_produto;

        swal({

                title: 'Você tem certeza?',

                text: 'Você está prestes a desativar todos os modelos que são desse tipo de produto também!',

                type: 'warning',

                showCancelButton: true,

                confirmButtonColor: '#f37525',   

                confirmButtonText: 'Sim, Desativarei esse Produto!',   

                closeOnConfirm: false 

            }, function(){

                $.ajax({

                    url:url,

                    type:'GET',

                    success:function(data){

                        var result = data;

                        if(result == true ){

                            swal({

                                title: 'Desativado!',

                                text: 'O Produto foi Desativado.',

                                type: 'success',

                                showCancelButton: false,

                                confirmButtonColor: '#f37525',

                                confirmButtonText: 'OK',

                                closeOnConfirm: true

                            });

                            location.reload();

                        } else {

                            swal('Ops...', 'Esse Produto  não pode ser desativado.', 'error');

                        }

                    },'error':function(){

                        swal('Ops...', 'Sua operação não pode ser realizada. Tente novamente mais tarde.', 'error');

                    }



                });

            }

        );

    }



    function administrador_modelos_excluir(id_modelos){

        var url = base_url_js;

        var controller = 'modelo/';

        var method = 'deletar_modelo/';

        url = url+'index.php/'+controller+method+id_modelos;

        swal({

                title: 'Você tem certeza?',

                text: 'Você está prestes a desativar todos as dicas desse modelo!',

                type: 'warning',

                showCancelButton: true,

                confirmButtonColor: '#f37525',   

                confirmButtonText: 'Sim, Desativarei esse Modelo!',

                closeOnConfirm: false 

            }, function(){

                $.ajax({

                    url:url,

                    type:'GET',

                    success:function(data){

                        var result = jQuery.parseJSON(data);;

                        if(result.status == 'TRUE' ){

                            swal({

                                title: 'Desativado!',

                                text: 'O Modelo foi Desativado.',

                                type: 'success',

                                showCancelButton: false,

                                confirmButtonColor: '#f37525',

                                confirmButtonText: 'OK',

                                closeOnConfirm: true

                            });

                            location.reload();

                        } else {

                            swal('Ops...', 'Esse Modelo  não pode ser desativado.', 'error');

                        }

                    },'error':function(){

                        swal('Ops...', 'Sua operação não pode ser realizada. Tente novamente mais tarde.', 'error');

                    }



                });

            }

        );

    }