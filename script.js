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
//@+node:gcross.20110702233701.1159: *3* FaaaaaceActor
function FaaaaaceActor() {
    this.actor = new UseActor("faaaaace")
    this.style = {}
    this.mouth = document.getElementById("mouth")
    this.teardrop = document.getElementById("teardrop")
}
FaaaaaceActor.prototype = Object.create(ActorPrototype)
augment(FaaaaaceActor,{
    unhappiness: 1
,   createNode: function() {
        return this.actor.getNode()
    }
,   update: function() {
        this.teardrop.setAttribute("opacity",1-(1-this.unhappiness)/2)
        this.mouth.setAttribute("transform","translate(+738,+494)scale(1," + this.unhappiness + ")translate(-738,-494)")
    }
,   clearNode: function() {
        this.actor.clearNode()
    }
})
augmentWithStyleBehavior(FaaaaaceActor)
//@+node:gcross.20110702143210.1162: ** Functions
//@+node:gcross.20110702143210.1163: *3* rotateTitle
function rotateTitle(index) {
    return [
        parallel(
            accelerate(0.25,titles[index-1],"y",-50),
            fadeOut(0.25,titles[index-1])
        ),
        fire(titles[index-1]),
        hireUseActor(titles[index]),
        set(titles[index],"y",-50),
        parallel(
            decelerate(0.25,titles[index],"y",0),
            fadeIn(0.25,titles[index])
        ),
    ]
}
//@-others

