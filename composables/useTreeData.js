export const useTreeData = () => {
    const treeData = {
        appelbomen: {
            name: "Appelbomen",
            slug: "appelbomen",
            description: "Onze collectie appelbomen, gekweekt zonder bestrijdingsmiddelen en kunstmest",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop",
            varieties: [
                {
                    name: "Alkmene",
                    slug: "alkmene",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Begin september",
                    blossomTime: "Maart-april",
                    origin: "Duitsland, 1930",
                    fruitColor: "Geelgroen met oranje-rode blos aan zonzijde",
                    taste: "Friszuur, aromatisch, stevig wit vruchtvlees - echte Cox-achtige smaak",
                    pollination: "Niet zelfbestuivend",
                    features: ["Schurftresistent", "Meeldauwresistent"],
                    description:
                        "Vroege herfstappel met frisse zoetzure smaak. Uitstekend voor directe consumptie met knapperig vruchtvlees.",
                    fullDescription:
                        "Een Duitse kruising uit 1930 tussen Cox's Orange Pippin en Geheimrat Dr. Oldenburg, ontwikkeld aan het Kaiser Wilhelm Instituut in Müncheberg. Middelgrote, ronde appels met een prachtige geelgroene basiskleur die aan de zonzijde een warme oranje-rode blos ontwikkelt. Vroege bloeier met donkerroze bloemknoppen die opengaan tot overvloedige lichtroze tot witte bloesems. Bij uitstek een handappel, maar door het stevige vruchtvlees ook uitstekend voor appelmoes, compote en taarten. Middelmatig sterkgroeiende boom die 3-4 meter bereikt met regelmatige jaarlijkse productie.",
                },
                /* Ambro - tijdelijk uitgeschakeld
                {
                    name: "Ambro",
                    slug: "ambro",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Eind september",
                    blossomTime: "April-mei",
                    origin: "Schiermonnikoog, Nederland",
                    fruitColor: "Rozerood gestreept op groenachtige ondergrond",
                    taste: "Zeer goed van smaak, zacht smeltend vruchtvlees met verfijnd zoet aroma",
                    pollination: "-",
                    features: ["Nederlandse oorsprong", "Windbestendig"],
                    description:
                        "Bijzondere Nederlandse toevalszaailing van Schiermonnikoog. Zoete appel met licht zure ondertoon.",
                    fullDescription:
                        "Een bijzonder Nederlandse toevalszaailing, ontdekt op Schiermonnikoog langs een fietspad. Waarschijnlijk ontkiemd uit een weggegooid klokhuis. In 1998 geïntroduceerd en vernoemd naar Ambrosius Visser, een eilandbewoner die verdronk bij een reddingspoging. Opvallend hooggebouwde appel met karakteristiek lange steel. Overdonderende rozewitte bloesem in april-mei. Bijzonder geschikt voor uitdagende omstandigheden - droog zand, zoute zeelucht en harde wind. Een echte Wadden-appel.",
                },
                */
                {
                    name: "Bramleys Seedling",
                    slug: "bramleys-seedling",
                    rootstocks: ["M11"],
                    harvestTime: "September-oktober",
                    blossomTime: "April",
                    origin: "Engeland, 1809",
                    fruitColor: "Groen met rode strepen, bij rijpheid gelig",
                    taste: "Uitgesproken zuur - bij uitstek een kookappel",
                    pollination: "Niet zelfbestuivend",
                    features: ["Beste kookappel", "Lange bewaring"],
                    description:
                        "De koningin onder de kookappels. Ideaal voor appelmoes en gebak met grote groene vruchten.",
                    fullDescription:
                        "De koningin onder de kookappels met een fascinerende Engelse geschiedenis. In 1809 plantte Mary Ann Brailsford appelpitten in Southwell, Engeland. De oorspronkelijke boom staat er nog steeds! Imposant grote, onregelmatig afgeronde vruchten. Dit is bij uitstek een keukenappel - uitgesproken zuur en ongeëvenaard voor appelmoes, appelgebak en andere gerechten. Wordt internationaal beschouwd als een van de beste kookappels ter wereld. Het vruchtvlees valt uit elkaar tijdens het koken en geeft een luchtige, schuimige moes. Krachtige groeier die 6-8 meter hoog kan worden.",
                },
                {
                    name: "Ecolette",
                    slug: "ecolette",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Eind september - half oktober",
                    blossomTime: "Eind april - begin mei",
                    origin: "Nederland, modern ras",
                    fruitColor: "Helderrood op groengele ondergrond, in volle zon donkerrood",
                    taste: "Friszoet en sappig met stevige beet, aromatisch",
                    pollination: "-",
                    features: ["Schurftresistent", "Meeldauwresistent", "Biologisch geschikt"],
                    description:
                        "Schurftresistente herfstappel speciaal ontwikkeld voor ecologische teelt. Zoete, aromatische smaak.",
                    fullDescription:
                        "Een modern Nederlands appelras, speciaal ontwikkeld voor ecologisch verantwoorde teelt. Middelgrote appels met opvallend helderrode kleur - appels die volop zon krijgen kleuren prachtig donkerrood. Direct na de oogst al lekker, maar hoe langer bewaard, hoe zoeter. Het vruchtvlees is zeer vast en sappig. Dit is het schurftresistente paradepaardje voor biologische teelt: volledig resistent tegen schurft dankzij het Vf-gen, goed bestand tegen meeldauw, appeltakkanker en witziekte. Een van de meest geschikte rassen voor de biologische hoogstamboomgaard.",
                },
                {
                    name: "Elise",
                    slug: "elise",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Eind augustus - begin september",
                    blossomTime: "April",
                    origin: "Nederland, 1990 (Wageningen)",
                    fruitColor: "Egaal donkerrood op geelgroene ondergrond",
                    taste: "Knapperig en sappig, zoet met subtiele lichte zuurheid",
                    pollination: "-",
                    features: ["Hypoallergeen", "Schurftresistent"],
                    description:
                        "Vroege zomerappel met verfrissende zoetzure smaak. Bekend om hypoallergene eigenschappen.",
                    fullDescription:
                        "Nederlands appelras uit 1990, ontstaan uit een kruising tussen Cox's Orange Pippin en Septer bij het Centrum voor Plantenveredelings- en Reproduktieonderzoek in Wageningen. Vrij grote, kegelvormige appels met uniforme donkerrode blos. Ongeveer twee weken na Elstar plukrijp. Verkrijgbaar van oktober tot april. Zeer resistent tegen schurft en meeldauw. Staat bekend om hypoallergene eigenschappen - mensen met een milde appelallergie kunnen deze appel vaak wel verdragen. Een uitkomst voor appelliefhebbers met een gevoelig immuunsysteem.",
                },
                {
                    name: "Lemoen",
                    slug: "lemoen",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "November - januari",
                    blossomTime: "Mei (middenvroeg)",
                    origin: "Nederland, 1885 (Lunteren)",
                    fruitColor: "Groen tot roestbruin, soms rode blos",
                    taste: "Stevig, sappig, fris-zuur met karakteristiek citrusachtig aroma",
                    pollination: "Niet zelfbestuivend",
                    features: ["Oude Nederlandse variëteit", "Goede bewaarappel"],
                    description:
                        "Authentieke Nederlandse variëteit met karakteristieke citroensmaak. Uitstekende bewaarappel.",
                    fullDescription:
                        "Een authentieke Nederlandse variëteit, rond 1885 ontwikkeld door Notaris J.H. Th. W. van den Ham in Lunteren - dezelfde notaris die ook de Notarisappel op zijn naam heeft. Grote, regelmatige appels. Het witte vruchtvlees is stevig, sappig en fris-zuur met een aangenaam, karakteristiek aroma dat doet denken aan citrus - vandaar de naam 'Lemoen'. Bijzonder goed als handappel, minder geschikt voor appelmoes. Zeer groeikrachtige boom met bolvormige kroon. Begint laat met vruchtdragen maar op oudere leeftijd wel regelmatig. Zeer geschikt voor lichtere gronden. Niet gevoelig voor schurft.",
                },
                {
                    name: "Princess Noble",
                    slug: "princess-noble",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Oktober",
                    blossomTime: "April-mei",
                    origin: "Nederland (Boskoop), sinds 1708",
                    fruitColor: "Groen-geel gestreept met licht rode blos",
                    taste: "Na bewaring zoetzuur en aromatisch met vast, sappig vruchtvlees",
                    pollination: "-",
                    features: ["Historisch ras", "Bewaarvariëteit"],
                    description:
                        "Historisch Nederlands ras uit 1708. Appel voor de fijnproever, ontwikkelt smaak na bewaring.",
                    fullDescription:
                        "Een historisch Nederlands ras, vermoedelijk afkomstig uit Boskoop, met wortels die teruggaan tot 1708. Vroeger algemeen verspreid in Utrecht, Brabant en de IJsselstreek. Bekend onder vele namen: Fransche Kroon, Kroonappel, Prinsesappel, Haagje. Middelgrote appels met karakteristieke groen-geel gestreepte schil. Moet enkele weken narijpen voordat hij op smaak is - na bewaring ontwikkelt zich een zoetzure, aromatische smaak met vast, sappig en knapperig vruchtvlees. Tegenwoordig vooral populair bij liefhebbers van oude rassen. Een stukje levend erfgoed.",
                },
                /* Red Topaz - tijdelijk uitgeschakeld
                {
                    name: "Red Topaz",
                    slug: "red-topaz",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "September-oktober",
                    blossomTime: "April-mei (vroeg)",
                    origin: "Tsjechië, 2002 (mutatie van Topaz)",
                    fruitColor: "Groengeel met intensieve roodoranje, licht gestreepte dekkleur",
                    taste: "Fris, lichtzuur met zoete ondertoon, knapperig en sappig",
                    pollination: "Niet zelfbestuivend",
                    features: ["Schurftresistent", "Meeldauwresistent"],
                    description: "Rode mutatie van Topaz met dezelfde uitstekende eigenschappen en intensievere kleur.",
                    fullDescription:
                        "Een rode mutatie van Topaz, die zelf in 1984 in Tsjechië werd ontwikkeld. Red Topaz kwam in 2002 op de markt. Tamelijk kleine, platronde vruchten van ongeveer 200 gram met een veel intensievere roodoranje dekkleur dan de gewone Topaz. Een opvallend mooie appel. Ongeveer een week vroeger rijp dan gewone Topaz. Dezelfde frisse, lichtzure smaak met zoete ondertoon. Heeft dezelfde natuurlijke resistentie tegen appelschurft en meeldauw. Combineert de uitstekende eigenschappen van Topaz met een aantrekkelijker rood uiterlijk.",
                },
                */
                {
                    name: "Rode Boskoop",
                    slug: "rode-boskoop",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "September-oktober",
                    blossomTime: "April",
                    origin: "Nederland (Boskoop), ca. 1856",
                    fruitColor: "Groengeel met diepe rode blos, vaak ruwschillig",
                    taste: "Karakteristiek friszuur met vol, kruidig karakter - wordt zoeter bij bewaring",
                    pollination: "-",
                    features: ["Klassieke bewaarappel", "Winterhard"],
                    description:
                        "Klassieke Nederlandse bewaarappel met ruwschillig uiterlijk. Legendarisch voor appelgebak.",
                    fullDescription:
                        "Een kleurmutant van de beroemde Schone van Boskoop (Goudrenet), ontdekt omstreeks 1856 in Boskoop - een stadje dat zijn naam voor eeuwig aan deze appel heeft verbonden. Groot tot zeer groot formaat met karakteristiek rond, iets afgeplat profiel. De groengele schil is vaak ruw en draagt een diepe, intense rode blos. Plukrijp vanaf september/oktober, maar optimaal in januari na bewaring. Dit is een klassieke bewaarappel die steeds zoeter wordt. Uitstekend voor directe consumptie, maar legendarisch voor appelgebak en appelmoes. Sterke groeier met uitstekende winterhardheid. Een van de meest geliefde Nederlandse appelrassen.",
                },
                /* Rubinola - tijdelijk uitgeschakeld (EU CPVO PBR tot 31/12/2030)
                {
                    name: "Rubinola",
                    slug: "rubinola",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "September - begin oktober",
                    blossomTime: "April-mei",
                    origin: "Modern resistent ras",
                    fruitColor: "Helderrood tot bloedrode blos",
                    taste: "Zoetzuur en opvallend aromatisch",
                    pollination: "Uitstekende bestuiver voor andere rassen",
                    features: ["Schurftresistent", "Meeldauwresistent", "Biologisch geschikt"],
                    description: "Schurftresistente appel met prachtige rode kleur. Topkeuze voor biologische teelt.",
                    fullDescription:
                        "Een moderne schurftresistente variëteit, speciaal ontwikkeld voor biologische en milieuvriendelijke teelt. Middelgrote, licht afgeplatte of kogelvormige appels met een prachtige helderrode tot bloedrode blos die de appel een feestelijk uiterlijk geeft. Uitstekend houdbaar tot begin maart. Schurftresistent en bijna ongevoelig voor meeldauw - een van de meest ziekteresistente appelrassen. Rubinola is een uitstekende bestuiver voor andere appelrassen, waaronder Santana. Topkeuze voor wie biologisch wil telen zonder concessies aan smaak.",
                },
                */
                /* Santana - tijdelijk uitgeschakeld
                {
                    name: "Santana",
                    slug: "santana",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Half september",
                    blossomTime: "Eerste week mei",
                    origin: "Nederland, 1978",
                    fruitColor: "Rood gestreept op geelgroene ondergrond",
                    taste: "Stevig, knapperig, sappig met friszure aromatische smaak",
                    pollination: "-",
                    features: ["Hypoallergeen", "Ziekteresistent", "Biologisch geschikt"],
                    description:
                        "De 'allergeenvrije appel' - geschikt voor mensen met milde appelallergie. Friszuur en aromatisch.",
                    fullDescription:
                        "Nederlands appelras uit 1978, een kruising tussen Elstar en Priscilla. Internationaal bekend als de 'allergeenvrije appel'. Middelgrote appels met aantrekkelijke rode streping op geelgroene ondergrond. In het begin van het seizoen hard en friszuur, later zachter en zoeter. Flink resistent tegen ziektes en goed te telen zonder bestrijdingsmiddelen. De grote claim to fame is de hypoallergene eigenschap: mensen met een milde appelallergie kunnen deze appel vaak wel eten zonder klachten. Een uitkomst voor de vele Nederlanders die denken dat ze geen appels kunnen eten. Een sociaal relevante appel!",
                },
                */
                /* Topaz - tijdelijk uitgeschakeld
                {
                    name: "Topaz",
                    slug: "topaz",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Eind september - half oktober",
                    blossomTime: "Eind mei (vroeg)",
                    origin: "Tsjechië, 1984",
                    fruitColor: "Geel met oranje-rood gestreepte blos",
                    taste: "Perfect gebalanceerd zoetzuur, vast, sappig en fris",
                    pollination: "Niet zelfbestuivend",
                    features: ["Schurftresistent", "Meeldauwresistent", "Biologisch geschikt"],
                    description: "Het paradepaardje van de biologische appelteelt. Perfecte zoet-zuur balans.",
                    fullDescription:
                        "Ontwikkeld in 1984 aan het Instituut voor Experimentele Botanica in Tsjechië. Een kruising tussen Rubin en Vanda die uitgroeide tot een van de belangrijkste rassen voor milieuvriendelijke appelteelt. Tamelijk grote, platronde vruchten met vettige schil. Twee- of driemaal doorplukken raadzaam. Aangenaam zoet met lichte, verfrissende zuurheid - perfect gebalanceerd. Vaak vergeleken met Elstar. Natuurlijke resistentie tegen appelschurft en meeldauw. Goede bestuivers zijn Ecolette, Fuji Kiku, Santana en Elstar. Topaz is uitgegroeid tot het paradepaardje van de biologische appelteelt.",
                },
                */
            ],
        },
        perenbomen: {
            name: "Perenbomen",
            slug: "perenbomen",
            description: "Diverse perenvariëteiten, gekweekt zonder bestrijdingsmiddelen en kunstmest",
            image: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=400&h=300&fit=crop",
            varieties: [
                {
                    name: "Beurré Bachelier",
                    slug: "beurre-bachelier",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Oktober",
                    blossomTime: "Half april - begin mei",
                    origin: "Frankrijk, 1845",
                    fruitColor: "Grote groengele vruchten",
                    taste: "Zoet, wijnig, aangenaam zuur en heerlijk geparfumeerd",
                    pollination: "Zelfbestuivend én goede bestuiver",
                    features: ["Zelfbestuivend", "Goede bestuiver"],
                    description:
                        "Franse dessertpeer met zoete, wijnige smaak. Zelfbestuivend en goede bestuiver voor andere peren.",
                    fullDescription:
                        "Franse variëteit uit 1845, ontwikkeld door M. L.F. Bachelier in Cappelle-Brouck. Grote, groengele vruchten aan een goed vertakte boom. Een verfijnde Franse smaakbeleving: zoet, wijnig, met een aangename zuurheid en heerlijk geparfumeerd. Het witte vruchtvlees is krakend en aromatisch. Zelfbestuivend én een uitstekende bestuiver voor andere perenbomen in de buurt. De dubbele functie als zelfbestuiver én bestuiver voor andere peren maakt dit een strategische keuze voor de boomgaard.",
                },
                {
                    name: "Colmar Épineux",
                    slug: "colmar-epineux",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Winter",
                    blossomTime: "Voorjaar",
                    origin: "België (Mons), 1758",
                    fruitColor: "Informatie beperkt",
                    taste: "Zoet met licht kruidige smaak, smeltend bij rijpheid",
                    pollination: "-",
                    features: ["Historisch ras", "Goede bewaring"],
                    description:
                        "Historische winterpeer uit 1758 met uitstekende bewaareigenschappen. Pomologisch erfgoed.",
                    fullDescription:
                        "Een historische winterpeer met wortels in de 18e eeuw. Verkregen als zaailing door l'abbé Hardenpont in zijn kwekerij bij Havré in Mons, Belgisch Henegouwen. De eerste vruchtdracht vond plaats in 1758. Het ras staat bekend onder vele synoniemen: Colmar d'Hardenpont, Présent de Malines, Fondante de Mons. Het vruchtvlees wordt smeltend bij rijpheid met een zoete, licht kruidige smaak. Groeit goed op kwee-onderstam. Een stuk pomologisch erfgoed dat de Belgische traditie van perenveredeling vertegenwoordigt.",
                },
                {
                    name: "Comtesse de Paris",
                    slug: "comtesse-de-paris",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Half oktober - november",
                    blossomTime: "Midden april (vroeg)",
                    origin: "Frankrijk, 1882",
                    fruitColor: "Bleekgroen met roestige vlekken, bij rijping groengeel",
                    taste: "Zacht, aangenaam zoet en heerlijk saprijk",
                    pollination: "-",
                    features: ["Winterpeer", "Decoratieve bloesem"],
                    description: "Franse winterpeer met grote vruchten. Consumptierijp van december tot februari.",
                    fullDescription:
                        "Een oud perenras uit Frankrijk, omstreeks 1882 gewonnen door William Fourcine uit Dreux. Middelgrote, langwerpig peervormige vruchten. De schil is bleekgroen met roestige vlekken en kleurt bij rijping naar groengeel. Vroege bloeier, midden april, met decoratieve witte bloesems die ontluiken uit rozerode bloemknoppen - een prachtig voorjaarsschouwspel. Plukrijp half oktober tot november, consumptierijp van december tot februari. Een typische winterpeer die zijn beste smaak ontwikkelt in de wintermaanden. Matig groeiende boom met breedpiramidale kruinvorm.",
                },
                {
                    name: "Concorde",
                    slug: "concorde",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Eind september - begin oktober",
                    blossomTime: "April",
                    origin: "Kruising Conference x Comice",
                    fruitColor: "Lijkt op Conference maar dikker en minder beroest",
                    taste: "Friszoet en sappig, botersmeltende textuur",
                    pollination: "Zelfbestuivend",
                    features: ["Zelfbestuivend", "Ziekteresistent", "Beginnersvriendelijk"],
                    description: "Het beste van Conference én Comice. Zelfbestuivend en makkelijk te telen.",
                    fullDescription:
                        "Een geslaagde kruising tussen twee van de meest populaire perenrassen: Conference en Doyenné du Comice. Middelgrote tot grote vruchten die lijken op Conference, maar dikker zijn en minder beroest. Direct na de oogst al heerlijk te eten. Friszoet en sappig - de zachte, botersmeltende textuur van Comice gecombineerd met de productiviteit van Conference. Zelfbestuivend (geen tweede boom nodig), productief en makkelijk in verzorging. Goed bestand tegen ziektes en snel vruchtdragend. De perfecte peer voor hobbykwekers die het zichzelf gemakkelijk willen maken zonder in te leveren op smaak.",
                },
                {
                    name: "Josefine de Malines",
                    slug: "josefine-de-malines",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Eind oktober - begin november",
                    blossomTime: "Voorjaar",
                    origin: "België (Mechelen), 1830",
                    fruitColor: "Witgeel tot zalmroze vruchtvlees, eigenaardige vorm",
                    taste: "Zeer fijn, zeer zacht, zeer sappig en zoet met uitgesproken aroma",
                    pollination: "Niet zelfbestuivend",
                    features: ["Winterpeer", "Uitzonderlijke smaak"],
                    description:
                        "Romantische winterpeer vernoemd naar de vrouw van de kweker. Smaaksensatie in januari.",
                    fullDescription:
                        "Een romantische naam met een romantisch verhaal. In 1830 gekweekt door Majoor Esperen uit Mechelen (België), die deze peer naar zijn vrouw Joséphine vernoemde. Kleine peren met een eigenaardige vorm: breed en plat aan de onderkant, vrij plotseling toelopend naar de steel. Het vruchtvlees kleurt witgeel tot zalmroze. Kan zeer laat geplukt worden, pas eind oktober/begin november. Rijpt op in december-januari. Een smaaksensatie: zeer fijn, zeer zacht, zeer sappig en zoet met uitgesproken aromatisch karakter. Geschikte bestuivers zijn Beurré Hardy, Charneux en Conference. De naam Joséphine de Malines is synoniem met winterse perenpracht.",
                },
                {
                    name: "Juttepeer",
                    slug: "juttepeer",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Half september",
                    blossomTime: "Eerste tot tweede week mei",
                    origin: "Nederland, zeer oud ras",
                    fruitColor: "Bruin, bijna geheel bedekt met roest",
                    taste: "Sappig met bijzondere aromatische zuurzoete smaak",
                    pollination: "-",
                    features: ["Oude Nederlandse variëteit", "Korte houdbaarheid"],
                    description:
                        "Zeer oud Nederlands ras met bijzonder aromatische smaak. Vraagt aandacht bij plukken.",
                    fullDescription:
                        "Een zeer oud Nederlands ras met diepe wortels in onze fruitcultuur. Relatief kleine peren met een lange steel die vaak met het vruchtvlees vergroeid is. De schil is bruin van kleur, bijna geheel bedekt met roest. Redelijk vroege oogst rond half september. Let op: moet snel gegeten worden vanwege slechte houdbaarheid. De juiste pluk- en consumptietijd is van groot belang. Een bijzondere peer met sappig, wit vruchtvlees en een zeer bijzonder aromatisch zuurzoet aroma. De Juttepeer vraagt wat meer aandacht van de teler, maar voor wie die moeite neemt, wacht een beloning.",
                },
                {
                    name: "Legipont",
                    slug: "legipont",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Eind september - eind oktober",
                    blossomTime: "April-mei",
                    origin: "België (Luik), ca. 1800",
                    fruitColor: "Groen met diepe rode/roze blos aan zonkant",
                    taste: "Sappig, zoet en aromatisch met smeltend vruchtvlees",
                    pollination: "Niet zelfbestuivend, maar uitstekende bestuiver",
                    features: ["Goede bestuiver", "Grote vruchten"],
                    description:
                        "Grote Belgische peer, ook bekend als Charneux. Uitstekende bestuiver voor andere peren.",
                    fullDescription:
                        "Waarschijnlijk rond 1800 ontstaan in de omgeving van Luik, België, dichtbij het plaatsje Charnaux. Bekend onder vele namen: Charneux, Fondante, Fondante de Charnaux en Leopold. Erg grote peren met een voornamelijk groene kleur en een diepe rode tot roze blos aan de zonkant. Een van de latere peren - plukrijp van eind september tot eind oktober. Bewaren tot december mogelijk. Op een voldoende warme standplaats ontwikkelt zich fijn aromatisch, aangenaam zoet, sappig en smeltend vruchtvlees. Niet zelfbestuivend, maar zelf een uitstekende bestuiver voor bijna elke andere peer.",
                },
                {
                    name: "Packhams Triumph",
                    slug: "packhams-triumph",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "November - augustus",
                    blossomTime: "Voorjaar",
                    origin: "Australië, 1896",
                    fruitColor: "Heldergroen naar lichtgeel, bobbelig uiterlijk",
                    taste: "Uitermate sappig met rijke zoete smaak en muskaatachtige ondertoon",
                    pollination: "-",
                    features: ["Lang seizoen", "Uitstekende smaak"],
                    description:
                        "Australische peer met ongewoon bobbelig uiterlijk en uitzonderlijk sappig vruchtvlees.",
                    fullDescription:
                        "Een Australisch succesverhaal. Dit ras werd in 1896 gekweekt door Charles Packham. Middelgrote peren met een ronde buik die kort oploopt naar de steel. Opvallend is het bobbelige uiterlijk. De heldergroene schil verandert bij rijping naar lichtgeel, soms met wat roest. Verkrijgbaar van november tot augustus - een bijzonder lang seizoen. Het witte vruchtvlees is uitermate sappig met een rijke, heerlijk zoete smaak en karakteristieke muskaatachtige ondertoon. Het ongewone bobbelige uiterlijk mag niet misleiden - dit is een peer met uitzonderlijke smaakkwaliteiten.",
                },
                {
                    name: "Rode Williams",
                    slug: "rode-williams",
                    rootstocks: ["Pyrodwarf"],
                    harvestTime: "Eind augustus - begin september",
                    blossomTime: "Maart-april (vroeg)",
                    origin: "Rode mutatie van Williams",
                    fruitColor: "Geelachtig met aantrekkelijk donkerrood bij rijping",
                    taste: "Smeltend zacht, zeer sappig en zoet met kenmerkende muskussmaak",
                    pollination: "Zelfbestuivend",
                    features: ["Zelfbestuivend", "Wereldberoemd", "Poire Williams"],
                    description:
                        "De rode variant van de wereldberoemde Williams. Zelfbestuivend met legendarische muskussmaak.",
                    fullDescription:
                        "De rode variant van de wereldberoemde Williams Bon Chrétien (Bartlett). Een mutatie die alle goede eigenschappen behield, maar met een aantrekkelijk rood jasje. Grote, klokvormige vruchten met geelachtige schil die bij rijping aantrekkelijk donkerrood kleurt. Vroege bloeier met witte bloemen met rozerode tinten en aangename geur. Een decoratieve boom in het voorjaar. Het witgele vruchtvlees is smeltend zacht, zeer sappig en zoet met de onmiskenbare muskusachtige smaak van de Williams-familie. Wereldberoemd als basis voor Poire Williams brandewijn. Geheel zelfbestuivend. Een specialiteit onder de perenrassen.",
                },
                {
                    name: "Seigneur d'Esperen",
                    slug: "seigneur-desperen",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Half september",
                    blossomTime: "Half april - begin mei",
                    origin: "België (Mechelen), 1827",
                    fruitColor: "Rond, middelmatig groot",
                    taste: "Een van de beste herfstperen",
                    pollination: "-",
                    features: ["Historisch ras", "Beste herfstpeer"],
                    description: "19e-eeuwse Belgische klassieker, beschouwd als een van de beste herfstperen.",
                    fullDescription:
                        "Belgische oorsprong, verkregen door Majoor Esperen uit Mechelen in 1827 - dezelfde kweker die ook Joséphine de Malines op zijn naam heeft. Middelmatig groot, altijd eerder klein dan groot. Gewoonlijk rond, van boven vrij schielijk naar de steel toelopend. Plukrijp half september, rijpt eind september. Beschouwd als een van de beste herfstperen. Groeit goed zowel op kwee als op zaailing-onderstam. Een 19e-eeuwse klassieker die bewijst dat oude rassen hun reputatie niet voor niets hebben opgebouwd.",
                },
                {
                    name: "Triomphe de Vienne",
                    slug: "triomphe-de-vienne",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Half augustus - half september",
                    blossomTime: "Begin mei",
                    origin: "Frankrijk (Vienne)",
                    fruitColor: "Groen met bronzen vlekken, bij rijping geelgroen met roest",
                    taste: "Zoet en super aromatisch met licht kruidige ondertoon",
                    pollination: "-",
                    features: ["Zeer grote vruchten", "Tot 500 gram"],
                    description: "Spectaculair grote peren tot 500 gram. Ideaal voor de fruitschaal en om te delen.",
                    fullDescription:
                        "De naam verwijst naar de Franse stad Vienne. Indrukwekkend groot tot zeer groot - sommige vruchten kunnen tot 500 gram per stuk wegen! De vorm is smal, spits en toelopend. De schil is groen met bronzen vlekken, bij rijping geelgroen met roestige vlekken. Bloeit begin mei met witte bloesem. Plukrijp eerste helft september. Dit is een typische handpeer met korte bewaartijd, voornamelijk voor directe consumptie. Het witgele vruchtvlees is zacht, sappig en aangenaam zoet met een licht kruidige ondertoon. De enorme vruchten maken indruk - een pronkstuk voor de boomgaard.",
                },
                {
                    name: "Williams",
                    slug: "williams",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Eind augustus - begin september",
                    blossomTime: "Eind april - begin mei",
                    origin: "Engeland, ca. 1800",
                    fruitColor: "Donkergroen naar goudgeel met roze/rode tinten aan zonzijde",
                    taste: "Smeltend zacht, zeer sappig en zoet met onmiskenbare muskussmaak",
                    pollination: "Zelfbestuivend",
                    features: ["Wereldicoon", "Poire Williams"],
                    description:
                        "Wereldicoon onder de peren. Basis voor Poire Williams brandewijn met legendarische muskussmaak.",
                    fullDescription:
                        "Een van de oudste en beroemdste Engelse dessertperen. Rond 1800 gekweekt door schoolmeester Wheeler in Aldermaston. In 1816 aangemeld bij de Royal Horticultural Society door Richard Williams - vandaar de naam. In Amerika bekend als Bartlett. Middelgrote peren die donkergroen verkleuren naar goudgeel met roze/rode tinten aan de zonnekant. Het witgele vruchtvlees is smeltend zacht, zeer sappig en zoet met de onmiskenbare, wereldberoemde muskussmaak. Dit is de smaak waar Poire Williams brandewijn naar smaakt. Kan 15-20 meter hoog worden. De Williams is niet zomaar een peer - het is een wereldicoon.",
                },
            ],
        },
        "nashi-peren": {
            name: "Nashi Peren",
            slug: "nashi-peren",
            description:
                "Aziatische peren met een knapperige textuur die behouden blijft - anders dan Europese peren worden ze niet zacht",
            image: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=400&h=300&fit=crop",
            varieties: [
                {
                    name: "Chojuro",
                    slug: "chojuro",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "September",
                    blossomTime: "April",
                    origin: "Japan, oud ras",
                    fruitColor: "Donker bronzen tot bruin met verruwde schil",
                    taste: "Butterscotch-achtig, geparfumeerd, sappig zoet",
                    pollination: "Niet zelfbestuivend",
                    features: ["Lange houdbaarheid", "Tot 5 maanden"],
                    description:
                        "Bruine nashi met unieke butterscotch-smaak. Uitzonderlijk lang houdbaar tot 5 maanden.",
                    fullDescription:
                        "Een oude Japanse variëteit. Grote, aantrekkelijk donker bronzen tot bruine vruchten met een opvallende verruwde schil. De diepbruine kleur onderscheidt deze nashi van de groene en gele variëteiten. Bloeit in april met vele witte bloemen. Halverwege het seizoen, vanaf september. Bijzonder is de lange houdbaarheid: tot 5 maanden na het plukken - uitzonderlijk voor een nashi. Een unieke smaakbeleving: grofkorrelig vruchtvlees met een butterscotch-achtige, geparfumeerde smaak. Sappig zoet met een romige textuur die toch knapperig blijft. De lange houdbaarheid maakt Chojuro tot een strategische keuze.",
                },
                {
                    name: "Hosui",
                    slug: "hosui",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Begin augustus",
                    blossomTime: "April",
                    origin: "Japan",
                    fruitColor: "Bronskleurig met ruwere oranje schil",
                    taste: "Sappig, geparfumeerd, uitgesproken zoet - peer, appel en meloen",
                    pollination: "Niet zelfbestuivend",
                    features: ["Populairste nashi", "Vroege oogst"],
                    description: "De bekendste nashi ter wereld. Zeer sappig met smaak van peer, appel en meloen.",
                    fullDescription:
                        "Een Japanse topvariëteit die is uitgegroeid tot de meest populaire nashi ter wereld. Middelgrote, ronde vruchten met een aantrekkelijke bronskleur en ruwere, oranje schil. Bloeit in april met uitbundige bloei die de hele boom bedekt. Vroeg in het seizoen - begint al begin augustus te rijpen. Sappig vruchtvlees dat geparfumeerd en fijnkorrelig is. Vast, wit vruchtvlees met een goede, uitgesproken zoete smaak. Sommigen beschrijven het als een combinatie van peer, appel en meloen. Met afstand de bekendste nashi - vaak te vinden bij de groenteboer. Als je maar één nashi plant, kies dan Hosui.",
                },
                {
                    name: "Kosui",
                    slug: "kosui",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Half augustus",
                    blossomTime: "April",
                    origin: "Japan",
                    fruitColor: "Felgeel met licht bronskleurige verruwing",
                    taste: "Zoet, saprijk met unieke peer-litchi smaak",
                    pollination: "-",
                    features: ["Ziekteresistent", "Sterke groei"],
                    description: "Vroege nashi met unieke peer-litchi smaak. Ideaal voor biologische teelt.",
                    fullDescription:
                        "Japanse variëteit die steeds meer fans krijgt onder Nederlandse tuinders. Grote, felgele vruchten met een licht bronskleurige schil door verruwing. Bloeit in april met uitbundige bloei waarbij de hele boom bedekt kan raken. Een van de vroegere nashi's - plukklaar vanaf half augustus. Houdt zich 6-8 weken. Zoet, saprijk vruchtvlees met een unieke smaak die ergens tussen peer en litchi in zit. Mals, zeer sappig en heerlijk zoet. Sterke groei en goede ziekteresistentie maken dit een ideale nashi voor biologische tuiniers.",
                },
                {
                    name: "Kumoi",
                    slug: "kumoi",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "September-oktober",
                    blossomTime: "April",
                    origin: "Japan",
                    fruitColor: "Licht bronskleurig met verruwing",
                    taste: "Zoeter dan gemiddeld met aangename honingachtige smaak",
                    pollination: "-",
                    features: ["Lange houdbaarheid", "Honingsmaak"],
                    description: "Grote nashi met verfijnde honingachtige smaak. Houdt zich 8-10 weken.",
                    fullDescription:
                        "Japanse variëteit. Grote vruchten met een licht bronskleurige schil door verruwing. Bloeit in april met vele witte bloemen. Oogst tussen september en oktober. Uitstekende houdbaarheid: 8-10 weken. Een verfijnde Aziatische peer met wat zoeter, knapperig vruchtvlees en een aangename honingachtige smaak. Het malse, licht geparfumeerde vlees is een ware verwennerij. Boom bereikt 4-5 meter hoogte met sterke groei. De honingachtige ondertoon in de smaak onderscheidt Kumoi van andere nashi's.",
                },
                {
                    name: "Nijisseiki",
                    slug: "nijisseiki",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Half augustus - september",
                    blossomTime: "April",
                    origin: "Japan, 1898",
                    fruitColor: "Geelgroen, appelvormig",
                    taste: "Zoet en zuur in perfecte balans, hints van roos, ananas of honing",
                    pollination: "Zelfbestuivend",
                    features: ["Zelfbestuivend", "Lang aan boom"],
                    description:
                        "De '20e eeuw' nashi. Zelfbestuivend en kan 4-6 weken aan de boom zonder smaakverlies.",
                    fullDescription:
                        "Japanse variëteit uit 1898 - de naam betekent letterlijk 'twintigste eeuw'. Middelgrote, appelvormige vruchten met een geelgroene kleur. Behoort tot de lichtgekleurde nashi's. Bloeit in april met overvloedige witte bloemen die voedsel bieden aan insecten. Bijzonder: vruchten kunnen 4-6 weken aan de boom blijven hangen zonder smaakverlies. Zoet en zuur in perfecte balans. Zeer sappig met hints van roos, ananas of honing - afhankelijk van wie je het vraagt. Zelfbestuivend - een groot voordeel voor wie maar ruimte heeft voor één boom.",
                },
                {
                    name: "Nitaka",
                    slug: "nitaka",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Eind augustus",
                    blossomTime: "April",
                    origin: "Japan",
                    fruitColor: "Oranjebruin, vrij donker",
                    taste: "Goed en zoet met wat steviger textuur",
                    pollination: "Niet zelfbestuivend",
                    features: ["Zeer grote vruchten", "Ook als stoofpeer"],
                    description: "De kampioen qua grootte. Spectaculair grote nashi's, ook geschikt als stoofpeer.",
                    fullDescription:
                        "Japanse variëteit. De kampioen qua grootte - zeer grote nashi's met een oranjebruine, vrij donkere schil. De vruchten kunnen enorm worden. Bloeit in april met uitbundige bloei. Begint eind augustus te rijpen. Niet alleen vers te eten, maar ook uitstekend als stoofpeer of in bak- en kookgerechten. Goede, zoete smaak met een wat steviger textuur dan andere nashi's. Het witte vruchtvlees is sappig. Wordt goed bestoven door onder andere Shinseiki. Als je indruk wilt maken met formaat, kies dan Niitaka.",
                },
                {
                    name: "Shinko",
                    slug: "shinko",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Oktober",
                    blossomTime: "April",
                    origin: "Japan",
                    fruitColor: "Donker bronskleurig met verruwde schil",
                    taste: "Zeer sappig, zoet en smeltend met sterk aroma - peer en litchi",
                    pollination: "Zelfbestuivend",
                    features: ["Zelfbestuivend", "Langste houdbaarheid"],
                    description: "Zelfbestuivende nashi met langste houdbaarheid (10-12 weken). Uitstekende smaak.",
                    fullDescription:
                        "Japanse variëteit. Grote vruchten met een donker bronskleurige, verruwde schil. Bloeit in april met witte bloemen die voedsel bieden aan insecten. Oogst in oktober. Uitstekende houdbaarheid: 10-12 weken - een van de beste bewaarders onder de nashi's. Zeer sappig, zoet en smeltend vruchtvlees met een sterk aroma. De smaak doet denken aan een kruising tussen peer en litchi. Een van de weinige zelfbestuivende nashi-variëteiten (hoewel kruisbestuiving meer fruit oplevert). De combinatie van zelfbestuiving, uitstekende smaak en lange houdbaarheid maakt Shinko tot een topkeuze.",
                },
                {
                    name: "Shinseiki",
                    slug: "shinseiki",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "September",
                    blossomTime: "April",
                    origin: "Japan (kruising Nijisseiki x Chojuro)",
                    fruitColor: "Geel, appelvormig en rond",
                    taste: "Sappig en zoet, knapperig - perfecte dorstlesser",
                    pollination: "Wisselend (kruisbestuiving aanbevolen)",
                    features: ["Vroege oogst", "Verfrissend"],
                    description: "Verfrissende gele nashi, perfect als dorstlesser rechtstreeks van de boom.",
                    fullDescription:
                        "Het resultaat van een kruising tussen Nijisseiki en Chojuro - twee gevestigde variëteiten. Middelgrote tot grote, gele, appelvormige en ronde vruchten. Bloeit in april met vijf witte bloemblaadjes die de boom overvloedig bedekken. Gemiddeld vroege oogst vanaf september. Sappig en zoet. Heerlijk knapperig wanneer rijp - perfect als verfrissende dorstlesser rechtstreeks van de boom op een warme nazomerdag. Voor optimale vruchtzetting wordt aangeraden meerdere variëteiten te planten (Hosui, Kosui, Nijisseiki). Een krachtige boom die betrouwbaar produceert.",
                },
                {
                    name: "Tama",
                    slug: "tama",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Juli-augustus",
                    blossomTime: "April-mei",
                    origin: "Japan",
                    fruitColor: "Klein, goudgeel",
                    taste: "Zoet als peer, knapperig als appel, ongelooflijk sappig",
                    pollination: "Redelijk zelfbestuivend",
                    features: ["Vroegste oogst", "Compact formaat"],
                    description:
                        "Compacte nashi voor kleinere tuinen. Vroegste oogst (juli-augustus) van alle nashi's.",
                    fullDescription:
                        "Japanse variëteit. Kleine, goudgele vruchten - compacter dan de meeste nashi's. Bloeit in april-mei met witte bloemen. Vroegste oogst: juli en augustus, eerder dan de meeste nashi's die in september-oktober rijpen. Zoet en sappig met een ongelooflijk sappige textuur. Smaakt lekker zoet als een peer maar met de knapperige bite van een appel. Sommige bronnen noemen het zelfbestuivend, maar voor een betere oogst worden twee bomen aanbevolen. Compacte boom van drie tot vier meter - geschikt voor kleinere tuinen. De combinatie van vroege oogst en compact formaat maakt Tama ideaal voor de stadstuin.",
                },
                {
                    name: "Tsu-Li",
                    slug: "tsuli",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Herfst (laat)",
                    blossomTime: "April",
                    origin: "China, oud ras (heirloom)",
                    fruitColor: "Groen tot geel met bruine roest, groot en langwerpig",
                    taste: "Ananasachtig aroma, zoet met subtiele zure en bloemige noten",
                    pollination: "-",
                    features: ["Chinese oorsprong", "Heirloom variëteit"],
                    description:
                        "Oude Chinese heirloom variëteit met uniek ananasachtig aroma. Een nashi voor de fijnproever.",
                    fullDescription:
                        "Een oude Chinese variëteit (heirloom) die ooit beroemd was als verse eetpeer. Groot (7-8 cm diameter), langwerpig met een opvallende bolle basis die licht taps toeloopt naar een korte, gebogen nek. Stevige, semi-waxachtige, grove schil. Groen tot geel en bedekt met bruine roest. Het witte vlees heeft geel-bruine tinten. Late oogst in de herfst. Een flauw ananasachtig aroma met een zoete, gebalanceerde smaak met subtiele zure en bloemige noten. De opmerkelijk knapperige textuur is karakteristiek. Bijzonder: de zoete smaak blijft consistent na het oogsten - rijpt niet verder. Een nashi voor de fijnproever.",
                },
            ],
        },
    };

    const getCategories = () => {
        return Object.values(treeData).map((category) => ({
            name: category.name,
            slug: category.slug,
            count: category.varieties.length,
            image: category.image,
            description: category.description,
        }));
    };

    const getCategoryBySlug = (slug) => {
        return treeData[slug] || null;
    };

    const getVarietyBySlug = (categorySlug, varietySlug) => {
        const category = treeData[categorySlug];
        if (!category) return null;

        return category.varieties.find((v) => v.slug === varietySlug) || null;
    };

    return {
        treeData,
        getCategories,
        getCategoryBySlug,
        getVarietyBySlug,
    };
};
