//systeme de cycle de jour et comptage des jours
//Finir le design de la page Loser.html
//faire bateau enemies clan des bonesnowflakes
//Faire des SFX Avec le piano pour une musique ambiente et une musique de loser


//info nécessaire pour le ration des dispositions et tailles
console.log("Largeur d'écran : " + screen.width)
console.log("Hauteur d'écran : " + screen.height)

let tickSFX = new Audio('Audio/tickSFX.wav')
let successBellSFX = new Audio('Audio/successBellSFX.wav')
let failureSFX = new Audio('Audio/failureSFX.wav')
let CATMainTheme = new Audio('Audio/CATMainTheme.wav')

let PlayerContainer = document.getElementById("PlayerContainer")
let carte = document.getElementById("carte")
let ObjDescription = document.getElementById("ObjDescription")
let ObjDescriptionImg = document.getElementById("ObjDescriptionImg")
let MapBackground = document.getElementById("MapBackground")
let Pancarte = document.getElementById("Pancarte")
let PlayerGuiBackground = document.getElementById("PlayerGuiBackground")
let Heart1 = document.getElementById("Heart1")
let Heart2 = document.getElementById("Heart2")
let Heart3 = document.getElementById("Heart3")
let Heart4 = document.getElementById("Heart4")
let Heart5 = document.getElementById("Heart5")
let Hearts = document.getElementById("Hearts")
let GuiButtons = document.getElementById("GuiButtons")
let RepairButton = document.getElementById("RepairButton")
let RepairAmount = document.getElementById("RepairAmount")
let DarkenBody = document.getElementById("DarkenBody")
let ItemInv = document.getElementById("ItemInv")
let GoldAmount = document.getElementById("GoldAmount")
let GoldIcon = document.getElementById("GoldIcon")
let EquipageAmount = document.getElementById("EquipageAmount")
let EquipageIcon = document.getElementById("EquipageIcon")
let EventWindow = document.getElementById("EventWindow")
let EventMessage = document.getElementById("EventMessage")
let FightKrakenButton = document.getElementById("FightKraken")
let SurrenderKrakenButton = document.getElementById("SurrenderKraken")
let PopUpParent = document.getElementById("PopUpParent")
let PopUpFrame = document.getElementById("PopUpFrame")
let DeathTransitionFrame = document.getElementById("DeathTransitionFrame")
let CalendarBackground = document.getElementById("CalendarBackground")
let CalendarBackgroundNextDay = document.getElementById("CalendarBackgroundNextDay")
let StartupScreen = document.getElementById("StartupScreen")
let PressAnyToStart = document.getElementById("PressAnyToStart")
let YesChangeMap = document.getElementById("YesChangeMap")
let NoChangeMap = document.getElementById("NoChangeMap")
let YesExploreIsland = document.getElementById("YesExploreIsland")
let NoExploreIsland = document.getElementById("NoExploreIsland")

let OnGoingEvent = false
let CurrentDay = 1
let StartupActive = true

//Variables pour le systeme de changement de fond d'écran
let MoveUntilBackgroundChange = 15
let Backgrounds = Array("url(iconesNimages/LeverDuSoleilBackground.png)", "url(iconesNimages/DayBackground.png)", "url(iconesNimages/SunsetBackground.png)", "url(iconesNimages/NightBackground.png)")
let CurrentBackground = 0

//ceci sont deux fonction permetant d'adapter les elements en fonction de l'écran
//Fonctionement : ScreenWidth/Height et la taille de l'écran de réference, celui sur lequel on travaille exemple : ordi salle 40 width 1680
//Voulant que la taille des objets soit 50 px pour un écran de 1680, je fait screen.width / 1680 * 50 dans ce cas : 1680 / 1680 * 50 = 50px
//de même pour la Heigh
//Exemple voir si dessous
//Penser a ce calcule comme un conversion de note comme 5/10 à 10/20 (5/10) * 20
//TODO : remplacer toutes unitées de distance par ces fonctions
function WidthRatio(ScreenWidth, PixelRatio) {
    return (screen.width / ScreenWidth * PixelRatio) + "px"
}

function HeightRatio(ScreenHeight, PixelRatio) {
    return (screen.height / ScreenHeight * PixelRatio) + "px"
}

//Voici la partie qui devrait etre dans le css mais grace au fonctions adaptives creer au dessus, cela ce retrouve dans le JS
ObjDescriptionImg.style.width = WidthRatio(1680,100)
ObjDescriptionImg.style.height = HeightRatio(1050,100)
ObjDescriptionImg.style.marginLeft = WidthRatio(1680,40)
ObjDescriptionImg.style.marginTop = HeightRatio(1050,250)
ObjDescriptionImg.style.borderWidth = WidthRatio(1680, 5)
ObjDescriptionImg.style.backgroundSize = WidthRatio(1680, 100) + " " + HeightRatio(1050,100)

ObjDescription.style.marginLeft = WidthRatio(1680,150)
ObjDescription.style.marginTop = HeightRatio(1050,235)
ObjDescription.style.width = WidthRatio(1680, 220)
ObjDescription.style.height = HeightRatio(1050, 140)
ObjDescription.style.fontSize = WidthRatio(1680, 25)

Pancarte.style.height = HeightRatio(1050, 400)
Pancarte.style.width = WidthRatio(1680, 400)
Pancarte.style.left = WidthRatio(1680, 1150)
Pancarte.style.backgroundSize = WidthRatio(1680, 400) + " " + HeightRatio(1050, 400)

PlayerGuiBackground.style.left = WidthRatio(1680, 1075)
PlayerGuiBackground.style.top = HeightRatio(1050, 525)
PlayerGuiBackground.style.width = WidthRatio(1680, 550)
PlayerGuiBackground.style.height = HeightRatio(1050, 275)
PlayerGuiBackground.style.backgroundSize = WidthRatio(1680, 550) + " " + HeightRatio(1050, 275)

