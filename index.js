document.title = "CMDR Sealed Draftsim";

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max-min));
}

Array.prototype.sample = function(n){
  if(n==0){return [];}
  arr = [...this];
  output = [];
  for(let i = 0; i < n; i++){
    j = Math.floor(Math.random()*arr.length);
    output.push(arr[j]);
    arr.splice(j,1);
  }
  return output.sort();
}
sets = ["CMR", "CMR", "CLB", "CLB"].concat(["TSR", "2X2"].sample(1).concat(["WAR", "ELD", "THB", "IKO", "M21", "ZNR", "KHM", "STX", "AFR", "NEO", "SNC", "DMU"].sample(8))).concat(["MH1", "MH2", "DBL"])

async function callbackMTG(mBooster, set){
  for(let j = 0; j < 19; j++){
    const response = await fetch("https://api.magicthegathering.io/v1/cards?set=" + set.toLowerCase() + "&page=" + j)
    const cards = await response.json()
    for(let c in cards["cards"]){
      mBooster.push(cards["cards"][c])
    }
  }
}

async function getDoubleFeature(){
  mid = [];
  cards["has_more"] = "ft";
  while(cards["has_more"] == true || cards["has_more"] == "ft"){
    var response;
    if(cards["has_more"] == "ft"){
      response = await fetch("https://api.scryfall.com/cards/search?q=set%3Amid")
    }
    else{
      response = await fetch(cards["next_page"])
    }
    cards = await response.json()
    for(let c = 0; c < cards["data"].length; c++){
      if(cards["data"][c]["booster"] == true){
        mid.push(cards["data"][c]);
      }
    }
    await sleep(100);
  }
  vow = [];
  cards["has_more"] = "ft"
  while(cards["has_more"] == true || cards["has_more"] == "ft"){
    var response;
    if(cards["has_more"] == "ft"){
      response = await fetch("https://api.scryfall.com/cards/search?q=set%3Avow")
    }
    else{
      response = await fetch(cards["next_page"])
    }
    cards = await response.json()
    for(let c = 0; c < cards["data"].length; c++){
      if(cards["data"][c]["booster"] == true){
        vow.push(cards["data"][c]);
      }
    }
    await sleep(100);
  }
  mdfcMid = [];
  midComm = [];
  midUncomm = [];
  midRarePlus = [];

  mdfcVow = [];
  vowComm = [];
  vowUncomm = [];
  vowRarePlus = [];
  for(let i = 0; i < mid.length; i++){
    if(mid[i]["card_faces"] != undefined){
      mdfcMid.push(mid[i]);
    }
    else if (mid[i]["rarity"] == "common"){
      midComm.push(mid[i]);
    }
    else if (mid[i]["rarity"] == "uncommon"){
      midUncomm.push(mid[i]);
    }
    else{
      midRarePlus.push(mid[i]);
    }
  }

  for(let i = 0; i < vow.length; i++){
    if(vow[i]["card_faces"] != undefined){
      mdfcVow.push(vow[i]);
    }
    else if (vow[i]["rarity"] == "common"){
      vowComm.push(vow[i]);
    }
    else if (vow[i]["rarity"] == "uncommon"){
      vowUncomm.push(vow[i]);
    }
    else{
      vowRarePlus.push(vow[i]);
    }
  }
  pack = [...mdfcMid].sample(1).concat(mdfcVow.sample(1)).concat(midComm.sample(4)).concat(midUncomm.sample(2)).concat(midRarePlus.sample(1)).concat(vowComm.sample(4)).concat(vowUncomm.sample(2)).concat(vowRarePlus.sample(1)).concat(([...mid].concat(vow)).sample(1))
  return pack;
}

