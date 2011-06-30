//@+leo-ver=5-thin
//@+node:gcross.20110629122941.1128: * @file script.js
//@@language javascript

window.addEventListener("load",function() {
    initializeSlick([
        //@+<< Script >>
        //@+node:gcross.20110629122941.1129: ** << Script >>
        hireUseActor("title"),
        "outline",
        hireUseActor("standard_backdrop","title"),
        hireUseActor("grey_rectangle","title"),
        parallel(
            fadeOut(1,"grey_rectangle"),
            fadeOut(1,"title")
        ),
        fire("title"),
        fire("grey_rectangle"),
        //@-<< Script >>
    ])
},false)
//@-leo