Heart1.style.background = "url(iconesNimages/EmptyHeart.png) no-repeat"
Heart1.style.width = WidthRatio(1680, 50)
Heart1.style.height = HeightRatio(1050, 50)
Heart1.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050, 50)
Heart1.style.paddingLeft = WidthRatio(1680, 5)

Heart2.style.background = "url(iconesNimages/EmptyHeart.png) no-repeat"
Heart2.style.width = WidthRatio(1680, 50)
Heart2.style.height = HeightRatio(1050, 50)
Heart2.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050, 50)
Heart2.style.paddingLeft = WidthRatio(1680, 5)

Heart3.style.background = "url(iconesNimages/EmptyHeart.png) no-repeat"
Heart3.style.width = WidthRatio(1680, 50)
Heart3.style.height = HeightRatio(1050, 50)
Heart3.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050, 50)
Heart3.style.paddingLeft = WidthRatio(1680, 5)

Heart4.style.background = "url(iconesNimages/EmptyHeart.png) no-repeat"
Heart4.style.width = WidthRatio(1680, 50)
Heart4.style.height = HeightRatio(1050, 50)
Heart4.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050, 50)
Heart4.style.paddingLeft = WidthRatio(1680, 5)

Heart5.style.background = "url(iconesNimages/EmptyHeart.png) no-repeat"
Heart5.style.width = WidthRatio(1680, 50)
Heart5.style.height = HeightRatio(1050, 50)
Heart5.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050, 50)
Heart5.style.paddingLeft = WidthRatio(1680, 5)

Hearts.style.left = WidthRatio(1680, 53)
Hearts.style.top = HeightRatio(1050, 50)
Hearts.style.width = WidthRatio(1680, 450)
Hearts.style.height = HeightRatio(1050, 50)

MapBackground.style.width = WidthRatio(1680,650)
MapBackground.style.height = HeightRatio(1050,850)
MapBackground.style.textAlign = "center"
MapBackground.style.background = "url(iconesNimages/ScrollMapBackground.png) no-repeat"
MapBackground.style.backgroundSize = WidthRatio(1680,650) + " " + HeightRatio(1050,850)

document.body.style.background = Backgrounds[CurrentBackground] + " no-repeat"
document.body.style.backgroundSize = screen.width + "px" + " " + HeightRatio(1050, 940)

GuiButtons.style.left = WidthRatio(1680, 50)
GuiButtons.style.top = HeightRatio(1050, 105)
GuiButtons.style.width = WidthRatio(1680, 450)
GuiButtons.style.height = HeightRatio(1050, 50)

RepairButton.style.background = "url(iconesNimages/RepairButton.png) no-repeat"
RepairButton.style.width = WidthRatio(1680, 100)
RepairButton.style.height = HeightRatio(1050, 50)
RepairButton.style.backgroundSize = WidthRatio(1680, 100) + " " + HeightRatio(1050, 50)
RepairButton.style.border = "none"
RepairButton.style.display = "inline-block"

RepairAmount.style.width = WidthRatio(1680, 50)
RepairAmount.style.height = HeightRatio(1050, 50)
RepairAmount.style.display = "inline-block"
RepairAmount.style.verticalAlign = "top"
RepairAmount.style.textAlign = "right"
RepairAmount.style.fontSize = (screen.width / 1680 * 3) + "em"
RepairAmount.style.top = "0px"
RepairAmount.style.color = "rgb(41, 25, 5)"


ItemInv.style.left = WidthRatio(1680, 50)
ItemInv.style.top = HeightRatio(1050, 165)
ItemInv.style.width = WidthRatio(1680, 450)
ItemInv.style.height = HeightRatio(1050, 50)

GoldAmount.style.width = WidthRatio(1680, 50)
GoldAmount.style.height = HeightRatio(1050, 50)
GoldAmount.style.position = "absolute"
GoldAmount.style.verticalAlign = "top"
GoldAmount.style.textAlign = "right"
GoldAmount.style.fontSize = (screen.width / 1680 * 3) + "em"
GoldAmount.style.top = "0px"
GoldAmount.style.color = "rgb(41, 25, 5)"

GoldIcon.style.width = WidthRatio(1680, 50)
GoldIcon.style.height = HeightRatio(1050, 50)
GoldIcon.style.position = "absolute"
GoldIcon.style.background = "url(iconesNimages/Gold.png) no-repeat"
GoldIcon.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050, 50)
GoldIcon.style.left = WidthRatio(1680, 65)

EquipageAmount.style.width = WidthRatio(1680, 50)
EquipageAmount.style.height = HeightRatio(1050, 50)
EquipageAmount.style.position = "absolute"
EquipageAmount.style.verticalAlign = "top"
EquipageAmount.style.textAlign = "right"
EquipageAmount.style.fontSize = (screen.width / 1680 * 3) + "em"
EquipageAmount.style.top = "0px"
EquipageAmount.style.color = "rgb(41, 25, 5)"
EquipageAmount.style.left = WidthRatio(1680, 125)

EquipageIcon.style.width = WidthRatio(1680, 50)
EquipageIcon.style.height = HeightRatio(1050, 50)
EquipageIcon.style.position = "absolute"
EquipageIcon.style.background = "url(iconesNimages/Equipage.png) no-repeat"
EquipageIcon.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050, 50)
EquipageIcon.style.left = WidthRatio(1680, 190)


EventWindow.style.position = "absolute"
EventWindow.style.width = WidthRatio(1680, 700)
EventWindow.style.height = HeightRatio(1050, 700)
EventWindow.style.background = "url(iconesNimages/EventSign.png) no-repeat"
EventWindow.style.backgroundSize = WidthRatio(1680, 700) + " " + HeightRatio(1050, 700)
EventWindow.style.visibility = "hidden"
EventWindow.style.left = WidthRatio(1680, 500)
EventWindow.style.top = HeightRatio(1050, 100)

EventMessage.style.width = WidthRatio(1680, 480)
EventMessage.style.height = HeightRatio(1050, 100)
EventMessage.style.top = HeightRatio(1050, 440)
EventMessage.style.left = WidthRatio(1680, 110)
EventMessage.style.color = "rgb(41, 25, 5)"
EventMessage.style.fontSize =  (screen.width / 1680 * 1.5) + "em"

