(function($){
  $.fn.extend({
    ichat: function(params){

      var ichatBody = "<!-- ichat area -->"+
      "<div id='ichatBody' class='ichat-body ichat-display' style=''>"+
      "  <!-- ichat button -->"+
      "  <div id='ichatButton' class='ichat-button'>"+
      "    <b id='ichatButtonName'></b>"+
      "  </div>"+
      "  <!-- ichat content -->"+
      "  <div id='ichatContent' class='ichat-content'>"+
      "  </div>"+
      "</div>";

      var itemBody = "<div>"+
      "  <div data-ichat-toggle='@id' class='ichat-title'>@title</div>"+
      "  <div id='@id' class='ichat-list'>"+
      "  </div>"+
      "</div>";

      var logic = {
        util: {

          ie: function(){
                  var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
                  while (
                      div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                      all[0]
                  );
                  return v > 4 ? v : false ;
          },
          compatible: function(){

            var ieVersion = logic.util.ie();
            if(ieVersion && (ieVersion==6||ieVersion==7)){

              $(window).scroll(function(){
                var nowtop = parseInt($(document).scrollTop());
                $('#ichatBody').css('top', nowtop + 200 + 'px');
              })
            }
          }
        },

        body: {

          placement: {
            left: function(){
              $("#ichatBody").addClass("ichat-pull-left");
              $("#ichatButton").addClass("ichat-float-right");
              $("#ichatContent").addClass("ichat-float-right");
            },
            right: function(){
              $("#ichatBody").addClass("ichat-pull-right");
              $("#ichatButton").addClass("ichat-float-left");
              $("#ichatContent").addClass("ichat-float-left");
            }
          },

          color: {
            black: function(){
              $("#ichatButton").addClass("ichat-color-black");
            },
            blue: function(){
              $("#ichatButton").addClass("ichat-color-blue");
            },
            red: function(){
              $("#ichatButton").addClass("ichat-color-red");
            },
            green: function(){
              $("#ichatButton").addClass("ichat-color-green");
            }
          },

          trigger: {
            click: function(){
              $("#ichatButton").click(function(){
                $("#ichatContent").toggle("slow");
              });
            },
            hover: function(){
              var _trigger;
              $("#ichatBody").hover(function(){

                _trigger = setTimeout(function(){
                  $("#ichatContent").show("slow");
                },200);
              },function(){
                clearTimeout(_trigger); 
                $("#ichatContent").hide("slow");
              });
            }
          }
        },

        items: {
          qq: function(item){

            var qqOnline = "http://wpa.qq.com/msgrd?v=3&uin=@qq&site=qq&menu=yes";
            var qqIco = "background-image: url('@url');";
            var html = "<ul class='ichat-list-ul'>";
            for(var i=0;i<item.items.length;i++){
              var _s = item.items[i];
              //是否自定义图标
              if(_s.image){
                html += "<li><a href='"+qqOnline.replace("@qq",_s.qq)+"' style=\""+qqIco.replace("@url",_s.image)+"\" target='_blank'>"+_s.title+"</a></li>";
              }else{
                html += "<li><a href='"+qqOnline.replace("@qq",_s.qq)+"' class='ichat-qq' target='_blank'>"+_s.title+"</a></li>";
              }
            }
            html += "</ul>";
 
            $("#"+item.id).html(html);
          },
          tel: function(item){
            var telIco = "background-image: url('@url');";
            var html = "<ul class='ichat-list-ul'>";
            for(var i=0;i<item.items.length;i++){
              var _s = item.items[i];
  
              if(_s.image){
                html += "<li><a href='javascript:void(0);' title='"+_s.title+"' style=\""+telIco.replace("@url",_s.image)+"\">"+_s.tel+"</a></li>";
              }else{
                html += "<li><a href='javascript:void(0);' title='"+_s.title+"' class='ichat-tel'>"+_s.tel+"</a></li>";
              }
            }
            html += "</ul>";

            $("#"+item.id).html(html);
          },
          text: function(item){
            var html = "";
            for(var i=0;i<item.items.length;i++){
              var _s = item.items[i];

              if(_s.href){
                html += "<p><b>"+_s.title+"</b><a href='"+_s.href+"' target='_blank'>"+_s.text+"</a></p>";
              }else{
                html += "<p><b>"+_s.title+"</b>"+_s.text+"</p>";
              }
            }

            $("#"+item.id).html(html);
          },
          trigger: {
            click: function(id){
              $("div[data-ichat-toggle='"+id+"']").addClass("ichat-cursor");
              $("div[data-ichat-toggle='"+id+"']").click(function(){
                $("#"+id).slideToggle("slow");
              });
            },
            hover: function(id){
              var _trigger;
              $("div[data-ichat-toggle='"+id+"']").addClass("ichat-cursor");
              $("div[data-ichat-toggle='"+id+"']").parent().hover(function(){

                _trigger = setTimeout(function(){
                  $("#"+id).show("slow");
                },200);
              },function(){
                clearTimeout(_trigger); 
                $("#"+id).hide("slow");
              });
            },
            none: function(id){

            }
          }
        }
      };
      

      $(this).append(ichatBody);
      $("#ichatBody").attr("style","top:"+params.top+"%;");
      $("#ichatButtonName").text(params.title);
      if(logic.body.placement[params.placement]){
        logic.body.placement[params.placement]();
      }
      if(logic.body.color[params.color]){
        logic.body.color[params.color]();
      }
      if(logic.body.trigger[params.trigger]){
        logic.body.trigger[params.trigger]();
      }

      for(var i=0;i<params.items.length;i++){
        var _s = params.items[i];

        var _id = "ichatItem"+i;
        var html = itemBody.replace(/@id/g,_id);
        html = html.replace("@title",_s.title);

        $("#ichatContent").append(html);

        if(!_s.open){
          $("#"+_id).addClass("ichat-display");
        }

        _s.id = _id;

        if(logic.items[_s.type]){
          logic.items[_s.type](_s);
        }

        if(logic.items.trigger[_s.trigger]){
          logic.items.trigger[_s.trigger](_id);
        }
      }

      logic.util.compatible();

      $("#ichatBody").removeClass("ichat-display");
    }
  });
})(jQuery);