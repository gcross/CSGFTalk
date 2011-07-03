//@+leo-ver=5-thin
//@+node:gcross.20110629122941.1128: * @file script.js
//@@language javascript

//@+others
//@+node:gcross.20110629122941.1147: ** Actors
//@+node:gcross.20110629122941.1148: *3* MagnifiedBoxActor
function MagnifiedBoxActor(particle_box_id) {
    this.particle_box_id = particle_box_id
    this.blur = document.getElementById("particle_box_blur")
    this.style = {}
}
MagnifiedBoxActor.prototype = Object.create(ActorPrototype)
augment(MagnifiedBoxActor,{
    magnification: 1
,   particle_y: 0
,   createNode: function() {
        this.line1 = document.getElementById("magnification_line_1").cloneNode()
        this.line1.removeAttribute("id")
        this.line2 = document.getElementById("magnification_line_2").cloneNode()
        this.line2.removeAttribute("id")
        this.left_particle_box = document.getElementById(this.particle_box_id).cloneNode(true)
        this.left_particle = this.left_particle_box.getElementsByClassName("particle").item(0)
        this.right_particle_box = document.getElementById(this.particle_box_id).cloneNode(true)
        this.right_particle_box.setAttribute("transform","translate(750,480)")
        this.right_particle = this.right_particle_box.getElementsByClassName("particle").item(0)
        var node = document.createElementNS(svg_namespace,"g")
        node.appendChild(this.line1)
        node.appendChild(this.line2)
        node.appendChild(this.left_particle_box)
        node.appendChild(this.right_particle_box)
        this.node = node
        this.update()
        return node
    }
,   update: function() {
        var t = 1-this.magnification
        this.blur.setAttribute("stdDeviation",40*t*t*t*t)
        this.line1.setAttribute("x2",270+130*this.magnification)
        this.line1.setAttribute("y2",480-130*this.magnification)
        this.line2.setAttribute("x2",270+130*this.magnification)
        this.line2.setAttribute("y2",480+130*this.magnification)
        this.left_particle_box.setAttribute("transform","translate(270,480)scale(" + this.magnification + ")")
        this.left_particle.setAttribute("transform","translate(0," + this.particle_y + ")")
        this.right_particle.setAttribute("transform","translate(0," + this.particle_y + ")")
    }
})
appendToMethod(MagnifiedBoxActor.prototype,"clearNode",function() {
    delete this.line1
    delete this.line2
    delete this.left_particle_box
    delete this.left_particle
    delete this.right_particle_box
    delete this.right_particle
})
augmentWithStyleBehavior(MagnifiedBoxActor)
//@-others

var titles = [
    //@+<< Titles >>
    //@+node:gcross.20110629122941.1134: ** << Titles >>
    "Quantum mechanics is fuzzy",
    "But who actually makes things that small?",
    //@-<< Titles >>
]

window.addEventListener("load",function() {
    (function() {
        var resources = document.getElementById("resources")
        var title_template = document.getElementById("title_template")
        for(var i = 0; i < titles.length; ++i) {
            var title = titles[i]
            var node = title_template.cloneNode()
            node.setAttribute("id",title)
            node.appendChild(document.createTextNode(title))
            resources.appendChild(node)
        }
    })()

    initializeSlick([
        //@+<< Script >>
        //@+node:gcross.20110629122941.1129: ** << Script >>
        //@+others
        //@+node:gcross.20110702143210.1151: *3* Title
        hireUseActor("title_slide"),
        //@+node:gcross.20110702143210.1150: *3* Quantum mechanics is fuzzy
        "",
        hireUseActor("standard_backdrop","title_slide"),
        hireUseActor(titles[0],"title_slide"),
        hireUseActor("shrinking_particle_backdrop","title_slide"),
        hire("magnified_box",new MagnifiedBoxActor("particle_box"),"title_slide"),
        hireUseActor("grey_rectangle","title_slide"),
        parallel(
            fadeOut(1,"grey_rectangle"),
            fadeOut(1,"title_slide")
        ),
        fire("title_slide","grey_rectangle"),
        "",
        decelerate(10,"magnified_box","magnification",0),
        "",
        smooth(1,"magnified_box","magnification",1),
        "",
        smooth(0.5,"magnified_box","particle_y",+65),
        hire("magnified_box2",new MagnifiedBoxActor("particle_box2"),"magnified_box"),
        set("magnified_box2","particle_y",+65),
        fadeOut(0.5,"magnified_box"),
        fire("magnified_box"),
        "",
        parallel(
            decelerate(10,"magnified_box2","magnification",0),
            sequence(
                wait(4),
                accelerate(6,"magnified_box2","particle_y",0)
            )
        ),
        "",
        //@+node:gcross.20110702143210.1152: *3* But who actually makes things that small?
        parallel(
            accelerate(0.25,titles[0],"y",-50),
            fadeOut(0.25,titles[0])
        ),
        fire(titles[0]),
        hireUseActor(titles[1]),
        set(titles[1],"y",-50),
        parallel(
            decelerate(0.25,titles[1],"y",0),
            fadeIn(0.25,titles[1])
        ),
        "",
        hireUseActor("intel"),
        set("intel","x",512),
        set("intel","y",480),
        set("intel","scale",0),
        parallel(
            fadeOut(1,"magnified_box2"),
            fadeOut(1,"shrinking_particle_backdrop"),
            linear(2,"intel","scale",1.5)
        ),
        fire("magnified_box2"),
        fire("shrinking_particle_backdrop"),
        "",
        hireUseActor("amd"),
        set("amd","y",250),
        decelerate(0.5,"amd","y",0),
        "",
        decelerate(0.5,"amd","y",250),
        fire("amd"),
        "",
        hireUseActor("left_chip"),
        set("left_chip","x",-500),
        decelerate(0.5,"left_chip","x",0),
        "",
        hireUseActor("right_chip"),
        set("right_chip","x",500),
        decelerate(0.5,"right_chip","x",0),
        "",
        hireUseActor("whitescreen","intel"),
        hireUseActor("shrinking_particle_backdrop","whitescreen"),
        hire("magnified_box",new MagnifiedBoxActor("electron_box"),"whitescreen"),
        parallel(
            fadeOut(1,"intel"),
            fadeOut(1,"left_chip"),
            fadeOut(1,"right_chip"),
            fadeOut(1,"whitescreen")
        ),
        fire("whitescreen","intel","left_chip","right_chip"),
        "",
        parallel(
            decelerate(10,"magnified_box","magnification",0),
            sequence(
                wait(4),
                accelerate(6,"magnified_box","particle_y",60)
            ),
            sequence(
                wait(6),
                function() {
                    var top_current = document.getElementById("top_current")
                    var bottom_current = document.getElementById("bottom_current")
                    return {
                        duration: 4,
                        advance: function() {
                            top_current.setAttribute("opacity",0.5)
                            bottom_current.setAttribute("opacity",0.5)
                        },
                        retract: function() {
                            top_current.setAttribute("opacity",1)
                            bottom_current.setAttribute("opacity",0)
                        },
                        stepTo: function(_,time) {
                            var t = time/this.duration
                            top_current.setAttribute("opacity",1-0.5*t)
                            bottom_current.setAttribute("opacity",0.5*t)
                        }
                    }
                }
            )
        ),
        "",
        //@-others
        //@-<< Script >>
    ])
},false)
//@-leo
