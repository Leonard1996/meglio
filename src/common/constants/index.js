export const genders = [
    {
        value:"M",
        label:"Maschio"
    },
    {
        value:"F",
        label:"Femmina"
    },
    {
        value:"G",
        label:"Persona Giuridica" 
    }
]
export const civilStatuses = [
    {id:1, name:"Sposato", value: "sposato"},
    {id:2, name:"Single", value: "single"},
    {id:3, name:"Divorziato", value: "divorziato"}
];
export const professions = [
    {id: "ragioniere", name:"Ragioniere", value: "ragioniere"},
    {id: "attore", name:"Attore", value: "attore"},
    {id: "attrice", name:"Attrice", value: "attrice"},
    {id: "controllore_traffico", name:"Controllore del traffico aereo", value: "controllore_traffico"},
    {id: "architetto", name:"Architetto", value: "architetto"},
    {id: "artista", name:"Artista", value: "artista"},
    {id: "avvocato", name:"Avvocato", value: "avvocato"},
    {id: "contabile", name:"Contabile", value: "contabile"},
    {id: "barbiere", name:"Barbiere", value: "barbiere"},
    {id: "barista", name:"Barista", value: "barista"},
    {id: "banker", name:"banker", value: "banker"},
    {id: "costruttore", name:"costruttore", value: "costruttore"},
    {id: ",acellaio", name:"Macellaio", value: "macellaio"},
    {id: "falegname", name:"Falegname", value: "falegname"},
    {id: "cassiere", name:"Cassiere", value: "cassiere"},
    {id: "chef", name:"Chef", value: "chef"},
    {id: "coach", name:"Coach", value: "coach"},
    {id: "dentista", name:"Dentista", value: "dentista"},
    {id: "progettista", name:"Progettista", value: "progettista"},
    {id: "sviluppatore", name:"Sviluppatore", value: "sviluppatore"},
    {id: "dietologo", name:"Dietologo", value: "dietologo"},
    {id: "dottore", name:"Dottore", value: "dottore"},
    {id: "economista", name:"Economista", value: "economista"},
    {id: "direttore", name:"Direttore", value: "direttore"},
    {id: "elettricista", name:"Elettricista", value: "elettricista"},
    {id: "ingegnere", name:"Ingegnere", value: "ingegnere"}
];
export const flagResponse = [{label: "Sì", value: 1}, {label: "No", value: 0}];

export const months = [
    {id: "01", name: "Gennaio", value: "gennaio"},
    {id: "02", name: "Febbraio", value: "febbraio"},
    {id: "03", name: "Marzo", value: "marzo"},
    {id: "04", name: "Aprile", value: "aprile"},
    {id: "05", name: "Maggio", value: "maggio"},
    {id: "06", name: "Giugno", value: "giugno"},
    {id: "07", name: "Luglio", value: "luglio"},
    {id: "08", name: "Agosto", value: "agosto"},
    {id: "09", name: "Settembre", value: "settembre"},
    {id: "10", name: "Ottobre", value: "ottobre"},
    {id: "11", name: "Novembre", value: "novembre"},
    {id: "12", name: "Dicembre", value: "dicembre"}
];
export const power_supply = [
    {id: 'nesuna', name: "Nesuna", value: "nesuna"},
    {id: 'methane', name: "Methane", value: "methane"},
    {id: 'benzina', name: "Benzina", value: "benzina"}
];

export const insuranceTypes = [
    {id: 'N', name: 'Nuova polizza', value: ''},
    {id: 'B', name: 'Bonus / Malus', value: ''}
]

// (Tempo libero, casa lavoro, lavoro
export const usage_types = [
    {id: 'tempo-libero', name: "Tempo libero", value: "tempo-libero"},
    {id: 'casa-lavoro', name: "Casa lavoro", value: "casa-lavoro"},
    {id: 'lavoro', name: "Lavoro", value: "lavoro"}
]

export const km_during_one_year = [
    {id: 10000, name: "10000", value: "10000"},
    {id: 20000, name: "20000", value: "20000"},
    {id: 30000, name: "30000", value: "30000"},
    {id: 50000, name: "50000", value: "50000"}
]

export const vehiclesAmountInFamily = [
    {id: 1, name: "1", value: "1"},
    {id: 2, name: "2", value: "2"},
    {id: 3, name: "3", value: "3"},
    {id: 4, name: "4", value: "4"},
    {id: 5, name: "4+", value: "4+"}
];

export const meritClass = [
    {id: 1, name: "1", value: "1"},
    {id: 2, name: "2", value: "2"},
    {id: 3, name: "3", value: "3"},
    {id: 4, name: "4", value: "4"},
    {id: 5, name: "5", value: "5"},
    {id: 6, name: "6", value: "6"},
    {id: 7, name: "7", value: "7"},
    {id: 8, name: "8", value: "8"},
    {id: 9, name: "9", value: "9"},
    {id: 10, name: "10", value: "10"},
    {id: 11, name: "11", value: "11"},
    {id: 12, name: "12", value: "12"},
    {id: 13, name: "13", value: "13"},
    {id: 14, name: "14", value: "14"},
    {id: 15, name: "15", value: "15"},
    {id: 16, name: "16", value: "16"},
    {id: 17, name: "17", value: "17"},
    {id: 18, name: "18", value: "18"}
];

export const guideType = [
    {id: "free", name: "Guida libera"},
    {id: "expert ", name: "Guida esperta"},
    {id: "exclusive", name: "Guida esclusiva"},
];
export const companyTypes = [
    {id: "srl", name: "Srl", value: "srl"},
    {id: "sas", name: "Sas", value: "sas"},
    {id: "snc", name: "Snc", value: "snc"},
    {id: "spa", name: "Spa", value: "spa"},
    {id: "scarl", name: "Scarl", value: "scarl"},
    {id: "srls", name: "Srls", value: "srls"},
    {id: "ss", name: "SS", value: "ss"},
    {id: "sapa", name: "Sapa", value: "sapa"},
]
export const years = (() =>{
    let y = [];
    let maxYear = new Date().getFullYear();
    let minYear = maxYear - 80;
    for(let i=maxYear;i>=minYear;i--){
        y.push({id: i, name: i, value: i});
    }
    return y;
})();

export const lastSixYears = (() =>{
    let y = [];
    let maxYear = new Date().getFullYear();
    let minYear = maxYear - 6;
    for(let i=maxYear;i>minYear;i--){
        y.push({id: i, name: i, value: i});
    }
    return y;
})();

export const getLastSixYearsBySelectedYear = (year) => {
    let y = [];
    let cY = new Date().getFullYear();
    let diff = cY - year;
    
    let max = diff > 4? cY - 1 : cY;
    let min = max-5;
    for(let i=max;i>=min;i--){
        y.push({id: i, name: i, value: i});
    }
    return y;
}

export const engineerCodes = ["ingegnere", "architetto", "geometra"];

export const allowedProfessionCompanyIds = ["94"];

export const violationTypes = [
    {id: "principale", name: "Pagato con responsabilita' principale"},
    {id: "paritaria", name: "Pagato con responsabilita' paritaria"},
]  