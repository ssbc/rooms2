const header = `<html>
<head>
<style>
html {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
table {
  border-collapse: collapse;
}
td, th {
  padding: 0.5rem;
  border: 1px #aaa solid;
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

