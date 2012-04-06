var hem  = new (require('hem'));
var HamlCoffee = require('haml-coffee/lib/haml-coffee');
var CoffeeScript = require('coffee-script')
var fs   = require('fs');
var argv = process.argv.slice(2);

hem.compilers.haml = function(path) {
  var compiler, content, template;
  compiler = new HamlCoffee({});
  content = fs.readFileSync(path, 'utf8');
  compiler.parse(content);
  template = compiler.render("template", "context");
  template = CoffeeScript.compile(template);
  return "module.exports = (function(data){ " + template + " return context['template'](data); })";
};

module.exports = hem