(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{355:function(e,t,n){"use strict";function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){r(e,t,n[t])})}return e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t);let o=null;function i(e,t){return async function(e,t={}){const{headers:n={},body:r=null}=t;o&&(n.Authorization=`Bearer ${o}`),r&&(t.body=JSON.stringify(r));const i=new Request(e,a({},t,{headers:new Headers(a({"Content-Type":"application/json"},n))}));return fetch(i).then(e=>{if(!e.ok)throw Error(e.statusText);return e})}(`/api${e}`,t)}"undefined"!=typeof Storage&&(o=localStorage.authToken);var s=n(27);n.d(t,"getEvents",function(){return c}),n.d(t,"getEvent",function(){return l}),n.d(t,"addRegistrant",function(){return u}),n.d(t,"getEventRegistrants",function(){return m}),n.d(t,"toggleResultDialog",function(){return f});const c=()=>({type:s.c,payload:i("/events").then(e=>e.json())}),l=e=>({type:s.b,payload:i(`/events/${e}`).then(e=>e.json())}),u=(e,t)=>({type:s.a,payload:i(`/events/${e}/registrant`,{method:"POST",body:t}).then()}),m=e=>({type:s.d,payload:i(`/events/${e}/registrant`).then(e=>e.json())}),f=()=>({type:s.e})},435:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(44),i=n(43),s=n(21),c=n(92),l=n.n(c),u=n(138),m=n.n(u),f=n(40),d=n.n(f),p=n(37),h=n(355);function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.default=Object(o.a)(Object(i.b)(e=>({events:e.events}),e=>({actions:Object(s.b)(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){g(e,t,n[t])})}return e}({},h),e)}))(class extends a.PureComponent{constructor(...e){var t;return t=super(...e),this.state={firstName:"",lastName:"",email:"",eventId:""},t}componentDidMount(){const{match:e={},actions:t}=this.props,{params:n={}}=e,{eventId:a=""}=n;t.getEvent(a),this.setState({eventId:a})}render(){const{events:e,actions:t,history:n}=this.props,{firstName:a,lastName:o,email:i,eventId:s}=this.state,{event:c}=e;return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center",style:{paddingTop:"2em"}},r.a.createElement(p.m,{component:"h3",variant:"h3"},c.name&&c.name.text),r.a.createElement("img",{src:c.logo&&c.logo.url,width:250,height:250})),r.a.createElement(l.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center",style:{height:"100vh"}},r.a.createElement(l.a,{item:!0,xs:9},r.a.createElement(m.a,{value:a,fullWidth:!0,label:"First Name",onChange:e=>this.setState({firstName:e.target.value})}),r.a.createElement(m.a,{value:o,fullWidth:!0,label:"Last Name",onChange:e=>this.setState({lastName:e.target.value})}),r.a.createElement(m.a,{value:i,fullWidth:!0,label:"Email",onChange:e=>this.setState({email:e.target.value})}),r.a.createElement(l.a,{container:!0,justify:"center",item:!0},r.a.createElement(d.a,{variant:"outlined",onClick:()=>{t.addRegistrant(s,this.state),this.setState({firstName:"",lastName:"",email:""})},disabled:!a&&!o&&!i},"Submit")))))}}))}}]);