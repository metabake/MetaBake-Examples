// This file is a toolbelt, a curated list of libs to use when need arises. 

console.log('Ver:','unpkg.com/mtool-belt@1.3.27/')

// can use like this in comp:
/*
if (!depp.isDefined('jquery')) {
  // ... 
}
and then you can depp.require(...)

Don't use depp.js for events - use CustomEvents or state machine
*/

// also contains any locally hosted lib is because we can't find it on a CDN or they have poor builds so we have to host

// native helper:
window.native = false
if (document.URL.indexOf('http://') === -1
  && document.URL.indexOf('https://') === -1) {
  window.native = true
}
var isFile = window.location.protocol == 'file:'
if(isFile||window.native) {// for electron | build.phonegap, checks if running in real browser from http server 
  try {
    window.nodeRequire = require 
    delete window.require
    delete window.exports 
    delete window.module
    console.log('fixed for non http/native')
  } catch(err) {
  }
}
// helper event: require to wait till 'DOM' aka DOMReady for anything DOM related. But no need to wait on this for fetch
function onDOM_() {
   console.log('DOM')
   depp.done('DOM')
}
if (window.native) {// in case native
  document.addEventListener('deviceready', onDOM_, false)
} else { // else it is a regular browser
  document.addEventListener('DOMContentLoaded', onDOM_, false)
}

// polyfills: require 'polly' in case of ie11 or such, for example to fetch. No need to wait on DOM for data
if (!window.Promise)
  depp.define({ 'has-Promise': '//cdn.jsdelivr.net/npm/promise-polyfill@8.1.0/dist/polyfill.min.js' })
else
  depp.done('has-Promise')
var CESupported = (function () {
  try {
    new CustomEvent('test')
    return true
  } catch (e) {
    return false
  }
})()
if (!CESupported) //custom events polly
  depp.define({ 'has-CE': '//unpkg.com/mtool-belt@1.3.27/poly/EventListener.min.js' })
else
  depp.done('has-CE')
if (!'fetch' in window)
  depp.define({ 'has-Fetch': '//unpkg.com/mtool-belt@1.3.27/poly/fetch.min.js' })
else
  depp.done('has-Fetch')
depp.require(['has-Promise','has-CE','has-Fetch'], function () {
  console.log('polly')
  depp.done('polly')
})

//webcomp section, require polly-wcomp for web components
var webCompSupport = 'customElements' in window
depp.require(['polly'], function () {
   if(webCompSupport) // modern 
      depp.require('es5-adapter', function () {
         console.log('polly-wcompM')
         depp.done('polly-wcomp')
         depp.done('READY', Date.now() - _start)
      })//depp
   else // ie 11
      depp.require('wcomp-loader', function () {
         WebComponents.waitFor(function() {
            console.log('polly-wcomp11')
            depp.done('polly-wcomp')
            depp.done('READY', Date.now() - _start)
         })
      })//depp
})

function pollycoreready() { // after asking for it, wait on this event.
   console.log('polly-core-ready', Date.now() - _start)
   depp.done ('polly-core-ready')
}

//- eg addScript('bla.js', null, 'api-key', 'key123')
function addScript(src, callback, attr, attrValue) {
   var s = document.createElement( 'script' )
   s.setAttribute( 'src', src )
   if(attr)
      s.setAttribute( attr, attrValue )
   if(callback) s.onload=callback

   document.getElementsByTagName('head')[0].appendChild(s)
}


