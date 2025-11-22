// Composable voor opbrengst grafiek data
// Transformeert jaar-per-jaar data naar Chart.js formaat

export const useOpbrengstChartData = () => {
  // Jaren waarvoor we data hebben (2013-2024 = 12 jaar)
  const jaren = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]

  // APPELS - Jaar per jaar data (gecorrigeerd 2025-11-22)
  const appelsData = [
    { naam: 'Goudreinette', data: [38, 11.5, 25, 137.1, null, 220, 29.5, 3, 166, 7.5, 29.8, 21.5] },
    { naam: 'Dubbele Bellefleur', data: [null, null, null, 32.6, null, 8.3, 1.5, 78, 86, 102, 16, 207.5] },
    { naam: 'Zoete Kroon', data: [1.5, 7, 26, 2.8, null, null, 32.7, null, 164, 17, 82.5, null] },
    { naam: 'Bramley\'s Seedling', data: [null, null, null, 9.4, null, 2, null, 69, 132, 22, 62, 7.5] },
    { naam: 'Glorie van Holland', data: [null, null, null, 72.4, null, 1.5, 16.9, 91, 64, 26, null, 21.5] },
    { naam: 'Winterbanana', data: [null, null, 20, 14.1, null, 3, 1, 4, 115, 14, 76.5, null] },
    { naam: 'Princess Noble', data: [null, 0.9, 5, 49.6, null, 10.9, 9.5, 52, 62, 34.5, 19.5, 4] },
    { naam: 'Alkmene', data: [null, 5.5, 6.5, 22.2, null, null, 19.1, null, 47, 20.5, 41.5, null] },
    { naam: 'James Grieve', data: [null, null, 2.3, 8, null, null, null, 8.5, 43.5, 28, 8.5, 30] },
    { naam: 'Gronigerkroon', data: [5, 0.9, 5, 2.9, null, null, null, 35, 14.5, 25, null, 10.5] },
    { naam: 'Rode Jonathan', data: [null, 4.5, 4, 22.8, null, null, null, null, 31.9, 29, 3, 11] },
    { naam: 'Gravensteiner', data: [62, 25.5, 20, 17.2, null, 3.8, 0.8, 4.6, 11.2, 16.9, null, 29] },
    { naam: 'Eisdener Klumpke', data: [null, null, null, null, null, null, null, null, 11, null, null, null] },
    { naam: 'Lunterse Pippeling', data: [21, null, 2.4, 23.6, null, 1, null, 10, null, 14, null, 12] },
    { naam: 'Jos Musch', data: [null, null, null, null, null, null, 1.2, null, 19, null, null, null] },
    { naam: 'Ontario', data: [null, null, null, null, null, null, null, null, 18, null, 2, null] },
    { naam: 'Kaiser Alexander', data: [null, null, null, null, null, null, 15.2, null, 7, 21.7, 2, 1] },
    { naam: 'Reinette Descardre', data: [null, 7.5, null, 3.6, null, null, 10.5, null, 14.6, 3.6, null, null] },
    { naam: 'Ananas Reinette', data: [null, null, null, null, null, null, null, null, 9, null, 1, null] },
    { naam: 'Court-Pendu', data: [null, null, null, null, null, null, null, null, 5, null, null, null] },
    { naam: 'Rode dijkmanszoet', data: [null, null, null, null, null, null, null, null, 8, 1, null, null] },
    { naam: 'Lemoenappel', data: [null, null, null, null, null, null, null, null, null, 7, null, 2] },
    { naam: 'Golden permain', data: [null, null, null, null, null, null, null, null, 4, null, null, null] },
    { naam: 'Zuccalmaglio Renette', data: [null, null, null, null, null, null, 2.6, null, 6, 6, 2, 2] },
    { naam: 'Zoete ermgaard', data: [null, null, null, 2.2, null, 3.6, null, 5.5, 2.5, 3.2, 2.5, 2.5] },
    { naam: 'Drensche Bellefleur', data: [null, null, null, null, null, null, null, 2, 4, null, null, null] },
    { naam: 'Veendammer glorie', data: [null, null, null, null, null, null, null, null, null, 3, null, null] },
    { naam: 'Yellow Transparant', data: [null, null, null, 3, null, 2, null, 1.4, 5.1, null, null, null] },
    { naam: 'Beauty of Bath', data: [null, null, null, null, null, null, null, null, 2.5, null, null, null] },
    { naam: 'Citroenappel', data: [null, null, null, null, null, null, null, null, 3, 2, null, null] },
    { naam: 'Zoete oranje', data: [null, null, null, null, null, null, 2.4, null, null, null, null, null] },
    { naam: 'Zigeunerin', data: [null, null, null, 3.1, null, 1.5, null, null, null, null, null, null] },
    { naam: 'Dantziger Kantapfel', data: [null, null, null, null, null, null, 2.7, null, 2, null, 1, 1] },
    { naam: 'Lombarts Calville', data: [null, null, null, 2.5, null, 0.6, null, null, null, null, null, null] },
    { naam: 'Notaris Appel', data: [null, 0.9, 0.8, 2.4, null, null, null, null, null, null, null, null] },
    { naam: 'Jacob Fisher', data: [null, null, null, null, null, null, null, null, null, null, 1, null] },
    { naam: 'Benoni', data: [null, null, null, null, null, null, null, null, 1, null, null, null] },
    { naam: 'Bloemeezoet', data: [null, null, null, null, null, null, null, null, null, 1, null, null] },
    { naam: 'Rode Boskoop', data: [null, null, null, null, null, 0.8, null, null, null, null, null, null] }
  ]

  // PEREN - Jaar per jaar data (gecorrigeerd 2025-11-22)
  const perenData = [
    { naam: 'Saint Remy', data: [null, 10.5, null, 4.5, null, 34, 28.5, 78.9, 85.5, 104.6, 11, 126.5] },
    { naam: 'Winterrietpeer', data: [null, 18.5, 1, null, null, 17.2, 4.5, 43.5, null, 83, null, 6] },
    { naam: 'Gieser Wildeman', data: [47, 33.5, 50, 26.7, 2.7, null, 1, null, null, null, null, null] },
    { naam: 'Winterbergamot', data: [null, null, null, 13.5, null, 22.5, 13.5, 43.5, null, 46, null, 5] },
    { naam: 'Noordholl. suikerpeer', data: [null, 23, 3.5, 18.7, null, null, 0.6, 41.5, 38.3, 3.6, null, 22] },
    { naam: 'Kleipeer', data: [2, 8.5, 11, 35.5, 5.4, 41, 3, 61, null, 2, 11, 10] },
    { naam: 'Clapp\'s Favourite', data: [null, null, null, 10, null, 11.4, 17, 13, 10.5, 21, 10.5, 41.5] },
    { naam: 'Conference', data: [6, 15.5, null, 9.5, null, null, 22.2, 5.5, 12, 16, 18.5, 4.5] },
    { naam: 'Doyenne du Comice', data: [null, 14.5, null, 6.6, null, 9, 23.6, 21, 6, 2.5, 14.5, 11.5] },
    { naam: 'Triomphe de Vienne', data: [null, null, null, null, null, 6, 12.3, 12, 18, 12.5, 11, 9.5] },
    { naam: 'Super Trevoux', data: [null, null, null, null, null, null, 6, 14, 27, 1.7, 11.5, 5.5] },
    { naam: 'Soldat Laboureur', data: [null, 10.5, null, 4.5, null, 34, null, 5, null, 1, null, null] },
    { naam: 'Kruidenierspeer', data: [null, 1.2, null, 16, null, null, null, 11, null, null, null, null] },
    { naam: 'Ponspeer', data: [null, null, null, null, null, null, null, null, null, null, null, 4.5] },
    { naam: 'Dirkjespeer', data: [null, null, null, null, null, null, 6, null, 1.5, null, null, null] },
    { naam: 'Williams Bon Chrétien', data: [null, null, null, null, null, 6, 5.8, 5.5, null, 1, 2.3, 1.5] },
    { naam: 'Beurré Alexandre Lucas', data: [null, null, null, null, null, null, 3.6, null, null, null, null, null] },
    { naam: 'Juttepeer', data: [null, null, null, null, null, null, null, null, null, null, null, 3] },
    { naam: 'Charneux', data: [null, null, null, null, null, null, null, null, 3, null, 3, null] },
    { naam: 'Nashipeer Tama', data: [null, null, null, null, null, 2.5, 4.5, null, 4, 1, 1.5, null] },
    { naam: 'Comtesse de Paris', data: [null, null, null, null, null, null, 2.5, null, null, null, null, null] },
    { naam: 'Oranje peer', data: [null, null, null, null, null, null, 3.6, null, 2, null, 2, 2] },
    { naam: 'Rode Williams', data: [null, null, null, null, null, null, 3, 1.5, null, null, null, null] },
    { naam: 'Buerede Merrode', data: [null, null, null, null, null, null, 2.1, null, null, null, null, null] },
    { naam: 'Nashipeer Kosui', data: [null, null, null, null, null, 1.8, null, null, null, null, 1.5, null] },
    { naam: 'Bloedpeer', data: [null, null, null, null, null, null, null, null, null, null, null, 1.5] },
    { naam: 'Bezi van Schonauwen', data: [null, null, null, null, null, null, null, null, null, null, null, 1] },
    { naam: 'Bonne Louise d\'Avranches', data: [null, null, null, null, null, null, null, 1, null, null, null, null] }
  ]

  // PRUIMEN - Jaar per jaar data (gecorrigeerd 2025-11-22)
  const pruimenData = [
    { naam: 'Reine Victoria', data: [null, 15.9, 10, 47, 1, 54, 48.3, null, 60, null, 32.6, 35.5] },
    { naam: 'Reine Claude Verte', data: [null, null, null, null, null, null, 4.4, null, 1.7, null, 0.5, 89] },
    { naam: 'Mirabelle de Nancy', data: [null, null, null, 2, null, 18.5, 2.1, null, 60.3, null, 9, 9.5] },
    { naam: 'Opal', data: [null, 18, null, 31.5, null, 6.6, 0.5, null, null, null, 12.7, null] },
    { naam: 'Reine Claude Morros', data: [null, 3, null, null, null, null, 16.5, null, 18, null, 4.5, 35.5] },
    { naam: 'Hauszwetsche kwetch', data: [15, 3.9, null, null, null, null, null, null, 4.5, null, null, 0.5] },
    { naam: 'Rode Abrikozepruim', data: [null, null, null, null, null, 9.4, 5.1, null, 1.2, null, null, null] },
    { naam: 'Valor', data: [null, null, null, null, null, 3, 8.3, null, 5, null, 4.6, 0.5] },
    { naam: 'Aprimira', data: [null, null, null, null, null, null, null, null, 3.5, null, null, null] },
    { naam: 'Dubbele boerenwitte', data: [null, null, null, null, null, null, null, null, 5.5, null, 0.8, null] },
    { naam: 'Anne Spath', data: [null, null, null, null, null, null, null, null, 3.5, null, 3.4, 2.5] },
    { naam: 'Excalibur', data: [null, null, null, null, null, null, null, null, null, null, 3, null] },
    { naam: 'Reine claude van Schouwen', data: [null, null, null, null, null, null, null, null, 4.5, 0.5, 1.4, 4.5] },
    { naam: 'Jefferson', data: [null, null, null, null, null, null, 2.4, null, 4, null, null, 0.3] },
    { naam: 'The Czar', data: [null, null, null, null, null, null, 0.5, null, 3.5, null, 2.2, null] },
    { naam: 'Claude d\'altan', data: [null, null, null, null, null, null, null, null, 2, null, null, null] },
    { naam: 'Bleue de Belgique', data: [null, null, null, null, null, 0.9, 1.6, null, 3.5, null, null, null] },
    { naam: 'Belspruim', data: [null, null, null, null, null, 1.4, 2.5, null, null, 0.2, 2.8, 2] },
    { naam: 'Ontario', data: [null, null, null, null, null, 1.3, null, null, null, null, null, null] },
    { naam: 'Reine Claude d\'Althan', data: [null, null, null, null, null, null, null, null, null, null, null, 1] },
    { naam: 'Monsieur Halif', data: [null, null, null, null, null, null, null, null, 0.9, null, null, null] },
    { naam: 'Voyageur', data: [null, null, null, null, null, null, 0.5, null, null, null, null, null] },
    { naam: 'Early Laxton', data: [null, null, null, null, null, null, null, null, 0.2, null, null, null] }
  ]

  // KERSEN - Jaar per jaar data (gecorrigeerd 2025-11-22)
  const kersenData = [
    { naam: 'Zoete Morel', data: [29, 38, 23, 15.4, null, 1.5, 20.4, 2.6, 0.2, null, null, null] },
    { naam: 'Hedelfinger', data: [null, null, null, null, null, 2.6, 25.9, 10.4, 10.9, null, null, null] },
    { naam: 'Bigarreau Noir', data: [null, null, null, null, null, null, 8, 5.5, 16.7, 6, null, null] },
    { naam: 'Bigarreau Napoleon', data: [1, null, null, null, null, 14, 14.5, 4.3, null, null, null, null] },
    { naam: 'Udense Spaanse', data: [10, null, 0.7, null, null, null, null, 0.4, 24.3, null, 2.5, null] },
    { naam: 'Mierlose zwarte', data: [16, 17, 2.2, 3.8, null, 2.5, null, null, 1.8, null, null, null] },
    { naam: 'Early Rivers', data: [null, 5, 7, 8.4, null, 2.7, null, null, null, null, null, null] },
    { naam: 'Kordia', data: [null, null, null, null, null, 4, 6, 0.4, 11.8, 3.8, 1.2, null] },
    { naam: 'Corum', data: [null, null, null, null, null, null, 0.2, 6.5, 3.7, 1.2, 1, null] },
    { naam: 'Sylvia', data: [null, null, null, null, null, null, 0.4, null, null, null, null, null] },
    { naam: 'Regina', data: [null, null, null, null, null, null, 0.4, null, 0.2, null, null, null] }
  ]

  return {
    jaren,
    appelsData,
    perenData,
    pruimenData,
    kersenData
  }
}
