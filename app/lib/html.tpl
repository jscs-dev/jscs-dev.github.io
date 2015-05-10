<html>
<head>
    <meta charset="UTF-8">
    <title>{%title%}</title>
    <link rel="stylesheet" type="text/css" href="{%stylePath%}" />
</head>
<body>
    <div id="root">
        {%content%}
    </div>
    <script type="application/javascript">
        window.__locationState = {%locationState%};
    </script>
    <script type="application/javascript" src="{%dataPath%}"></script>
    <script type="application/javascript" src="{%scriptPath%}"></script>
</body>
</html>