FightKrakenButton.style.position = "absolute"
FightKrakenButton.style.top = HeightRatio(1050, 600)
FightKrakenButton.style.left = WidthRatio(1680, 100)
FightKrakenButton.style.width = WidthRatio(1680, 200)
FightKrakenButton.style.height = HeightRatio(1050, 50)
FightKrakenButton.style.borderRadius = WidthRatio(1680, 20)
FightKrakenButton.style.borderColor = "rgb(41, 25, 5)"
FightKrakenButton.style.fontSize = WidthRatio(1680, 30)
FightKrakenButton.style.color = "rgb(41, 25, 5)"
FightKrakenButton.style.backgroundColor = "Transparent"
FightKrakenButton.style.visibility = "hidden"

SurrenderKrakenButton.style.position = "absolute"
SurrenderKrakenButton.style.top = HeightRatio(1050, 600)
SurrenderKrakenButton.style.left = WidthRatio(1680, 400)
SurrenderKrakenButton.style.width = WidthRatio(1680, 200)
SurrenderKrakenButton.style.height = HeightRatio(1050, 50)
SurrenderKrakenButton.style.borderRadius = WidthRatio(1680, 20)
SurrenderKrakenButton.style.borderColor = "rgb(41, 25, 5)"
SurrenderKrakenButton.style.fontSize = WidthRatio(1680, 30)
SurrenderKrakenButton.style.color = "rgb(41, 25, 5)"
SurrenderKrakenButton.style.backgroundColor = "Transparent"
SurrenderKrakenButton.style.visibility = "hidden"

YesChangeMap.style.position = "absolute"
YesChangeMap.style.top = HeightRatio(1050, 600)
YesChangeMap.style.left = WidthRatio(1680, 100)
YesChangeMap.style.width = WidthRatio(1680, 200)
YesChangeMap.style.height = HeightRatio(1050, 50)
YesChangeMap.style.borderRadius = WidthRatio(1680, 20)
YesChangeMap.style.borderColor = "rgb(41, 25, 5)"
YesChangeMap.style.fontSize = WidthRatio(1680, 30)
YesChangeMap.style.color = "rgb(41, 25, 5)"
YesChangeMap.style.backgroundColor = "Transparent"
YesChangeMap.style.visibility = "hidden"

NoChangeMap.style.position = "absolute"
NoChangeMap.style.top = HeightRatio(1050, 600)
NoChangeMap.style.left = WidthRatio(1680, 400)
NoChangeMap.style.width = WidthRatio(1680, 200)
NoChangeMap.style.height = HeightRatio(1050, 50)
NoChangeMap.style.borderRadius = WidthRatio(1680, 20)
NoChangeMap.style.borderColor = "rgb(41, 25, 5)"
NoChangeMap.style.fontSize = WidthRatio(1680, 30)
NoChangeMap.style.color = "rgb(41, 25, 5)"
NoChangeMap.style.backgroundColor = "Transparent"
NoChangeMap.style.visibility = "hidden"

YesExploreIsland.style.position = "absolute"
YesExploreIsland.style.top = HeightRatio(1050, 600)
YesExploreIsland.style.left = WidthRatio(1680, 100)
YesExploreIsland.style.width = WidthRatio(1680, 200)
YesExploreIsland.style.height = HeightRatio(1050, 50)
YesExploreIsland.style.borderRadius = WidthRatio(1680, 20)
YesExploreIsland.style.borderColor = "rgb(41, 25, 5)"
YesExploreIsland.style.fontSize = WidthRatio(1680, 30)
YesExploreIsland.style.color = "rgb(41, 25, 5)"
YesExploreIsland.style.backgroundColor = "Transparent"
YesExploreIsland.style.visibility = "hidden"

NoExploreIsland.style.position = "absolute"
NoExploreIsland.style.top = HeightRatio(1050, 600)
NoExploreIsland.style.left = WidthRatio(1680, 400)
NoExploreIsland.style.width = WidthRatio(1680, 200)
NoExploreIsland.style.height = HeightRatio(1050, 50)
NoExploreIsland.style.borderRadius = WidthRatio(1680, 20)
NoExploreIsland.style.borderColor = "rgb(41, 25, 5)"
NoExploreIsland.style.fontSize = WidthRatio(1680, 30)
NoExploreIsland.style.color = "rgb(41, 25, 5)"
NoExploreIsland.style.backgroundColor = "Transparent"
NoExploreIsland.style.visibility = "hidden"

PopUpParent.style.width = WidthRatio(1680, 900)
PopUpParent.style.height = HeightRatio(1050, 150)
//PopUpParent.style.background = "red" pour voir la zone d'animation du popup
PopUpParent.style.fontSize = HeightRatio(1050, 25)
PopUpParent.style.borderRadius = HeightRatio(1050, 15)
PopUpParent.style.top = HeightRatio(1050, 850)
PopUpParent.style.left = WidthRatio(1680, 700)

PopUpFrame.style.width = WidthRatio(1680, 900)
PopUpFrame.style.height = HeightRatio(1050, 50)
PopUpFrame.style.background = "green"
PopUpFrame.style.fontSize = HeightRatio(1050, 25)
PopUpFrame.style.borderRadius = HeightRatio(1050, 15)
PopUpFrame.style.top = HeightRatio(1050, 850)
PopUpFrame.style.left = WidthRatio(1680, 700)
PopUpFrame.style.background = "url(iconesNimages/PopUpBackground.png) no-repeat"
PopUpFrame.style.backgroundSize = WidthRatio(1680, 900) + " " + HeightRatio(1050, 50)
PopUpFrame.style.color = "rgb(0, 0, 0)"

CalendarBackground.style.position = "absolute"
CalendarBackground.style.background = "url(iconesNimages/Calendar.png) no-repeat"
CalendarBackground.style.backgroundSize = WidthRatio(1680, 250) + " " + HeightRatio(1050, 180)
CalendarBackground.style.width = WidthRatio(1680, 250)
CalendarBackground.style.height = HeightRatio(1050, 180)
CalendarBackground.style.left = WidthRatio(1680, 720)
CalendarBackground.style.fontSize = WidthRatio(1680, 150)
CalendarBackground.style.zIndex = "1"

