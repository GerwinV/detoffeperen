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
                    harvestTime: "September",
                    description:
                        "Vroege herfstappel met frisse zoetzure smaak. Uitstekend voor directe consumptie met knapperig vruchtvlees. Goed bestand tegen schurft.",
                },
                {
                    name: "Ambro",
                    slug: "ambro",
                    rootstocks: ["M7", "M11"],
                    description:
                        "Nieuwe schurftresistente variëteit met uitstekende smaak. Zoete appel met licht zure ondertoon, perfect voor vers gebruik.",
                },
                {
                    name: "Bramleys Seedling",
                    slug: "bramleys-seedling",
                    rootstocks: ["M11"],
                    harvestTime: "Half oktober",
                    description:
                        "De bekendste kookappel met zeer zure smaak. Ideaal voor appelmoes en gebak. Grote groene vruchten die bij rijpheid geel kleuren.",
                },
                {
                    name: "Ecolette",
                    slug: "ecolette",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Eind september",
                    description:
                        "Schurftresistente herfstappel met zoete, aromatische smaak. Zeer geschikt voor ecologisch verantwoorde teelt. Goede bewaarappel.",
                },
                {
                    name: "Elise",
                    slug: "elise",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Augustus",
                    description:
                        "Vroege zomerappel met verfrissende zoetzure smaak. Sappig en knapperig vruchtvlees. Uitstekend voor vers gebruik.",
                },
                {
                    name: "Lemoen",
                    slug: "lemoen",
                    rootstocks: ["M7", "M11"],
                    description:
                        "Oude Nederlandse variëteit met karakteristieke citroensmaak. Uitstekende moes- en sapappel. Bewaart goed tot het voorjaar.",
                },
                {
                    name: "Princess Noble",
                    slug: "princess-noble",
                    rootstocks: ["M7", "M11"],
                    description:
                        "Klassieke rode appel met zoete smaak en stevig vruchtvlees. Geschikt voor alle doeleinden. Goede ziekteweerstand.",
                },
                {
                    name: "Red Topaz",
                    slug: "red-topaz",
                    rootstocks: ["M7", "M11"],
                    description:
                        "Rode mutant van Topaz met dezelfde uitstekende eigenschappen. Schurftresistent met frisse zoetzure smaak.",
                },
                {
                    name: "Rode Boskoop",
                    slug: "rode-boskoop",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Oktober",
                    description:
                        "Klassieke bewaarappel met ruwschillig uiterlijk. Sterke zure smaak, uitstekend voor gebak. Verbetert van smaak tijdens bewaring.",
                },
                {
                    name: "Rubinola",
                    slug: "rubinola",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "September/oktober",
                    description:
                        "Schurftresistente appel met uitgebalanceerde zoetzure smaak. Knapperig sappig vruchtvlees. Zeer geschikt voor ecologisch verantwoorde teelt.",
                },
                {
                    name: "Santana",
                    slug: "santana",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "September/oktober",
                    description:
                        "Allergeenvrije appel, geschikt voor mensen met appelallergieën. Schurftresistent met zoete, milde smaak. Uitstekende eetappel.",
                },
                {
                    name: "Topaz",
                    slug: "topaz",
                    rootstocks: ["M7", "M11"],
                    harvestTime: "Oktober",
                    description:
                        "Moderne schurftresistente appel met uitstekende smaak. Knapperig, sappig met perfecte zoet-zuur balans. Lange bewaring mogelijk.",
                },
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
                    description:
                        "Vroege herfstpeer met zoete smaak en zacht smeltend vruchtvlees. Grote groengele vruchten. Uitstekende dessertpeer.",
                },
                {
                    name: "Colmar Épineux",
                    slug: "colmar-epineux",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    description:
                        "Late winterpeer met uitstekende bewaareigenschappen. Zoet met licht kruidige smaak. Vruchtvlees wordt smeltend bij rijpheid.",
                },
                {
                    name: "Comtesse de Paris",
                    slug: "comtesse-de-paris",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Oktober/november",
                    description:
                        "Winterpeer met grote vruchten en uitstekende smaak. Smeltend vruchtvlees met zoete, aromatische smaak. Lange bewaring mogelijk.",
                },
                {
                    name: "Concorde",
                    slug: "concorde",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "September",
                    description:
                        "Kruising tussen Conference en Doyenné du Comice. Combineert de beste eigenschappen van beide ouders. Zoet en sappig.",
                },
                {
                    name: "Josefine de Malines",
                    slug: "josefine-de-malines",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    description:
                        "Kleine winterpeer met intense zoete smaak. Smeltend vruchtvlees met muskaatachtig aroma. Uitstekende bewaarpeer.",
                },
                {
                    name: "Juttepeer",
                    slug: "juttepeer",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    description:
                        "Oude Nederlandse stoofpeer. Grote vruchten die rood kleuren bij het stoven. Uitstekend voor compote en conserven.",
                },
                {
                    name: "Legipont",
                    slug: "legipont",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    description:
                        "Moderne peer met goede ziekteweerstand. Sappige vruchten met zoete smaak. Geschikt voor ecologisch verantwoorde teelt.",
                },
                {
                    name: "Packhams Triumph",
                    slug: "packhams-triumph",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    description:
                        "Late herfstpeer vergelijkbaar met Williams. Grote gele vruchten met uitstekende smaak. Goed houdbaar.",
                },
                {
                    name: "Rode Williams",
                    slug: "rode-williams",
                    rootstocks: ["Pyrodwarf"],
                    harvestTime: "Augustus",
                    description:
                        "Rode variant van de klassieke Williams peer. Zoet en aromatisch met kenmerkende muskussmaak. Sappig smeltend vruchtvlees.",
                },
                {
                    name: "Seigneur d'Esperen",
                    slug: "seigneur-desperen",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    description:
                        "Winterpeer met uitstekende bewaareigenschappen. Zoete smaak met licht kruidige ondertoon. Wordt beter tijdens bewaring.",
                },
                {
                    name: "Triomphe de Vienne",
                    slug: "triomphe-de-vienne",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    description:
                        "Grote herfstpeer met sappig, smeltend vruchtvlees. Zoete aromatische smaak. Geschikt voor vers gebruik en verwerking.",
                },
                {
                    name: "Williams",
                    slug: "williams",
                    rootstocks: ["Pyrodwarf", "Kirchensaller"],
                    harvestTime: "Augustus",
                    description:
                        "Wereldbekende zomerpeer met uitstekende smaak. Zoet met kenmerkende muskussmaak. Smeltend sappig vruchtvlees.",
                },
            ],
        },
        "nashi-peren": {
            name: "Nashi Peren",
            slug: "nashi-peren",
            description:
                "Aziatische peren met een knapperige textuur, gekweekt zonder bestrijdingsmiddelen en kunstmest",
            image: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=400&h=300&fit=crop",
            varieties: [
                {
                    name: "Chojuro",
                    slug: "chojuro",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Half september",
                    description:
                        "Bruine nashi met kaneelachtige smaak. Knapperig vruchtvlees met hoog suikergehalte. Goede bewaareigenschappen.",
                },
                {
                    name: "Hosui",
                    slug: "hosui",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Begin augustus",
                    description:
                        "Populaire bruingevlekte nashi met uitstekende smaak. Zeer sappig en zoet met verfrissende textuur. Goede productie.",
                },
                {
                    name: "Kosui",
                    slug: "kosui",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Half augustus",
                    description:
                        "Vroege groene nashi met fijne zoete smaak. Knapperig sappig vruchtvlees. Kleinere vruchten maar uitstekende kwaliteit.",
                },
                {
                    name: "Kumoi",
                    slug: "kumoi",
                    rootstocks: ["Kirchensaller"],
                    description:
                        "Grote groene nashi met milde zoete smaak. Knapperige textuur blijft lang behouden. Geschikt voor lange bewaring.",
                },
                {
                    name: "Nijisseiki",
                    slug: "nijisseiki",
                    rootstocks: ["Kirchensaller"],
                    description:
                        'Bekende groene nashi, ook wel "20e eeuw" genoemd. Verfrissende zoetzure smaak. Knapperig wit vruchtvlees.',
                },
                {
                    name: "Nitaka",
                    slug: "nitaka",
                    rootstocks: ["Kirchensaller"],
                    description:
                        "Zeer grote nashi met uitstekende smaak. Zoet en sappig met kenmerkende knapperige textuur. Goede bewaarder.",
                },
                {
                    name: "Nugget",
                    slug: "nugget",
                    rootstocks: ["Kirchensaller"],
                    description:
                        "Nieuwe variëteit met goudgele kleur. Zeer zoet met aangename textuur. Compact groeiende boom.",
                },
                {
                    name: "Shinko",
                    slug: "shinko",
                    rootstocks: ["Kirchensaller"],
                    description:
                        "Bruine nashi met uitstekende bewaareigenschappen. Zoete smaak met lichte kruidigheid. Grote uniforme vruchten.",
                },
                {
                    name: "Shinseiki",
                    slug: "shinseiki",
                    rootstocks: ["Kirchensaller"],
                    harvestTime: "Eind augustus",
                    description:
                        "Groengele nashi met verfrissende smaak. Knapperig sappig vruchtvlees. Vroeg rijpend en productief.",
                },
                {
                    name: "Tama",
                    slug: "tama",
                    rootstocks: ["Kirchensaller"],
                    description:
                        "Middelgrote nashi met zoete milde smaak. Goede balans tussen sap en knapperigheid. Betrouwbare productie.",
                },
                {
                    name: "Tsu-Li",
                    slug: "tsuli",
                    rootstocks: ["Kirchensaller"],
                    description:
                        "Chinese nashi met grote vruchten. Zoet met verfrissende smaak. Blijft lang knapperig na de oogst.",
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