depp.define({
   'disableAutoFill' :['#jquery','//unpkg.com/mtool-belt@1.3.27/vendors/jquery.disableAutoFill.min.js']
   ,'DEBUG'          :'//unpkg.com/mtool-belt@1.3.27/vendors/debug.css'

   ,'WebAdmin': ['#RPC','//unpkg.com/metabake-web-admin-api@0.1.0/WebAdmin.min.js']
   ,'RPC': ['#polly', '//unpkg.com/http-rpc@1.0.6/httpRPC.min.js']
   ,'SPA': ['#polly', '//unpkg.com/spa-ts-router@4.15.19/spa-router.min.js', '#state-machine']

   ,'wcomp-loader':'//unpkg.com/@webcomponents/webcomponentsjs@2.2.10/webcomponents-loader.js'
   ,'es5-adapter' :'//unpkg.com/@webcomponents/webcomponentsjs@2.2.10/custom-elements-es5-adapter.js'

   ,'riotjs':'//cdn.jsdelivr.net/npm/riot@3.13.2/riot.min.js'

   ,'jquery': ['#polly', '//cdn.jsdelivr.net/npm/jquery@3.4.0/dist/jquery.min.js', '#DOM']

   // Commercial License # MetaBake LLC
   ,'state-machine': '//cdn.jsdelivr.net/npm/javascript-state-machine@3.1.0/lib/state-machine.min.js'

   // INSIDE the project, also rebuild their sass when tabulator bumps version
   ,'tabulator': ['//cdn.jsdelivr.net/npm/tabulator-tables@4.2.7/dist/js/tabulator.min.js']

      // full polly ES5 request; listen to ready, but not tested w/ polly-wcomp
   ,'polly-core-req': ['#polly-wcomp','//polyfill.io/v3/polyfill.min.js?flags=gated&features=es2015%2Ces2016%2Ces2017&callback=pollycoreready']

   // use for validation. eg: check in VM and return 'OK' to view|binding; or return validation errors if found
   ,'validate' :  '//cdn.jsdelivr.net/npm/validate.js@0.12.0/validate.min.js'
   ,'validator': ['//cdn.jsdelivr.net/npm/validator@10.11.0/validator.min.js']

   ,'split'       :'//cdn.jsdelivr.net/npm/split.js@1.5.10/dist/split.min.js'
   ,'progressBar' :'//cdn.jsdelivr.net/npm/progressbar.js@1.0.1/dist/progressbar.min.js'
   ,'zebraDate'   :['//cdn.jsdelivr.net/npm/zebra_datepicker@1.9.12/dist/css/bootstrap/zebra_datepicker.css',
                   '//cdn.jsdelivr.net/npm/zebra_datepicker@1.9.12/dist/zebra_datepicker.min.js','#DOM']
   ,'gridformsJS':['//cdn.jsdelivr.net/npm/gridforms@1.0.6/gridforms/gridforms.js']

   ,'accordion': ['#jquery'
                  ,'//unpkg.com/mtool-belt@1.3.27/vendors/jquery-accordion/js/jquery.accordion.min.js'
                  ,'//unpkg.com/mtool-belt@1.3.27/vendors/jquery-accordion/css/jquery.accordion.css']

   ,'emailjs': ['//cdn.emailjs.com/sdk/2.3.2/email.min.js','#DOM']

   ,'pagination': ['//cdn.jsdelivr.net/npm/paginationjs@2.1.4/dist/pagination.min.js']

   // load after jquery is ready
   ,'qunit': [ '#jquery', '//cdn.jsdelivr.net/npm/qunit@2.9.2/qunit/qunit.css' 
               ,'//cdn.jsdelivr.net/npm/qunit@2.9.2/qunit/qunit.min.js'
               ,'//cdn.jsdelivr.net/npm/qunit-promises@0.2.0/qunit-promises.min.js']

   ,'collect': '//cdn.jsdelivr.net/npm/collect.js@4.12.2/build/collect.min.js'

   //simplistic nav:
   ,'offcanvasNav':  ['//cdn.jsdelivr.net/npm/js-offcanvas@1.2.9/dist/_js/js-offcanvas.pkgd.js'
                     ,'//cdn.jsdelivr.net/npm/js-offcanvas@1.2.9/dist/_css/prefixed/js-offcanvas.css']

   ,'isJs': '//unpkg.com/mtool-belt@1.3.27/vendors/is.min.js'

   ,'vexAlert':['//cdn.jsdelivr.net/npm/vex-js@4.1.0/dist/js/vex.min.js'
               ,'//cdn.jsdelivr.net/npm/vex-js@4.1.0/dist/css/vex-theme-default.css']

   ,'codemirror': ['//cdn.jsdelivr.net/npm/codemirror@5.46.0/lib/codemirror.css'
                     ,'//cdn.jsdelivr.net/npm/codemirror@5.46.0/lib/codemirror.min.js'
                     ,'//cdn.jsdelivr.net/npm/codemirror@5.46.0/mode/markdown/markdown.js'
                     ,'//cdn.jsdelivr.net/npm/codemirror@5.46.0/mode/yaml/yaml.js']

   ,'firestore': [ '#polly-core-req' // request and check when polly-core-ready
                  ,'//www.gstatic.com/firebasejs/6.0.1/firebase-app.js'
                  ,'//www.gstatic.com/firebasejs/6.0.1/firebase-auth.js'
                  ,'//www.gstatic.com/firebasejs/6.0.1/firebase-firestore.js' ]

   ,'chosenSelect': ['#jquery','//cdn.jsdelivr.net/npm/chosen-js@1.8.7/chosen.jquery.min.js']

   ,'feather-icons':'//cdn.jsdelivr.net/npm/feather-icons@4.21.0/dist/feather.min.js'

   // dates:
   // moment is very large, avoid. Do try to use 'long' / linuxtime on back end
   ,'js-joda'  : '//cdn.jsdelivr.net/npm/js-joda@1.10.1/dist/js-joda.min.js'
   ,'luxon'    : '//cdn.jsdelivr.net/npm/luxon@1.13.0/build/global/luxon.min.js'
   ,'spacetime': '//cdn.jsdelivr.net/npm/spacetime@5.8.1/builds/spacetime.min.js'

   ,'onepage': ['//cdn.jsdelivr.net/npm/onepage-scroll@1.3.0/onepage-scroll.css'
               ,'//cdn.jsdelivr.net/npm/onepage-scroll@1.3.0/jquery.onepage-scroll.min.js']
   
   ,'jqFAQ':[ '#jquery'
             ,'//unpkg.com/mtool-belt@1.3.27/vendors/jquery-FAQ/jquery.quicksilver.min.js'
             ,'//unpkg.com/mtool-belt@1.3.27/vendors/jquery-FAQ/jquery.simpleFAQ.css'
             ,'//unpkg.com/mtool-belt@1.3.27/vendors/jquery-FAQ/jquery.simpleFAQ.min.js']

   // DO NOT USE THIS FOR DEVELOPMENT. local Sass should be used always, except if you do a quick prototype or a mockup, then use this
   ,'MOCKUPStyle': ['//cdn.jsdelivr.net/npm/gridforms@1.0.6/gridforms/gridforms.css',
                   ,'//cdn.jsdelivr.net/npm/spectre.css@0.5.8/dist/spectre.min.css']

   //MetaCake comps:
   ,'flipcard-comp'  : ['//unpkg.com/metacake@1.2.25/flipcard/comps/flipcard-comp.min.js']
   ,'contactus-comp' : ['//unpkg.com/metacake@1.2.25/contactus/comps/contactus-comp.min.js']
   ,'surveyitem-comp': ['//unpkg.com/metacake@1.2.25/surveryitem/comps/surveyitem-comp.min.js']
   ,'star-wcomp'     : ['//unpkg.com/metacake@1.2.25/starRating/comps/star-wcomp.js'] // todo min

   ,'vega'  : ['//cdn.jsdelivr.net/npm/vega@5.3.5'
               ,'//cdn.jsdelivr.net/npm/vega-lite@3.2.1'
               ,'//cdn.jsdelivr.net/npm/vega-embed@4.0.0']
   ,'slickCarousel': ['//cdn.jsdelivr.net/npm/slick-carousel@1.8.0/slick/slick.min.js'
                     ,'//cdn.jsdelivr.net/npm/slick-carousel@1.8.0/slick/slick.css']
   ,'circles': '//cdn.jsdelivr.net/npm/circles.js@0.0.6/circles.min.js'

   ,'mustache': ['//cdn.jsdelivr.net/npm/mustache@3.0.1/mustache.min.js']

   // images
   ,'svgloader'   : '//cdn.jsdelivr.net/npm/boomsvgloader@0.0.2/dist/js/boomsvgloader.min.js'
   ,'imagesloaded':['//cdn.jsdelivr.net/npm/imagesloaded@4.1.4/imagesloaded.min.js']
   ,'load-image'  : '//cdn.jsdelivr.net/npm/blueimp-load-image@2.21.0/js/load-image.all.min.js'
   ,'glfx'        :['//cdn.jsdelivr.net/npm/glfx@0.0.4/glfx.min.js'] // eg tilt shift

   //vid
   ,'bideo' : '//unpkg.com/mtool-belt@1.3.27/vendors/bideo/bideo.min.js'

   //FX section
   ,'deli'  : ['//unpkg.com/mtool-belt@1.3.27/vendors/delighters.min.js',  '#DOM']
   ,'GSAP'  : ['//cdn.jsdelivr.net/npm/gsap@2.1.2/src/minified/TweenLite.min.js',
               '//cdn.jsdelivr.net/npm/gsap@2.1.2/src/minified/plugins/CSSPlugin.min.js'] // plugin needs to animate css property
   ,'clamp': ['//unpkg.com/mtool-belt@1.3.27/vendors/clamp.min.js']
   ,'particles':'//cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'
   ,'scrollify':['#jquery','//cdn.jsdelivr.net/npm/jquery-scrollify@1.0.20/jquery.scrollify.min.js']
   ,'zenscroll':['//cdn.jsdelivr.net/npm/zenscroll@4.0.2/zenscroll-min.js','#DOM']  
   ,'parallaxImg' :'//unpkg.com/mtool-belt@1.3.27/vendors/parallaxImg.min.js'
   ,'typewriter':'//cdn.jsdelivr.net/npm/typewriter-effect@2.5.3/dist/core.js'

      // the standard font, force to load last - via depp:
   ,'OpenSans'       :'css!//fonts.googleapis.com/css?family=Open+Sans'
   ,'Playfair-Display':'css!//fonts.googleapis.com/css?family=Playfair+Display'
   ,'OswaldFont'     : 'css!//fonts.googleapis.com/css?family=Oswald'
   
   //experimental section, maybe deprecated in future:
   ,'sweetAlert'  : [ '//cdn.jsdelivr.net/npm/sweetalert2@8.9.0/dist/sweetalert2.css', // sweetAlert will be removed in future
                      '//cdn.jsdelivr.net/npm/sweetalert2@8.9.0/dist/sweetalert2.min.js']
   ,'picturefill' : '//cdn.jsdelivr.net/npm/picturefill@3.0.3/dist/picturefill.min.js'

})