var titles = [
    //@+<< Titles >>
    //@+node:gcross.20110629122941.1134: ** << Titles >>
    "Quantum mechanics is fuzzy",
    "But who actually makes things that small?",
    "Quantum computing: embrace the fuzz!",
    "How quantum computers die",
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

    initializeSlick([].concat([
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
        fadeOutAndFire(1,
            "grey_rectangle",
            "title_slide"
        ),
        "",
        decelerate(10,"magnified_box","magnification",0),
        "",
        smooth(1,"magnified_box","magnification",1),
        "",
        smooth(0.5,"magnified_box","particle_y",+65),
        hire("magnified_box2",new MagnifiedBoxActor("particle_box2"),"magnified_box"),
        set("magnified_box2","particle_y",+65),
        fadeOutAndFire(0.5,"magnified_box"),
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
        ]).concat(rotateTitle(1)).concat([
        "",
        hireUseActor("intel"),
        set("intel","x",512),
        set("intel","y",480),
        set("intel","scale",0),
        parallel(
            fadeOutAndFire(1,
                "magnified_box2",
                "shrinking_particle_backdrop"
            ),
            linear(2,"intel","scale",1.5)
        ),
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
        fadeOutAndFire(1,
            "intel",
            "left_chip",
            "right_chip",
            "whitescreen"
        ),
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
        //@+node:gcross.20110702143210.1161: *3* Quantum computing: embrace the fuzz!
        ]).concat(rotateTitle(2)).concat([
        "",
        parallel(
            fadeOutAndFire(1,
                "shrinking_particle_backdrop",
                "magnified_box"
            ),
            hireAndFadeInUseActor(1,"glass_half_empty"),
            hireAndFadeIn(1,"faaaaace",new FaaaaaceActor())
        ),
        "",
        hireUseActor("glass_half_full","glass_half_empty"),
        parallel(
            linear(0.5,"faaaaace","unhappiness",-1),
            fadeOutAndFire(1,"glass_half_empty")
        ),
        "",
        parallel(
            fadeOutAndFire(1,"faaaaace"),
            fadeOut(1,"glass_half_full"),
            hireAndFadeInUseActor(1,"huge_zero","glass_half_full")
        ),
        fire("glass_half_full"),
        "",
        parallel(
            fadeOut(0.5,"huge_zero"),
            hireAndFadeInUseActor(0.5,"huge_one")
        ),
        "",
        fadeOut(0.5,"huge_one"),
        parallel(
            fadeIn(0.5,"huge_zero"),
            fadeIn(0.5,"huge_one")
        ),
        "",
        hireUseActors(
            "two_digits_bottom_row",
            "two_digits_top_row"
        ),
        parallel(
            fadeOutAndFire(1,
                "huge_zero",
                "huge_one"
            ),
            fadeIn(1,"two_digits_bottom_row"),
            fadeIn(1,"two_digits_top_row"),
            decelerate(1,"two_digits_bottom_row","y",-140,0),
            decelerate(1,"two_digits_top_row","y",140,0)
        ),
        "",
        hireUseActors(
            "three_digits_top_row",
            "three_digits_bottom_row"
        ),
        parallel(
            fadeOutAndFire(1,
                "two_digits_bottom_row",
                "two_digits_top_row"
            ),
            fadeIn(1,"three_digits_bottom_row"),
            fadeIn(1,"three_digits_top_row"),
            decelerate(1,"three_digits_bottom_row","y",-70,0),
            decelerate(1,"three_digits_top_row","y",70,0)
        ),
        "",
        hireUseActors(
            "four_digits_left_column",
            "four_digits_right_column"
        ),
        parallel(
            fadeOutAndFire(1,
                "three_digits_bottom_row",
                "three_digits_top_row"
            ),
            fadeIn(1,"four_digits_left_column"),
            fadeIn(1,"four_digits_right_column"),
            decelerate(1,"four_digits_left_column","x",120,0),
            decelerate(1,"four_digits_right_column","x",-120,0)
        ),
        "",
        hireAndFadeInUseActor(1,"function_applied_to_four_digits"),
        "",
        hireAndFadeInUseActor(1,"eye","four_digits_left_column"),
        "",
        hireUseActor("four_digits_post_measurement"),
        fadeOutAndFire(1,
            "four_digits_left_column",
            "four_digits_right_column",
            "function_applied_to_four_digits"
        ),
        "",
        fadeOutAndFire(1,
            "eye",
            "four_digits_post_measurement"
        ),
        "",
        ]).concat((function(){
            var lines = []
            var entrances = []
            for(var i = 1; i <= 9; ++i) {
                var id = "quantum_algorithm_" + i
                lines.push(hireUseActor(id))
                lines.push(set(id,"x",1024))
                entrances.push(
                    sequence(
                        wait((i-1)*0.05),
                        decelerate(0.5,id,"x",0)
                    )
                )
            }
            lines.push(parallel.apply(null,entrances))
            lines.push("")
            return lines
        })()).concat((function(){
            var fades = []
            for(var i = 2; i <= 9; ++i) {
                (function(){
                    var id = "quantum_algorithm_" + i
                    fades.push(linear(1,function(stage) { return stage[id].style; },"opacity",1,0.5))
                })()
            }
            fades.push(
                function() {
                    var quantum_algorithm_1 = document.getElementById("quantum_algorithm_1")
                    return {
                        duration: 1,
                        advance: function() { quantum_algorithm_1.setAttribute("stroke-width",1); },
                        retract: function() { quantum_algorithm_1.setAttribute("stroke-width",0); },
                        stepTo: function(_,time) { quantum_algorithm_1.setAttribute("stroke-width",time); }
                    }
                }
            )
            return [parallel.apply(null,fades),""]
        })()).concat((function(){
            var unfades = []
            for(var i = 2; i <= 9; ++i) {
                (function(){
                    var id = "quantum_algorithm_" + i
                    unfades.push(linear(1,function(stage) { return stage[id].style; },"opacity",1))
                })()
            }
            unfades.push(
                function() {
                    var quantum_algorithm_1 = document.getElementById("quantum_algorithm_1")
                    return {
                        duration: 1,
                        advance: function() { quantum_algorithm_1.setAttribute("stroke-width",0); },
                        retract: function() { quantum_algorithm_1.setAttribute("stroke-width",1); },
                        stepTo: function(_,time) { quantum_algorithm_1.setAttribute("stroke-width",1-time); }
                    }
                }
            )
            return [parallel.apply(null,unfades),""]
        })()).concat([
        hireUseActor("globe"),
        hireUseActor("i_hate_quantum_computers"),
        set("globe","x",514.9845),
        set("globe","y",450.625),
        parallel(
            linear(1.5,"globe","scale",0,1.4179688),
            sequence(wait(1),fadeIn(.5,"i_hate_quantum_computers"))
        ),
        "",
        fadeOutAndFire.apply(null,(function(){
            var arguments = [1]
            for(var i = 1; i <= 9; ++i) { arguments.push("quantum_algorithm_" + i); }
            arguments.push("i_hate_quantum_computers")
            return arguments
        })()),
        parallel(
            smooth(1,"globe","x",233.61645),
            smooth(1,"globe","y",438.0),
            smooth(1,"globe","scale",0.79760745)
        ),
        hireAndFadeInUseActor(0.5,"quantum_computer"),
        "",
        //@+node:gcross.20110702233701.1174: *3* How quantum computers die
        ]).concat(rotateTitle(3)).concat([
        //@-others
        //@-<< Script >>
    ]))
},false)
//@-leo
