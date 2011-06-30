//@+leo-ver=5-thin
//@+node:gcross.20110629122941.1128: * @file script.js
//@@language javascript


window.addEventListener("load",function() {
    (function() {
        var resources = document.getElementById("resources")
        var titles = [
            //@+<< Titles >>
            //@+node:gcross.20110629122941.1134: ** << Titles >>
            "Quantum mechanics is fuzzy",
            //@-<< Titles >>
        ]
        for(var i = 0; i < titles.length; ++i) {
            var title = titles[i]
            var node = document.createElementNS(svg_namespace,"text")
            node.setAttribute("x",30.5)
            node.setAttribute("y",80.5)
            node.setAttribute("class","title")
            node.setAttribute("id","title: " + title)
            node.appendChild(document.createTextNode(title))
            node = document.adoptNode(node)
            document.documentElement.appendChild(node)
        }
    })()

    initializeSlick([
        //@+<< Script >>
        //@+node:gcross.20110629122941.1129: ** << Script >>
        hireUseActor("title_slide"),
        "outline",
        hireUseActor("standard_backdrop","title_slide"),
        hireUseActor("title: Quantum mechanics is fuzzy","title_slide"),
        hireUseActor("grey_rectangle","title_slide"),
        parallel(
            fadeOut(1,"grey_rectangle"),
            fadeOut(1,"title_slide")
        ),
        fire("title_slide"),
        fire("grey_rectangle"),
        //@-<< Script >>
    ])
},false)
//@-leo
