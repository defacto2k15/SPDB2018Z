(function(e){function t(t){for(var o,i,r=t[0],l=t[1],c=t[2],p=0,d=[];p<r.length;p++)i=r[p],a[i]&&d.push(a[i][0]),a[i]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);u&&u(t);while(d.length)d.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],o=!0,r=1;r<n.length;r++){var l=n[r];0!==a[l]&&(o=!1)}o&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},a={app:0},s=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var u=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var o=n("64a9"),a=n.n(o);a.a},"0db2":function(e,t,n){},"43ef":function(e,t,n){},"4bd4":function(e,t,n){"use strict";var o=n("7718"),a=n.n(o);a.a},"56d7":function(e,t,n){"use strict";n.r(t);var o=n("e814"),a=n.n(o),s=(n("cadf"),n("551c"),n("097d"),n("2b0e")),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"grid"},[e._m(0),n("div",{staticClass:"down"},[n("div",{staticClass:"box left",attrs:{id:"leftBox"}},[n("div",{staticClass:"d1"},[n("GoogleMap",{attrs:{"points-of-interest":e.pointsOfInterest,routes:e.routes,global:e.global}})],1),n("div",[n("QueryControls",{attrs:{"points-of-interest":e.pointsOfInterest,routes:e.routes,global:e.global}})],1)]),n("div",{staticClass:"box right"},[n("PoiPlan",{attrs:{routes:e.routes}}),n("PathDescriptionBox",{attrs:{routes:e.routes,"route-name":"Najszybsza trasa"}}),n("InterestingPathDescriptionBox",{attrs:{routes:e.routes}})],1)])])])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"top box header"},[n("h1",[e._v("Zaplanuj podróż")])])}],l=n("8809"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"map"},[n("div",[n("label",[e._v("Miejsce startu:\n      "),n("gmap-autocomplete",{attrs:{placeholder:"Set start position"},on:{place_changed:e.setStartPosition}})],1),n("label",[e._v("Miejsce końca:\n      "),n("gmap-autocomplete",{attrs:{"aria-placeholder":"Set end position"},on:{place_changed:e.setEndPosition}})],1),n("br"),n("AddressDescription",{attrs:{map:e.mapObject,location:e.startMarker.location,title:"Początek: "}}),n("AddressDescription",{attrs:{map:e.mapObject,location:e.endMarker.location,title:"Koniec: "}}),e._m(0)],1),n("br"),n("gmap-map",{ref:"mapRef",attrs:{id:"VueGoogleMap",center:e.center,zoom:12}},[e._l(e.markers,function(t,o){return n("gmap-marker",{key:o,attrs:{position:t.position,clickable:!0,draggable:!0},on:{click:function(n){e.center=t.position}}})}),n("gmap-marker",{attrs:{position:e.startMarker.location,clickable:!0,label:"start",draggable:!0},on:{click:function(t){e.center=e.startMarker.location},dragend:e.updateStartPosition}}),n("gmap-marker",{attrs:{position:e.endMarker.location,clickable:!0,label:"end",draggable:!0},on:{click:function(t){e.center=e.endMarker.location},dragend:e.updateEndPosition}}),e._l(e.routes.interestingPointsInRoute,function(t,o){return n("gmap-marker",{attrs:{position:t.location,clickable:!0,label:o,draggable:!1,icon:e.findPointOfInterestIcon(t)},on:{click:function(n){e.clickedInterestingPlaceMarker(t)}}})}),e._l(e.routes.interestingPointsNearRoute,function(t){return n("gmap-marker",{attrs:{position:t.location,clickable:!0,label:"!",draggable:!1,icon:e.findPointOfInterestIcon(t)},on:{click:function(n){e.clickedInterestingPlaceMarker(t)}}})}),n("gmap-info-window",{attrs:{options:e.infoOptions,position:e.infoWindowPos,opened:e.infoWinOpen},on:{closeclick:function(t){e.infoWinOpen=!1}}},[n("PlaceInfoBox",{attrs:{place:e.infoboxInterestingPlace}})],1),e.fastestPath.length>0?n("gmap-polyline",{ref:"polyline",attrs:{path:e.fastestPath,editable:!1}}):e._e(),e._l(e.polilineInterestingPathsField,function(e){return n("gmap-polyline",{attrs:{path:e.path,editable:!1,options:{strokeColor:e.color}}})})],2)],1)},u=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"terminalMarkerDescription"}},[n("div",{attrs:{id:"startMarkerDescription"}}),n("div",{attrs:{id:"endMarkerDescription"}})])}],p=(n("ac6a"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.placeDetails?n("div",{staticClass:"placeDescription"},[n("label",[n("b",[e._v(e._s(e.title))])]),n("label",[e._v(e._s(e.placeDetails.name)+"  ")]),n("label",[e._v(e._s(e.placeDetails.formatted_address))])]):e._e()}),d=[],f={name:"PlaceDescription",props:["title","map","placeid"],watch:{placeid:function(e,t){var n=this;if(null==e)this.placeDetails=null;else if(e){var o=new window.google.maps.places.PlacesService(this.map);o.getDetails({placeId:this.placeid},function(e,t){t===window.google.maps.places.PlacesServiceStatus.OK&&(n.placeDetails=e)})}}},data:function(){return{placeDetails:null}},mounted:function(){}},v=f,g=(n("9917"),n("2877")),m=Object(g["a"])(v,p,d,!1,null,"7bd6f035",null);m.options.__file="PlaceDescription.vue";var h=m.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.location?n("div",{staticClass:"addressDescription"},[n("label",[n("b",[e._v(e._s(e.title))])]),n("label",[e._v(e._s(e.address)+"  ")])]):e._e()},b=[],P={name:"AddressDescription",props:["title","map","location"],watch:{location:function(e){if(e){var t=this,n=new window.google.maps.Geocoder;n.geocode({location:this.location},function(e,n){"OK"===n&&(t.address=e[0].formatted_address)})}}},data:function(){return{address:null}}},k=P,I=(n("766c"),Object(g["a"])(k,_,b,!1,null,"5d4d2fbe",null));I.options.__file="AddressDescription.vue";var y=I.exports,M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.place?n("div",[n("div",[n("b",[e._v(e._s(e.place.place.name))])]),n("div",[e._v("\r\n            Ocena: "+e._s(e.place.place.rating)+"\r\n        ")]),n("div",[e._v("\r\n            "+e._s(e.place.place.vicinity)+"\r\n        ")]),n("button",{on:{click:function(t){e.addToPlan(e.place)}}},[e.place.isInPlan?e._e():n("label",[e._v("Odwiedź")]),e.place.isInPlan?n("label",[e._v("Anuluj")]):e._e()])]):e._e()])},w=[],j={name:"PlaceInfoBox",props:["place"],data:function(){return{}},methods:{addToPlan:function(e){e.isInPlan=!e.isInPlan,this.$eventHub.$emit("poiChange")}}},O=j,x=Object(g["a"])(O,M,w,!1,null,"3823ed32",null);x.options.__file="PlaceInfoBox.vue";var D=x.exports,R={name:"GoogleMap",props:["pointsOfInterest","routes","global"],components:{PlaceInfoBox:D,AddressDescription:y,PlaceDescription:h},data:function(){return{center:{lat:45.508,lng:-73.587},markers:[],places:[],currentPlace:null,startMarker:{location:null,description:null},endMarker:{location:null,description:null},mapObject:null,startPlaceId:null,endPlaceId:null,path:[],infoWindowPos:null,infoWinOpen:!1,infoOptions:{pixelOffset:{width:0,height:-35}},proposedInterestingPlaces:["ChIJv0QRf_HMHkcRv7d7R28ht3Q"],infoboxInterestingPlace:null,polilineInterestingPathsField:[]}},mounted:function(){var e=this,t=this;this.$refs.mapRef.$mapPromise.then(function(n){e.mapObject=n,t.global.map=n,e.calculateInterestingPlaces(e.proposedInterestingPlaces)}),this.geolocate(),this.$eventHub.$on("newRequest",function(e){console.log("Update!"),t.$forceUpdate()}),this.$eventHub.$on("updateRoutes",function(e){t.routes=e,t.polilineInterestingPathsField=t.polilineInterestingPathsFunc()})},computed:{fastestPath:function(){var e=[];if(this.routes.fastestRoute){var t=google.maps.geometry.encoding.decodePath(this.routes.fastestRoute.travelObjects[0].overview_polyline.points);t.forEach(function(t){e.push({lat:t.lat(),lng:t.lng()})})}return e},polilineInterestingPaths:function(){var e=[];return this.routes.interestingRoute&&this.routes.interestingRoute.travelObjects.forEach(function(t){var n=google.maps.geometry.encoding.decodePath(t.overview_polyline.points),o=[];n.forEach(function(e){o.push({lat:e.lat(),lng:e.lng()})}),e.push({path:o,color:t.color})}),e}},methods:{empty:function(){},geolocate:function(){var e=this;navigator.geolocation.getCurrentPosition(function(t){e.center={lat:t.coords.latitude,lng:t.coords.longitude}})},polilineInterestingPathsFunc:function(){var e=[];return this.routes.interestingRoute&&this.routes.interestingRoute.travelObjects.forEach(function(t){var n=google.maps.geometry.encoding.decodePath(t.overview_polyline.points),o=[];n.forEach(function(e){o.push({lat:e.lat(),lng:e.lng()})}),e.push({path:o,color:t.color})}),e},setStartPosition:function(e){this.startPlaceId=e.place_id,this.setStartMarker({lat:e.geometry.location.lat(),lng:e.geometry.location.lng()}),this.startMarker.location&&this.endMarker.location?this.fitBounds():this.center=this.startMarker.location},setEndPosition:function(e){this.endPlaceId=e.place_id,this.setEndMarker({lat:e.geometry.location.lat(),lng:e.geometry.location.lng()}),this.startMarker.location&&this.endMarker.location?this.fitBounds():this.center=this.endMarker.location},updateStartPosition:function(e){this.setStartMarker({lat:e.latLng.lat(),lng:e.latLng.lng()}),this.startPlaceId=null,this.startMarker.location&&this.endMarker.location&&this.fitBounds()},updateEndPosition:function(e){this.setEndMarker({lat:e.latLng.lat(),lng:e.latLng.lng()}),this.endPlaceId=null,this.startMarker.location&&this.endMarker.location&&this.fitBounds()},setStartMarker:function(e){this.startMarker.location=e,this.$eventHub.$emit("startPositionChange",this.startMarker.location)},setEndMarker:function(e){this.endMarker.location=e,this.$eventHub.$emit("endPositionChange",this.endMarker.location)},fitBounds:function(){var e=new google.maps.LatLngBounds;e.extend(this.startMarker.location),e.extend(this.endMarker.location),this.$refs.mapRef.fitBounds(e)},toggleInfoWindow:function(e){this.infoWindowPos=e,this.infoWinOpen=!0},clickedInterestingPlaceMarker:function(e){this.infoboxInterestingPlace=e,this.toggleInfoWindow(e.location)},calculateInterestingPlaces:function(e){var t=this.mapObject,n=this,o=new window.google.maps.places.PlacesService(t);e.forEach(function(e){o.getDetails({placeId:e},function(e,t){t===window.google.maps.places.PlacesServiceStatus.OK&&n.pointsOfInterest.push({location:{lat:e.geometry.location.lat(),lng:e.geometry.location.lng()},place:e,isInPlan:!1})})})},findPointOfInterestIcon:function(e){return e.isInPlan?"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png":"http://fxprotect.com/wp-content/uploads/2017/03/marker-blue.png"}}},C=R,T=(n("7843"),Object(g["a"])(C,c,u,!1,null,null,null));T.options.__file="GoogleMap.vue";var S=T.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("select",{directives:[{name:"model",rawName:"v-model",value:e.travelMode,expression:"travelMode"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.travelMode=t.target.multiple?n:n[0]}}},[n("option",{attrs:{disabled:"",value:"null"}},[e._v("Travel mode")]),n("option",{attrs:{value:"DRIVING"}},[e._v("Driving")]),n("option",{attrs:{value:"WALKING"}},[e._v("Walking")]),n("option",{attrs:{value:"BICYCLING"}},[e._v("Bicycling")]),n("option",{attrs:{value:"TRANSIT"}},[e._v("Transit")])]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.interestKeyword,expression:"interestKeyword"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.interestKeyword=t.target.multiple?n:n[0]}}},[n("option",{attrs:{disabled:"",value:"null"}},[e._v("What you are looking for")]),n("option",[e._v(" Museum")]),n("option",[e._v(" Restaurant")]),n("option",[e._v(" Shop")])]),n("button",{attrs:{disabled:(null==e.travelMode||null==e.interestKeyword||null==e.startPositionLocation||null==e.endPositionLocation)&&!1},on:{click:e.query}},[e._v("Query")])])},E=[],L=(n("7514"),n("bc3a")),H=n.n(L),B={name:"QueryControls",props:["pointsOfInterest","routes","global"],data:function(){return{travelMode:null,interestKeyword:null,startPositionLocation:null,endPositionLocation:null}},mounted:function(){var e=this;this.$eventHub.$on("startPositionChange",function(t){e.startPositionLocation=t}),this.$eventHub.$on("endPositionChange",function(t){e.endPositionLocation=t})},methods:{generateColor:function(e){var t=["#FF0000","#FF00FF","#00FF00","#0000FF","#00FFFF","#FF0088"];return t[e%t.length]},foo:function(e,t,n){t.data.place_id.forEach(function(t){if(!n.find(function(e){return e.place.place_id===t})){var o=new window.google.maps.places.PlacesService(e.global.map);o.getDetails({placeId:t},function(t,n){n===window.google.maps.places.PlacesServiceStatus.OK&&e.routes.interestingPointsNearRoute.push({location:{lat:t.geometry.location.lat(),lng:t.geometry.location.lng()},place:t,isInPlan:!1,timeSpent:.5})})}})},calculateTravelTime:function(e){var t=0;return e.legs[0].steps.forEach(function(e){t+=e.duration.value}),t},query:function(){var e=this,t=[],n=[];this.routes.interestingPointsInRoute.forEach(function(e){e.isInPlan&&(t.push({timeToSpend:3600*e.timeSpent,place_id:e.place.place_id}),n.push(e))}),this.routes.interestingPointsNearRoute&&this.routes.interestingPointsNearRoute.forEach(function(e){e.isInPlan&&(t.push({timeToSpend:3600*e.timeSpent,place_id:e.place.place_id}),n.push(e))});var o={startPosition:{lat:this.startPositionLocation.lat,lng:this.startPositionLocation.lng},endPosition:{lat:this.endPositionLocation.lat,lng:this.endPositionLocation.lng},travelMode:this.travelMode.toLowerCase(),pointsOfInterestKeyword:this.interestKeyword};console.log("We make request!");var a=this;if(a.routes.interestingPointsInRoute=[],a.routes.interestingPointsNearRoute=[],H.a.get("http://127.0.0.1:8080/api/messages/",{params:o}).then(function(o){a.routes.fastestRoute={travelObjects:[o.data.routes[0]],travelTime:e.calculateTravelTime(o.data.routes[0])},0===t.length&&e.foo(a,o,n),a.$eventHub.$emit("newRequest")}).catch(function(e){console.log("Error in request: "+e)}),t.length>0){a.routes.interestingPointsInRoute=n;var s=[];s.push({lat:this.startPositionLocation.lat,lng:this.startPositionLocation.lng}),n.forEach(function(e){s.push({lat:e.place.geometry.location.lat(),lng:e.place.geometry.location.lng()})}),s.push({lat:this.endPositionLocation.lat,lng:this.endPositionLocation.lng}),a.routes.interestingPointsInRoute=n,a.routes.interestingRoute={},a.routes.interestingRoute.travelObjects=[],a.routes.interestingRoute.travelTime=0,n.forEach(function(e){a.routes.interestingRoute.travelTime+=3600*e.timeSpent});for(var i=0,r=0;r<s.length-1;r++)o={startPosition:s[r],endPosition:s[r+1],travelMode:this.travelMode.toLowerCase(),pointsOfInterestKeyword:this.interestKeyword},console.log("RequestX: "+r),H.a.get("http://127.0.0.1:8080/api/messages",{params:o}).then(function(t){var o=t.data.routes[0];o.color=a.generateColor(i),a.foo(a,t,n),a.routes.interestingRoute.travelObjects.push(o),a.routes.interestingRoute.travelTime+=e.calculateTravelTime(t.data.routes[0]),a.$eventHub.$emit("newRequest"),a.$eventHub.$emit("updateRoutes",a.routes),i++}).catch(function(e){console.log("Error in request: "+e)})}}}},z=B,F=Object(g["a"])(z,$,E,!1,null,"96bb7c0e",null);F.options.__file="QueryControls.vue";var N=F.exports,K=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.routes.fastestRoute?n("div",{staticClass:"pathDescription"},[n("div",[n("div",[n("b",[e._v(e._s(e.routeName))])]),n("div",[e._v("Czas podróży:"+e._s(e._f("timeInHours")(e.travelTime)))]),n("div",[e._v("Czas wyjazdu:"+e._s(e._f("formatDate")(e.startTime)))]),n("div",[e._v("Czas przyjazdu:"+e._s(e._f("formatDate")(e.endTime)))])]),e._l(e.routes.fastestRoute.travelObjects[0].legs[0].steps,function(e){return n("div",[n("PathStepDescription",{attrs:{stepInfo:e}})],1)})],2):e._e()},A=[],G=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pathStepDescription"},[n("div",[e._v("Dystans: "+e._s(e.stepInfo.distance.text))]),n("div",[e._v("Czas trwania: "+e._s(e.stepInfo.duration.text))]),n("div",{domProps:{innerHTML:e._s(e.stepInfo.html_instructions)}})])},W=[],q={name:"PathStepDescription",props:["stepInfo"]},Q=q,V=(n("9056"),Object(g["a"])(Q,G,W,!1,null,"46d12fec",null));V.options.__file="PathStepDescription.vue";var J=V.exports,U={name:"PathDescriptionBox",components:{PathStepDescription:J},props:["routes","routeName"],data:function(){return{steps:[]}},mounted:function(){},computed:{startTime:function(){return new Date},travelTime:function(){return this.routes.fastestRoute.travelTime},endTime:function(){return new Date(this.startTime.getTime()+1e3*this.travelTime)}}},Z=U,X=(n("f160"),Object(g["a"])(Z,K,A,!1,null,"6fb302ff",null));X.options.__file="PathDescriptionBox.vue";var Y=X.exports,ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._l(e.routes.interestingPointsInRoute,function(t){return n("div",[t.isInPlan?n("div",[n("div",[e._v(e._s(t.place.name))]),n("div",[e._v("\n                Czas spędzony: "),n("vue-slider-component",{attrs:{min:.5,max:6,interval:.5,formatter:"{value} godzin"},model:{value:t.timeSpent,callback:function(n){e.$set(t,"timeSpent",n)},expression:"poi.timeSpent"}})],1),n("div",{domProps:{innerHTML:e._s(t.place.adr_address)}}),n("div",[e._v("Ocena: "+e._s(t.place.rating))])]):e._e()])}),e._l(e.routes.interestingPointsNearRoute,function(t){return n("div",[t.isInPlan?n("div",[n("div",[e._v(e._s(t.place.name))]),n("div",[e._v("\n                Czas spędzony: "),n("vue-slider-component",{attrs:{min:.5,max:6,interval:.5,formatter:"{value} godzin"},model:{value:t.timeSpent,callback:function(n){e.$set(t,"timeSpent",n)},expression:"poi.timeSpent"}})],1),n("div",{domProps:{innerHTML:e._s(t.place.adr_address)}}),n("div",[e._v("Ocena: "+e._s(t.place.rating))])]):e._e()])})],2)},te=[],ne={name:"PoiPlan",components:{VueSliderComponent:l["a"]},props:["routes"],data:function(){return{pois:[]}},mounted:function(){var e=this;this.$eventHub.$on("poiChange",function(t){e.$forceUpdate()})}},oe=ne,ae=Object(g["a"])(oe,ee,te,!1,null,"2e93d48d",null);ae.options.__file="PoiPlan.vue";var se=ae.exports,ie=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.routes.interestingRoute?n("div",{staticClass:"pathDescription"},[n("div",[e._m(0),n("div",[e._v("Czas podróży:"+e._s(e._f("timeInHours")(e.travelTime))+" "),n("span",{staticClass:"timeDelta"},[e._v("+"+e._s(e._f("timeInHours")(e.deltaTime)))])]),n("div",[e._v("Czas wyjazdu:"+e._s(e._f("formatDate")(e.startTime)))]),n("div",[e._v("Czas przyjazdu:"+e._s(e._f("formatDate")(e.endTime)))])]),e._l(e.travelObjects,function(t,o){return n("div",{key:t.location},[e.routes.interestingPointsInRoute[o]?n("div",[n("b",[e._v(e._s(o+1)+":")]),e._v(" Trasa do "),n("b",[e._v(e._s(e.routes.interestingPointsInRoute[o].place.name))])]):e._e(),n("div",[e._v("Odcinek "),n("b",[e._v(e._s(t.summary))])]),n("div",[e._v("Czas odcinka:"+e._s(t.legs[0].duration.text))]),e._l(t.legs[0].steps,function(e){return n("div",{key:e.end_address},[n("PathStepDescription",{attrs:{stepInfo:e}})],1)})],2)})],2):e._e()},re=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b",[e._v("Trasa ciekawa")])])}],le={name:"InterestingPathDescriptionBox",components:{PathStepDescription:J},props:["routes"],data:function(){return{steps:[],travelObjects:[]}},mounted:function(){var e=this;e.$eventHub.$on("updateRoutes",function(t){e.travelObjects=t.interestingRoute.travelObjects})},computed:{startTime:function(){return new Date},travelTime:function(){return this.routes.interestingRoute.travelTime},endTime:function(){return new Date(this.startTime.getTime()+1e3*this.travelTime)},deltaTime:function(){return this.travelTime-this.routes.fastestRoute.travelTime}}},ce=le,ue=(n("ee61"),Object(g["a"])(ce,ie,re,!1,null,"5e3af572",null));ue.options.__file="InterestingPathDescriptionBox.vue";var pe=ue.exports,de={name:"app",components:{InterestingPathDescriptionBox:pe,PathDescriptionBox:Y,GoogleMap:S,QueryControls:N,PlaceDescription:h,AddressDescription:y,PlaceInforBox:D,PoiPlan:se,vueSlider:l["a"]},data:function(){return{pointsOfInterest:[],routes:{fastestRoute:null,interestingRoute:null,interestingPointsInRoute:[]},global:{map:{}}}},mounted:function(){var e=this;this.$eventHub.$on("updateRoutes",function(t){e.routes=t})},GOOGLE_API_KEY:"AIzaSyDCLwOaPymlOIpbOZcVZLzhqLZVHxaIbf8"},fe=de,ve=(n("034f"),Object(g["a"])(fe,i,r,!1,null,null,null));ve.options.__file="App.vue";var ge=ve.exports,me=n("755e"),he=n("1559"),_e=(n("a594"),n("2f62")),be=n("a78e"),Pe=n.n(be),ke=H.a.create({baseURL:"/api",timeout:5e3,headers:{"Content-Type":"application/json","X-CSRFToken":Pe.a.get("csrftoken")}}),Ie={fetchMessages:function(){return ke.get("messages/",{params:{startPosition:{lat:52.2288242,lng:21.0130819},endPosition:{lat:52.228569,lng:21.0155288},travelMode:"DRIVING",waypointPointsOfInterest:[{timeToSpend:600,place_id:"ChIJ2X3Sqe7MHkcRA8bKf48xRgU"},{timeToSpend:1200,place_id:"ChIJZ6Mm9CvNHkcR8X0Q_rNKHTY"}],pointsOfInterestKeyword:"restaurant"}}).then(function(e){return e.data})},postMessage:function(e){return ke.post("messages/",e).then(function(e){return e.data})},deleteMessage:function(e){return ke.delete("messages/".concat(e)).then(function(e){return e.data})}},ye={messages:[]},Me={messages:function(e){return e.messages}},we={getMessages:function(e){var t=e.commit;Ie.fetchMessages().then(function(e){t("setMessages",e)})},addMessage:function(e,t){var n=e.commit;Ie.postMessage(t).then(function(){n("addMessage",t)})},deleteMessage:function(e,t){var n=e.commit;Ie.deleteMessage(t),n("deleteMessage",t)}},je={setMessages:function(e,t){e.messages=t},addMessage:function(e,t){e.messages.push(t)},deleteMessage:function(e,t){e.messages=e.messages.filter(function(e){return e.pk!==t})}},Oe={namespaced:!0,state:ye,getters:Me,actions:we,mutations:je};s["a"].use(_e["a"]);var xe=new _e["a"].Store({modules:{messages:Oe}}),De=n("8c4f"),Re=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},Ce=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"hello"},[o("img",{attrs:{src:n("e669")}}),o("p",[e._v("\n    For guide and recipes on how to configure / customize this project,"),o("br"),e._v("\n    check out the\n    "),o("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(".\n  ")]),o("h3",[e._v("Installed CLI Plugins")]),o("ul",[o("li",[o("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[e._v("babel")])]),o("li",[o("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",target:"_blank",rel:"noopener"}},[e._v("eslint")])])]),o("h3",[e._v("Essential Links")]),o("ul",[o("li",[o("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),o("li",[o("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),o("li",[o("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),o("li",[o("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),o("li",[o("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])]),o("h3",[e._v("Ecosystem")]),o("ul",[o("li",[o("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),o("li",[o("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),o("li",[o("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),o("li",[o("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),o("li",[o("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])])}],Te={name:"VueDemo",props:{}},Se=Te,$e=(n("c19a"),Object(g["a"])(Se,Re,Ce,!1,null,"1fef0148",null));$e.options.__file="VueDemo.vue";var Ee=$e.exports,Le=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"hello"},[o("img",{staticStyle:{width:"250px"},attrs:{src:n("bdfd")}}),o("p",[e._v("The data below is added/removed from the SQLite Database using Django's ORM and Rest Framework.")]),o("br"),o("p",[e._v("Subject")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.subject,expression:"subject"}],attrs:{type:"text",placeholder:"Hello"},domProps:{value:e.subject},on:{input:function(t){t.target.composing||(e.subject=t.target.value)}}}),o("p",[e._v("Message")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.msgBody,expression:"msgBody"}],attrs:{type:"text",placeholder:"From the other side"},domProps:{value:e.msgBody},on:{input:function(t){t.target.composing||(e.msgBody=t.target.value)}}}),o("br"),o("br"),o("input",{attrs:{type:"submit",value:"Add",disabled:!e.subject||!e.msgBody},on:{click:function(t){e.addMessage({subject:e.subject,body:e.msgBody})}}}),o("hr"),o("h3",[e._v("Messages on Database")]),0===e.messages.length?o("p",[e._v("No Messages")]):e._e(),e._l(e.messages,function(t,n){return o("div",{key:n,staticClass:"msg"},[o("p",{staticClass:"msg-index"},[e._v("["+e._s(n)+"]")]),o("p",{staticClass:"msg-subject",domProps:{innerHTML:e._s(t.subject)}}),o("p",{staticClass:"msg-body",domProps:{innerHTML:e._s(t.body)}}),o("input",{attrs:{type:"submit",value:"Delete"},on:{click:function(n){e.deleteMessage(t.pk)}}})])})],2)},He=[],Be={name:"Messages",data:function(){return{subject:"",msgBody:""}},computed:Object(_e["c"])({messages:function(e){return e.messages.messages}}),methods:Object(_e["b"])("messages",["addMessage","deleteMessage"]),created:function(){this.$store.dispatch("messages/getMessages")}},ze=Be,Fe=(n("4bd4"),Object(g["a"])(ze,Le,He,!1,null,"34ae3f99",null));Fe.options.__file="Messages.vue";var Ne=Fe.exports;s["a"].use(De["a"]);var Ke=new De["a"]({routes:[{path:"/",name:"home",component:Ee},{path:"/messages",name:"messages",component:Ne}]});s["a"].config.productionTip=!1,s["a"].use(me,{load:{key:ge.GOOGLE_API_KEY,libraries:["places","geometry"]}}),s["a"].use(he["a"]),s["a"].use(H.a),s["a"].prototype.$pois=[],s["a"].prototype.$eventHub=new s["a"],s["a"].filter("timeInHours",function(e){var t=a()(Math.floor(e/3600)),n=a()(Math.floor((e-3600*t)/60)),o=(a()((e-(360*t+60*n))%60),t>9?t:"0"+t),s=n>9?n:"0"+n;return o+":"+s}),s["a"].filter("formatDate",function(e){if(e){var t=e.getMinutes(),n=t>9?t:"0"+t;return e.getHours()+":"+n}}),new s["a"]({router:Ke,store:xe,render:function(e){return e(ge)}}).$mount("#app")},"5da9":function(e,t,n){},"64a9":function(e,t,n){},"766c":function(e,t,n){"use strict";var o=n("5da9"),a=n.n(o);a.a},7718:function(e,t,n){},7843:function(e,t,n){"use strict";var o=n("ee2d"),a=n.n(o);a.a},9056:function(e,t,n){"use strict";var o=n("43ef"),a=n.n(o);a.a},9917:function(e,t,n){"use strict";var o=n("9c9d"),a=n.n(o);a.a},"9c9d":function(e,t,n){},bdfd:function(e,t,n){e.exports=n.p+"static/img/logo-django.624de952.png"},c19a:function(e,t,n){"use strict";var o=n("e331"),a=n.n(o);a.a},e331:function(e,t,n){},e669:function(e,t,n){e.exports=n.p+"static/img/logo-vue.82b9c7a5.png"},ee2d:function(e,t,n){},ee61:function(e,t,n){"use strict";var o=n("ff4c"),a=n.n(o);a.a},f160:function(e,t,n){"use strict";var o=n("0db2"),a=n.n(o);a.a},ff4c:function(e,t,n){}});
//# sourceMappingURL=app.894cc111.js.map