async function getStrixhaven(){
  stx = [];
  cards["has_more"] = "ft";
  while(cards["has_more"] == true || cards["has_more"] == "ft"){
    var response;
    if(cards["has_more"] == "ft"){
      response = await fetch("https://api.scryfall.com/cards/search?q=set%3Astx")
    }
    else{
      response = await fetch(cards["next_page"])
    }
    cards = await response.json()
    for(let c = 0; c < cards["data"].length; c++){
      if(cards["data"][c]["booster"] == true){
        stx.push(cards["data"][c]);
      }
    }
    await sleep(100);
  }
  sta = [];
  cards["has_more"] = "ft"
  while(cards["has_more"] == true || cards["has_more"] == "ft"){
    var response;
    if(cards["has_more"] == "ft"){
      response = await fetch("https://api.scryfall.com/cards/search?q=set%3Asta")
    }
    else{
      response = await fetch(cards["next_page"])
    }
    cards = await response.json()
    for(let c = 0; c < cards["data"].length; c++){
      sta.push(cards["data"][c])
    }
    await sleep(100);
  }
  stxLess = [];
  stxRarePlus = [];
  stxUncomm = [];
  stxComm = [];
  for(let i = 0; i < stx.length; i++){
    if(stx[i]["type_line"].includes("Lesson")){
      stxLess.push(stx[i]);
    }
    else if (stx[i]["rarity"] == "common"){
      stxComm.push(stx[i]);
    }
    else if (stx[i]["rarity"] == "uncommon"){
      stxUncomm.push(stx[i]);
    }
    else{
      stxRarePlus.push(stx[i]);
    }
  }
  var randomCard;
  if(Math.random() < 0.3333333){
    randomCard = stx.sample(1);
  }
  else{
    randomCard = stxComm.sample(1);
  }
  pack = sta.sample(1).concat(randomCard).concat(stxLess.sample(1)).concat(stxRarePlus.sample(1)).concat(stxUncomm.sample(3)).concat(stxComm.sample(9))
  return pack;
}

