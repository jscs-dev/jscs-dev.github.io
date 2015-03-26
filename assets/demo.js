(function(CodeMirror, JscsStringChecker) {
    var revalidateHandler = function() {};
    var editor;

    var presetSelect = document.getElementById('demo-preset');
    presetSelect.onclick = presetSelect.onchange = revalidate;

    var indentSelect = document.getElementById('demo-indent');
    indentSelect.onclick = indentSelect.onchange = revalidate;

    function revalidate() {
        revalidateHandler(editor.getValue());
    }

    function jscsValidator(text) {
        var checker = new JscsStringChecker();
        checker.registerDefaultRules();
        var options = {preset: presetSelect.value};
        var indent = indentSelect.value;
        if (indent) {
            if (!isNaN(parseInt(indent))) {
                indent = parseInt(indent);
            }
            options.validateIndentation = indent;
        }
        checker.configure(options);
        var errors = checker.checkString(text, 'input');
        return errors.getErrorList().map(function(error) {
            return {
                message: errors.explainError(error),
                severity: 'warning',
                from: CodeMirror.Pos(error.line - 1, error.column),
                to: CodeMirror.Pos(error.line - 1, error.column)
            };
        });
    }

    function asyncJscsValidator(text, updateLinting, options, cm) {
        options.requestValidation(text, function(text) {
            updateLinting(cm, jscsValidator(text, options))
        });
    }

    editor = CodeMirror.fromTextArea(document.getElementById('demo-input'), {
        mode: 'javascript',
        lint: {
            async: true,
            getAnnotations: asyncJscsValidator,
            requestValidation: function(text, validator) {
                revalidateHandler = validator;
                validator(text);
            }
        },
        lineNumbers: true,
        gutters: ['CodeMirror-lint-markers'],
        indentUnit: 4
    });

    //editor.setOption('extraKeys', {
    //    Tab: function(cm) {
    //        var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
    //        cm.replaceSelection(spaces);
    //    }
    //});
})(CodeMirror, JscsStringChecker);
