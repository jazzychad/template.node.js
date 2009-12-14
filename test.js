
var sys = require("sys"),
    template = require("./template");

/* create some data objects */
var myobj = {obj : {num: 5, person:"Jack"}};
var myobj2 = {obj : {num: 10, person:"Jill"}};

/* put the templated data in a string and puts it */
var stuff = template.tmpl("./tmpls/t1.template", myobj);
sys.puts(stuff);

/* puts the formatted data directly */
sys.puts(template.tmpl("./tmpls/t1.template", myobj2));

/* assign a variable and use it in a template data object */
var name = "chad";
sys.puts(template.tmpl("./tmpls/t2.template", {name:name}));

/* use a string literal in the template data object */
sys.puts(template.tmpl("./tmpls/t2.template", {name:"Bob"}));

/* create a template generator function using the tmpl currying */
var f = template.tmpl("./tmpls/t2.template");
/* run the generator against a data object */
sys.puts(f({name:"alice"}));

/* yet another example */
var data = {users: [{name:"Chad", age:25}, {name:"Bob", age:40}]};
sys.print(template.tmpl("./tmpls/t3.template", data));

