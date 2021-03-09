const header = `<html>
<head>
<style>
html {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 80px 0;
  line-height: 1.5em;
}
h2 {
  margin-top: 70px;
}
h3 {
  margin-top: 50px;
}
table {
  border-collapse: collapse;
}
td, th {
  padding: 0.5rem;
  border: 1px #aaa solid;
}
a[href^="http"]::after {
  content: "⧉";
}
a[href^="#"] {
  text-decoration: none;
  border-bottom: 1px blue dotted;
}
</style>
</head>
<script crossorigin src="https://unpkg.com/mermaid@8.9.1/dist/mermaid.min.js"></script>
<body>
`

const footer = `
</body>
</html>
`
module.exports = function (input) {
    return [header, input, footer].join("\n")
}

