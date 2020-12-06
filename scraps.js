var ScrapsContext = (function () {
    function ScrapsContext() {
        this.scraps = [];
    }
    ScrapsContext.prototype.register = function (kernel) {
        this.scraps.push(kernel);
        return this;
    };
    ScrapsContext.prototype.executeStack = function (flush) {
        this.scraps.forEach(function (scrap) {
            var result = scrap.evaluate(flush);
            scrap.updateEvaluationResponse(result);
        });
    };
    return ScrapsContext;
}());
function mobileCheck() {
    var check = 0;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = 1;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
var SCRAPS_EVALUATION_RESULT_TYPE;
(function (SCRAPS_EVALUATION_RESULT_TYPE) {
    SCRAPS_EVALUATION_RESULT_TYPE[SCRAPS_EVALUATION_RESULT_TYPE["ARTIFACT"] = 0] = "ARTIFACT";
    SCRAPS_EVALUATION_RESULT_TYPE[SCRAPS_EVALUATION_RESULT_TYPE["EDITING"] = 1] = "EDITING";
    SCRAPS_EVALUATION_RESULT_TYPE[SCRAPS_EVALUATION_RESULT_TYPE["COMPILATION_ERROR"] = 2] = "COMPILATION_ERROR";
    SCRAPS_EVALUATION_RESULT_TYPE[SCRAPS_EVALUATION_RESULT_TYPE["RUNTIME_ERROR"] = 3] = "RUNTIME_ERROR";
})(SCRAPS_EVALUATION_RESULT_TYPE || (SCRAPS_EVALUATION_RESULT_TYPE = {}));
var ScrapsEvaluationResponse = (function () {
    function ScrapsEvaluationResponse(type, data) {
        this.type = type;
        this.data = data;
    }
    return ScrapsEvaluationResponse;
}());
var CodeSandbox = (function () {
    function CodeSandbox(scrap, code) {
        var _this = this;
        var sandbox = this;
        this.scrap = scrap;
        this.input = code.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        this.element = document.createElement('textarea');
        this.element.className = "code-input-";
        this.element.value = this.input;
        this.element.style.width = "100%";
        this.element.rows = 8;
        this.element.spellcheck = false;
        this.output_element = document.createElement('pre');
        this.output_element.className = "code-output-";
        this.output_code = document.createElement('code');
        this.output_code.className = "language-javascript";
        this.output_element.appendChild(this.output_code);
        this.element.onscroll = function () {
            sandbox.output_code.scrollTop = sandbox.element.scrollTop;
            sandbox.output_code.scrollLeft = sandbox.element.scrollLeft;
        };
        this.element.onkeydown = this.element.onpaste = function (event) {
            if (!_this.window_scroll) {
                _this.window_scroll = window.scrollY;
            }
            _this.scrap.clearWarning();
            var input = sandbox.element, selStartPos = input.selectionStart, inputVal = input.value;
            if (event instanceof KeyboardEvent && event.keyCode && event.keyCode === 9) {
                input.value = inputVal.substring(0, selStartPos) + "    " + inputVal.substring(selStartPos, input.value.length);
                input.selectionStart = selStartPos + 4;
                input.selectionEnd = selStartPos + 4;
                event.preventDefault();
            }
            if (mobileCheck() === 0) {
                window.setTimeout(function () {
                    sandbox.renderCodeHighlighting();
                }, 1);
            }
            _this.scrap.updateEvaluationResponse(new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.EDITING, {}));
        };
        this.element.oninput = function () {
            _this.scrap.clearWarning();
            if (mobileCheck() === 1) {
                sandbox.renderCodeHighlighting();
            }
            return false;
            context.executeStack(false);
        };
    }
    CodeSandbox.prototype.renderCodeHighlighting = function () {
        this.element.style.height = "5px";
        this.element.style.height = (this.element.scrollHeight) + "px";
        this.output_code.style.height = (this.element.scrollHeight) + "px";
        this.input = this.element.value;
        this.output_code.innerHTML = this.input.replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;") + "\n";
        var t;
        t = Date.now();
        window['Prism'].highlightElement(this.output_code, false);
    };
    CodeSandbox.prototype.getElement = function () {
        var el = document.createElement('div');
        el.className = 'code';
        el.appendChild(this.element);
        el.appendChild(this.output_element);
        return el;
    };
    CodeSandbox.prototype.getCompiled = function () {
        var build_variables = "\n\t\tfunction makeIdentifiableProperty(i){\n\t\t\treturn typeof i + (!!i?i.toString():\"unknown\");\n\t\t}\n\t\tlet utils = new KernelUtils(kernel);\n\t\tlet p = utils.p.bind(utils);\n\t\tlet h1 = utils.h1.bind(utils);\n\t\tlet h2 = utils.h2.bind(utils);\n\t\tlet print = kernel.print.bind(kernel);\n\t\tlet field = utils.getRenderArea();\n";
        var escaped = this.input.replace(/`/g, "\`");
        var fn = "" + build_variables + escaped.replace(/;/g, ";");
        return fn;
    };
    CodeSandbox.prototype.getLambda = function () {
        var args = "kernel";
        return new Function(args, this.getCompiled());
    };
    return CodeSandbox;
}());
var ScrapControls = (function () {
    function ScrapControls(scrap) {
        this.scrap = scrap;
        this.element = scrap.area_control;
        this.result_type_element = document.createElement("div");
    }
    ScrapControls.prototype.load = function () {
        var _this = this;
        this.result_type_element.innerHTML = '<i class="fas fa-fw fa-ellipsis-h"></i>&ZeroWidthSpace;';
        this.result_type_element.className = 'button disabled border-left';
        var evaluate_element = document.createElement("div");
        evaluate_element.innerHTML = '<i class="far fa-fw fa-play-circle"></i> Run';
        evaluate_element.className = "button";
        evaluate_element.onclick = function () {
            var result = _this.scrap.evaluate(true);
            _this.update(result);
        };
        this.element.appendChild(this.result_type_element);
        this.element.appendChild(evaluate_element);
    };
    ScrapControls.prototype.update = function (result) {
        if (this.last_result_state === result.type) {
            return;
        }
        this.result_type_element.className = 'button disabled border-left';
        this.last_result_state = result.type;
        var zero_width_space = "&ZeroWidthSpace;";
        switch (result.type) {
            case SCRAPS_EVALUATION_RESULT_TYPE.COMPILATION_ERROR:
                this.result_type_element.innerHTML = '<i class="fas fa-fw fa-bug"></i>' + zero_width_space;
                this.result_type_element.className += ' error';
                break;
            case SCRAPS_EVALUATION_RESULT_TYPE.RUNTIME_ERROR:
                this.result_type_element.innerHTML = '<i class="fas fa-fw fa-bug"></i>' + zero_width_space;
                this.result_type_element.className += ' warn';
                break;
            case SCRAPS_EVALUATION_RESULT_TYPE.ARTIFACT:
                this.result_type_element.innerHTML = '<i class="fas fa-fw fa-check"></i>' + zero_width_space;
                this.result_type_element.className += ' success';
                break;
            case SCRAPS_EVALUATION_RESULT_TYPE.EDITING:
                this.result_type_element.innerHTML = '<i class="fas fa-fw fa-ellipsis-h"></i>' + zero_width_space;
                break;
        }
    };
    return ScrapControls;
}());
var Scrap = (function () {
    function Scrap(context) {
        this.context = context.register(this);
        this.area_control = document.createElement('div');
        this.area_control.className = "controls";
        this.area_working = document.createElement('div');
        this.area_working.className = "working";
        this.area_render = document.createElement('div');
        this.area_render.className = "display";
        this.area_console = document.createElement('div');
        this.area_console.className = "artifacts";
        this.warning_line_element = document.createElement('div');
        this.warning_line_element.className = "warning-line";
        this.warning_position_element = document.createElement('div');
        this.warning_position_element.className = "warning-position";
        this.controls = new ScrapControls(this);
        this.utils = new KernelUtils(this);
    }
    Scrap.prototype.print = function (element) {
        this.area_render.appendChild(element);
    };
    Scrap.prototype.load = function (element) {
        this.sandbox = new CodeSandbox(this, element.innerHTML);
        element.innerHTML = "";
        this.area_working.appendChild(this.warning_line_element);
        this.sandbox.output_element.appendChild(this.warning_position_element);
        this.area_working.appendChild(this.sandbox.getElement());
        this.controls.load();
        element.appendChild(this.area_render);
        element.appendChild(this.area_working);
        element.appendChild(this.area_control);
        element.appendChild(this.area_console);
        this.sandbox.renderCodeHighlighting();
    };
    Scrap.prototype.getSandbox = function () {
        return this.sandbox;
    };
    Scrap.prototype.onlyIfChanges = function (old, n) {
        return (old !== n);
    };
    Scrap.prototype.evaluate = function (flush) {
        var self = this;
        this.clearWarning();
        if (flush) {
            window.clearTimeout(this.debounce);
            this.debounce = null;
        }
        else {
        }
        try {
            var fn = void 0;
            try {
                fn = this.getSandbox().getLambda();
            }
            catch (compilation_error) {
                if (self.onlyIfChanges(this.area_console.innerHTML, compilation_error.name + ": " + (compilation_error.message) + JSON.stringify(compilation_error.message))) {
                    this.area_console.innerHTML = compilation_error.name + ": " + (compilation_error.message);
                    this.area_console.className += ' error';
                }
                return new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.COMPILATION_ERROR, JSON.stringify(compilation_error.message));
            }
            try {
                this.area_console.innerText = '';
                this.area_console.className = 'artifacts';
                this.area_render.innerHTML = "";
                this.artifacts = fn(this);
                if (this.artifacts !== undefined && JSON.stringify(this.artifacts) !== "{}" && JSON.stringify(this.artifacts) !== "undefined") {
                    if (typeof this.artifacts === 'string' || typeof this.artifacts === 'number') {
                        if (self.onlyIfChanges(this.area_console.innerHTML, this.artifacts)) {
                            this.area_console.innerHTML = this.artifacts.toString();
                        }
                    }
                    else if (typeof this.artifacts === 'boolean') {
                        if (self.onlyIfChanges(this.area_console.innerHTML, this.artifacts)) {
                            this.area_console.innerHTML = this.artifacts ? "true" : "false";
                        }
                    }
                    else {
                        if (self.onlyIfChanges(this.area_console.innerHTML, JSON.stringify(this.artifacts))) {
                            this.area_console.innerHTML = "";
                            window['jsonView'].format(JSON.stringify(this.artifacts), this.area_console);
                        }
                    }
                    return new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.ARTIFACT, this.artifacts);
                }
                return new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.ARTIFACT, {});
            }
            catch (e) {
                if (self.onlyIfChanges(this.area_console.innerHTML, e.name + ": " + (e.message) + JSON.stringify(e.message))) {
                    this.area_console.innerHTML = e.name + ": " + (e.message);
                    this.area_console.className += ' warn';
                    var err_pos = this.getErrorPositionFromError(e);
                    err_pos[0] -= 13;
                    this.setWarning(SCRAPS_EVALUATION_RESULT_TYPE.RUNTIME_ERROR, err_pos);
                    return new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.RUNTIME_ERROR, JSON.stringify(e.message));
                }
            }
        }
        catch (e) {
            if (self.onlyIfChanges(this.area_console.innerHTML, e.name + ": " + (e.message) + JSON.stringify(e.message))) {
                this.area_console.innerHTML = e.name + ": " + (e.message);
                this.area_console.className += ' error';
                var err_pos = this.getErrorPositionFromError(e);
                err_pos[0] -= 13;
                this.setWarning(SCRAPS_EVALUATION_RESULT_TYPE.COMPILATION_ERROR, err_pos);
                return new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.COMPILATION_ERROR, JSON.stringify(e.message));
            }
        }
    };
    Scrap.prototype.getErrorPositionFromError = function (err) {
        console.log("INCOMING", err, err.stack);
        var caller_line_arr = err.stack.split("\n");
        while (caller_line_arr[0].indexOf("(eval at") == -1 && caller_line_arr.length > 0) {
            caller_line_arr.shift();
        }
        if (caller_line_arr.length === 0) {
            console.error("UNKNOWN ERROR EXCEPTION", err, err.stack);
            return;
        }
        var caller_line = caller_line_arr[0];
        console.log("CALLER LINE", caller_line);
        var check = "<anonymous>:";
        var pre_column = caller_line.indexOf(check);
        var slice = caller_line.slice(check.length + pre_column, caller_line.length - 1).split(":");
        return slice.map(function (v) {
            return parseFloat(v);
        });
    };
    Scrap.prototype.setWarning = function (type, error_position) {
        try {
            this.warning_line_element.style.display = "block";
            var err_type = type === SCRAPS_EVALUATION_RESULT_TYPE.COMPILATION_ERROR ? "error" : "warn";
            this.warning_line_element.className = "warning-line " + err_type;
            this.warning_position_element.className = "warning-position " + err_type;
            var textarea_top = parseFloat(window.getComputedStyle(this.sandbox.element, null).getPropertyValue('padding-top'));
            var textarea_left = parseFloat(window.getComputedStyle(this.sandbox.element, null).getPropertyValue('padding-left'));
            var line_y_em = (error_position[0]) * 1.065;
            this.warning_line_element.style.marginTop = textarea_top + "px";
            this.warning_line_element.style.top = line_y_em + "em";
            this.warning_position_element.style.marginTop = textarea_top + "px";
            this.warning_position_element.style.marginLeft = textarea_left + "px";
            this.warning_position_element.style.top = line_y_em + "em";
            this.warning_position_element.style.left = (error_position[1] - 1) * 0.47 + "em";
        }
        catch (e) {
        }
    };
    Scrap.prototype.clearWarning = function () {
        this.warning_line_element.style.display = "none";
        this.warning_position_element.style.display = "none";
    };
    Scrap.prototype.updateEvaluationResponse = function (response) {
        this.controls.update(response);
    };
    return Scrap;
}());
var KernelUtils = (function () {
    function KernelUtils(kernel) {
        this.kernel = kernel;
    }
    KernelUtils.prototype.p = function (string) {
        var el = document.createElement('p');
        el.innerHTML = string;
        return el;
    };
    KernelUtils.prototype.h1 = function (string) {
        var el = document.createElement('h1');
        el.innerHTML = string;
        return el;
    };
    KernelUtils.prototype.h2 = function (string) {
        var el = document.createElement('h2');
        el.innerHTML = string;
        return el;
    };
    KernelUtils.prototype.h3 = function (string) {
        var el = document.createElement('h3');
        el.innerHTML = string;
        return el;
    };
    KernelUtils.prototype.getRenderArea = function () {
        return this.kernel.area_render;
    };
    return KernelUtils;
}());
var context = new ScrapsContext();
var elements = document.getElementsByClassName('scraps-js');
for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var scrap = new Scrap(context);
    scrap.load(el);
}
//# sourceMappingURL=scraps.js.map