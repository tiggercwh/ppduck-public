
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const temp = Dimensions.get('window').width / 375;
const windowHeight = Dimensions.get('window').height / 812;
let windowWidth = Math.pow(temp * windowHeight, 0.5)
if (Platform.OS !== "ios") {
    if (windowWidth > 1.3) {
        windowWidth = 1.3
    } else if (windowWidth > 1.2) {
        windowWidth = 1.2
    } else {
        windowWidth = 1
    }
}

module.exports = StyleSheet.create({
    tinyLightFont: {
        fontSize: 10 * windowWidth,
        fontWeight: "300"
    },
    tinySemiFont: {
        fontSize: 10 * windowWidth,
        fontWeight: "500"
    },
    tinyBoldFont: {
        fontSize: 10 * windowWidth,
        fontWeight: "700"
    },
    smallLightFont: {
        fontSize: 12 * windowWidth,
        fontWeight: "300"
    },

    smallSemiFont: {
        fontSize: 12 * windowWidth,
        fontWeight: "500"
    },

    smallBoldFont: {
        fontSize: 12 * windowWidth,
        fontWeight: "700"
    },

    mediumLightFont: {
        fontSize: 14 * windowWidth,
        fontWeight: "300"
    },

    mediumSemiFont: {
        fontSize: 14 * windowWidth,
        fontWeight: "500"
    },

    mediumBoldFont: {
        fontSize: 14 * windowWidth,
        fontWeight: "700"
    },

    largeLightFont: {
        fontSize: 16 * windowWidth,
        fontWeight: "300"
    },

    largeSemiFont: {
        fontSize: 16 * windowWidth,
        fontWeight: "500"
    },

    largeBoldFont: {
        fontSize: 16 * windowWidth,
        fontWeight: "700"
    },
    smallHeaderFont: {
        fontSize: 22 * windowWidth,
        fontWeight: "700"
    },
    headerFont: {
        fontSize: 27 * windowWidth,
        fontWeight: "700"
    },
    largeHeaderFont: {
        fontSize: 33 * windowWidth,
        fontWeight: "700"
    }
});

/*
venue = {
    venueName: String,
    venueLocation: String,
    venueContact: String,
    venueMaxParti: Int,
    venueChargePerHead: Int,
    venueFacilities: {
        MJtraditional: Bool,
        MJElectric: Bool,
        NintendoSwitch: Bool,
        PS4: Bool,
        VR: Bool,
        Snooker: Bool,
        BeerPong: Bool,
        Darts: Bool,
        Wifi: Bool,
        Refrigerator: Bool,
        KTV: Bool,
        Projector: Bool,
        TV:Bool,
        Mic: Bool,
        BYOB: Bool,
        BYOF: Bool,
        Pet: Bool,
        BBQ: Bool,
        BoardGames: Bool,
        Poker: Bool,
        ChiChess: Bool,
        IntChess: Bool,

    },
    venueOpeningHour: {
        mon: '10:00 - 23:59',
        tue: '10:00 - 23:59',
        wed: '10:00 - 23:59',
        thu: '10:00 - 23:59',
        fri: '10:00 - 23:59',
        sat: '10:00 - 23:59',
        sun: '10:00 - 23:59'
    },
    venueSqFt: Int,
}
*/