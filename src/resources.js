export const categories = {
  'COVID Testing':{},
  'Health':{},
  'Housing':{},
  'Food and Nutrition':{},
  'Financial Aid, Employment, and Legal':{},
  'Crisis Events':{},
  'Basic Needs':{},
  'Education':{},
  'Other':{},
}


export function getCategory(resource) {
  if (categories[resource.category]) {
    return resource.category;
  } else {
    return "Other";
  }
};

export function getCountInCategory (rDict, categoryName) {
  var c = 0;
  for (var resource in rDict) {
    if (rDict[resource]['category'] == categoryName) {
      c = c + 1;
    } else if (!categories[rDict[resource]['category']]) {
      if (categoryName == "Other") {
        c = c + 1;
      }
    }
  }
  return c;
};

export const i = {
  'All':{
    className: 'custom-div-icon',
    html: "<div style='background-color:#dc3545;' class='marker-pin'></div><i class='material-icons markerIcon'>list</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    iconName: 'list'
  },
  'Health':{
				className: 'custom-div-icon',
        html: "<div style='background-color:#dc3545;' class='marker-pin'></div><i class='material-icons markerIcon'>local_hospital</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        iconName: 'local_hospital'
    },
  'Financial Aid, Employment, and Legal':{
				className: 'custom-div-icon',
        html: "<div style='background-color:#6c757d;' class='marker-pin'></div><i class='material-icons markerIcon'>attach_money</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        iconName: 'attach_money'
    },
  'Crisis Events':{
				className: 'custom-div-icon',
        html: "<div style='background-color:#6f42c1;' class='marker-pin'></div><i class='material-icons markerIcon'>report_problem</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        iconName: 'report_problem'
    },
  'Basic Needs':{
				className: 'custom-div-icon',
        html: "<div style='background-color:#007bff;' class='marker-pin'></div><i class='material-icons markerIcon'>shopping_cart</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        iconName: 'shopping_cart'
    },
  'Other':{
				className: 'custom-div-icon',
        html: "<div style='background-color:#6f42c1;' class='marker-pin'></div><i class='material-icons markerIcon'>grade</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        iconName: 'grade'
    },
  'Food and Nutrition':{
        className: 'custom-div-icon',
        html: "<div style='background-color:#28a745;' class='marker-pin'></div><i class='material-icons markerIcon'>restaurant</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        iconName: 'restaurant'
    },
  'Housing':{
				className: 'custom-div-icon',
        html: "<div style='background-color:#6610f2;' class='marker-pin'></div><i class='material-icons markerIcon'>single_bed</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        iconName: 'single_bed'
    },
  'Education':{
				className: 'custom-div-icon',
        html: "<div style='background-color:#343a40;' class='marker-pin'></div><i class='material-icons markerIcon'>menu_book</i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        iconName: 'menu_book'
    },
  'COVID Testing': {
    className: 'custom-div-icon',
    html: "<div style='background-color:#ffc107;' class='marker-pin'></div><i class='material-icons markerIcon'>sanitizer</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    iconName: 'sanitizer'
  }
}
