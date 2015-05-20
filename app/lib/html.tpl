<html>
<head>
    <meta charset="UTF-8">
    <title>{%title%}</title>
    <link rel="stylesheet" type="text/css" href="{%stylePath%}" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
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
