var svg = Snap('#top-svg');
// viewbox: -400 0 800 320

// from http://svg.dabbles.info/snaptut-animateframe
function nextFrame ( el, frameArray,  whichFrame ) {
        if( whichFrame >= frameArray.length ) { return }
        el.animate( frameArray[ whichFrame ].dest, frameArray[ whichFrame ].duration, frameArray[whichFrame].easing, nextFrame.bind( null, el, frameArray, whichFrame + 1 ) );
}

// draw sky
// =================
svg.rect(-400, 0, 800, 320).attr({
    fill: '#b7e0f1'
});
var cloudGroup = svg.g();
var cloudPlacer = function(settings){
    // index: cloud kind
    // settings: array of cloud placing settings
    // setting: {
    //     x: x
    //     y: y
    //     scale: scale rate
    //     flip: true -> flip horizontal
    // }
    var ret = function(settings, fr){
        var p = fr.select('path');
        svg.append(p)
        var pd = p.toDefs();
        var useElem = null;
        var transformDesc = null;
        for(var idx in settings){
            if(settings[idx]['flip'])
                transformDesc = 'scale(' + (-settings[idx]['scale']).toString() + ',' + settings[idx]['scale'].toString() + ')';
            else
                transformDesc = 'scale(' + settings[idx]['scale'].toString() + ',' + settings[idx]['scale'].toString() + ')';
            transformDesc = 'translate(' + settings[idx]['x'].toString() + ',' + settings[idx]['y'].toString() + ') ' + transformDesc;
            useElem = pd.use()
                .attr({ 'transform': transformDesc });
            cloudGroup.append(useElem);
        }
    };
    return ret.bind(null, settings);
}
Snap.load('/imgs/cloud0.svg', cloudPlacer([{
    'x': -200,
    'y': 20,
    'scale': 0.5,
    'flip': false
},{
    'x': 150,
    'y': 80,
    'scale': 0.8,
    'flip': true
}]));
Snap.load('/imgs/cloud1.svg', cloudPlacer([{
    'x': -300,
    'y': 50,
    'scale': 0.6,
    'flip': false
},{
    'x': -100,
    'y': 30,
    'scale': 1.0,
    'flip': false
},{
    'x': 320,
    'y': 10,
    'scale': 0.9,
    'flip': true
}]));


// draw kanban
// =================
var kanbanGroup = svg.g();
Snap.load('/imgs/kanban.svg', function(f){
    var g = f.select("g");
    g.attr({
        transform: 'translate(-180,0) scale(1.5,1.5)'
    });
    kanbanGroup.append(g);
    nextFrame(g, [{
        dest: { transform: 'translate(-180,280) scale(1.5,1.5)' },
        duration: 700,
        easing: mina.easeout
    }, {
        dest: { transform: 'translate(-180,290) scale(1.5,1.5)' },
        duration: 300,
        easing: mina.backout
    }, {
        dest: { transform: 'translate(-180,290) scale(1.5,1.5) rotate(-10)', y: 300 },
        duration: 1000,
        easing: mina.elastic
    }], 0);
});


// draw ground
// =================
svg.rect(-400, 280, 800, 40).attr({
    fill: '#cf7d41'
});
var glassPattern = svg.g(
    svg.path('M0,3 v10 l10,10 l10,-10 v-10 z').attr({
        fill: '#965a2e'
    }),
    svg.path('M0,0 v10 l10,10 l10,-10 v-10 z').attr({
        fill: '#68c95d'
    })).toPattern(0, 0, 20, 40).attr({
    x: '-400',
    y: '280'
});
svg.rect(-400, 280, 800, 30).attr({
    fill: glassPattern
});

// draw logo
// =================
var logoGroup = svg.g();
Snap.load("/imgs/logo.svg", function(fr) {
    var g = fr.select("g");
    g.attr({
        transform: 'scale(0.5,0.5)'
    });
    logoGroup.attr({
        transform: 'translate(70,-20)',
        opacity: '0'
    });
    logoGroup.append(g);
    logoGroup.append(
        svg.text(125,268,"〜 白い幸運屋 〜")
        .attr({
            'font-size': 32,
            'font-family': 'YasashisaGothicBold',
            'text-anchor': 'middle',
            'fill': '#FFF',
            'stroke': '#6dbae6',
            'stroke-width': '4',
            'stroke-linejoin': 'round',
            'stroke-opacity': '0.8',
            'paint-order': 'stroke'
        })
    );
    nextFrame(logoGroup, [
        {
            dest: { transform: 'translate(70,-20)', opacity: '0' },
            duration: 1000,
            easing: mina.linear
        }, {
            dest: { transform: 'translate(70,0)', opacity: '1' },
            duration: 1000,
            easing: mina.linear
        }
    ], 0);
} );
