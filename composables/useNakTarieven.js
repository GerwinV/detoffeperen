/**
 * NAK Tuinbouw Tarieven 2025 - Boomkwekerij
 * Bron: Tarieven Keuringen 2025 (pagina 10-11)
 */

export const useNakTarieven = () => {
  // Basisbijdragen per bedrijfstype (pagina 10)
  const basisbijdragen = {
    productiebedrijf: 381.00,
    handelsbedrijf: {
      tot100k: 381.00,
      tot1m: 1031.00,
      boven1m: 2050.00
    },
    detailBewerking: 381.00
  }

  // Areaalbijdragen per gewasgroep (pagina 10-11)
  const areaalbijdragen = {
    // Boomkwekerij algemeen, Vaste planten (pagina 10)
    boomkwekerij: [
      { min: 0, max: 50, tarief: 0, label: '0-50 are: Gratis!' },
      { min: 51, max: 200, tarief: 1.22, label: '51-200 are: €1,22/are' },
      { min: 201, max: 1500, tarief: 1.09, label: '201-1.500 are: €1,09/are' },
      { min: 1501, max: 999999, tarief: 0.85, label: '> 1.500 are: €0,85/are' }
    ],
    // Fruitgewassen professionele markt (pagina 11)
    fruitProf: [
      { min: 0, max: 200, tarief: 3.78, label: '0-200 are: €3,78/are' },
      { min: 201, max: 1500, tarief: 3.64, label: '201-1.500 are: €3,64/are' },
      { min: 1501, max: 999999, tarief: 3.41, label: '> 1.500 are: €3,41/are' }
    ]
  }

  const BTW_PERCENTAGE = 0.21

  /**
   * Bereken basisbijdrage op basis van bedrijfstype en omzet
   */
  const berekenBasisbijdrage = (bedrijfstype, omzet = 0) => {
    if (bedrijfstype === 'productiebedrijf' || bedrijfstype === 'detailBewerking') {
      return basisbijdragen[bedrijfstype]
    }

    // Handelsbedrijf met omzetschalen
    if (bedrijfstype === 'handelsbedrijf') {
      if (omzet < 100000) return basisbijdragen.handelsbedrijf.tot100k
      if (omzet <= 1000000) return basisbijdragen.handelsbedrijf.tot1m
      return basisbijdragen.handelsbedrijf.boven1m
    }

    return 0
  }

  /**
   * Bereken areaalbijdrage op basis van gewasgroep en areaal
   */
  const berekenAreaalbijdrage = (gewasgroep, areaal) => {
    if (!areaal || areaal <= 0) return { bedrag: 0, tarief: 0, schaal: null }

    const schalen = areaalbijdragen[gewasgroep]
    if (!schalen) return { bedrag: 0, tarief: 0, schaal: null }

    // Vind de juiste schaal
    const schaal = schalen.find(s => areaal >= s.min && areaal <= s.max)

    if (!schaal) return { bedrag: 0, tarief: 0, schaal: null }

    const bedrag = areaal * schaal.tarief

    return {
      bedrag,
      tarief: schaal.tarief,
      schaal: schaal.label
    }
  }

  /**
   * Bereken totale kosten voor NAK registratie
   */
  const berekenTotaleKosten = (bedrijfstype, gewasgroep, areaal, omzet = 0) => {
    const basisbijdrage = berekenBasisbijdrage(bedrijfstype, omzet)
    const areaalbijdrageData = berekenAreaalbijdrage(gewasgroep, areaal)

    const subtotaal = basisbijdrage + areaalbijdrageData.bedrag
    const btw = subtotaal * BTW_PERCENTAGE
    const totaal = subtotaal + btw

    return {
      basisbijdrage,
      areaalbijdrage: areaalbijdrageData.bedrag,
      areaaltarief: areaalbijdrageData.tarief,
      areaalschaal: areaalbijdrageData.schaal,
      subtotaal,
      btw,
      totaal,
      areaal
    }
  }

  /**
   * Krijg uitleg over schaalvoordelen voor een gewasgroep
   */
  const getSchaalvoordelen = (gewasgroep) => {
    const schalen = areaalbijdragen[gewasgroep]
    if (!schalen) return []
    return schalen.map(s => s.label)
  }

  return {
    basisbijdragen,
    areaalbijdragen,
    berekenBasisbijdrage,
    berekenAreaalbijdrage,
    berekenTotaleKosten,
    getSchaalvoordelen,
    BTW_PERCENTAGE
  }
}