CalendarBackgroundNextDay.style.position = "absolute"
CalendarBackgroundNextDay.style.background = "url(iconesNimages/Calendar.png) no-repeat"
CalendarBackgroundNextDay.style.backgroundSize = WidthRatio(1680, 250) + " " + HeightRatio(1050, 180)
CalendarBackgroundNextDay.style.width = WidthRatio(1680, 250)
CalendarBackgroundNextDay.style.height = HeightRatio(1050, 180)
CalendarBackgroundNextDay.style.left = WidthRatio(1680, 720)
CalendarBackgroundNextDay.style.fontSize = WidthRatio(1680, 150)
CalendarBackgroundNextDay.style.zIndex = "0"

StartupScreen.style.position = "absolute"
StartupScreen.style.width = screen.width + "px"
StartupScreen.style.height = HeightRatio(1050, 940)
StartupScreen.style.top = "0px"
StartupScreen.style.left  = "0px"
StartupScreen.style.background = "rgba(255,255,255,0.4)"
StartupScreen.style.zIndex = 100

PressAnyToStart.style.width = WidthRatio(1680, 800)
PressAnyToStart.style.height = HeightRatio(1050, 800)
PressAnyToStart.style.top = "0px"
PressAnyToStart.style.left  = "0px"
PressAnyToStart.style.background = "url(iconesNimages/StartupScreenBackground.png) no-repeat"
PressAnyToStart.style.backgroundSize = WidthRatio(1680, 800) + " " + HeightRatio(1050, 800)
PressAnyToStart.style.zIndex = 100

class Map {
    x = undefined
    y = undefined

    constructor(x,y) {
        this.x = x + 1
        this.y = y + 1
    }

    CreateMap(x, y) {

        let CarteX = Math.floor(Math.random() * x)
        while (CarteX == 1 || CarteX == 0) {
            CarteX = Math.floor(Math.random() * x)
        }

        let CarteY = Math.floor(Math.random() * y)
        while (CarteY == 1 || CarteY == 0) {
            CarteY = Math.floor(Math.random() * y)
        }

        console.log(CarteX, CarteY)
        //colonnes
        for (let c = 1; c<y; c++) {
    
            //ligne
            for (let l = 1; l<x ; l++) {

                //genere aléatoirement un objet avec un id unique
                let randomPercent = Math.random() * 100

                if (c == CarteY && l == CarteX) {
                    htmlCarte.setPos(c,l)
                    htmlCarte.CreateObj(carte)
                    randomPercent = undefined //cette ligne supprime le pourcentage de chance pour les autres objets car nous voulons que si l'objet est generer alors il faut en generer un autre different
                }

                //97% de chance de creer une mer et la premiere case est toujours une mer
                if (randomPercent > 0 && randomPercent < 94 || c == 1 && l == 1) {
                    htmlMer.setPos(c,l)
                    htmlMer.CreateObj(carte)
                    randomPercent = undefined
                }
                //3% d'avoir un kraken
                if (randomPercent >= 97 && randomPercent <= 100) {
                    htmlKraken.setPos(c,l)
                    htmlKraken.CreateObj(carte)
                    randomPercent = undefined
                }

                if (randomPercent >= 94 && randomPercent < 97) {
                    htmlIle.setPos(c,l)
                    htmlIle.CreateObj(carte)
                    randomPercent = undefined
                }
    
                //Saute une ligne tout les 10 obj
                if (l == x-1) {
                    carte.innerHTML = carte.innerHTML + "<br>"
                }
            }
        }
    }
}



//Objet qui est une mer
class Mer {
    //ses attributs
    x = undefined
    y = undefined
    Description = undefined
    BackgroundImage = "url('iconesNimages/Mer.png')"
    ObjType = undefined
    Name = undefined;

    //constructeur initialisant ses attributs de départs
    constructor(ObjType, Description, Name) {
        this.ObjType = ObjType;
        this.Description = Description;
        this.Name = Name
    }

    //Methode Créant un nouveau Obj HTML dans le container de notre choix
    CreateObj(Container) {
        let NewObj = "<" + this.ObjType + " id=" + this.x + "." + this.y + " class='"+ this.Name +"'" +  " style=' font-size: 0px; margin: 0px; padding: 0px;display: inline-block; height:" + HeightRatio(1050,50) +"; width:" + WidthRatio(1680,50) + ";'>" + "</" + this.ObjType + ">"
        Container.innerHTML = Container.innerHTML + NewObj
    }
    //Change le HTML de la case suivante et affiche son image
    UnHidden(Case) {
        Case.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050,50)
        Case.style.backgroundImage = this.BackgroundImage
    }
    //l'evenement en relation avec la case
    ObjEvent() {
        console.log("Mer")
        document.body.style.filter = ""
    }
    //Definie la position de la case ou son id
    setPos(x, y){
        this.x = x;
        this.y = y;
    }
}

//Objet qui est un kraken
class Kraken {
    //ses attributs
    x = undefined
    y = undefined
    Description = undefined
    BackgroundImage = "url('iconesNimages/Kraken.png')"
    ObjType = undefined

    //constructeur initialisant ses attributs de départs
    constructor(ObjType, Description, Name) {
        this.ObjType = ObjType;
        this.Description = Description;
        this.Name = Name
    }

