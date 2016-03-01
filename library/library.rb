require 'yaml'
require 'nokogiri'

module Library
  module_function
  #
  def parse_item item
    if item['node']
      '<li><div class="esplib-item">' + item['name'] + '</div><div class="esplib-node">' + item['node'] + '</div></li>'
    else
      "<li><div class=\"esplib-item\"><span class=\"esplib-tag\">#{ item['tag'] }</span><span class=\"esplib-name\"><a href=\"#{ item['url'] }\">#{ item['name'] }</a></span><span class=\"esplib-meta\">#{ item['author'] } <time>#{ item['date'] }</time></span></div><div class=\"esplib-more\">#{ item['intro'] }</div></li>"
    end
  end
  #
  def parse_floor fl
    contents = fl['header'] || ''
    contents += '<ul class="esplib-list">'
    (fl['items'] || []).each{|item| contents += parse_item item}
    contents += '</ul>'
    contents += fl['footer'] || ''
    contents
  end
  #
  def generate src, dest = nil
    abort unless FileTest.exist? src
    lib = YAML.load File.read src
    contents = []
    lib.each{|fl| contents.push parse_floor fl}
    res = contents.join ?\n*10
    res = yield res if block_given?
    open(dest || src + '.out', ?w){|f| f.write "\uFEFF" + res}
  end
end

Library.generate('library.yml', 'library.html'){|res|
  style = <<STYLE
.esplib-list > li {
  margin: 5px;
  list-style-type: none;
}
.esplib-item {
  display: inline;
}
.esplib-tag, .esplib-meta {
  font-size: 12px;
  color: #a12b17;
}
.esplib-name {
  margin-left: 5px;
  margin-right: 5px;
}
.esplib-node {
  margin-left: 20px;
}
.esplib-more {
  display: inline;
}
STYLE
  script = <<SCRIPT
!window.jQuery && document.write('<script src="https://cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min.js"><\\/script>');
SCRIPT
  html = '<!doctype html><html><head><title>Library</title><style>' + style + '</style></head><body>' + res + '<script type="text/javascript">' + script + '</script></body></html>'
  Nokogiri::HTML(html).to_html
}

