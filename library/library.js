document.write('<script src="https://cdn.bootcss.com/js-yaml/3.5.3/js-yaml.min.js"><\/script>');
function Library(url) {
  var decode=function(str){function base64decode(str){var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);var c1,c2,c3,c4;var i,len,out;len=str.length;i=0;out="";while(i<len){do{c1=base64DecodeChars[str.charCodeAt(i++)&255]}while(i<len&&c1==-1);if(c1==-1){break}do{c2=base64DecodeChars[str.charCodeAt(i++)&255]}while(i<len&&c2==-1);if(c2==-1){break}out+=String.fromCharCode((c1<<2)|((c2&48)>>4));do{c3=str.charCodeAt(i++)&255;if(c3==61){return out}c3=base64DecodeChars[c3]}while(i<len&&c3==-1);if(c3==-1){break}out+=String.fromCharCode(((c2&15)<<4)|((c3&60)>>2));do{c4=str.charCodeAt(i++)&255;if(c4==61){return out}c4=base64DecodeChars[c4]}while(i<len&&c4==-1);if(c4==-1){break}out+=String.fromCharCode(((c3&3)<<6)|c4)}return out}function utf8to16(str){var out,i,len,c;var char2,char3;out="";len=str.length;i=0;while(i<len){c=str.charCodeAt(i++);switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:out+=str.charAt(i-1);break;case 12:case 13:char2=str.charCodeAt(i++);out+=String.fromCharCode(((c&31)<<6)|(char2&63));break;case 14:char2=str.charCodeAt(i++);char3=str.charCodeAt(i++);out+=String.fromCharCode(((c&15)<<12)|((char2&63)<<6)|((char3&63)<<0));break}}return out}return utf8to16(base64decode(str))};
  function parseItem(item) {
    if (item.node)
      return '<li><div class="esplib-item">' + item.name + '</div><div class="esplib-node">' + item.node + '</div></li>';
    else
      return '<li><div class="esplib-item"><span class="esplib-tag">' + item.tag + '</span><span class="esplib-name"><a href="' + item.url + '">' + item.name + '</a></span><span class="esplib-meta">' + item.author + ' <time>' + item.date + ' </time></span></div><div class="esplib-more">' + item.intro + '</div></li>';
  }
  function parseFloor(floor) {
    var contents = floor.header || '';
    contents += '<ul class="esplib-list">';
    (floor.items || []).forEach(function(item){contents += parseItem(item);});
    contents += '</ul>';
    contents += floor.footer || '';
    return contents;
  }
  function generate(yfile) {
    var lib = jsyaml.load(decode(JSON.parse(yfile).content));
    var cts = [];
    lib.forEach(function(fl){cts.push(parseFloor(fl))});
    ['postmessage_2648222', 'postmessage_2648223', 'postmessage_2648224', 'postmessage_2648225', 'postmessage_2648226', 'postmessage_2648227'].forEach(function(e, i){document.getElementById(e).innerHTML = cts[i];});
    document.getElementById('postmessage_2648262').innerHTML = "前排占座";
  }
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      generate(xmlHttp.responseText);
  }
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}

Library('https://api.github.com/repos/esphas/RM6R/contents/library/library.yml');
