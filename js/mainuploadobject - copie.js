/* TO DO 
- Mettre bouton control pour l'OrbitControls
- Event quand clique sur le webgl
- Sélection de face
- Insertion vidéo texture
*/

var scene, camera, renderer;
var webgl = document.getElementById('webgl');

colorBack = 0x000000;

var clickInfo=[];
  clickInfo.userHasClicked = false;
  //var raycaster = new THREE.Raycaster();
  //var projector = new THREE.Projector();  
  webgl.addEventListener('click',function(evt) {
      clickInfo.userHasClicked = true;
      clickInfo.x = evt.clientX-webgl.offsetLeft;
      clickInfo.y = evt.clientY-webgl.offsetTop;
}, false);
init();



/******** C U B E *******/
; // on initialise la textures des faces, elles seront initialement composée de l'image TD/moon.jpg

/*  V I D E O */
var updateFcts = [];

var mavariable = document.getElementById("varJsToPhp").value;
console.log(mavariable);
var source = "upload/"+mavariable;
console.log(source);

//texture video
var videoTexture = new THREEx.VideoTexture("aaa.ogv");
var video = videoTexture.video;
video.crossOrigin = 'anonymous'; // cela permet d'importer des vidéos non reconnues, pour qu'elles ne soient pas mises comme danger.

updateFcts.push(function(delta, now){
     // to update the texture are every frame
    videoTexture.update(delta, now)
});

var val, valY, valZ, rotX, rotY, rotZ;
val = valY = valZ = rotX = rotY = rotZ = 0;

//var mavariable = new String(document.getElementById("varJsToPhp").value);
//var source = "upload/"+mavariable;
var source="upload/lego.obj";

var loader = new THREE.ColladaLoader(); 

var controlPanel;
loader.options.convertUpAxis = true; 
loader.load('upload/lego.DAE',function colladaReady( collada ){
      object = collada.scene;
      console.log(object);

      //CODE DE DIEU, JE LE DIS ON PEUT CHANGER LA TEXTURE 
      object_geometry = collada.scene.children[ 0 ].geometry;
      collada.scene.children[ 0 ].children[0].material=new THREE.MeshBasicMaterial({map : videoTexture.texture});;

      /*******************************************/

      scene.add(object);
      object.position.set(val,valY,valZ); 
      object.scale.x=12;
      object.scale.y=12;
      object.scale.z=12;
      object.updateMatrix();
/*  var sous = scene.getObjectByName( "Cylinder.004_Cylinder.002", true );
      console.log(sous);
      sous.material.color.setRGB (241, 0, 0);
  
      var updateFcts = [];
      var videoTexture = new THREEx.VideoTexture("upload/aaa.ogv");
      var video = videoTexture.video;
      video.crossOrigin = 'anonymous'; 
      updateFcts.push(function(delta, now){
        videoTexture.update(delta, now)
      });
      sous.material.push(new THREE.MeshBasicMaterial({map : videoTexture.texture}));
*/ 
var lastTimeMsec= null // permet de mettre à jour pour la vidéo
requestAnimationFrame(function animate(nowMsec){
  // keep looping
  requestAnimationFrame( animate );
  // measure time
  lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
  var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
  lastTimeMsec  = nowMsec
  // call each update function
  
  updateFcts.forEach(function(updateFn){
    updateFn(deltaMsec/1000, nowMsec/1000)
  });
}); 

  document.addEventListener('keydown',function(event) {
    switch (event.keyCode) {
      case 81 : val-=1;
                object.position.x=val;
                console.log("left");
                break;  //left arrow
      case 90 : valY+=1;
                object.position.y=valY;
                console.log("top");
                break;  //top arrow
      case 68 : val+=1;
                object.position.x=val;;
                break;  //right arrow
      case 83 : valY-=1;
                object.position.y=valY;
                break;  //bottom arrow
      case 65 : object.scale.x = object.scale.y = object.scale.z -=0.1;
                break;
      case 69 : object.scale.x = object.scale.y = object.scale.z +=0.1;
                break;
      case 75 : object.rotation.y -=0.1;
                break;
      case 77 : object.rotation.y +=0.1;
                break;
      case 79 : object.rotation.x -=0.1;
                break;
      case 76 : object.rotation.x +=0.1;
                break;
      case 73 : object.rotation.z +=0.1;
                break;
      case 80 : object.rotation.z -=0.1;
                break;
    }

  });

  slideX=document.getElementById('sliderPositionX');
  slideX.addEventListener('change',textSliderX);
  function textSliderX() {
    document.getElementById('sliderPositionX').value=val;
    val=parseInt(val); 
    object.position.x = val;
  }

  slideY=document.getElementById('sliderPositionY');
  slideY.addEventListener('change',textSliderY);
  function textSliderY() {
    document.getElementById('sliderPositionY').value=valY;
    valY=parseInt(valY); 
    object.position.y = valY;
  }

  slideZ=document.getElementById('sliderPositionZ');
  slideZ.addEventListener('change',textSliderZ);
  function textSliderZ() {
    document.getElementById('sliderPositionZ').value=valZ;
    valZ=parseInt(valZ); 
    object.position.z = valZ;
  }

  slideSize=document.getElementById('sliderSize');
  slideSize.addEventListener('change',textSliderSize);
  function textSliderSize() {
    document.getElementById('sliderSize').value=valSize;
    valSize=parseInt(valSize); 
    object.scale.x = object.scale.y = object.scale.z = valSize;
  }

  var btnInitialiser = document.getElementById('initialiser');
  btnInitialiser.addEventListener('click', fctInitialiser);

  function fctInitialiser() {
    val = valY = valZ = 0;
    camera.position.set(0,0,100);
    object.rotation.set(0,0,0);
    object.position.set(val,valY,valZ);
    object.scale.x = object.scale.y = object.scale.z = 2;
  }
} );