    //Methode Créant un nouveau Obj HTML dans le container de notre choix
    CreateObj(Container) {
        let NewObj = "<" + this.ObjType + " id=" + this.x + "." + this.y + " class='"+ this.Name +"'" +  " style=' font-size: 0px; margin: 0px; padding: 0px;display: inline-block; height:" + HeightRatio(1050,50) +"; width:" + WidthRatio(1680,50) + ";'>" + "</" + this.ObjType + ">"
        Container.innerHTML = Container.innerHTML + NewObj
    }
    //Change le HTML de la case suivante et affiche son image
    UnHidden(Case) {
        Case.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050,50)
        Case.style.backgroundImage = this.BackgroundImage
    }
    //Message d'evenement
    ObjEvent() {
        console.log("Kraken")
        DarkenBody.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
        DarkenBody.style.pointerEvents = "auto"
        OnGoingEvent = true
        EventWindow.style.visibility = "visible"
        EventMessage.innerHTML = ""
        typeWriter("Un Kraken nous attaque, que faire !", EventMessage, 50, 0, FightKrakenButton, SurrenderKrakenButton)
    }

    //L'evenement accepter
    YesEvent() {
        //calcule un pourcentage de chance de le battre (10% si aucun equipage + 10% par membre d'equipage (max 90%))
        let WinPourcentage = (NewPlayer.MembresEquipage * 10) + 10
        if (WinPourcentage > 90) {
            WinPourcentage = 90
        }
        let randnbr = Math.random() * 100
        console.log(WinPourcentage + " " + randnbr)
        //si combat perdu, perte de 1 hp et perte entre 0 et 5 membre d'equipage dans le combat
        if (randnbr > WinPourcentage) {
            console.log("lose")
            NewPlayer.setHp(NewPlayer.hp - 1)
            let NbrEquipageMort = Math.floor(Math.random() * 6)
            if (NbrEquipageMort > NewPlayer.MembresEquipage) {
                NbrEquipageMort = NewPlayer.MembresEquipage
            }
            NewPlayer.setMembresEquipage(NewPlayer.MembresEquipage - NbrEquipageMort)
            console.log(NbrEquipageMort)
            PopUpAnimate("Vous avez perdu la bataille : <span style='color:rgb(60,0,0);'> -1 HP </span> / <span style='color:rgb(60,0,0);'> -" + NbrEquipageMort + " membre(s) d'équipage </span>", failureSFX)
        }
        //si combat gagner, perte de 0 hp et 50% de chance de perdre entre 0 et 3 membre de l'equiupage dans le combat
        else {
            console.log("Win")
            let randnbr = Math.random() * 100
            console.log(randnbr)
            if (randnbr > 50) {
                let NbrEquipageMort = Math.floor(Math.random() * 4)
                if (NbrEquipageMort > NewPlayer.MembresEquipage) {
                    NbrEquipageMort = NewPlayer.MembresEquipage
                }
                NewPlayer.setMembresEquipage(NewPlayer.MembresEquipage - NbrEquipageMort)
                console.log(NbrEquipageMort)
                PopUpAnimate("Vous avez gagnez la bataille : <span style='color:rgb(60,0,0);'> -0 HP </span> / <span style='color:rgb(60,0,0);'> -," + NbrEquipageMort + " membre(s) d'équipage </span>", successBellSFX)
            }
            else {
            PopUpAnimate("Vous avez gagnez la bataille : -0 HP / -0 membre(s) d'équipage", successBellSFX)
            }
        }
        DarkenBody.style.backgroundColor = "rgba(0,0,0,0)"
        DarkenBody.style.pointerEvents = "none"
        EventWindow.style.visibility = "hidden"
        FightKrakenButton.style.visibility = "hidden"
        SurrenderKrakenButton.style.visibility = "hidden"
        OnGoingEvent = false
        //Recupere l'enplacement du joueur et sa position, change le joueur de position, trouve la case sur laquelle le joueur etait, change sa class et remet le joueur sur sa position (manipulation d'id car joueur et case visée on le même id)
        let nextCaseId = NewPlayer.id
        let PlayerX = NewPlayer.x
        let PlayerY = NewPlayer.y
        NewPlayer.updatePlayerPos(0,0)
        let NextCase = document.getElementById(nextCaseId)
        NextCase.className = "Mer"
        NewPlayer.updatePlayerPos(PlayerX, PlayerY)
    }

    NoEvent() {
        let randnbr = Math.random() * 100
        if (randnbr > 60 ) {
            console.log("Fuite reussite")
            PopUpAnimate("Vous fuyez la bataille et  partez sains et sauf", successBellSFX)
        }
        else {
            console.log("Fuite ratée")
            let NbrHpEnMoins = Math.floor(Math.random() * 2 + 1)
            NewPlayer.setHp(NewPlayer.hp - NbrHpEnMoins)
            PopUpAnimate("Vous tentez de fuire et hurtez un rocher : <span style='color:rgb(60,0,0);'> -"+ NbrHpEnMoins +" HP </span>", failureSFX)
        }
        DarkenBody.style.backgroundColor = "rgba(0,0,0,0)"
        DarkenBody.style.pointerEvents = "none"
        EventWindow.style.visibility = "hidden"
        FightKrakenButton.style.visibility = "hidden"
        SurrenderKrakenButton.style.visibility = "hidden"
        OnGoingEvent = false
        //Recupere l'enplacement du joueur et sa position, change le joueur de position, trouve la case sur laquelle le joueur etait, change sa class et remet le joueur sur sa position (manipulation d'id car joueur et case visée on le même id)
        let nextCaseId = NewPlayer.id
        let PlayerX = NewPlayer.x
        let PlayerY = NewPlayer.y
        NewPlayer.updatePlayerPos(0,0)
        let NextCase = document.getElementById(nextCaseId)
        NextCase.className = "Mer"
        NewPlayer.updatePlayerPos(PlayerX, PlayerY)
    }

    //Definie la position de la case ou son id
    setPos(x, y){
        this.x = x;
        this.y = y;
    }
}

//la class du joueur
class Player {
    x = undefined;
    y = undefined;
    id = undefined;
    hp = 3;
    gold = 0;
    MembresEquipage = 0;

    //definie le type du joueur et sa couleur
    constructor(PlayerType, Color) {
        this.PlayerType = PlayerType;
        this.Color = Color;
    }

