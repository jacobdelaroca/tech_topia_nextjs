import image from '@/assets/main_bg.png'

export const MINIMUM_DISTANCE: number = 0.00082758987427953;

export interface Location {
    name: string,
    coords: number[]
}

export const mainColor = "#f37335"
export const accentColor = "#fdc830"


export const divStyle: React.CSSProperties = {
    backgroundImage: `url(${image.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    height: "100%",
    backgroundAttachment: "fixed",
    minHeight: "90vh"
  };

export const OFFSET: number = 0.00009;

export const MAP_ICON_GRID_WIDTH: number = 6;

export const AREA_LOCATION: Location[]  = [
    {
        "name": "STI",
        "coords": [13.7564621, 121.0583026]
    },
    {
        "name": "Mabacong_Poblacion",
        "coords": [13.653998, 121.049608]
    },
    {
        "name": "Mabacong_Ilaya",
        "coords": [13.654623, 121.050001]
    },
    {
        "name": "Simlong_Kulayo",
        "coords": [13.664875, 121.053431]
    },
    {
        "name": "Simlong_Balmes",
        "coords": [13.666877, 121.054567]
    },
    {
        "name": "Simlong_Hilltop",
        "coords": [13.673410, 121.055667]
    },
    {
        "name": "Pinamukan_Ibaba",
        "coords": [13.685799, 121.055327]
    },
    {
        "name": "Pinamukan_Uno",
        "coords": [13.695882, 121.052326]
    },
    {
        "name": "Pinamukan_Sinko",
        "coords": [13.701680, 121.055668]
    }
]
