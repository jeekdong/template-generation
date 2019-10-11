const ejs = require('ejs')

const str = `
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
`
var template = ejs.compile(str)
console.log(template({
  user: {
    name: 'test'
  }
}))
