$(document).ready(function() {
    
//
//////////////Codigo draggable anterior
//
/////////// Estilo cola 
      var estilo_cola = "";       
      $( "#ficheros-remotos li" ).draggable({
            appendTo: "body",
            helper: "clone",
            cancel: "button", 
            revert: "invalid",
      });   
    
        $( "#cola-descarga " ).droppable({
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            accept: ":not(.ui-sortable-helper)",
            drop: function( event, ui ) {
                $( this ).find( ".placeholder" ).remove();
                $( "<li class='list-group-item'></li>" ).html("<span style='' id='remove-item' class='glyphicon glyphicon-remove-circle'></span>"+ui.draggable.html()+estilo_cola ).appendTo( this );       
            }
        }).sortable({
            items: "li",
            sort: function() {
                // gets added unintentionally by droppable interacting with sortable
                // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
                $( this ).removeClass( "ui-state-default" );
            }
        });    
        
//        // Codigo nuevo draggable
//        
//        function anadirElementos(ui) {
//           // console.log(ui);
//       //    var nombre_fichero = $(ui).find("#filename").text();
////            var fecha_fichero = $(ui).find("#filedate").text();
////            var tamano_fichero = $(ui).find("#filesize").text();
////            
//      //      console.log(nombre_fichero);
////            console.log(fecha_fichero);
////            console.log(tamano_fichero);
//        
//            // MIERDA Y MAS MIERDA
//            $("#ficheros-remotos").empty().append(
//                
//                "<li class='list-group-item'>"+
//                    "<span id='filename'>Noche de fiesta S01</span>"+
//                    "<span id='filedate' class='badge'>7/2/2014</span>"+
//                    "<span id='filesize' class='badge'>14 GB</span>"+
//                "</li>"
//            );
//            getFilelistKS1();
//            
//        }
//        
//        var $ficheros_remotos = $( "#ficheros-remotos" );
//	    var $cola_descargas = $( "#cola-descarga" );
//        
//        
//        $( "li", $ficheros_remotos ).draggable({
//             appendTo: "body",
//            cancel: "button", 
//		      revert: "invalid",
//		  containment: "document",
//		  helper: "clone",
//		  cursor: "move"
//	   });
//      $cola_descargas.droppable({
//		  accept: "#ficheros-remotos > li",
//		  drop: function( event, ui ) {
//              $("#cola-descarga").append(ui.draggable); // AQUI DE ALGUNA FORMA HAY QUE GENERAR EL CODIGO NECESARIO PARA AÑADIR LA BARRA Y LOS ESTILOS INDIVIDUALES QUE TIENE LA COLA
//			  anadirElementos(); // esto hace algun tipo de magia que no se borre lo de la izquierda
//              $( "li", $ficheros_remotos ).draggable({
//    		      cancel: "button", // these elements won't initiate dragging
//		          revert: "invalid", // when not dropped, the item will revert back to its initial position
//		          containment: "document",
//		          helper: "clone",
//		          cursor: "move"
//	           })
//	       }
//	   });    
//    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    //Human FileSizes
    function getReadableFileSizeString(fileSizeInBytes) {

        var i = -1;
        var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    }
    
    //Human date
    function getDateHuman(timestamp){
        var d = new Date(timestamp*1000);
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    //Cargar lista de archivos y la coloca en la tabla.
    function getFilelistKS1(refresh) 
    {
        //Si es una refresco comprobamos si es kas naranja o limon.
        if(refresh) {
            $("#ficheros-remotos").empty();
        }
        $.getJSON('http://api.bots.tf/gala/',function(data){
            data.forEach(function(item) {
                 $("#ficheros-remotos").append('<li class="list-group-item"><span id="filename">'+item["name"]+'</span><span id="filedate" class="badge">'+getDateHuman(item["date"])+'</span><span id="filesize" class="badge">'+getReadableFileSizeString(item["size"])+'</span></li>');
            });
        });
    }

    //Refresh KS1
    $("#refresh-ks1").click(function(){
        getFilelistKS1(true);
    });

    //Disabling Cache
    $.ajaxSetup({ cache: false });

    //Carga inicial.
    getFilelistKS1();
});





