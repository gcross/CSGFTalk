//@+leo-ver=5-thin
//@+node:gcross.20110629122941.1128: * @file script.js
//@@language javascript

//@+others
//@+node:gcross.20110629122941.1147: ** Actors
//@+node:gcross.20110629122941.1148: *3* MagnifiedBoxActor
function MagnifiedBoxActor(id) {
    this.box = new UseActor("particle_box")
    this.box.x = 270
    this.box.y = 480
    this.left_actor = new UseActor(id)
    this.left_actor.x = 270
    this.left_actor.y = 480
    this.right_actor = new UseActor(id)
    this.right_actor.x = 750
    this.right_actor.y = 480
}
MagnifiedBoxActor.prototype = Object.create(ActorPrototype)
augment(MagnifiedBoxActor,{
    magnification: 1
,   createNode: function() {
        this.line1 = document.getElementById("magnification_line_1").cloneNode()
        this.line2 = document.getElementById("magnification_line_2").cloneNode()
        var node = document.createElementNS(svg_namespace,"g")
        node.appendChild(this.line1)
        node.appendChild(this.line2)
        node.appendChild(this.box.getNode())
        node.appendChild(this.left_actor.getNode())
        node.appendChild(this.right_actor.getNode())
        this.update()
        return node
    }
,   update: function() {
        this.line1.setAttribute("x2",270+130*this.magnification)
        this.line1.setAttribute("y2",480-130*this.magnification)
        this.line2.setAttribute("x2",270+130*this.magnification)
        this.line2.setAttribute("y2",480+130*this.magnification)
        this.box.scale = this.magnification
        this.box.update()
        this.left_actor.scale = this.magnification
        this.left_actor.update()
        this.right_actor.update()
    }
})
appendToMethod(MagnifiedBoxActor.prototype,"clearNode",function() {
    delete this.line1
    delete this.line2
    this.box.clearNode()
    this.left_actor.clearNode()
    this.right_actor.clearNode()
})
//@-others

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
        hireUseActor("shrinking_particle_backdrop","title_slide"),
        hire("magnified_box",new MagnifiedBoxActor("particle"),"title_slide"),
        hireUseActor("grey_rectangle","title_slide"),
        parallel(
            fadeOut(1,"grey_rectangle"),
            fadeOut(1,"title_slide")
        ),
        fire("title_slide"),
        fire("grey_rectangle"),
        "",
        linear(5,"magnified_box","magnification",0),
        //@-<< Script >>
    ])
},false)
//@-leo
