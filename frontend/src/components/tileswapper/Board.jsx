import Infopanel from "../Infopanel";

const Board = () => {

    const infoPanelData = {
        title: 'Tileswap',
        sections: [
          {
            heading: 'Pelin kuvaus',
            content: [
              'Kanoodle on pulmapeli, jossa tavoitteena on sijoittaa palikoita pelilaudalle.',
              'Peli päättyy, kun palikoita ei enää mahdu laudalle.',
              'Peli alkaa, kun painat aloita-painiketta.',
              'Peli loppuu, kun aika loppuu tai pelilauta on täynnä.',
            ],
          },
          {
            heading: 'Ohjeet',
            content: [
              'Valitse palikka klikkaamalla sitä.',
              'Pyöritä palikkaa hiiren oikealla painikkeella.',
              'Käännä palikka painamalla välilyöntiä.',
              'Laita palikka laudalle klikkaamalla kenttää.',
              'Palikoita voi uudelleen asettaa klikkaamalla sitä hiiren oikealla painikkeella.',
            ],
          },
          {
            heading: 'Pelimuodot',
            content: [
              'Peli sisältää kaksi eri pelimuotoa: Normaali(Start)',
              'Random (Peli asettaa satunnaisen palikan satunnaiseen paikkaan)',
            ],
          },
        ],
        buttonText: 'To Homepage',
        buttonLink: '/',
      };

  return (
    <>
      <Infopanel {...infoPanelData}/>

      <div className="grid grid-cols-4 ">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="tile border-2 border-black bg-white w-16 h-16"
          ></div>
        ))}
      </div>
    </>
  );
};

export default Board;
