$(document).ready(function() {
    
    
    function hacerDragable() {
        $( "#ficheros-remotos li" ).draggable({
            appendTo: "#cola-descarga",
            helper: "clone",
            cancel: "button", 
            revert: "invalid",
        });
        //FIX de la altura #cola-descarga
        $("ul#cola-descarga").css("min-height", $("ul#ficheros-remotos").height());
    } 
        $( "#cola-descarga " ).droppable({
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            accept: ":not(.ui-sortable-helper)",
            drop: function( event, ui ) {
                $( this ).find( ".placeholder" ).remove();
                $( "<li class='list-group-item'></li>" ).html("<span style='' id='remove-item' class='glyphicon glyphicon-remove-circle'></span>"+"<div class='progress progreso' style=''>"+"<div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: 40%'>"+ui.draggable.html()).appendTo( this )+"</div></div>";
               $('#cola-descarga li').addClass('padding0');
                 $('.progress-bar >  #filename').addClass('filename-estilo');
                 $('.progress-bar > #filesize').addClass('filesize-estilo');
                 $('.progress-bar > #filedate').addClass('filedate-estilo');
            }
        }).sortable({
            items: "li",
            sort: function() {
                // gets added unintentionally by droppable interacting with sortable
                // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
                $( this ).removeClass( "ui-state-default" );
            }
        });    
        

    //Funcion ordena por campo
    //THANKS STACKOVERFLOW http://stackoverflow.com/a/4698083
    function sortJsonArrayByProperty(objArray, prop, direction){
        if (arguments.length<2) throw new Error("sortJsonArrayByProp requires 2 arguments");
        var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending

        if (objArray && objArray.constructor===Array){
            var propPath = (prop.constructor===Array) ? prop : prop.split(".");
            objArray.sort(function(a,b){
                for (var p in propPath){
                    if (a[propPath[p]] && b[propPath[p]]){
                        a = a[propPath[p]];
                        b = b[propPath[p]];
                    }
                }
    
                return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
            });
        }
    }

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
            
            //Ordenamos primero por fecha.
            sortJsonArrayByProperty(data, 'attributes.date',-1);            
            data.forEach(function(item) {
                 $("#ficheros-remotos").append('<li class="list-group-item"><span id="filename">'+item["name"]+'</span><span id="filedate" class="badge">'+getDateHuman(item["date"])+'</span><span id="filesize" class="badge">'+getReadableFileSizeString(item["size"])+'</span></li>');
            });
            hacerDragable(); // Ejecuta el js para que se pueda arrastrar la lista.
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