/* pour .dae
var loader = new THREE.ColladaLoader(); 
loader.options.convertUpAxis = true; 
loader.load(source, function ( collada ) {
  var object = collada.scene;
  object.scale.x = object.scale.y = object.scale.z = 200.0; // éventuellement le mettre à l’échelle
}
object.position.set(0,0,0);
object.updateMatrix();
scene.add(object);
*/

/* RECUPERATION DU CLICK */

animate();







/*///////////////////////////////
/////////////////////////////////

******* F O N C T I O N  ********

/////////////////////////////////
///////////////////////////////*/


/*******************************************
************** MENU HAMBURGER **************
******************************************
*/
var btnAmpoule = document.getElementById('ampoule');
btnAmpoule.addEventListener('click', fctAmpoule);

function fctAmpoule() {
  if (colorBack==0xFFFFFF) {
    colorBack=0x000000;

    document.getElementById("ampoule").src="./css/img/lightOff.png";

    renderer.setClearColorHex(colorBack, 1);
  } else {
    colorBack = 0xffffff;
    renderer.setClearColorHex(colorBack, 1);
    document.getElementById("ampoule").src="./css/img/lightOn.png";
  }
}
/*

}



*/
/*******************************************
*********** INITIALISATION *****************
*******************************************/

function init() { // fonction initialisant la scène et la caméra

  scene = new THREE.Scene();
    // Create a renderer and add it to the DOM.
  
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // On crée une caméra que l'on position et que l'on ajoute à la scène.
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000);
    camera.position.set(0,0,100);
    scene.add(camera);



    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    
    renderer.setClearColorHex(colorBack, 1); // on met une couleur de fond

    // On crée et on positionne les lumières.
            var lumiere1 = new THREE.AmbientLight(0x222222);
            lumiere1.position.set(0, 0, 0);
            var lumiere2 = new THREE.DirectionalLight(0xffffff);
            lumiere2.position.set(0, 50, 100);
            
            // On ajoute les lumières à la scène.
            scene.add(lumiere1);
            scene.add(lumiere2);
  
// var light = new THREE.DirectionalLight(0xffffff,0.5); // on ajoute une lumière de couleur blanche 
// light.position.set(0,0,20);
// scene.add(light); // on ajoute light (la lumière) à la scene

    //var light2 = new THREE.AmbientLight(0xffffff);
    //light2.position.set(0,-30,12);
    //scene.add(light2);
//
    //var light3 = new THREE.AmbientLight(0xffffff);
    //light3.position.set(0,-30, -30);
    //scene.add(light3);
//
    //var light4 = new THREE.AmbientLight(0xffffff);
    //light4.position.set(0,-30,0);
    //scene.add(light4);
//
    //var light5 = new THREE.AmbientLight(0xffffff);
    //light5.position.set(0,-70,100);
    //scene.add(light5);

    webgl.appendChild( renderer.domElement );

  //  controls = new THREE.OrbitControls(camera, renderer.domElement); // permet de bouger la caméra et dézoomer avec une souris

}


/*******************************************
*************** ANIMATION ******************
*******************************************/

function animate() { // fonction permettant de faire le rendu, et de redemander une mise a jour avec la vidéo.      
    if (clickInfo.userHasClicked) {
        var raycaster = new THREE.Raycaster();
        var projector = new THREE.Projector();  
        
        var directionVector = new THREE.Vector3(
        ( clickInfo.x / window.innerWidth ) * 2 - 1,
        -( clickInfo.y / window.innerHeight ) * 2 + 1,
        1);

        document.getElementById("titi").value = directionVector.x + '  ,  ' + directionVector.y;
        clickInfo.userHasClicked=false;
        projector.unprojectVector(directionVector, camera);
        directionVector.sub(camera.position);
        directionVector.normalize();
        raycaster.set(camera.position, directionVector);
        var intersects = raycaster.intersectObjects(scene.children, true);
        //console.log(intersects);
        if (intersects.length) {
            var target=intersects[0].object;
          i=1;
          while (target.visible==false && i<intersects.length) {
            target=intersects[i].object;
            i++;
          } 
          if (i<intersects.length) {
            document.getElementById("titi").value = 'Objet cliqué: ' + target.name;
           // var materialTarget = new THREE.MeshBasicMaterial({color: 0x0000ff});
           // target.name.material=materialTarget;
          //  animate();
          }
        } 
      }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  //  controls.update();
}

/*******************************************
*********** FULLSCREEN MODE ****************
*******************************************/

document.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    toggleFullScreen();
  }
}, false);

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    document.getElementById('popup').innerHTML="";
    $(function(){
    $('#popup').hide().fadeIn(2000);
  });
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();

    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    document.getElementById('popup').innerHTML="";

    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

$(function(){
    $('#popup').hide().fadeIn(2500);
});