async function getPack(set){
  output = [];
  var cards = {};
  cards["has_more"] = "ft";
  while(cards["has_more"] == true || cards["has_more"] == "ft"){
    var response;
    if(cards["has_more"] == "ft"){
      response = await fetch("https://api.scryfall.com/cards/search?q=set%3A" + set.toLowerCase())
    }
    else{
      response = await fetch(cards["next_page"])
    }
    cards = await response.json()
    for(let c = 0; c < cards["data"].length; c++){
      if(cards["data"][c]["booster"] == true){
        if(cards["data"][c]["type_line"].includes("Basic")){
          continue
        }
        else{
          output.push(cards["data"][c]);
        }
      }
    }
    await sleep(100);
  }
  return output
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function formulatePack(cards, set){
  pack = [];
  if(set == "CMR"){
    legArr = [];
    nonLegRarePlusArr = [];
    otherArr = [];
    for(let c = 0; c < cards.length; c++){
      if(cards[c]["type_line"].includes("Legendary")){
        legArr.push(cards[c]);
      }
      else if (cards[c]["rarity"] == "rare" || cards[c]["rarity"] == "mythic") {
        nonLegRarePlusArr.push(cards[c]);
      }
      else{
        otherArr.push(cards[c]);
      }
    }
    pack = legArr.sample(2).concat(nonLegRarePlusArr.sample(1)).concat(otherArr.sample(16)).concat(cards.sample(1))
    return pack;
  }
  if(set == "CLB"){
    rarePlusArr = [];
    otherArr = [];
    for(let c = 0; c < cards.length; c++){
      if(cards[c]["type_line"].includes("Basic")){
        continue
      }
      if(cards[c]["rarity"] == "rare" || cards[c]["rarity"] == "mythic"){
        rarePlusArr.push(cards[c]);
      }
      else{
        otherArr.push(cards[c]);
      }
    }
    numRare = randInt(1,4);
    sRare = rarePlusArr.sample(numRare);
    sNonRare = otherArr.sample(19 - numRare);
    pack = [...sRare].concat(sNonRare).concat(cards.sample(1));
    return pack;
  }
  if(set == "M21"){
    rarePlus = [];
    uncommon = [];
    common = [];
    for(let c = 0; c < cards.length; c++){
      if(cards[c]["type_line"].includes("Basic")){
        continue
      }
      if(cards[c]["rarity"] == "rare" || cards[c]["rarity"] == "mythic"){
        rarePlus.push(cards[c]);
      }
      else if (cards[c]["rarity"] == "uncommon") {
        uncommon.push(cards[c]);
      }
      else{
        common.push(cards[c]);
      }
    }
    pack = [].concat(rarePlus.sample(1)).concat(uncommon.sample(3)).concat(common.sample(10))
    return pack;
  }
  if(set == "MH2"){
    rarePlus = [];
    other = [];
    for(let c = 0; c < cards.length; c++){
      if(cards[c]["type_line"].includes("Basic")){
        continue
      }
      if(cards[c]["rarity"] == "rare" || cards[c]["rarity"] == "mythic"){
        rarePlus.push(cards[c]);
      }
      else{
        other.push(cards[c]);
      }
    }
    pack = [].concat(rarePlus.sample(1)).concat(other.sample(14))
    return pack;
  }
  if(set == "2X2"){
    rarePlus = [];
    uncommon = [];
    common = [];
    for(let c = 0; c < cards.length; c++){
      if(cards[c]["type_line"].includes("Basic")){
        continue
      }
      if(cards[c]["rarity"] == "rare" || cards[c]["rarity"] == "mythic"){
        rarePlus.push(cards[c]);
      }
      else if (cards[c]["rarity"] == "uncommon") {
        uncommon.push(cards[c]);
      }
      else{
        common.push(cards[c]);
      }
    }
    pack = [].concat(rarePlus.sample(2)).concat(uncommon.sample(3)).concat(common.sample(8)).concat(cards.sample(2));
    return pack;
  }
  if(set == "ZNR"){
    rarePlus = [];
    uncommon = [];
    common = [];
    for(let c = 0; c < cards.length; c++){
      if(cards[c]["type_line"].includes("Basic")){
        continue
      }
      if(cards[c]["rarity"] == "rare" || cards[c]["rarity"] == "mythic"){
        rarePlus.push(cards[c]);
      }
      else if (cards[c]["rarity"] == "uncommon") {
        uncommon.push(cards[c]);
      }
      else{
        common.push(cards[c]);
      }
    }
    pack = [].concat(rarePlus.sample(1)).concat(uncommon.sample(3)).concat(common.sample(10));
    return pack;
  }
  if(set == "DMU"){
    uncLeg = [];
    rarLeg = [];
    rarePlus = [];
    uncommon = [];
    common = [];
    for(let c = 0; c < cards.length; c++){
      if(cards[c]["type_line"].includes("Basic")){
        continue
      }
      if(cards[c]["rarity"] == "rare" || cards[c]["rarity"] == "mythic"){
        if(cards[c]["type_line"].includes("Legendary")){
          rarLeg.push(cards[c]);
        }
        rarePlus.push(cards[c]);
      }
      else if (cards[c]["rarity"] == "uncommon") {
        if(cards[c]["type_line"].includes("Legendary")){
          uncLeg.push(cards[c]);
        }
        uncommon.push(cards[c]);
      }
      else{
        common.push(cards[c]);
      }
    }
    var guarantLeg = [];
    pack = [];
    rareNum = 1
    if(Math.random() < 0.25){
      guarantLeg = rarLeg.sample(1)
      uncNum = rareNum - 1
    }
    else{
      guarantLeg = uncLeg.sample(1)
    }
    foil = [];
    if(Math.random() < 0.3333){
      foil = cards.sample(1)
    }
    else{
      foil = common.sample(1)
    }
    if(rareNum==1){
      pack = guarantLeg.concat(uncommon.sample(3)).concat(common.sample(9)).concat(foil)
    }
    else{
      pack = guarantLeg.concat(uncommon.sample(2)).concat(common.sample(9)).concat(foil).concat(rarePlus.sample(1))
    }
    return pack;
  }
  if(set == "NEO"){
    rarePlus = [];
    uncommon = [];
    dFC = [];
    common = [];
    lands = []
    for(let c = 0; c < cards.length; c++){
      if(cards[c]["type_line"].includes("Basic")){
        lands.push(cards[c])
      }
      if(cards[c]["type_line"].includes("Land")){
        lands.push(cards[c]);
      }
      if(cards[c]["card_faces"] != undefined && (cards[c]["rarity"] == "uncommon" || cards[c]["rarity"] == "common")){
        dFC.push(cards[c]);
      }
      else if(cards[c]["rarity"] == "rare" || cards[c]["rarity"] == "mythic"){
        rarePlus.push(cards[c]);
      }
      else if (cards[c]["rarity"] == "uncommon") {
        uncommon.push(cards[c]);
      }
      else{
        common.push(cards[c]);
      }
    }
    if(Math.random() < .25){
      foil = cards.sample(1)
    }
    else{
      foil = common.sample(1)
    }
    pack = [].concat(rarePlus.sample(1)).concat(dFC.sample(1)).concat(uncommon.sample(3)).concat(common.sample(8)).concat(foil).concat(lands.sample(1));
    return pack;
  }
  if(set == "WAR"){
    pWalk = [];
    rarePlus = [];
    uncommon = [];
    common = [];
    for(let c = 0; c < cards.length; c++){
      if(cards[c]["type_line"].includes("Basic")){
        continue
      }
      if(cards[c]["type_line"].includes("Planeswalker")){
        pWalk.push(cards[c]);
      }
      else if(cards[c]["rarity"] == "rare" || cards[c]["rarity"] == "mythic"){
        rarePlus.push(cards[c]);
      }
      else if (cards[c]["rarity"] == "uncommon") {
        uncommon.push(cards[c]);
      }
      else{
        common.push(cards[c]);
      }
    }
    pWalkPack = pWalk.sample(1)
    rareNum = 1;
    uncNum = 3;
    commonNum = 10;
    if(pWalkPack[0]["rarity"] == "rare" || pWalkPack[0]["rarity"] == "mythic"){
      rareNum = rareNum - 1
    }
    else if (pWalkPack[0]["rarity"] == "uncommon") {
      uncNum = uncNum-1
    }
    else{
      commonNum = commonNum-1
    }
    pack = pWalkPack.concat(rarePlus.sample(rareNum)).concat(uncommon.sample(uncNum)).concat(common.sample(commonNum))
    return pack;
  }
}

async function getPacks(packs){
  for(let j = 0; j < sets.length; j++){
    await sleep(100);
    // TODO: WAR
    if(sets[j] == "CMR" || sets[j] == "CLB" || sets[j] == "2X2" || sets[j] == "M21" || sets[j] == "MH2" || sets[j] == "ZNR" || sets[j] == "DMU" || sets[j] == "NEO" || sets[j] == "WAR"){
      if(packs[sets[j]] == undefined){
        packCards = await getPack(sets[j]);
        packs[sets[j]] = await formulatePack(packCards, sets[j]);
      }
      else{
        packCards = await getPack(sets[j]);
        packs[sets[j]+"2"] = await formulatePack(packCards, sets[j]);
      }
    }
    else if (sets[j] == "DBL") {
      packs["DBL"] = await getDoubleFeature();
    }
    else if (sets[j] == "STX"){
      packs["STX"] = await getStrixhaven();
    }
    else{
      const response = await fetch("https://api.magicthegathering.io/v1/sets/" + sets[j].toLowerCase() + "/booster")
      const cards = await response.json()
      pack = [];
      for(let c in cards["cards"]){
        if(typeof cards["cards"][c] == "function"){
          continue
        }
        pack.push(cards["cards"][c])
      }
      packs[sets[j]] = pack;
    }
  }
}

cardsDict = {};

function highlightColorIdentity(color_identity){
  cards = document.getElementsByClassName("card");
  for(let i = 0; i < cards.length; i++){
    identityMatch = true;
    cardCID = cardsDict[cards[i].id]["color_identity"]
    if(cardCID == undefined){
      cardCID = cardsDict[cards[i].id]["colorIdentity"]
    }
    for(let j = 0; j < cardCID.length; j++){
      if(color_identity.includes(cardCID[j])){
        identityMatch = identityMatch && true;
      }
      else{
        identityMatch = false;
      }
    }
    if(identityMatch){
      cards[i].style.opacity = "1.00";
    }
    else{
      cards[i].style.opacity = ".20";
    }
  }
}


document.addEventListener('DOMContentLoaded', async function() {
  mBooster = [];
  arrRare = [];
  arrArtifLands = [];
  arrColorless = [];
  arrRed = []
  arrGreen = [];
  arrBlue = []
  arrBlack = [];
  arrWhite = [];
  arrMulti = [];
  await callbackMTG(mBooster, "MB1");
  const arrMysBoosterUniq = await [...new Map(mBooster.map(v => [v.id, v])).values()]
  for(let i = 0; i < arrMysBoosterUniq.length; i++){
    if(typeof arrMysBoosterUniq[i] == "function"){
      continue;
    }
    if(arrMysBoosterUniq[i].rarity == "Rare" || arrMysBoosterUniq[i].rarity == "Mythic"){
      arrRare.push(arrMysBoosterUniq[i])
    }
    else{
      if(arrMysBoosterUniq[i].colors == undefined){
        if(arrMysBoosterUniq[i].type.includes("Land") || arrMysBoosterUniq[i].type.includes("Artifact")){
          arrArtifLands.push(arrMysBoosterUniq[i]);
        }
        else{
          arrColorless.push(arrMysBoosterUniq[i]);
        }
      }
      else{
        if(arrMysBoosterUniq[i].colors.length == 1){
          if(arrMysBoosterUniq[i].colors[0] == "Green"){
            arrGreen.push(arrMysBoosterUniq[i])
          }
          if(arrMysBoosterUniq[i].colors[0] == "Red"){
            arrRed.push(arrMysBoosterUniq[i])
          }
          if(arrMysBoosterUniq[i].colors[0] == "Blue"){
            arrBlue.push(arrMysBoosterUniq[i])
          }
          if(arrMysBoosterUniq[i].colors[0] == "White"){
            arrWhite.push(arrMysBoosterUniq[i])
          }
          if(arrMysBoosterUniq[i].colors[0] == "Black"){
            arrBlack.push(arrMysBoosterUniq[i])
          }
        }
        else{
          arrMulti.push(arrMysBoosterUniq[i]);
        }
      }
    }
  }

  packs = {};
  packs["MB1"] = await arrRare.sample(2).concat(arrArtifLands.sample(1)).concat(arrRed.sample(2)).concat(arrGreen.sample(2).concat(arrBlue.sample(2).concat(arrBlack.sample(2).concat(arrWhite.sample(2)).concat(arrMulti.sample(1)))))
  await getPacks(packs);

  cardPool = [];
  for(p in packs){
    pack = packs[p]
    for (var i = 0; i < pack.length; i++) {
      cardPool.push(pack[i])
    }
  }
  commanders = [];
  ninety9 = [];
  console.log("Card Pool Processing")
  for (var i = 0; i < cardPool.length; i++) {
    if(cardPool[i]["object"] != "card"){
      if(cardPool[i]["type"].includes("Basic")){
        cardPool.splice(i, 1);
        i = i - 1;
        continue
      }
      guard = false;
      scryfallURI = "https://api.scryfall.com/cards/" + cardPool[i]["set"].toLowerCase() +"/"+cardPool[i]["number"]
      response = await fetch(scryfallURI);
      card = await response.json()
      if(cardPool[i]["type"].includes("Legendary")){
        if(cardPool[i]["type"].includes("Creature")){
          commanders.push(card)
          guard = true;
        }
      }
      if(!guard){
        ninety9.push(card)
      }
    }
    else{
      if(cardPool[i]["type_line"].includes("Basic")){
        cardPool.splice(i, 1);
        i = i - 1;
        continue
      }
      guard = false;
      if(cardPool[i]["type_line"].includes("Legendary")){
        if(cardPool[i]["type_line"].includes("Creature")){
          commanders.push(cardPool[i])
          guard = true;
        }
      }
      if(!guard){
        ninety9.push(cardPool[i])
      }
    }
    await sleep(100)
  }
  for(let i = 0; i < commanders.length; i++){
    cardsDict[commanders[i]["name"]] = commanders[i]
  }
  for(let i = 0; i < ninety9.length; i++){
    cardsDict[ninety9[i]["name"]] = ninety9[i]
  }
  console.log(commanders)
  console.log(ninety9)
  document.getElementById("tempMsg").remove();
  for(let c = 0; c < commanders.length; c++){
    img = new Image();
    imgURIs = commanders[c]["image_uris"]
    if(commanders[c]["image_uris"] == undefined){
      imgURIs = commanders[c]["card_faces"][0]["image_uris"]
    }
    img.src = imgURIs["normal"]
    img.classList.add("card");
    img.id = commanders[c]["name"];
    document.getElementById("legendaries").appendChild(img)
    img.addEventListener("click", () => {highlightColorIdentity(commanders[c]["color_identity"])});
  }

  ninety9.sort((a,b) => {
    return a["cmc"] - b["cmc"]
  })
  for (var i = 0; i < ninety9.length; i++) {
    card = ninety9[i];
    imgURIs = card["image_uris"]
    if(imgURIs == undefined){
      imgURIs = card["card_faces"][0]["image_uris"]
    }
    if(card["type_line"].includes("Land")){
      img = new Image();
      img.src = imgURIs["normal"]
      img.classList.add("card");
      img.id = card["name"];
      document.getElementById("lands").appendChild(img)
    }
    else if(card["color_identity"].length == 0){
      img = new Image();
      img.src = imgURIs["normal"]
      img.classList.add("card");
      img.id = card["name"];
      document.getElementById("colorless").appendChild(img)
    }
    else if(card["color_identity"].length > 1){
      img = new Image();
      img.src = imgURIs["normal"]
      img.classList.add("card");
      img.id = card["name"];
      document.getElementById("multicolor").appendChild(img)
    }
    else{
      if(card["color_identity"].includes("G")){
        img = new Image();
        img.src = imgURIs["normal"]
        img.classList.add("card");
        img.id = card["name"];
        document.getElementById("green").appendChild(img)
      }
      else if(card["color_identity"].includes("R")){
        img = new Image();
        img.src = imgURIs["normal"]
        img.classList.add("card");
        img.id = card["name"];
        document.getElementById("red").appendChild(img)
      }
      else if(card["color_identity"].includes("W")){
        img = new Image();
        img.src = imgURIs["normal"]
        img.classList.add("card");
        img.id = card["name"];
        document.getElementById("white").appendChild(img)
      }
      else if(card["color_identity"].includes("U")){
        img = new Image();
        img.src = imgURIs["normal"]
        img.classList.add("card");
        img.id = card["name"];
        document.getElementById("blue").appendChild(img)
      }
      else if(card["color_identity"].includes("B")){
        img = new Image();
        img.src = imgURIs["normal"]
        img.classList.add("card");
        img.id = card["name"];
        document.getElementById("black").appendChild(img)
      }
    }
  }

});