depp.require(['DOM', 'polly'], function () { // just show the time, that's all
  console.log('toolBelt defs loaded', Date.now() - _start)
  console.log('Native?', window.native)
})

// common functions:
function loadFB() {// requires polly, load FB w/ ie 11 support
   return new Promise(function (resolve, reject) {
      depp.require('firestore', function() {
         depp.require('polly-core-ready', function(){// 2 steps
            console.log('FB-ready')
            depp.done('FB-ready')
            resolve('OK')
         })//inner  
      })//oute
   })//pro
}//()

//helps qunit not auto run //TODO: fix CRUD example
function loadQunit() { // you have to wait on -ready and manually start qunit
   // https://api.qunitjs.com/config/QUnit.config
   return new Promise(function (resolve, reject) {
      depp.require('qunit',function(){
         QUnit.config.autostart = false
         console.log('qunit-ready')
         depp.done('qunit-ready')
         resolve('OK')
      })
   })//pro
}//()

// loads module, then returns 
function req(module) {
  return new Promise(function (resolve, reject) {
    depp.require(module, function () {
      resolve('OK')
    })
  })//pro
}

// LOADS; and after that returns a promise array of riot js components, one for each element on a page ( but sometimes there is only one [0] )
function mountComp(compName) {
  return new Promise(function (resolve, reject) {
    depp.require(compName, function () { // load comp
      console.log('ENV', window.ENV)
      resolve(riot.mount(compName))
    })
  })//pro
}