    CreatePlayer() {
        //methode d'affichage du joueur sur la carte avec une position neutre au dessus des autres div
        carte.innerHTML = carte.innerHTML + "<" + this.PlayerType + " class='Player'" + " style=' background-size:" + WidthRatio(1680,50) + " " +  HeightRatio(1050,50) +  "; background-image: url(iconesNimages/PirateBoatRight.png);background-color :" + this.Color + "; z-index: 9; position: absolute; left: 0px; top: 0px;'" + " id=" + this.id + ">" + "</" + this.PlayerType + ">"
    }

    //gere les évenement des cases possibles
    eventHandler(NextCase) {
        if(NextCase.className == "Mer") {
            htmlMer.ObjEvent()
            ObjDescription.innerHTML = htmlMer.Description
            ObjDescriptionImg.style.backgroundImage = htmlMer.BackgroundImage
            htmlMer.UnHidden(NextCase)
        }
        if(NextCase.className == "Kraken") {
            htmlKraken.ObjEvent()
            ObjDescription.innerHTML = htmlKraken.Description
            ObjDescriptionImg.style.backgroundImage = htmlKraken.BackgroundImage
            htmlKraken.UnHidden(NextCase)
        }
        if (NextCase.className == "Carte") {
            htmlCarte.ObjEvent()
            ObjDescription.innerHTML = htmlCarte.Description
            ObjDescriptionImg.style.backgroundImage = htmlCarte.BackgroundImage
            htmlCarte.UnHidden(NextCase)
        }
        if (NextCase.className == "Island") {
            htmlIle.ObjEvent()
            ObjDescription.innerHTML = htmlIle.Description
            ObjDescriptionImg.style.backgroundImage = htmlIle.BackgroundImage
            htmlIle.UnHidden(NextCase)
        }
    }

    //Change la position du joueur et trouve la case suivante en fonction de la taille de la map
    updatePlayerPos(x, y) {
        let player = document.getElementById(NewPlayer.id)
        this.x = x;
        this.y = y;
        this.id = this.y + "." + this.x;
        for (let c = 1; c<NewMap.y ; c++) {
            for (let l = 1; l<NewMap.x ; l++) {
                var Case = document.getElementById(c + "." + l)
                if (Case.id == this.id) {
                    player.style.marginLeft = Case.offsetLeft + "px"
                    player.style.marginTop = Case.offsetTop + "px"
                    player.style.height = Case.clientHeight + "px"
                    player.style.width = Case.clientWidth + "px"
                    this.eventHandler(Case)
                }
            }
        }
        player.setAttribute("id", this.id);
    }

    setHp(hpAmount) {
        this.hp = hpAmount;
        if (this.hp <= 0) {
            this.hp = 0
            setTimeout(() => {
                DeathTransitionFrame.className = "DeathTransitionFrameAnim"
            }, 1000);
            setTimeout(() => {
                location.replace("Loser.html")
            }, 4000);
        }

        for (let i = 1; i < 6; i++) {
            let Heart = document.getElementById("Heart" + i)
            Heart.style.background = "url(iconesNimages/EmptyHeart.png) no-repeat"
            Heart.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050, 50)
        }

        for (let i = 1; i < (this.hp + 1); i++) {
            let Heart = document.getElementById("Heart" + i)
            Heart.style.background = "url(iconesNimages/FullHeart.png) no-repeat"
            Heart.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050, 50)
        }
    }

    setMembresEquipage(NombreDeMembres) {
        this.MembresEquipage = NombreDeMembres
        EquipageAmount.innerHTML = this.MembresEquipage
    }

    setGold(Gold) {
        if (Gold < 0) {
            Gold = 0
        }
        this.gold = Gold
        GoldAmount.innerHTML = this.gold
    }

}

class Carte {
    //ses attributs
    x = undefined
    y = undefined
    Description = undefined
    BackgroundImage = "url('iconesNimages/Map.png')"
    ObjType = undefined

    //constructeur initialisant ses attributs de départs
    constructor(ObjType, Description, Name) {
        this.ObjType = ObjType;
        this.Description = Description;
        this.Name = Name
    }

    //Methode Créant un nouveau Obj HTML dans le container de notre choix
    CreateObj(Container) {
        let NewObj = "<" + this.ObjType + " id=" + this.x + "." + this.y + " class='"+ this.Name +"'" +  " style=' font-size: 0px; margin: 0px; padding: 0px;display: inline-block; height:" + HeightRatio(1050,50) +"; width:" + WidthRatio(1680,50) + ";'>" + "</" + this.ObjType + ">"
        Container.innerHTML = Container.innerHTML + NewObj
    }
    //Change le HTML de la case suivante et affiche son image
    UnHidden(Case) {
        Case.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050,50)
        Case.style.backgroundImage = this.BackgroundImage
    }
    //Message d'evenement
    ObjEvent() {
        console.log("Carte")
        DarkenBody.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
        DarkenBody.style.pointerEvents = "auto"
        OnGoingEvent = true
        EventWindow.style.visibility = "visible"
        EventMessage.innerHTML = ""
        typeWriter("Vous avez trouver une carte, voulez vous changer de mer ? (! Vous ne pourrez pas revenir en arrière !)", EventMessage, 20, 0, YesChangeMap, NoChangeMap)
    }

    //L'evenement accepter
    YesEvent() {
        GenerateNewMap()
        DarkenBody.style.backgroundColor = "rgba(0,0,0,0)"
        DarkenBody.style.pointerEvents = "none"
        EventWindow.style.visibility = "hidden"
        YesChangeMap.style.visibility = "hidden"
        NoChangeMap.style.visibility = "hidden"
        OnGoingEvent = false
        MoveUntilBackgroundChange = 15
        ChangeCalendar()
        PopUpAnimate("Vous voyager pendant 1 Jour jusqu'a la nouvel mer", successBellSFX)
    }

    NoEvent() {
        DarkenBody.style.backgroundColor = "rgba(0,0,0,0)"
        DarkenBody.style.pointerEvents = "none"
        EventWindow.style.visibility = "hidden"
        YesChangeMap.style.visibility = "hidden"
        NoChangeMap.style.visibility = "hidden"
        OnGoingEvent = false
    }

    //Definie la position de la case ou son id
    setPos(x, y){
        this.x = x;
        this.y = y;
    }
}

