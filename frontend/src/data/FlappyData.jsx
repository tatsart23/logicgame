const FlappyData = {
    title: 'Flappy Bird',
    sections: [
        {
            heading: 'Pelin kuvaus',
            content: [
                'Flappy Bird on yksinkertainen mutta haastava peli, jossa ohjaat lintua esteiden läpi.',
                'Peli päättyy, jos lintu osuu putkeen tai maahan.',
                'Peli alkaa, kun napsautat pelialuetta tai painat välilyöntiä.',
                'Pelin tavoitteena on kerätä mahdollisimman paljon pisteitä lentämällä esteiden läpi.',
            ],
        },
        {
            heading: 'Ohjeet',
            content: [
                'Paina hiirtä tai välilyöntiä saadaksesi linnun hyppäämään.',
                'Vältä törmäämästä putkiin ja maahan.',
                'Peli päättyy, jos lintu osuu mihinkään esteeseen tai lentää ulos pelialueelta.',
                'Voit aloittaa pelin uudelleen painamalla "Restart"-painiketta.',
            ],
        },
        {
            heading: 'Pelimuodot',
            content: [
                'Normaali: Pelaa perinteistä Flappy Bird -tyyliä ja yritä saavuttaa korkein mahdollinen pistemäärä.',
                'Hardcore: Lintu putoaa nopeammin ja putkien väli on pienempi.',
            ],
        },
    ],
    buttonText: 'Takaisin etusivulle',
    buttonLink: '/',
};

export default FlappyData;
