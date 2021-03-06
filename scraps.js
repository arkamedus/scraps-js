var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Parser = require("acorn");
function validate(code) {
    return (Parser.parse(code, { ecmaVersion: "latest", allowReturnOutsideFunction: true }));
}
class ScrapsContext {
    constructor() {
        this.scraps = [];
    }
    register(kernel) {
        this.scraps.push(kernel);
        return this;
    }
    executeStack(flush) {
        this.scraps.forEach(function (scrap) {
            const result = scrap.evaluate(flush);
            scrap.updateEvaluationResponse(result);
        });
    }
}
function mobileCheck() {
    let check = 0;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = 1;
    })(navigator.userAgent || navigator.vendor || window['opera']);
    return check;
}
var SCRAPS_EVALUATION_RESULT_TYPE;
(function (SCRAPS_EVALUATION_RESULT_TYPE) {
    SCRAPS_EVALUATION_RESULT_TYPE[SCRAPS_EVALUATION_RESULT_TYPE["ARTIFACT"] = 0] = "ARTIFACT";
    SCRAPS_EVALUATION_RESULT_TYPE[SCRAPS_EVALUATION_RESULT_TYPE["EDITING"] = 1] = "EDITING";
    SCRAPS_EVALUATION_RESULT_TYPE[SCRAPS_EVALUATION_RESULT_TYPE["COMPILATION_ERROR"] = 2] = "COMPILATION_ERROR";
    SCRAPS_EVALUATION_RESULT_TYPE[SCRAPS_EVALUATION_RESULT_TYPE["RUNTIME_ERROR"] = 3] = "RUNTIME_ERROR";
})(SCRAPS_EVALUATION_RESULT_TYPE || (SCRAPS_EVALUATION_RESULT_TYPE = {}));
class ScrapsEvaluationResponse {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}
class CodeSandbox {
    constructor(scrap, code) {
        let sandbox = this;
        this.scrap = scrap;
        this.input = code.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        this.element = document.createElement('textarea');
        this.element.className = "code-input-";
        this.element.value = this.input;
        this.element.style.width = "100%";
        this.element.rows = 8;
        this.element.spellcheck = false;
        this.intervals = [];
        this.output_element = document.createElement('pre');
        this.output_element.className = "code-output-";
        this.output_code = document.createElement('code');
        this.output_code.className = "language-javascript";
        this.output_element.appendChild(this.output_code);
        this.element.onscroll = function () {
            sandbox.output_code.scrollTop = sandbox.element.scrollTop;
            sandbox.output_code.scrollLeft = sandbox.element.scrollLeft;
        };
        // @ts-ignore
        this.element.onkeydown = this.element.onpaste = (event) => {
            if (!this.window_scroll) {
                this.window_scroll = window.scrollY;
            }
            this.scrap.clearWarning();
            // console.log((<HTMLTextAreaElement>event.srcElement).value);
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
            //sandbox.renderCodeHighlighting();
            this.scrap.updateEvaluationResponse(new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.EDITING, {}));
        };
        this.element.oninput = () => {
            this.scrap.clearWarning();
            if (mobileCheck() === 1) {
                sandbox.renderCodeHighlighting();
            }
            // this.scrap.clearWarning();
            //  this.scrap.updateEvaluationResponse(new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.EDITING, {}));
            // window.setTimeout(function () {
            //  sandbox.renderCodeHighlighting();
            // }, 1);
            // if (document.getElementById('run')) {
            return false;
            // }
            context.executeStack(false);
        };
    }
    renderCodeHighlighting() {
        let lines = this.element.value.split(/\r*\n/).length;
        if (lines !== this.window_lines && !this.scrap.options.fixedSize) {
            this.window_lines = lines;
            this.element.style.height = "5px";
            //if ((this.element.scrollHeight) !== parseFloat(this.element.style.height)) {
            this.element.style.height = (this.element.scrollHeight) + "px";
            this.output_code.style.height = (this.element.scrollHeight) + "px";
            //window.scrollTo(0, this.window_scroll);
            window.scrollTo({
                top: this.window_scroll,
                left: 0,
                behavior: 'auto'
            });
            //window.scrollTo(0, scrollY);
        }
        this.window_scroll = null;
        // }
        //  window.setTimeout(function(){
        //},1)
        //window.scrollTo(0, scrollY);
        this.input = this.element.value;
        this.output_code.innerHTML = this.input.replace(/</g, "&lt;")
            .replace(/>/g, "&gt;") + "\n";
        let t;
        t = Date.now();
        // @ts-ignore
        window['Prism'].highlightElement(this.output_code, false, () => {
        });
    }
    getElement() {
        let el = document.createElement('div');
        el.className = 'code';
        el.appendChild(this.element);
        el.appendChild(this.output_element);
        return el;
    }
    getCompiled() {
        let build_variables = `
		function makeIdentifiableProperty(i){
			return typeof i + (!!i?i.toString():"unknown");
		}
		let utils = new KernelUtils(scrap);
		let p = utils.p.bind(utils);
		let h1 = utils.h1.bind(utils);
		let h2 = utils.h2.bind(utils);
		let print = scrap.print.bind(scrap);
		
`;
        for (let prop of this.intervals) {
            console.log("CLEARING INTERVAL", prop);
            // @ts-ignore
            window.clearInterval(window[prop]);
        }
        this.intervals = [];
        //let matched_es6_classes = this.input.match(/class ([a-zA-Z]+)/)
        let escaped = this.input.replace(/`/g, "\`")
            .replace(/class ([a-zA-Z0-9_]+)/g, function (m) {
            let classname = m.match(/class ([a-zA-Z0-9_]+)/)[1];
            return `window.${classname} = class ${classname}`;
        })
            .replace(/function ([a-zA-Z0-9_]+)/g, function (m) {
            let classname = m.match(/function ([a-zA-Z0-9_]+)/)[1];
            return `window.${classname} = function ${classname}`;
        })
            .replace(/window\.setInterval/g, (m) => {
            let interval_name = `_scraps_interval_` + ((Math.random() * 1000) | 0) + ((Math.random() * 1000) | 0) + ((Math.random() * 1000) | 0);
            this.intervals.push(interval_name);
            console.log("WATCHING INTERVAL", interval_name);
            return `window.${interval_name} = window.setInterval`;
        });
        const fn = `${build_variables}${escaped}`;
        return fn;
    }
    getLambda() {
        let args = "scrap";
        let AsyncFunction = Object.getPrototypeOf(function () {
            return __awaiter(this, void 0, void 0, function* () { });
        }).constructor;
        return AsyncFunction(args, this.getCompiled());
    }
}
class ScrapControls {
    constructor(scrap) {
        this.scrap = scrap;
        this.element = scrap.area_control;
        this.result_type_element = document.createElement("div");
    }
    load() {
        this.result_type_element.innerHTML = '<i class="fas fa-fw fa-ellipsis-h"></i>&ZeroWidthSpace;';
        this.result_type_element.className = 'button disabled border-left';
        let evaluate_element = document.createElement("div");
        evaluate_element.innerHTML = '<i class="far fa-fw fa-play-circle"></i> Run';
        evaluate_element.className = "button";
        evaluate_element.onclick = () => {
            const result = this.scrap.evaluate(true);
            this.update(result);
        };
        let run_on_start_element = document.createElement("span");
        run_on_start_element.innerHTML = `<i class="far fa-fw fa-${this.scrap.options.autorun ? 'check-square' : 'square'}"></i> Auto-run on Load`;
        run_on_start_element.className = "button";
        run_on_start_element.onclick = () => {
            this.scrap.options.autorun = !this.scrap.options.autorun;
            run_on_start_element.innerHTML = `<i class="far fa-fw fa-${this.scrap.options.autorun ? 'check-square' : 'square'}"></i> Auto-run on Load`;
        };
        this.element.appendChild(this.result_type_element);
        this.element.appendChild(evaluate_element);
        if (this.scrap.options.autorun) {
            const result = this.scrap.evaluate(true);
            this.update(result);
        }
        //this.element.appendChild(run_on_start_element);
    }
    update(result) {
        if (this.last_result_state === result.type) {
            return;
        }
        this.result_type_element.className = 'button disabled border-left';
        this.last_result_state = result.type;
        let zero_width_space = "&ZeroWidthSpace;";
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
    }
}
class Scrap {
    constructor(context) {
        this.context = context.register(this);
        this.options = {
            autorun: false,
            fixedSize: false
        };
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
    print(element) {
        if (element instanceof HTMLElement) {
            this.area_render.appendChild(element);
        }
        else {
            let d = document.createElement("div");
            d.innerText = element.toString();
            this.area_render.appendChild(d);
        }
    }
    load(element) {
        this.container_element = element;
        this.options.autorun = element.getAttribute("data-autorun") !== null;
        this.options.fixedSize = element.getAttribute("data-fixed") !== null;
        this.sandbox = new CodeSandbox(this, element.innerHTML);
        element.innerHTML = "";
        this.area_working.appendChild(this.warning_line_element);
        this.area_working.appendChild(this.sandbox.getElement());
        this.controls.load();
        element.appendChild(this.area_render);
        element.appendChild(this.area_working);
        element.appendChild(this.area_control);
        element.appendChild(this.area_console);
        this.sandbox.renderCodeHighlighting();
    }
    getSandbox() {
        return this.sandbox;
    }
    onlyIfChanges(old, n) {
        return (old !== n);
    }
    evaluate(flush) {
        let self = this;
        this.clearWarning();
        if (flush) {
            window.clearTimeout(this.debounce);
            this.debounce = null;
        }
        else {
            //   window.clearTimeout(this.debounce);
            //   self.debounce = window.setTimeout(function () {
            //      self.evaluate(true);
            //  }, 10);
            //  return;
        }
        try {
            let fn;
            fn = this.getSandbox().getLambda();
            try {
                this.area_console.innerText = '';
                this.area_console.className = 'artifacts';
                this.area_render.innerHTML = "";
                this.artifacts = fn(this);
                if (this.artifacts !== undefined && JSON.stringify(this.artifacts) !== "undefined") {
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
                    else if (this.artifacts instanceof HTMLElement) {
                        this.area_render.appendChild(this.artifacts);
                    }
                    else {
                        if (self.onlyIfChanges(this.area_console.innerHTML, JSON.stringify(this.artifacts))) {
                            this.area_console.innerHTML = "";
                            // @ts-ignore
                            window['jsonView'].format(JSON.stringify(this.artifacts), this.area_console);
                        }
                    }
                    return new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.ARTIFACT, this.artifacts);
                }
                return new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.ARTIFACT, {});
            }
            catch (e) {
                console.log("RUNTIME ERROR");
                if (self.onlyIfChanges(this.area_console.innerHTML, e.name + ": " + (e.message) + JSON.stringify(e.message))) {
                    this.area_console.innerHTML = e.name + ": " + (e.message);
                    this.area_console.className += ' warn';
                    let err_pos = this.getErrorPositionFromError(e);
                    err_pos[0] -= 13;
                    let error_width = 1;
                    if (e.message.indexOf("is not defined") !== -1) {
                        error_width = e.message.split(" ")[0].length;
                    }
                    this.setWarning(SCRAPS_EVALUATION_RESULT_TYPE.RUNTIME_ERROR, err_pos, error_width);
                    return new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.RUNTIME_ERROR, JSON.stringify(e.message));
                }
            }
        }
        catch (e) {
            console.log("COMPILE FAILED");
            try {
                const f = this.getSandbox().getCompiled();
                validate(f);
            }
            catch (e) {
                console.log("VAIDATE FAILED");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(e.message);
                let validation_error_position = matches[1].split(":").map((v) => {
                    return parseInt(v);
                });
                validation_error_position[0] -= 11;
                validation_error_position[1] += 1;
                if (e.message.indexOf("expected token") !== -1) {
                    //validation_error_position[1]--;
                }
                let error_message = e.message.split("(")[0];
                if (self.onlyIfChanges(this.area_console.innerHTML, e.name + ": " + (error_message))) {
                    this.area_console.innerHTML = e.name + ": " + (error_message);
                    this.area_console.className += ' error';
                }
                this.setWarning(SCRAPS_EVALUATION_RESULT_TYPE.COMPILATION_ERROR, validation_error_position);
                return new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.COMPILATION_ERROR, e.name);
            }
            console.log("UNKNOWN ERROR, DEFAULT TO BROWSER ERROR");
            if (self.onlyIfChanges(this.area_console.innerHTML, e.name + ": " + (e.message) + JSON.stringify(e.message))) {
                this.area_console.innerHTML = e.name + ": " + (e.message);
                this.area_console.className += ' error';
                let err_pos = this.getErrorPositionFromError(e);
                err_pos[0] -= 13;
                this.setWarning(SCRAPS_EVALUATION_RESULT_TYPE.COMPILATION_ERROR, err_pos);
                return new ScrapsEvaluationResponse(SCRAPS_EVALUATION_RESULT_TYPE.COMPILATION_ERROR, JSON.stringify(e.message));
            }
        }
    }
    getErrorPositionFromError(err) {
        let caller_line_arr = err.stack.split("\n");
        let slice;
        if (caller_line_arr[0]) {
            while (caller_line_arr[0].indexOf("(eval at") == -1 && caller_line_arr.length > 0) {
                caller_line_arr.shift();
            }
            if (caller_line_arr.length === 0) {
                console.error("UNKNOWN ERROR EXCEPTION", err, err.stack);
                return;
            }
            const caller_line = caller_line_arr[0];
            let check = "<anonymous>:";
            let pre_column = caller_line.indexOf(check);
            slice = caller_line.slice(check.length + pre_column, caller_line.length - 1).split(":");
        }
        else {
            console.log(err.message, err.stack);
        }
        return slice.map((v) => {
            return parseFloat(v);
        });
    }
    setWarning(type, error_position, error_width = 1) {
        try {
            this.sandbox.output_code.insertBefore(this.warning_position_element, this.sandbox.output_code.firstChild);
            this.warning_line_element.style.display = "block";
            this.warning_position_element.style.display = "block";
            let err_type = type === SCRAPS_EVALUATION_RESULT_TYPE.COMPILATION_ERROR ? "error" : "warn";
            this.warning_line_element.className = `warning-line ${err_type}`;
            this.warning_position_element.className = `warning-position ${err_type}`;
            let textarea_top = parseFloat(window.getComputedStyle(this.sandbox.element, null).getPropertyValue('padding-top'));
            let textarea_left = parseFloat(window.getComputedStyle(this.sandbox.element, null).getPropertyValue('padding-left'));
            let line_y_em = (error_position[0]) * 1.065;
            this.warning_line_element.style.marginTop = `${textarea_top}px`;
            this.warning_line_element.style.top = `${line_y_em}em`;
            this.warning_position_element.style.marginTop = `${textarea_top}px`;
            this.warning_position_element.style.marginLeft = `${textarea_left}px`;
            this.warning_position_element.style.top = `${line_y_em}em`;
            this.warning_position_element.style.width = `${error_width * 0.84}ch`;
            this.warning_position_element.style.left = `${(error_position[1] - 1) * 0.465}em`;
        }
        catch (e) {
        }
    }
    clearWarning() {
        this.warning_line_element.style.display = "none";
        this.warning_position_element.style.display = "none";
    }
    updateEvaluationResponse(response) {
        this.controls.update(response);
    }
}
class KernelUtils {
    constructor(scrap) {
        this.scrap = scrap;
    }
    p(string) {
        let el = document.createElement('p');
        el.innerHTML = string;
        return el;
    }
    h1(string) {
        let el = document.createElement('h1');
        el.innerHTML = string;
        return el;
    }
    h2(string) {
        let el = document.createElement('h2');
        el.innerHTML = string;
        return el;
    }
    h3(string) {
        let el = document.createElement('h3');
        el.innerHTML = string;
        return el;
    }
    getRenderArea() {
        return this.scrap.area_render;
    }
}
window['KernelUtils'] = KernelUtils;
let context = new ScrapsContext();
window['ScrapsContext'] = context;
let elements = document.getElementsByClassName('scraps-js');
for (let i = 0; i < elements.length; i++) {
    let el = elements[i];
    let scrap = new Scrap(context);
    scrap.load(el);
}
/*
context.executeStack(true);

if (document.getElementById('run')) {
    document.getElementById('run').onclick = function () {
        context.executeStack(true);
    }
}*/
/* Only needed if you have earlier ScrapsContext with dependencies on scraps further in the stack */
//context.executeStack(false);
