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
augment(MagnifiedBoxActor.prototype,{
    magnification: 1
,   particle_y: 0
,   createNode: function() {
        this.line1 = document.getElementById("magnification_line_1").cloneNode(false)
        this.line1.removeAttribute("id")
        this.line2 = document.getElementById("magnification_line_2").cloneNode(false)
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
        this.blur.setAttribute("stdDeviation",30*t*t*t)
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
augmentWithStyleBehavior(MagnifiedBoxActor.prototype)
//@+node:gcross.20110702233701.1159: *3* FaaaaaceActor
function makeFaaaaaceActor() {
    var actor = new UseActor("faaaaace")
    actor.mouth = document.getElementById("mouth")
    actor.teardrop = document.getElementById("teardrop")
    actor.unhappiness = 1
    appendToMethod(actor,"update",function() {
        this.teardrop.setAttribute("opacity",1-(1-this.unhappiness)/2)
        this.mouth.setAttribute("transform","translate(+738,+494)scale(1," + this.unhappiness + ")translate(-738,-494)")
    })
    return actor
}
//@+node:gcross.20110702233701.1176: *3* QuantumComputerActor
function makeQuantumComputerActor() {
    var actor = new UseActor("quantum_computer")
    actor.damage = 0
    actor.open = 0
    actor.blood = document.getElementById("quantum_computer_blood")
    actor.top = document.getElementById("quantum_computer_top")
    appendToMethod(actor,"update",function() {
        var amplitude = 1-this.damage*0.75
        this.blood.setAttribute("values","1 0 0 0 0  0 " + amplitude + " 0 0 0  0 0 " + amplitude + " 0 0  0 0 0 1 0")
        this.top.setAttribute("x1",902.625-281.25*Math.cos(Math.PI/4*this.open))
        this.top.setAttribute("y1",328.625-281.25*Math.sin(Math.PI/4*this.open))
    })
    return actor
}

function showQuantumComputer() {
    return set(function(stage) { return stage.quantum_computer.style; },"opacity",1)
}

function hideQuantumComputer() {
    return set(function(stage) { return stage.quantum_computer.style; },"opacity",0)
}
//@+node:gcross.20110702143210.1162: ** Functions
//@+node:gcross.20110705142905.1183: *3* fireLightningBoltAtMiddleZero
function fireLightningBoltAtMiddleZero() {
    return parallel(
        sequence(
            hireUseActor("middle_bit_lightning_bolt","globe"),
            parallel(
                accelerate(0.75,"middle_bit_lightning_bolt","x",382.232),
                accelerate(0.75,"middle_bit_lightning_bolt","y",-333.75)
            ),
            fire("middle_bit_lightning_bolt")
        ),
        sequence(
            wait(0.5),
            hireAndFadeInUseActor(0.1,"middle_bit_explosion"),
            hireUseActor("middle_bit_one","middle_bit_explosion"),
            fire("middle_bit_zero"),
            parallel(
                fadeIn(1,"middle_bit_one"),
                fadeOutAndFire(1,"middle_bit_explosion")
            )
        )
    )
}
//@+node:gcross.20110712230459.5663: *3* hireAndSlideLeft
function hireAndSlideLeft(duration,actor_name,offset) {
    return sequence(
        hire(actor_name),
        set(actor_name,"x",offset),
        decelerate(duration,actor_name,"x",0)
    )
}
//@+node:gcross.20110712230459.5655: *3* nextTitleIndex
var current_title_index = -1

function nextTitleIndex() {
    current_title_index += 1
    return current_title_index
}
//@+node:gcross.20110702143210.1163: *3* rotateTitle
function rotateTitle(index) {
    return sequence(
        parallel(
            accelerate(0.25,titles[index-1],"y",-50),
            fadeOutAndFire(0.25,titles[index-1])
        ),
        hireUseActor(titles[index]),
        set(titles[index],"y",-50),
        parallel(
            decelerate(0.25,titles[index],"y",0),
            fadeIn(0.25,titles[index])
        )
    )
}
//@+node:gcross.20110712230459.5656: *3* rotateNextTitle
function rotateNextTitle() {
    return rotateTitle(nextTitleIndex())
}
//@+node:gcross.20110712230459.5651: *3* rotateSlide
function rotateSlide(old_slide,new_slide) {
    return parallel(
        fadeOutAndFire(1,old_slide),
        hireAndFadeIn(1,new_slide)
    )
}
//@-others

var titles = [
    //@+<< Titles >>
    //@+node:gcross.20110629122941.1134: ** << Titles >>
    "Outline",
    "Quantum mechanics is fuzzy",
    "But who actually makes things that small?",
    "Quantum computing: embrace the fuzz!",
    "How quantum computers die",
    "Classical error correction",
    "Quantum error correction",
    "Classical error correction: an alternative",
    "Quantum measurement",
    "The Feynman Algorithm (applied to codes)",
    "The CodeQuest Algorithm",
    "Case Study: Lattice codes",
    "Conclusions",
    //@-<< Titles >>
]

window.addEventListener("load",function() {
    (function() {
        var resources = document.getElementById("resources")
        var title_template = document.getElementById("title_template")
        for(var i = 0; i < titles.length; ++i) {
            var title = titles[i]
            var node = title_template.cloneNode(false)
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
        hire("title_slide"),

        //@+at
        // Hack to work around Chrome filter bug.
        //@@c
        hire("quantum_computer",makeQuantumComputerActor()),
        hideQuantumComputer(),
        "",
        //@+node:gcross.20110712230459.5657: *3* Outline
        hire("standard_backdrop",default_value,"title_slide"),
        hire(titles[nextTitleIndex()],default_value,"title_slide"),
        hire("grey_rectangle",default_value,"title_slide"),
        fadeOutAndFire(1,
            "grey_rectangle",
            "title_slide"
        ),
        "",
        hireAndSlideLeft(0.5,"outline_bullet_1",1000),
        "",
        hireAndSlideLeft(0.5,"outline_bullet_2",1000),
        "",
        hireAndSlideLeft(0.5,"outline_bullet_3",1000),
        "",
        hireAndSlideLeft(0.5,"outline_bullet_4",1000),
        "",
        hireAndSlideLeft(0.5,"outline_bullet_5",1000),
        "",
        hireAndSlideLeft(0.5,"outline_bullet_6",1000),
        "",
        fadeOutAndFire(1,
            "outline_bullet_1",
            "outline_bullet_2",
            "outline_bullet_3",
            "outline_bullet_4",
            "outline_bullet_5",
            "outline_bullet_6"
        ),
        "",
        //@+node:gcross.20110702143210.1150: *3* Quantum mechanics is fuzzy
        rotateNextTitle(),
        "",
        parallel(
            hireAndFadeIn(1,"shrinking_particle_backdrop"),
            hireAndFadeIn(1,"magnified_box",new MagnifiedBoxActor("particle_box"))
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
        rotateNextTitle(),
        "",
        hire("intel"),
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
        hire("amd"),
        set("amd","y",250),
        decelerate(0.5,"amd","y",0),
        "",
        decelerate(0.5,"amd","y",250),
        fire("amd"),
        "",
        hire("left_chip"),
        set("left_chip","x",-500),
        decelerate(0.5,"left_chip","x",0),
        "",
        hire("right_chip"),
        set("right_chip","x",500),
        decelerate(0.5,"right_chip","x",0),
        "",
        hire("whitescreen",default_value,"intel"),
        hire("shrinking_particle_backdrop",default_value,"whitescreen"),
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
        rotateNextTitle(),
        "",
        parallel(
            fadeOutAndFire(1,
                "shrinking_particle_backdrop",
                "magnified_box"
            ),
            hireAndFadeIn(1,"glass_half_empty"),
            hireAndFadeIn(1,"faaaaace",makeFaaaaaceActor())
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
            hireAndFadeIn(1,"huge_zero",default_value,"glass_half_full")
        ),
        fire("glass_half_full"),
        "",
        parallel(
            fadeOut(0.5,"huge_zero"),
            hireAndFadeIn(0.5,"huge_one")
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
        hireAndFadeIn(1,"function_applied_to_four_digits"),
        "",
        hireAndFadeIn(1,"eye",default_value,"four_digits_left_column"),
        "",
        hire("four_digits_post_measurement"),
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
        (function(){
            var lines = []
            var entrances = []
            for(var i = 1; i <= 9; ++i) {
                var id = "quantum_algorithm_" + i
                lines.push(hire(id))
                lines.push(set(id,"x",1024))
                entrances.push(
                    sequence(
                        wait((i-1)*0.05),
                        decelerate(0.5,id,"x",0)
                    )
                )
            }
            lines.push(parallel.apply(null,entrances))
            return sequence.apply(null,lines)
        })(),
        "",
        (function(){
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
            return parallel.apply(null,fades)
        })(),
        "",
        (function(){
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
            return parallel.apply(null,unfades)
        })(),
        "",
        hireUseActors("globe","i_hate_quantum_computers"),
        set(styleOf("i_hate_quantum_computers"),"opacity",0),
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
        showQuantumComputer(),
        moveToEnd("quantum_computer"),
        fadeIn(0.5,"quantum_computer"),
        //@+node:gcross.20110702233701.1174: *3* How quantum computers die
        rotateNextTitle(),
        "",
        hire("lightning_bolt_1",new UseActor("lightning_bolt"),"globe"),
        hire("lightning_bolt_2",new UseActor("lightning_bolt"),"globe"),
        set("lightning_bolt_2","y",-50),
        hire("lightning_bolt_3",new UseActor("lightning_bolt"),"globe"),
        set("lightning_bolt_3","y",+50),
        parallel(
            accelerate(0.75,"lightning_bolt_1","x",560),
            sequence(wait(0.5),accelerate(0.75,"lightning_bolt_2","x",560)),
            sequence(wait(1.0),accelerate(0.75,"lightning_bolt_3","x",560)),
            sequence(
                wait(0.5),
                linear(0.1,"quantum_computer","damage",1),
                linear(0.4,"quantum_computer","damage",0.2),
                linear(0.1,"quantum_computer","damage",1),
                linear(0.4,"quantum_computer","damage",0.2),
                linear(0.1,"quantum_computer","damage",1),
                linear(0.5,"quantum_computer","damage",0)
            )
        ),
        fire("lightning_bolt_1","lightning_bolt_2","lightning_bolt_3"),
        "",
        parallel(
            smooth(1,"globe","x",453.61645),
            smooth(1,"globe","y",298.0)
        ),
        parallel(
            smooth(1,"quantum_computer","open",1),
            linear(1,"quantum_computer","damage",1)
        ),
        "",
        parallel(
            smooth(1,"globe","x",233.61645),
            smooth(1,"globe","y",438.0),
            smooth(1,"quantum_computer","open",0),
            linear(1,"quantum_computer","damage",0)
        ),
        "",
        hireAndFadeIn(1,"lightning_bolt_shield",default_value,"globe"),
        hireUseActor("lightning_bolt_cover","globe"),
        "",
        hire("lightning_bolt_1",new UseActor("lightning_bolt"),"lightning_bolt_cover"),
        set("lightning_bolt_1","y",-50),
        hire("lightning_bolt_2",new UseActor("lightning_bolt"),"lightning_bolt_cover"),
        set("lightning_bolt_2","y",+50),
        hire("lightning_bolt_3",new UseActor("lightning_bolt"),"globe"),
        parallel(
            linear(0.3,"lightning_bolt_1","x",240),
            sequence(
                wait(0.5),
                linear(0.3,"lightning_bolt_2","x",240)
            ),
            sequence(
                wait(1),
                linear(0.3,"lightning_bolt_3","x",240),
                linear(0.15,"lightning_bolt_3","x",360)
            ),
            sequence(
                wait(1.45),
                linear(0.1,"quantum_computer","damage",1)
            )
        ),
        "",
        moveToEnd("globe"),
        hireAndFadeIn(1,"whitescreen",default_value,"globe"),
        fire(
            "lightning_bolt_1",
            "lightning_bolt_2",
            "lightning_bolt_3",
            "lightning_bolt_cover",
            "lightning_bolt_shield",
            "whitescreen"
        ),
        hideQuantumComputer(),
        parallel(
            smooth(1,"globe","x",129.768),
            smooth(1,"globe","y",641.3125),
            smooth(1,"globe","scale",0.5814549116065738)
        ),
        "",
        //@+node:gcross.20110702233701.1179: *3* Classical error correction
        rotateNextTitle(),
        "",
        hireAndFadeIn(1,"middle_bit_zero"),
        "",
        fireLightningBoltAtMiddleZero(),
        "",
        parallel(
            fadeOutAndFire(1,"middle_bit_one"),
            hireAndFadeIn(1,"middle_bit_zero")
        ),
        "",
        hire("left_bit_zero",new UseActor("middle_bit_zero")),
        hire("right_bit_zero",new UseActor("middle_bit_zero")),
        parallel(
            smooth(1,"left_bit_zero","x",-255),
            smooth(1,"right_bit_zero","x",+255)
        ),
        "",
        fireLightningBoltAtMiddleZero(),
        "",
        hireAndFadeIn(0.5,"voting_box"),
        "",
        wait(0.1),
        hire("voting_box_input",default_value,"left_bit_zero"),
        hire("voting_box_input_cover",default_value,"left_bit_zero"),
        linear(1,"voting_box_input_cover","y",360),
        fire("voting_box_input_cover"),
        hire("voting_box_output",default_value,"voting_box"),
        hire("voting_box_output_cover",default_value,"voting_box"),
        linear(0.5,"voting_box_output_cover","x",380),
        fire("voting_box_output_cover"),
        "",
        parallel(
            hireAndFadeIn(1,"middle_bit_zero"),
            fadeOutAndFire(1,
                "middle_bit_one",
                "voting_box",
                "voting_box_input",
                "voting_box_output"
            )
        ),
        hireAndFadeIn(1,"i_hate_democracy"),
        "",
        parallel(
            fadeOut(1,"i_hate_democracy"),
            fadeOut(1,"left_bit_zero"),
            fadeOut(1,"middle_bit_zero"),
            fadeOut(1,"right_bit_zero")
        ),
        fire("i_hate_democracy","middle_bit_zero"),
        "",
        //@+node:gcross.20110705142905.1189: *3* Quantum error correction
        rotateNextTitle(),
        "",
        hireAndFadeIn(1,"qubits_1_through_3"),
        "",
        parallel(
            sequence(
                hire("middle_bit_lightning_bolt",default_value,"globe"),
                parallel(
                    accelerate(0.75,"middle_bit_lightning_bolt","x",382.232),
                    accelerate(0.75,"middle_bit_lightning_bolt","y",-333.75)
                ),
                fire("middle_bit_lightning_bolt")
            ),
            sequence(
                wait(0.5),
                hireAndFadeIn(0.1,"middle_bit_explosion"),
                fadeOutAndFire(1,"middle_bit_explosion")
            )
        ),
        "",
        hireAndFadeIn(0.5,"voting_box"),
        "",
        hireAndFadeIn(1,"eye",default_value,"left_bit_zero"),
        "",
        parallel(
            fadeIn(1,"left_bit_zero"),
            hireAndFadeIn(1,"middle_bit_one"),
            fadeIn(1,"right_bit_zero"),
            fadeOutAndFire(1,"qubits_1_through_3")
        ),
        "",
        hireAndFadeIn(1,"maniacal_laughter"),
        "",
        fadeOutAndFire(1,
            "eye",
            "maniacal_laughter",
            "middle_bit_one",
            "left_bit_zero",
            "right_bit_zero",
            "voting_box"
        ),
        "",
        //@+node:gcross.20110705142905.1193: *3* Classical error correction: an alternative
        rotateNextTitle(),
        "",
        hireAndFadeIn(1,"classical_bits"),
        "",
        hire("do_we_agree_cover",default_value,"classical_bits"),
        hire("do_we_agree",default_value,"do_we_agree_cover"),
        linear(0.5,"do_we_agree_cover","y",151),
        fire("do_we_agree_cover"),
        "",
        hireAndFadeInUseActors(0.5,"do_we_agree_left_check","do_we_agree_right_check"),
        "",
        parallel(
            fadeOut(0.5,"do_we_agree_left_check"),
            hireAndFadeInUseActors(0.5,"do_we_agree_left_X","classical_bit_1_error")
        ),
        "",
        parallel(
            fadeOut(0.5,"do_we_agree_left_X"),
            fadeOut(0.5,"do_we_agree_right_check"),
            fadeIn(0.5,"do_we_agree_left_check"),
            fadeOutAndFire(0.5,"classical_bit_1_error"),
            hireAndFadeInUseActors(0.5,"do_we_agree_right_X","classical_bit_3_error")
        ),
        "",
        parallel(
            fadeIn(0.5,"do_we_agree_left_X"),
            fadeOut(0.5,"do_we_agree_left_check"),
            fadeOutAndFire(0.5,"classical_bit_3_error"),
            hireAndFadeInUseActor(0.5,"classical_bit_2_error")
        ),
        fire("do_we_agree_left_check","do_we_agree_right_check"),
        "",
        fadeOutAndFire(1,
            "classical_bits",
            "classical_bit_2_error",
            "do_we_agree",
            "do_we_agree_left_X",
            "do_we_agree_right_X",
            "globe"
        ),
        "",
        //@+node:gcross.20110709173714.1269: *3* Quantum measurement
        rotateNextTitle(),
        "",
        hire("bloch_sphere"),
        set(styleFor(".bloch"),"opacity",0),
        linear(1,styleFor(".bloch.bloch_classical_bit_values"),"opacity",0,1),
        "",
        linear(1,styleFor(".bloch.bloch_probabilistic_bit_axis"),"opacity",0,1),
        "",
        parallel(
            linear(1,styleFor(".bloch.bloch_globe"),"opacity",0,1),
            linear(1,styleFor(".bloch.bloch_classical_Z_intersections"),"opacity",0,1)
        ),
        "",
        linear(1,styleFor(".bloch"),"opacity",1),
        sequence.apply(null,
            [".bloch"
            ,".bloch.bloch_classical_bit_values"
            ,".bloch.bloch_probabilistic_bit_axis"
            ,".bloch.bloch_classical_Z_intersections"
            ,".bloch.bloch_globe"
            ].map(function (selector) { return set(styleFor(selector),"opacity",""); })
        ),
        "",
        set(styleFor(".bloch.bloch_axis.bloch_Z_axis"),"opacity",1),
        parallel(
            linear(1,styleFor(".bloch.bloch_axis"),"opacity",1,0.25),
            hireAndFadeIn(1,"bloch_Z_measurement_outcomes")
        ),
        "",
        parallel(
            sequence(
                linear(1,styleFor(".bloch.bloch_axis.bloch_Z_axis"),"opacity",0.25),
                set(styleFor(".bloch.bloch_axis.bloch_Z_axis"),"opacity","")
            ),
            linear(1,styleFor(".bloch.bloch_axis.bloch_X_axis"),"opacity",0.25,1),
            hireAndFadeIn(1,"bloch_X_measurement_outcomes"),
            fadeOut(1,"bloch_Z_measurement_outcomes")
        ),
        "",
        parallel(
            sequence(
                linear(1,styleFor(".bloch.bloch_axis.bloch_X_axis"),"opacity",0.25),
                set(styleFor(".bloch.bloch_axis.bloch_X_axis"),"opacity","")
            ),
            linear(1,styleFor(".bloch.bloch_axis.bloch_Y_axis"),"opacity",0.25,1),
            hireAndFadeIn(1,"bloch_Y_measurement_outcomes"),
            fadeOut(1,"bloch_X_measurement_outcomes")
        ),
        "",
        parallel(
            linear(1,styleFor(".bloch.bloch_axis"),"opacity",1),
            fadeIn(1,"bloch_Z_measurement_outcomes"),
            fadeIn(1,"bloch_X_measurement_outcomes")
        ),
        sequence.apply(null,
            [".bloch.bloch_axis"
            ,".bloch.bloch_axis.bloch_X_axis"
            ,".bloch.bloch_axis.bloch_Y_axis"
            ,".bloch.bloch_axis.bloch_Z_axis"
            ].map(function (selector) { return set(styleFor(selector),"opacity",""); })
        ),
        "",
        hireAndFadeIn(0.5,"first_code_backdrop"),
        hireUseActors("first_code_measurement_1","first_code_measurement_2","first_code_measurement_3"),
        set("first_code_measurement_1","x",280),
        set("first_code_measurement_2","x",280),
        set("first_code_measurement_3","x",280),
        parallel(
            decelerate(0.5,"first_code_measurement_1","x",0),
            sequence(
                wait(0.25),
                decelerate(0.5,"first_code_measurement_2","x",0)
            ),
            sequence(
                wait(0.5),
                decelerate(0.5,"first_code_measurement_3","x",0)
            )
        ),
        "",
        parallel(
            linear(1,styleFor(".first_code_Z_measurements"),"opacity",1,0.1),
            hireAndFadeIn(1,"bloch_identity_measurement_label"),
            linear(1,styleFor(".bloch.bloch_axis"),"opacity",1,0.25),
            linear(1,styleOf("bloch_X_measurement_outcomes"),"opacity",1,0.25),
            linear(1,styleOf("bloch_Y_measurement_outcomes"),"opacity",1,0.25),
            linear(1,styleOf("bloch_Z_measurement_outcomes"),"opacity",1,0.25)
        ),
        "",
        parallel(
            fadeOutAndFire(1,"bloch_identity_measurement_label"),
            parallel(
                linear(1,styleFor(".bloch.bloch_axis"),"opacity",1),
                linear(1,styleFor(".first_code_Z_measurements"),"opacity",1)
            ),
            sequence(
                // Dumb workaround for what looks like a stupid browser bug that was causing measurement outcomes to flicker
                fire("bloch_X_measurement_outcomes","bloch_Y_measurement_outcomes","bloch_Z_measurement_outcomes"),
                hireUseActors("bloch_X_measurement_outcomes","bloch_Y_measurement_outcomes","bloch_Z_measurement_outcomes"),
                set(styleOf("bloch_X_measurement_outcomes"),"opacity",0.25),
                set(styleOf("bloch_Y_measurement_outcomes"),"opacity",0.25),
                set(styleOf("bloch_Z_measurement_outcomes"),"opacity",0.25),
                parallel(
                    linear(1,styleOf("bloch_X_measurement_outcomes"),"opacity",0.25,1),
                    linear(1,styleOf("bloch_Y_measurement_outcomes"),"opacity",0.25,1),
                    linear(1,styleOf("bloch_Z_measurement_outcomes"),"opacity",0.25,1)
                )
            )
        ),
        "",
        hireAndFadeIn(0.5,"second_code_backdrop"),
        hireUseActors("second_code_measurement_1","second_code_measurement_2"),
        set("second_code_measurement_1","x",280),
        set("second_code_measurement_2","x",280),
        parallel(
            decelerate(0.5,"second_code_measurement_1","x",0),
            sequence(
                wait(0.25),
                decelerate(0.5,"second_code_measurement_2","x",0)
            )
        ),
        "",
        parallel(
            linear(1,styleFor(".bloch.bloch_axis.bloch_Z_axis"),"opacity",1,0.25),
            linear(1,styleOf("bloch_Z_measurement_outcomes"),"opacity",1,0.25)
        ),
        "",
        fadeOutAndFire(1,
            "bloch_sphere",
            "bloch_X_measurement_outcomes",
            "bloch_Y_measurement_outcomes",
            "bloch_Z_measurement_outcomes",
            "first_code_backdrop",
            "first_code_measurement_1",
            "first_code_measurement_2",
            "first_code_measurement_3",
            "second_code_backdrop",
            "second_code_measurement_1",
            "second_code_measurement_2"
        ),
        "",
        //@+node:gcross.20110711225427.1272: *3* The Feynman Algorithm
        rotateNextTitle(),
        "",
        sequence.apply(null,[1,2,3].map(function(index) {
            var actor_name = "feynman_algorithm_step_" + index
            return sequence(
                hire(actor_name),
                set(actor_name,"x",1000),
                decelerate(0.75,actor_name,"x",0)
            );
        })),
        "",
        hireAndFadeIn(1,"brain"),
        "",
        hireAndFadeIn(1,"notbrain"),
        "",
        hireAndFadeInUseActors(1,"grey_rectangle","title_slide"),
        (function() {
            next_title_index = nextTitleIndex()
            return sequence(
                fire(
                    "feynman_algorithm_step_1",
                    "feynman_algorithm_step_2",
                    "feynman_algorithm_step_3",
                    "brain",
                    "notbrain",
                    titles[next_title_index-1]
                ),
                hire(titles[next_title_index],default_value,"grey_rectangle")
            )
        })(),
        "",
        fadeOutAndFire(1,"grey_rectangle","title_slide"),
        "",
        //@+node:gcross.20110712230459.1201: *3* The CodeQuest Algorithm
        sequence.apply(null,[1,2,3].map(function(index) {
            var actor_name = "codequest_algorithm_step_" + index
            return sequence(
                hire(actor_name),
                set(actor_name,"x",1000),
                decelerate(0.75,actor_name,"x",0)
            );
        })),
        "",
        hireAndFadeIn(1,"chuck_norris"),
        "",
        hire("codequest_computer",default_value,"chuck_norris"),
        fadeOutAndFire(1,
            "codequest_algorithm_step_1",
            "codequest_algorithm_step_2",
            "codequest_algorithm_step_3",
            "chuck_norris"
        ),
        "",
        hire("codequest_hunt_cover",default_value,"codequest_computer"),
        hire("codequest_hunt",default_value,"codequest_hunt_cover"),
        linear(2,"codequest_hunt_cover","x",975),
        fire("codequest_hunt_cover"),
        "",
        fadeOutAndFire(1,"codequest_computer","codequest_hunt"),
        //@+node:gcross.20110712230459.1204: *3* Case Study: Lattice codes
        rotateNextTitle(),
        "",
        set(styleFor("#lattice_exhibition_qubits"),"opacity",0),
        set(styleFor("#lattice_exhibition_interactions"),"opacity",0),
        hireAndFadeIn(1,"lattice_exhibition"),
        "",
        parallel(
            linear(1,styleFor("#lattice_exhibition_qubits"),"opacity",1),
            hireAndFadeIn(1,"lattice_exhibition_qubits_label")
        ),
        "",
        parallel(
            linear(1,styleFor("#lattice_exhibition_interactions"),"opacity",1),
            hireAndFadeIn(1,"lattice_exhibition_interactions_label")
        ),
        "",
        parallel(
            fadeOutAndFire(1,
                "lattice_exhibition",
                "lattice_exhibition_qubits_label",
                "lattice_exhibition_interactions_label"
            ),
            hireAndFadeIn(1,"tilings")
        ),
        "",
        hireAndFadeIn(1,"tiling_choice_counts"),
        "",
        parallel(
            fadeOutAndFire(1,
                "tilings",
                "tiling_choice_counts"
            ),
            hireAndFadeIn(1,"quadrille")
        ),
        "",
        set(styleFor("#quadrille_X_axis_tics"),"opacity",1),
        set(styleFor("#quadrille_X_axis_radius"),"opacity",1),
        linear(0.5,styleFor(".quadrille_axes"),"opacity",1,0.25),
        "",
        linear(0.5,styleFor("#quadrille_X_axis_count"),"opacity",0.25,1),
        "",
        remove(styleFor("#quadrille_X_axis_tics"),"opacity"),
        remove(styleFor("#quadrille_X_axis_radius"),"opacity"),
        remove(styleFor("#quadrille_X_axis_count"),"opacity"),
        set(styleFor(".quadrille_axes.quadrille_X_axis"),"opacity",1),
        parallel(
            sequence(
                linear(0.5,styleFor(".quadrille_axes.quadrille_X_axis"),"opacity",0.25),
                remove(styleFor(".quadrille_axes.quadrille_X_axis"),"opacity")
            ),
            linear(0.5,styleFor("#quadrille_Y_axis"),"opacity",0.25,1)
        ),
        "",
        parallel(
            sequence(
                linear(0.5,styleFor("#quadrille_Y_axis"),"opacity",0.25),
                remove(styleFor("#quadrille_Y_axis"),"opacity")
            ),
            linear(0.5,styleFor("#quadrille_Z_axis"),"opacity",0.25,1)
        ),
        "",
        linear(0.5,styleFor(".quadrille_axes"),"opacity",1),
        remove(styleFor(".quadrille_axes"),"opacity"),
        remove(styleFor("#quadrille_Z_axis"),"opacity"),
        "",
        rotateSlide("quadrille","bacon_shor_code"),
        "",
        rotateSlide("bacon_shor_code","hextille"),
        "",
        parallel(
            linear(0.5,styleFor("#hextille_distance_3"),"opacity",1,0.25),
            linear(0.5,styleFor("#hextille_distance_4"),"opacity",1,0.25)
        ),
        linear(0.5,styleFor("#hextille_distance_3"),"opacity",1),
        "",
        parallel(
            linear(0.5,styleFor("#hextille_distance_3"),"opacity",0.25),
            sequence(
                linear(0.5,styleFor("#hextille_distance_4"),"opacity",1),
                remove(styleFor("#hextille_distance_4"),"opacity")
            )
        ),
        "",
        sequence(
            linear(0.5,styleFor("#hextille_distance_3"),"opacity",1),
            remove(styleFor("#hextille_distance_3"),"opacity")
        ),
        "",
        rotateSlide("hextille","hextille_codes"),
        "",
        rotateSlide("hextille_codes","rhombihexadeltille"),
        "",
        rotateSlide("rhombihexadeltille","rhombihexadeltille_code"),
        "",
        fadeOutAndFire(1,"rhombihexadeltille_code"),
        "",
        //@+node:gcross.20110712230459.5660: *4* Conclusions
        rotateNextTitle(),
        "",
        hireAndSlideLeft(0.5,"conclusions_bullet_1",1000),
        "",
        hireAndSlideLeft(0.5,"conclusions_bullet_2",1000),
        "",
        hireAndSlideLeft(0.5,"conclusions_bullet_3",1000),
        //@-others
        //@-<< Script >>
    ]))
},false)
//@-leo
