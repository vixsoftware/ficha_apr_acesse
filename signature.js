var latromi = latromi || {};

latromi.esignature = function (canvas, settings) {

   let ctx;
   let drawing = false;
   
   function getPos(canvasDom, mouseEvent) {
      
      var clientRect = canvasDom.getBoundingClientRect();
      
      return {
         x: mouseEvent.clientX - clientRect.x,
         y: mouseEvent.clientY - clientRect.y
      }
   }
   
   function getTouchPos(canvasDom, touchEvent) {
      var rect = canvasDom.getBoundingClientRect();
      return {
         x: touchEvent.touches[0].clientX - rect.left,
         y: touchEvent.touches[0].clientY - rect.top
      };
   }
   
   function onCanvasMouseDown(evt) {
      var pos = getPos(canvas, evt);
      ctx.moveTo(pos.x, pos.y);
      drawing = true;
   }
   
   function onCanvasMouseUp(evt) {
      drawing = false;
   }
   
   function onCanvasMouseMove(evt) {
       if (drawing) {
         var pos = getPos(canvas, evt);
           ctx.lineTo(pos.x, pos.y);
           ctx.stroke();
       }
   }
   
   function applySettings() {
      if (settings.width)  canvas.width  = settings.width;
      if (settings.height) canvas.height = settings.height;
      if (settings.lineWidth) ctx.lineWidth = 4;
      ctx.imageSmoothingEnabled=true; 
      
      // Aplica cor de fundo no canvas
      if (typeof settings.backcolor === "string") {
         ctx.fillStyle = settings.backcolor;
         ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
   }
   
   // ########### [Configuração do Canvas - Inicio] ###########
   ctx = canvas.getContext("2d");
   canvas.addEventListener('mousedown', onCanvasMouseDown);
   canvas.addEventListener('mouseup'  , onCanvasMouseUp);
   canvas.addEventListener('mousemove', onCanvasMouseMove);
   
   // Converte eventos TouchScreen em enventos de Mouse
   canvas.addEventListener('touchstart', function (evt) {
      var touch = evt.touches[0];
      var mouseEvent = new MouseEvent("mousedown", {
         clientX: touch.clientX,
         clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
   }, false);
   //
   canvas.addEventListener('touchend', function (evt) {
      var mouseEvent = new MouseEvent("mouseup", { });
      canvas.dispatchEvent(mouseEvent);
   }, false);
   //
   canvas.addEventListener('touchmove', function (evt) {
      var touch = evt.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
         clientX: touch.clientX,
         clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
   }, false);

   
   // Adiciona link para limpar e tentar novamente.
   var clearLink = document.createElement('a');
   clearLink.href='#';
   clearLink.innerHTML = 'Tentar novamente';
   clearLink.title = 'Clique aqui para limpar a assinatura e tentar novamente';
   clearLink.addEventListener('click', function(evt) {
      evt.preventDefault();
      canvas.width = canvas.width; 
      applySettings();
   });
   canvas.parentNode.insertBefore(clearLink, canvas);
   //
   // Evita rolagem quando o usuário tocar no canvas 
   document.body.addEventListener("touchstart", function (e) {
      if (e.target == canvas) e.preventDefault();
   }, false);
   document.body.addEventListener("touchend", function (e) {
      if (e.target == canvas) e.preventDefault();
   }, false);
   document.body.addEventListener("touchmove", function (e) {
      if (e.target == canvas) e.preventDefault();
   }, false);
   
   applySettings();
   
   // ########### [Configuração do Canvas - Fim] ###########
   
   return {
   
   }
};