class Island {
    //ses attributs
    x = undefined
    y = undefined
    Description = undefined
    BackgroundImage = "url('iconesNimages/Island.png')"
    ObjType = undefined

    //constructeur initialisant ses attributs de départs
    constructor(ObjType, Description, Name) {
        this.ObjType = ObjType;
        this.Description = Description;
        this.Name = Name
    }

    //Methode Créant un nouveau Obj HTML dans le container de notre choix
    CreateObj(Container) {
        let NewObj = "<" + this.ObjType + " id=" + this.x + "." + this.y + " class='"+ this.Name +"'" +  " style=' font-size: 0px; margin: 0px; padding: 0px;display: inline-block; height:" + HeightRatio(1050,50) +"; width:" + WidthRatio(1680,50) + ";'>" + "</" + this.ObjType + ">"
        Container.innerHTML = Container.innerHTML + NewObj
    }
    //Change le HTML de la case suivante et affiche son image
    UnHidden(Case) {
        Case.style.backgroundSize = WidthRatio(1680, 50) + " " + HeightRatio(1050,50)
        Case.style.backgroundImage = this.BackgroundImage
    }
    //Message d'evenement
    ObjEvent() {
        console.log("Island")
        DarkenBody.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
        DarkenBody.style.pointerEvents = "auto"
        OnGoingEvent = true
        EventWindow.style.visibility = "visible"
        EventMessage.innerHTML = ""
        typeWriter("Vous avez trouver une île, voulez vous l'explorer ?", EventMessage, 50, 0, YesExploreIsland, NoExploreIsland)
    }

    //L'evenement accepter
    YesEvent() {
        DarkenBody.style.backgroundColor = "rgba(0,0,0,0)"
        DarkenBody.style.pointerEvents = "none"
        EventWindow.style.visibility = "hidden"
        YesExploreIsland.style.visibility = "hidden"
        NoExploreIsland.style.visibility = "hidden"
        OnGoingEvent = false
        let randnbr = Math.floor(Math.random() * 100)
        if (randnbr > 50) {
            let Winnings = Math.floor(Math.random() * 6)
            while(Winnings == 0) {
                Winnings = Math.floor(Math.random() * 6)
            }
            NewPlayer.setGold(NewPlayer.gold + Winnings)
            PopUpAnimate("Vous explorer l'île et trouver un trésor : <span style='color:rgb(255,255,0);'> +" + Winnings + "G </span>", successBellSFX)
        }
        else {
            PopUpAnimate("Vous explorer l'île toute la journée mais malheuresement, elle est déserte", failureSFX)
            MoveUntilBackgroundChange = 15
            ChangeCalendar()
        }
        let nextCaseId = NewPlayer.id
        let PlayerX = NewPlayer.x
        let PlayerY = NewPlayer.y
        NewPlayer.updatePlayerPos(0,0)
        let NextCase = document.getElementById(nextCaseId)
        NextCase.className = "Mer"
        NewPlayer.updatePlayerPos(PlayerX, PlayerY)
    }

    NoEvent() {
        DarkenBody.style.backgroundColor = "rgba(0,0,0,0)"
        DarkenBody.style.pointerEvents = "none"
        EventWindow.style.visibility = "hidden"
        YesExploreIsland.style.visibility = "hidden"
        NoExploreIsland.style.visibility = "hidden"
        OnGoingEvent = false
    }

    //Definie la position de la case ou son id
    setPos(x, y){
        this.x = x;
        this.y = y;
    }
}

//creer un nouveau joueur
const NewPlayer = new Player("div", "")

//initie le joueur dans l'html insi que ses valeurs de départ
NewPlayer.CreatePlayer()
NewPlayer.setHp(3)

const htmlMer = new Mer("div", "Une mer calme", "Mer")
const htmlKraken = new Kraken("div", "Un méchant Kraken occupe la mer", "Kraken")
const htmlCarte = new Carte("div", "Une carte qui indique une nouvel mer", "Carte")
const htmlIle = new Island("div", "Une île au milieu de la mer", "Island")

//Creer un map nouvel de taille voulu
let NewMap = new Map(11,13)
NewMap.CreateMap(NewMap.x, NewMap.y)


//met le joueur a la case en haut a droite aka le début
NewPlayer.updatePlayerPos(1, 1)

//permet de changer le joueur d'endroit, vider la carte html, changer les dimensions de la class NewMap aléatoirement, remet le joueur dans la carte, crée la carte, puis change la position du joueur a la case 1.1
function GenerateNewMap() {
    let htmlPlayer = document.getElementById(NewPlayer.id)
    PlayerContainer.appendChild(htmlPlayer)
    carte.innerHTML = ""
    carte.appendChild(htmlPlayer)
    let x = Math.floor(Math.random() * 7) + 5
    let y = Math.floor(Math.random() * 9) + 5
    console.log("dimension de la nouvel map : " + x + " " + y)
    NewMap = new Map(x, y)
    NewMap.CreateMap(NewMap.x, NewMap.y)
    NewPlayer.updatePlayerPos(1,1)
}

function ChangeBackground() {
    //Systeme de changement de fond d'écran
    if (MoveUntilBackgroundChange > 1) { //Si il reste des mouvement avant le changement de fond d'écran
    MoveUntilBackgroundChange = MoveUntilBackgroundChange - 1
    }
    else{
        if (MoveUntilBackgroundChange <= 1) { //Sinon si j'ai effectuer tout les mouvement avant le changement de fond d'écran
            MoveUntilBackgroundChange = 15
            if (CurrentBackground == 3) { //Si c'est le dernier fond d'écran, alors remettre le premier
                CurrentBackground = 0
                document.body.style.background = Backgrounds[CurrentBackground] + " no-repeat"
                document.body.style.backgroundSize = screen.width + "px" + " " + HeightRatio(1050, 940)
                ChangeCalendar()
                return
            }
            CurrentBackground = CurrentBackground + 1 //Change le fond d'écran
            document.body.style.background = Backgrounds[CurrentBackground] + " no-repeat"
            document.body.style.backgroundSize = screen.width + "px" + " " + HeightRatio(1050, 940) 
        }
    }
}

