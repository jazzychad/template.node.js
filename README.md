# template.node.js

A templating system for [node.js](http://nodejs.org) based on 
John Resig's [JavaScript Micro-Templating](http://ejohn.org/blog/javascript-micro-templating/).

## Templates

Templates are just files with special <% %> tags (like PHP or Ruby tags) which will be replaced with passed-in data. 
Templates can also contain javascript code to be expanded.

### Example Template
    <html>
    <body>
     Hello, <%=name>.
    </body>
    </html>

### Example Template with javascript
    <html>
    <body>
    <% for (var i = 0; i < arr.length; i++) { %>
        The value of arr[<%=i%>] is <%=arr[i]%> <br/>
    <% } %>
    </body>
    </html>

## Usage

    template.tmpl(str, data)
       Parameters:
          str  - filename of template to load
          data - object containing data to replace in the template
       Returns:
          String of the template file with all code/variables replaced with data object contents
       Example:
          var foo = template.tmpl("./hello.template", {name:"Chad"});
          sys.puts(foo);


    template.tmpl(str)
       Parameters:
          str - filename of template to load
       Returns:
          Pre-compiled/generated function to which you can pass a data object
       Example:
          var bar = template.tmpl("./hello.template");
          var baz = bar({name:"Bob"});
          sys.puts(baz);

## Other Info

Templates are cached after the first read from disk. This means that if you change a template file, 
you will need to restart the node app to see the change take effect.

There is an included example webserver app called example.js which uses the Nerve module to route URI requests.
You can find the [Nerve module here](http://github.com/gjritter/nerve/).
