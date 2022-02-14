export default createMapStyle = yellowMap;
const yellowMap = [
    {
        featureType: "road",
        stylers: [
            {
                hue: "#efc110",
            },
            {
                saturation: -79,
            },
            { visibility: "on" },
        ],
    },
    {
        featureType: "poi",
        stylers: [
            {
                saturation: -78,
            },
            {
                hue: "#f2cd40",
            },
            {
                lightness: -47,
            },
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road.local",
        stylers: [
            {
                lightness: 22,
            },
        ],
    },
    {
        featureType: "landscape",
        stylers: [
            {
                hue: "#f2cd40",
            },
            {
                saturation: -11,
            },
        ],
    },
    {
        featureType: "water",
        stylers: [
            {
                saturation: -25,
            },
            {
                hue: "#EDE912",
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: "road.local",
        stylers: [
            {
                weight: 1.3,
            },
            {
                lightness: 30,
            },
        ],
    },
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "simplified",
            },
            {
                hue: "#efc110",
            },
            {
                saturation: -16,
            },
        ],
    },
    {
        featureType: "transit.line",
        stylers: [
            {
                saturation: -72,
            },
        ],
    },
];

const brightMap = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d2d2d2"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dad6c3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a1a5bb"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#6ab360"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#5eacf0"
            }
        ]
    }
]
//   #efc110#F2CD40#EFD310#F2DC40
/*
const eventMarkers = [
{
    coordinate: {
        latitude: 22.32818282002157,
        longitude: 114.17101371459815,
    },
    markerType: "event",
    marker: {
        name: "3v3 Basketball",
        registeredParti: 10,
        maximumParti: 15,
        time: "10:00 am",
        date: "10-2-2021",
        image: { uri: 'https://images.daznservices.com/di/library/NBA_Global_CMS_image_storage/99/8d/lebron-james-stephen-curry_hsy3vl56pmfw1w3jwlx13y367.jpg?t=-2036972676&w=900&quality=80' },
        address: "146 Sai Yeung Choi Street, SSP",
        description: 'This is an 3 on 3 basketball event.',
        tag: ["nba", "basketball", "ballslife"]
    }
},
{
    coordinate: {
        latitude: 22.31818282002157,
        longitude: 114.16101371459815,
    },
    markerType: "food",
    marker: {
        name: "McDonald",
        maximumParti: 15,
        image: { uri: 'https://www.newfoodmagazine.com/wp-content/uploads/mcdonalds.jpg' },
        address: "146 Sai Yeung Choi Street, SSP",
        contact: "51308888",
        description: 'McDonalds (MCD) is a fast food, limited service restaurant with more than 35,000 restaurants in over 100 countries. It employs more than four million people. McDonalds serves 70 million customers per day, which is greater than the population of France.',
        tag: ["yum", "burger", "fries", "westernfood", "happyshare", "discount"],
        hours: {
            mon: '10:00 - 23:59',
            tue: '10:00 - 23:59',
            wed: '10:00 - 23:59',
            thu: '10:00 - 23:59',
            fri: '10:00 - 23:59',
            sat: '10:00 - 23:59',
            sun: '10:00 - 23:59'
        }
    }
},
{
    coordinate: {
        latitude: 22.31818282002157,
        longitude: 114.17401371459815,
    },
    markerType: "party",
    marker: {
        name: "JASON SO Partyroom",
        maximumParti: 300,
        image: { uri: 'https://media.timeout.com/images/105188692/1024/576/image.jpg' },
        address: "146 Sai Yeung Choi Street, SSP",
        contact: "51308888",
        description: '20 YO home owner renting out his home for house party! Cheap and clean and most importantly, PET FRIENDLY',
        tag: ["fun", "ktv", "goldenretriever", "puppyfriendly"],
        hours: {
            mon: '10:00 - 23:59',
            tue: '10:00 - 23:59',
            wed: '10:00 - 23:59',
            thu: '10:00 - 23:59',
            fri: '10:00 - 23:59',
            sat: '10:00 - 23:59',
            sun: '10:00 - 23:59'
        }
    }
},
{
    coordinate: {
        latitude: 22.32318282002157,
        longitude: 114.17501371459815,
    },
    markerType: "bar",
    marker: {
        name: "Project B",
        maximumParti: 15,
        image: { uri: 'https://cdn.asiatatler.com/asiatatler/i/hk/2020/05/06220616-bar-relief-covid_cover_1000x667.jpg' },
        address: "146 Sai Yeung Choi Street, SSP146 Sai Yeung Choi Street, SSP",
        description: 'Cocktail, house red & house white 50% off!',
        tag: ["redwine", "winetasting", 'ladysnight'],
        hours: {
            mon: '10:00 - 23:59',
            tue: '10:00 - 23:59',
            wed: '10:00 - 23:59',
            thu: '10:00 - 23:59',
            fri: '10:00 - 23:59',
            sat: '10:00 - 23:59',
            sun: '10:00 - 23:59'
        }
    }
},
{
    coordinate: {
        latitude: 22.32618282002157,
        longitude: 114.17901371459815,
    },
    markerType: "event",
    marker: {
        name: "3v3 Basketball",
        registeredParti: 10,
        maximumParti: 15,
        time: "10:00 am",
        date: "10-2-2021",
        image: { uri: 'https://images.daznservices.com/di/library/NBA_Global_CMS_image_storage/99/8d/lebron-james-stephen-curry_hsy3vl56pmfw1w3jwlx13y367.jpg?t=-2036972676&w=900&quality=80' },
        address: "146 Sai Yeung Choi Street, SSP",
        description: 'This is an 3 on 3 basketball event.',
        tag: ["nba", "basketball", "ballslife"]
    }
},
{
    coordinate: {
        latitude: 22.12318282002157,
        longitude: 114.17201371459815,
    },
    markerType: "food",
    marker: {
        name: "McDonald",
        maximumParti: 15,
        image: { uri: 'https://www.newfoodmagazine.com/wp-content/uploads/mcdonalds.jpg' },
        address: "146 Sai Yeung Choi Street, SSP",
        contact: "51308888",
        description: 'McDonalds (MCD) is a fast food, limited service restaurant with more than 35,000 restaurants in over 100 countries. It employs more than four million people. McDonalds serves 70 million customers per day, which is greater than the population of France.',
        tag: ["yum", "burger", "fries", "westernfood", "happyshare", "discount"],
        hours: {
            mon: '10:00 - 23:59',
            tue: '10:00 - 23:59',
            wed: '10:00 - 23:59',
            thu: '10:00 - 23:59',
            fri: '10:00 - 23:59',
            sat: '10:00 - 23:59',
            sun: '10:00 - 23:59'
        }
    }
},
{
    coordinate: {
        latitude: 22.12118282002157,
        longitude: 114.1711371459815,
    },
    markerType: "party",
    marker: {
        name: "JASON SO Partyroom",
        maximumParti: 300,
        image: { uri: 'https://media.timeout.com/images/105188692/1024/576/image.jpg' },
        address: "146 Sai Yeung Choi Street, SSP",
        contact: "51308888",
        description: '20 YO home owner renting out his home for house party! Cheap and clean and most importantly, PET FRIENDLY',
        tag: ["fun", "ktv", "goldenretriever", "puppyfriendly"],
        hours: {
            mon: '10:00 - 23:59',
            tue: '10:00 - 23:59',
            wed: '10:00 - 23:59',
            thu: '10:00 - 23:59',
            fri: '10:00 - 23:59',
            sat: '10:00 - 23:59',
            sun: '10:00 - 23:59'
        }
    }
},
{
    coordinate: {
        latitude: 22.12958282002157,
        longitude: 114.17501371459815,
    },
    markerType: "bar",
    marker: {
        name: "Project B",
        maximumParti: 15,
        image: { uri: 'https://cdn.asiatatler.com/asiatatler/i/hk/2020/05/06220616-bar-relief-covid_cover_1000x667.jpg' },
        address: "146 Sai Yeung Choi Street, SSP146 Sai Yeung Choi Street, SSP",
        description: 'Cocktail, house red & house white 50% off!',
        tag: ["redwine", "winetasting", 'ladysnight'],
        hours: {
            mon: '10:00 - 23:59',
            tue: '10:00 - 23:59',
            wed: '10:00 - 23:59',
            thu: '10:00 - 23:59',
            fri: '10:00 - 23:59',
            sat: '10:00 - 23:59',
            sun: '10:00 - 23:59'
        }
    }
}
]
*/
