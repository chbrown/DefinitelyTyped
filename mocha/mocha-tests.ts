/// <reference path="mocha.d.ts" />

function test_describe() {
    describe("something", () => {
        return;
    });

    describe.only("something", () => {
        return;
    });

    describe.skip("something", () => {
        return;
    });

    describe("something", function() {
        this.timeout(2000);
    });
}

function test_context() {
    context("some context", () => {
        return;
    });

    context.only("some context", () => {
        return;
    });

    context.skip("some context", () => {
        return;
    });

    context("some context", function() {
        this.timeout(2000);
    });
}

function test_suite() {
    suite("some context", () => {
        return;
    });

    suite.only("some context", () => {
        return;
    });

    suite.skip("some context", () => {
        return;
    });

    suite("some context", function() {
        this.timeout(2000);
    });
}

function test_it() {

    it("does something", () => {
        return;
    });

    it("does something", (done) => {
        done();
    });

    it.only("does something", () => {
        return;
    });

    it.skip("does something", () => {
        return;
    });

    it("does something", function () {
        this.timeout(2000);
    });
}

function test_test() {

    test("does something", () => {
        return;
    });

    test("does something", (done) => {
        done();
    });

    test.only("does something", () => {
        return;
    });

    test.skip("does something", () => {
        return;
    });

    test("does something", function () {
        this.timeout(2000);
    });
}

function test_before() {
    before(() => {
        return;
    });

    before((done) => {
        done();
    });
}

function test_setup() {
    setup(() => {
        return;
    });

    setup((done) => {
        done();
    });
}

function test_after() {
    after(() => {
        return;
    });

    after((done) => {
        done();
    });
}

function test_teardown() {
    teardown(() => {
        return;
    });

    teardown((done) => {
        done();
    });
}

function test_beforeEach() {
    beforeEach(() => {
        return;
    });

    beforeEach((done) => {
        done();
    });
}

function test_suiteSetup() {
    suiteSetup(() => {
        return;
    });

    suiteSetup((done) => {
        done();
    });
}

function test_afterEach() {
    afterEach(() => {
        return;
    });

    afterEach((done) => {
        done();
    });
}

function test_suiteTeardown() {
    suiteTeardown(() => {
        return;
    });

    suiteTeardown((done) => {
        done();
    });
}

function test_reporter_string(){
    mocha.reporter("html");
}

function test_reporter_function(){
    mocha.reporter(function(){
        return;
    });
}

function test_setup_slow_option(){
    mocha.setup({slow: 25});
}

function test_setup_timeout_option(){
    mocha.setup({timeout: 25});
}

function test_setup_globals_option(){
    mocha.setup({globals: ["mocha"]});
}

function test_setup_ui_option(){
    mocha.setup({ui: "bdd"});
}

function test_setup_reporter_string_option(){
    mocha.setup({reporter: "html"});
}

function test_setup_reporter_function_option(){
    mocha.setup({reporter: function(){
        return;
    }});
}

function test_setup_bail_option(){
    mocha.setup({bail: false});
}

function test_setup_ignore_leaks_option(){
    mocha.setup({ignoreLeaks: false});
}

function test_setup_grep_string_option(){
    mocha.setup({grep: "describe"});
}

function test_setup_grep_regex_option(){
    mocha.setup({grep: new RegExp("describe")});
}

function test_setup_grep_regex_literal_option(){
    mocha.setup({grep: /(expect|should)/i });
}

function test_setup_all_options(){
    mocha.setup({
        slow: 25,
        timeout: 25,
        ui: "bdd",
        globals: ["mocha"],
        reporter: "html",
        bail: true,
        ignoreLeaks: true,
        grep: "test"
    });
}

function test_run(){
    mocha.run(function(){
        return;
    });
}

function test_growl(){
    mocha.growl();
}

function test_chaining(){
    mocha
        .setup({slow:25})
        .growl()
        .reporter("html")
        .reporter(function(){
            return;
        });
}

import MochaDef = require("mocha");

function test_require_constructor_empty() {
    var instance = new MochaDef();
}

function test_require_constructor_noOptions() {
    var instance = new MochaDef({});
}

function test_require_constructor_allOptions() {
    var instance = new MochaDef({
        grep: /[a-z]*/,
        ui: "tdd",
        reporter: "dot",
        timeout: 500,
        bail: true
    });
}


function test_require_fluentParams() {
    var instance = new MochaDef();

    instance.bail(true)
        .bail()
        .addFile("foo.js")
        .reporter("bdd")
        .ui("dot")
        .grep("[a-z]*")
        .grep(/[a-z]*/)
        .invert()
        .ignoreLeaks(true)
        .checkLeaks()
        .growl()
        .globals("foo")
        .globals(["bar", "zap"])
        .useColors(true)
        .useInlineDiffs(true)
        .timeout(500)
        .slow(100)
        .enableTimeouts(true)
        .asyncOnly(false)
        .noHighlighting(true)
        .run();
}

function test_run_withOnComplete() {
    var instance = new MochaDef();

    instance.run((failures: number): void => {
        console.log(failures);
    });
}

class CustomSpecReporter extends MochaDef.reporters.Spec {
    constructor(runner: Mocha.IRunner) {
        super(runner);

        runner.on("test", (test: Mocha.ITest) => {
            console.log(test.parent.title + "/" + test.title);
        });
    }
}

class MyReporter extends MochaDef.reporters.Base {
    passes: number = 0;
    failures: number = 0;

    constructor(runner: Mocha.IRunner) {
        super(runner);

        runner.on("pass", (test: Mocha.ITest) => {
            this.passes++;
            console.log("pass: %s", test.fullTitle());
        });

        runner.on("fail", (test: Mocha.ITest, err: Error) => {
            this.failures++;
            console.log("fail: %s -- error: %s", test.fullTitle(), err.message);
        });

        runner.on("end", () => {
            console.log("end: %d/%d", this.passes, this.passes + this.failures);
            process.exit(this.failures);
        });
    }
}