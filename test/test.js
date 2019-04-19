const a = 'x'
const b = '<%= this.title %>'
<% if( this.title  ) {%>
const c = 10
<%}%>

function x(b) {
  return a + b
}

x(b)