//Une fonction effect typewriting trouver sur StackOverflow : https://stackoverflow.com/questions/60702890/javascript-typewriter-effect-for-multiple-lines
//Aprés m'etre renseigner et avoir bien regarder, je pense avoir compris la plupart sauf le setTimeout qui est encore un peu ambigü
function typeWriter(messageToShow, targetElement, timeBetween, currentPos = 0, ButtonToEnable1, ButtonToEnable2, ButtonToEnable3, ButtonToEnable4, ButtonToEnable5) {
    if (currentPos < messageToShow.length) {
      targetElement.innerHTML += messageToShow.charAt(currentPos);
      currentPos++;
      tickSFX.play()
      setTimeout(function() { typeWriter(messageToShow, targetElement, timeBetween, currentPos, ButtonToEnable1, ButtonToEnable2, ButtonToEnable3, ButtonToEnable4, ButtonToEnable5); }, timeBetween);
    }
    else {
        if (ButtonToEnable1) {
            ButtonToEnable1.style.visibility = "visible"
        }
        if (ButtonToEnable2) {
            ButtonToEnable2.style.visibility = "visible"
        }
        if (ButtonToEnable3) {
            ButtonToEnable3.style.visibility = "visible"
        }
        if (ButtonToEnable4) {
            ButtonToEnable4.style.visibility = "visible"
        }
        if (ButtonToEnable5) {
            ButtonToEnable5.style.visibility = "visible"
        }
    }
}

//animation pour le popup
function PopUpAnimate(Text, PopUpSFX) {
    PopUpFrame.classList.remove("PopUpFrameAnim")
    PopUpFrame.offsetWidth //Cette ligne rajoute un mini delay entre les instructions pour que l'animation se rejoue bien
    PopUpFrame.classList.add("PopUpFrameAnim")
    PopUpFrame.innerHTML = Text
    PopUpSFX.play()
}

//Animation pour changer le calendrier
function ChangeCalendar() {
    CalendarBackground.className = "CalendarBackground"
    CalendarBackground.offsetWidth
    CalendarBackground.className = "CalendarBackgroundAnim"
    CalendarBackground.innerHTML = "J" + CurrentDay
    CurrentDay++
    CalendarBackgroundNextDay.innerHTML = "J" + CurrentDay
    setTimeout(() => {
        CalendarBackground.innerHTML = "J" + CurrentDay
    }, 2000);
}

//petit ecran de début de jeux
function StartGame() {
    StartupActive = false
    StartupScreen.remove()
    CATMainTheme.loop = "loop"
    CATMainTheme.play()
}

//ecoute les inputs de l'utilisateur et change l'id du joueur en fonction de la touche et le bloque aux limite de la map en fonciton de sa taille
document.addEventListener('keydown', function(event) {

    if(event.keyCode == 38) {
        console.log('Fleche du haut');
        if (StartupActive == true) {
            StartGame()
            return
        }
        if (OnGoingEvent == true || NewPlayer.hp == 0) {
            console.log("OnGoingEvent est true, attendre qu'il s'arrete ou y mettre fin")
            return
        }
        if (NewPlayer.y <= 1) {
            return
        }
        NewPlayer.updatePlayerPos(NewPlayer.x, NewPlayer.y-1)
        ChangeBackground()
    }
    if(event.keyCode == 39) {
        console.log('Fleche de droite');
        if (StartupActive == true) {
            StartGame()
            return
        }
        if (OnGoingEvent == true || NewPlayer.hp == 0) {
            console.log("OnGoingEvent est true, attendre qu'il s'arrete ou y mettre fin")
            return
        }
        if (NewPlayer.x >=NewMap.x-1) {
            return
        }
        NewPlayer.updatePlayerPos(NewPlayer.x + 1, NewPlayer.y)
        document.getElementsByClassName("Player")[0].style.backgroundImage = "url(iconesNimages/PirateBoatRight.png)"
        ChangeBackground()
    }
    if(event.keyCode == 37) {
        console.log('Fleche de gauche');
        if (StartupActive == true) {
            StartGame()
            return
        }
        if (OnGoingEvent == true || NewPlayer.hp == 0) {
            console.log("OnGoingEvent est true, attendre qu'il s'arrete ou y mettre fin")
            return
        }
        if (NewPlayer.x <=1) {
            return
        }
        NewPlayer.updatePlayerPos(NewPlayer.x - 1, NewPlayer.y)
        document.getElementsByClassName("Player")[0].style.backgroundImage = "url(iconesNimages/PirateBoatLeft.png)"
        ChangeBackground()
    }
    if(event.keyCode == 40) {
        console.log('Fleche du bas');
        if (StartupActive == true) {
            StartGame()
            return
        }

        if (OnGoingEvent == true || NewPlayer.hp == 0) {
            console.log("OnGoingEvent est true, attendre qu'il s'arrete ou y mettre fin")
            return
        }
        if (NewPlayer.y >=NewMap.y-1) {
            return
        }
        NewPlayer.updatePlayerPos(NewPlayer.x, NewPlayer.y + 1)
        ChangeBackground()
    }
});


function RepairButtonFunction() {
    console.log("test")
    RepairButton.style.marginTop = "2px"
    setTimeout(() => {
        RepairButton.style.marginTop = "0px"
    }, 50);
}


RepairButton.addEventListener("click", RepairButtonFunction)
FightKrakenButton.addEventListener("click", htmlKraken.YesEvent)
SurrenderKrakenButton.addEventListener("click", htmlKraken.NoEvent)
YesChangeMap.addEventListener("click", htmlCarte.YesEvent)
NoChangeMap.addEventListener("click", htmlCarte.NoEvent)
YesExploreIsland.addEventListener("click", htmlIle.YesEvent)
NoExploreIsland.addEventListener("click", htmlIle.NoEvent)