// Liz to check and delete this comment if this works after testing
function fetchItems(path) {// requires polly
   return new Promise(function (resolve, reject) {
     fetch(path + '/items.json')
       .then(function (response) {
         if (!fullResp.ok)
           reject(fullResp.statusText)
         return response.json()
       }).then(function (obj) {
         resolve(obj)
       })
       .catch(function (err) {
         console.log('fetch err')
         console.log(err)
         reject(err)
       })
   })//pro
 }//()

 function getUrlVars() {
   var vars = [], hash
   var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
   for (var i = 0; i < hashes.length; i++) {
     hash = hashes[i].split('=')
     vars.push(hash[0])
     vars[hash[0]] = hash[1]
   }
   return vars
 }
 
function getLang() {
  return navigator.language || navigator.userLanguage
}

// this can help
function disE(evtName, msg) {
  dispatchEvent(new CustomEvent(evtName, { detail: msg }))
}

function inView(el) { // is element in view?
  //special bonus for jQuery
  if (typeof jQuery === 'function' && el instanceof jQuery) {
    el = el[0]
  }

  var rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function throttleF(callback, limit) { //returns a modified function!!!
  var wait = false
  return function () {          // We return a throttled function
    var context = this
    var args = arguments
    if (!wait) {                // If we're not waiting
      callback.apply(context, args) // calls function
      wait = true               // Prevent future invocations
      setTimeout(function () {  // After a period of time
        wait = false          // And allow future invocations
      }, limit)
    }
  }
}//()
// wait for it to stop for X
function debounceF(callback, time) { //returns a modified function!!!
  var timeout;
  return function () {
    var context = this
    var args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(function () {
      timeout = null
      callback.apply(context, args) // calls function
    }, time)
  }
}

//scroll and resize example
depp.require(['DOM'], function () {
  window.addEventListener('scroll', onBrowser)
  window.addEventListener('resize', onBrowser)
  onBrowser()//call it once to layout
})
function onBrowser(evt) { // just an example
   modOnBrowser(evt) // call the modified function
}
 var modOnBrowser = throttleF(function (evt) { // because it returns a function !!!, we define the modified function here
  disE('onBrowser', evt)
}, 500)// delay


